/**
 * Analytics Dashboard - State Management Hook
 * Story 1.9 - Phase 2
 *
 * Custom hook for managing analytics data fetching and state
 * Follows pattern from Story 1.8 useDeepFocusState.ts
 */

'use client'

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type {
  AnalyticsState,
  AnalyticsActions,
  UseAnalyticsState,
  WeeklyStats,
  RecentSession,
  ProjectSegment,
  VolumeDataPoint,
  FocusQualityPoint,
  PersonalRecords,
} from './types';

// ============================================================================
// Initial State
// ============================================================================

const initialState: AnalyticsState = {
  weeklyStats: null,
  recentSessions: null,
  projectSegments: null,
  weeklyVolume: null,
  focusQuality: null,
  personalRecords: null,
  isLoading: false,
  error: null,
};

// ============================================================================
// Hook Implementation
// ============================================================================

export function useAnalyticsState(): UseAnalyticsState {
  const [state, setState] = useState<AnalyticsState>(initialState);
  const supabase = createClient();

  /**
   * Load weekly aggregate statistics
   * RPC: get_weekly_stats
   */
  const loadWeeklyStats = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.rpc('get_weekly_stats', {
        user_id_param: session.user.id
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        weeklyStats: data as WeeklyStats,
        isLoading: false,
      }));
    } catch (error: any) {
      console.error('Error loading weekly stats:', error);
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to load weekly stats',
        isLoading: false,
      }));
    }
  }, [supabase]);

  /**
   * Load recent sessions (last 7)
   * RPC: get_recent_sessions
   */
  const loadRecentSessions = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.rpc('get_recent_sessions', {
        user_id_param: session.user.id
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        recentSessions: (data || []) as RecentSession[],
        isLoading: false,
      }));
    } catch (error: any) {
      console.error('Error loading recent sessions:', error);
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to load recent sessions',
        isLoading: false,
      }));
    }
  }, [supabase]);

  /**
   * Load project time segments
   * RPC: get_project_segments
   */
  const loadProjectSegments = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.rpc('get_project_segments', {
        user_id_param: session.user.id
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        projectSegments: (data || []) as ProjectSegment[],
        isLoading: false,
      }));
    } catch (error: any) {
      console.error('Error loading project segments:', error);
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to load project segments',
        isLoading: false,
      }));
    }
  }, [supabase]);

  /**
   * Load weekly volume chart data (14 days)
   * RPC: get_weekly_volume
   */
  const loadWeeklyVolume = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.rpc('get_weekly_volume', {
        user_id_param: session.user.id
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        weeklyVolume: (data || []) as VolumeDataPoint[],
        isLoading: false,
      }));
    } catch (error: any) {
      console.error('Error loading weekly volume:', error);
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to load weekly volume',
        isLoading: false,
      }));
    }
  }, [supabase]);

  /**
   * Load focus quality trends (14 days)
   * RPC: get_focus_quality
   */
  const loadFocusQuality = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.rpc('get_focus_quality', {
        user_id_param: session.user.id
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        focusQuality: (data || []) as FocusQualityPoint[],
        isLoading: false,
      }));
    } catch (error: any) {
      console.error('Error loading focus quality:', error);
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to load focus quality',
        isLoading: false,
      }));
    }
  }, [supabase]);

  /**
   * Load personal records
   * RPC: get_personal_records
   */
  const loadPersonalRecords = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.rpc('get_personal_records', {
        user_id_param: session.user.id
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        personalRecords: data as PersonalRecords,
        isLoading: false,
      }));
    } catch (error: any) {
      console.error('Error loading personal records:', error);
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to load personal records',
        isLoading: false,
      }));
    }
  }, [supabase]);

  /**
   * Load all analytics data in parallel
   * Called on page mount for initial data fetch
   */
  const loadAllData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      console.log('Loading analytics for user:', session.user.id);

      // Execute all RPC calls in parallel
      const [
        weeklyStatsRes,
        recentSessionsRes,
        projectSegmentsRes,
        weeklyVolumeRes,
        focusQualityRes,
        personalRecordsRes,
      ] = await Promise.all([
        supabase.rpc('get_weekly_stats', { user_id_param: session.user.id }),
        supabase.rpc('get_recent_sessions', { user_id_param: session.user.id }),
        supabase.rpc('get_project_segments', { user_id_param: session.user.id }),
        supabase.rpc('get_weekly_volume', { user_id_param: session.user.id }),
        supabase.rpc('get_focus_quality', { user_id_param: session.user.id }),
        supabase.rpc('get_personal_records', { user_id_param: session.user.id }),
      ]);

      // Check for errors with detailed logging
      if (weeklyStatsRes.error) {
        console.error('get_weekly_stats error:', weeklyStatsRes.error);
        throw new Error(`get_weekly_stats: ${weeklyStatsRes.error.message || JSON.stringify(weeklyStatsRes.error)}`);
      }
      if (recentSessionsRes.error) {
        console.error('get_recent_sessions error:', recentSessionsRes.error);
        throw new Error(`get_recent_sessions: ${recentSessionsRes.error.message || JSON.stringify(recentSessionsRes.error)}`);
      }
      if (projectSegmentsRes.error) {
        console.error('get_project_segments error:', projectSegmentsRes.error);
        throw new Error(`get_project_segments: ${projectSegmentsRes.error.message || JSON.stringify(projectSegmentsRes.error)}`);
      }
      if (weeklyVolumeRes.error) {
        console.error('get_weekly_volume error:', weeklyVolumeRes.error);
        throw new Error(`get_weekly_volume: ${weeklyVolumeRes.error.message || JSON.stringify(weeklyVolumeRes.error)}`);
      }
      if (focusQualityRes.error) {
        console.error('get_focus_quality error:', focusQualityRes.error);
        throw new Error(`get_focus_quality: ${focusQualityRes.error.message || JSON.stringify(focusQualityRes.error)}`);
      }
      if (personalRecordsRes.error) {
        console.error('get_personal_records error:', personalRecordsRes.error);
        throw new Error(`get_personal_records: ${personalRecordsRes.error.message || JSON.stringify(personalRecordsRes.error)}`);
      }

      console.log('Analytics data loaded successfully');

      // Update state with all data
      setState(prev => ({
        ...prev,
        weeklyStats: weeklyStatsRes.data as WeeklyStats,
        recentSessions: (recentSessionsRes.data || []) as RecentSession[],
        projectSegments: (projectSegmentsRes.data || []) as ProjectSegment[],
        weeklyVolume: (weeklyVolumeRes.data || []) as VolumeDataPoint[],
        focusQuality: (focusQualityRes.data || []) as FocusQualityPoint[],
        personalRecords: personalRecordsRes.data as PersonalRecords,
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      console.error('Error loading analytics data:', error);
      console.error('Error type:', typeof error);
      console.error('Error keys:', Object.keys(error || {}));

      // Try to extract a meaningful error message
      const errorMessage =
        error?.message ||
        error?.hint ||
        error?.details ||
        (typeof error === 'string' ? error : null) ||
        (error && Object.keys(error).length > 0 ? JSON.stringify(error) : null) ||
        'Failed to load analytics data. Please check console for details.';

      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, [supabase]);

  /**
   * Refresh all data (alias for loadAllData)
   * Used after completing a session to update analytics
   */
  const refresh = useCallback(async () => {
    await loadAllData();
  }, [loadAllData]);

  // ============================================================================
  // Return hook interface
  // ============================================================================

  return {
    state,
    actions: {
      loadAllData,
      loadWeeklyStats,
      loadRecentSessions,
      loadProjectSegments,
      loadWeeklyVolume,
      loadFocusQuality,
      loadPersonalRecords,
      refresh,
    },
  };
}
