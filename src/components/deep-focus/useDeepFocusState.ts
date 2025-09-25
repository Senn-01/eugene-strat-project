// src/components/deep-focus/useDeepFocusState.ts
'use client'

import { useState, useCallback, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Project } from '@/lib/types/project.types';
import { DeepFocusState, SessionConfig, WillpowerLevel, MindsetLevel, SessionDuration } from './types';
import {
  INTERRUPTED_SESSION_XP,
  calculateSessionXP,
  getDifficultyQuote
} from './constants';

const initialState: DeepFocusState = {
  phase: 'setup',
  availableProjects: [],
  sessionConfig: null,
  activeSession: null,
  dailyCommitment: { target: null, current: 0 },
  isLoading: false,
  error: null,
};

export function useDeepFocusState() {
  const [state, setState] = useState<DeepFocusState>(initialState);
  const supabase = createClient();

  // Fetch active projects for session selection
  const fetchActiveProjects = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .in('status', ['active'])
        .order('updated_at', { ascending: false });

      if (error) throw error;

      console.log('DeepFocus: Fetched projects:', data?.length || 0, 'active projects');

      setState(prev => ({
        ...prev,
        availableProjects: data || [],
        isLoading: false,
      }));
    } catch (error) {
      console.error('DeepFocus: Failed to fetch projects:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to load projects. Please try refreshing the page.',
        isLoading: false,
      }));
    }
  }, []);

  // Load daily commitment and today's sessions count
  const loadDailyStats = useCallback(async () => {
    try {
      const result = await supabase.rpc('get_today_sessions');

      if (result.error) throw result.error;

      console.log('DeepFocus: Daily stats loaded:', result.data);

      const stats = result.data;
      setState(prev => ({
        ...prev,
        dailyCommitment: {
          target: stats.commitment,
          current: stats.completed_sessions,
        },
      }));
    } catch (error) {
      console.error('DeepFocus: Failed to load daily stats:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to load daily statistics',
      }));
    }
  }, []);

  // Check for existing active session in localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('activeSession');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        const elapsed = Date.now() - new Date(session.startedAt).getTime();
        const remaining = session.duration * 60 * 1000 - elapsed;

        if (remaining > 0) {
          // Resume session
          setState(prev => ({
            ...prev,
            phase: 'active',
            activeSession: {
              ...session,
              startedAt: new Date(session.startedAt),
              remainingMs: remaining,
            },
          }));
        } else {
          // Session already completed, transition to completion phase
          setState(prev => ({
            ...prev,
            phase: 'complete',
            activeSession: {
              ...session,
              startedAt: new Date(session.startedAt),
              remainingMs: 0,
            },
          }));
          // Note: localStorage will be cleared when user submits mindset feedback
        }
      } catch (error) {
        localStorage.removeItem('activeSession');
      }
    }

    // Load initial data
    fetchActiveProjects();
    loadDailyStats();
  }, []); // Empty dependency array since functions are now stable

  // Step 1: Configure session (project + duration)
  const configureSession = useCallback((projectId: string, duration: SessionDuration) => {
    setState(prev => {
      const project = prev.availableProjects.find(p => p.id === projectId);
      if (!project) return prev;

      return {
        ...prev,
        sessionConfig: {
          projectId,
          projectName: project.name,
          duration,
        },
        phase: 'willpower-select',
      };
    });
  }, []);

  // Step 2: Start session with willpower assessment
  const startSession = useCallback(async (willpower: WillpowerLevel) => {
    // Get current session config before starting async operation
    const currentConfig = state.sessionConfig;
    if (!currentConfig) {
      setState(prev => ({ ...prev, error: 'No session configuration found' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('User not authenticated');

      // Create session record
      const { data: sessionData, error } = await supabase
        .from('sessions')
        .insert({
          user_id: user.id,
          project_id: currentConfig.projectId,
          duration: currentConfig.duration,
          willpower,
          difficulty_quote: getDifficultyQuote(willpower, currentConfig.duration),
        })
        .select()
        .single();

      if (error) throw error;

      const activeSession = {
        id: sessionData.id,
        projectId: currentConfig.projectId,
        projectName: currentConfig.projectName,
        duration: currentConfig.duration,
        willpower,
        difficultyQuote: sessionData.difficulty_quote,
        startedAt: new Date(sessionData.started_at),
        remainingMs: currentConfig.duration * 60 * 1000,
      };

      // Store in localStorage for persistence
      localStorage.setItem('activeSession', JSON.stringify({
        ...activeSession,
        startedAt: activeSession.startedAt.toISOString(),
      }));

      setState(prev => ({
        ...prev,
        phase: 'active',
        activeSession,
        sessionConfig: null, // Clear config after starting
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to start session',
        isLoading: false,
      }));
    }
  }, [state.sessionConfig]);

  // Complete session
  const completeSession = useCallback(async (mindset: MindsetLevel) => {
    // Get current session before starting async operation
    const currentSession = state.activeSession;
    if (!currentSession) {
      setState(prev => ({ ...prev, error: 'No active session found' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true }));

      const xpEarned = calculateSessionXP(
        currentSession.duration,
        currentSession.willpower
      );

      const { error } = await supabase.rpc('complete_session', {
        session_id: currentSession.id,
        mindset_level: mindset,
        xp_amount: xpEarned,
      });

      if (error) throw error;

      // Clear localStorage
      localStorage.removeItem('activeSession');

      // Trigger XP animation
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userPrefs } = await supabase
          .from('user_preferences')
          .select('xp_points')
          .eq('user_id', user.id)
          .single();

        const newXp = (userPrefs?.xp_points || 0);
        const event = new CustomEvent('xp-update', { detail: { newXp } });
        window.dispatchEvent(event);
      }

      // Update state - don't change phase (already set to 'complete' by transitionToComplete)
      setState(prev => ({
        ...prev,
        isLoading: false,
        dailyCommitment: {
          ...prev.dailyCommitment,
          current: prev.dailyCommitment.current + 1,
        },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to complete session',
        isLoading: false,
      }));
    }
  }, [state.activeSession]);

  // Interrupt session
  const interruptSession = useCallback(async () => {
    // Get current session before starting async operation
    const currentSession = state.activeSession;
    if (!currentSession) {
      setState(prev => ({ ...prev, error: 'No active session found' }));
      return;
    }

    try {
      await supabase
        .from('sessions')
        .update({
          interrupted_at: new Date().toISOString(),
          is_interrupted: true,
          xp_earned: INTERRUPTED_SESSION_XP,
        })
        .eq('id', currentSession.id);

      // Award interrupted XP
      await supabase.rpc('increment_user_xp', { xp_amount: INTERRUPTED_SESSION_XP });

      // Clear localStorage
      localStorage.removeItem('activeSession');

      // Trigger XP animation for interruption
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userPrefs } = await supabase
          .from('user_preferences')
          .select('xp_points')
          .eq('user_id', user.id)
          .single();

        const newXp = (userPrefs?.xp_points || 0);
        const event = new CustomEvent('xp-update', { detail: { newXp } });
        window.dispatchEvent(event);
      }

      setState(prev => ({
        ...prev,
        phase: 'setup',
        activeSession: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to interrupt session',
      }));
    }
  }, [state.activeSession]);

  // Daily commitment functions
  const setDailyCommitment = useCallback(async (target: number | null) => {
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('User not authenticated');

      if (target === null) {
        // Delete commitment when target is null
        await supabase
          .from('daily_commitments')
          .delete()
          .eq('user_id', user.id)
          .eq('commitment_date', new Date().toISOString().split('T')[0]);
      } else {
        // Upsert commitment with target value
        await supabase
          .from('daily_commitments')
          .upsert({
            user_id: user.id,
            commitment_date: new Date().toISOString().split('T')[0],
            target_sessions: target,
          });
      }

      setState(prev => ({
        ...prev,
        dailyCommitment: { ...prev.dailyCommitment, target },
      }));
    } catch (error) {
      console.error('Failed to save daily commitment:', error);
    }
  }, []);

  // Transition to completion phase (when timer reaches zero)
  const transitionToComplete = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'complete',
    }));
  }, []);

  // Reset to setup phase
  const resetToSetup = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'setup',
      sessionConfig: null,
      activeSession: null,
    }));
  }, []);

  return {
    state,
    actions: {
      fetchActiveProjects,
      configureSession,    // Step 1: project + duration
      startSession,        // Step 2: willpower → start timer
      completeSession,
      interruptSession,
      setDailyCommitment,
      resetToSetup,
      loadDailyStats,
      transitionToComplete, // Timer completion → show mindset selection
    }
  };
}