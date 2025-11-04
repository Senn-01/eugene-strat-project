// src/components/deep-focus/types.ts
export type WillpowerLevel = 'high' | 'medium' | 'low';
export type MindsetLevel = 'high' | 'medium' | 'low';
export type SessionDuration = 60 | 90 | 120;
export type SessionPhase = 'setup' | 'willpower-select' | 'active' | 'complete';

export interface SessionConfig {
  projectId: string;
  projectName: string;
  duration: SessionDuration;
}

export interface ActiveSession {
  id: string;
  projectId: string;
  projectName: string;
  duration: SessionDuration;
  willpower: WillpowerLevel;
  difficultyQuote: string;
  startedAt: Date;
  remainingMs: number;
  sessionGoal?: string; // Story 1.8: Optional session goal
}

export interface DailyCommitment {
  target: number | null;
  current: number;
}

/** Session goal with completion status */
export interface SessionGoal {
  goal: string;
  completed: boolean | null; // true/false/null (partial)
  notes?: string;
}

/** Daily intention for capacity planning */
export interface DailyIntention {
  id: string;
  target_hours: number;
  priority_project_id?: string;
  priority_project_name?: string;
  date: string; // ISO date string
}

/** Completed session with all tracked data */
export interface CompletedSession {
  id: string;
  project_id: string;
  project_name: string;
  duration: SessionDuration;
  started_at: string; // ISO datetime string
  willpower: WillpowerLevel;
  mindset: MindsetLevel;
  session_goal?: string;
  goal_completed?: boolean | null;
  session_notes?: string;
  xp_earned: number;
}

/** Comprehensive daily statistics from RPC */
export interface DailyStats {
  sessions_completed: number;
  total_hours: number;
  daily_intention: DailyIntention | null;
  today_sessions: CompletedSession[];
}

/** Goal completion selection */
export type GoalCompletionStatus = 'yes' | 'partial' | 'no';

/** Extended DeepFocus state */
export interface DeepFocusState {
  phase: SessionPhase;
  availableProjects: Project[];
  sessionConfig: SessionConfig | null;
  activeSession: ActiveSession | null;
  dailyCommitment: DailyCommitment; // Keep for backward compatibility
  isLoading: boolean;
  error: string | null;

  // New fields for Story 1.8
  sessionGoal: string; // Input for current session
  dailyStats: DailyStats | null; // Replaces dailyCommitment usage
  showDailyIntentionModal: boolean; // First-visit modal control
}

// Import Project type from existing types
import { Project } from '@/lib/types/project.types';