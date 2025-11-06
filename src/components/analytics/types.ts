/**
 * Analytics Dashboard - TypeScript Type Definitions
 * Story 1.9 - Phase 2
 *
 * Interfaces for all analytics data structures returned by RPC functions
 * and used throughout analytics components
 */

// ============================================================================
// RPC Response Types
// ============================================================================

/**
 * Weekly aggregate statistics for hero metrics bar
 * Source: get_weekly_stats RPC
 */
export interface WeeklyStats {
  sessions_count: number;
  total_hours: number;
  total_xp: number;
  current_streak: number;
}

/**
 * Individual session data for recent activity feed
 * Source: get_recent_sessions RPC
 * Reuses SessionCard component from Story 1.8
 */
export interface RecentSession {
  id: string;
  started_at: string; // ISO datetime
  duration: number; // minutes
  session_goal?: string;
  goal_completed?: boolean | null;
  mindset: 'high' | 'medium' | 'low';
  xp_earned: number;
  project_name: string;
}

/**
 * Project time allocation statistics
 * Source: get_project_segments RPC
 */
export interface ProjectSegment {
  project_id: string;
  project_name: string;
  session_count: number;
  total_hours: number;
  avg_duration: number; // minutes
  high_mindset_pct: number; // percentage (0-100)
}

/**
 * Daily volume data point for bar chart
 * Source: get_weekly_volume RPC
 * Returns 14 days of data (even if 0 sessions)
 */
export interface VolumeDataPoint {
  date: string; // YYYY-MM-DD format
  hours: number;
}

/**
 * Daily focus quality data point for line chart
 * Source: get_focus_quality RPC
 * Returns 14 days of mindset distribution
 */
export interface FocusQualityPoint {
  date: string; // YYYY-MM-DD format
  high_count: number;
  medium_count: number;
  low_count: number;
}

/**
 * Personal best statistics
 * Source: get_personal_records RPC
 */
export interface PersonalRecords {
  best_day: {
    sessions: number;
    date: string | null; // YYYY-MM-DD format, null if no sessions
  };
  best_week: {
    xp: number;
    week_start: string | null; // YYYY-MM-DD format, null if no sessions
  };
  longest_session: {
    duration: number; // minutes
    date: string | null; // ISO datetime, null if no sessions
  };
}

// ============================================================================
// State Management Types
// ============================================================================

/**
 * Analytics page state
 * Managed by useAnalyticsState hook
 */
export interface AnalyticsState {
  weeklyStats: WeeklyStats | null;
  recentSessions: RecentSession[] | null;
  projectSegments: ProjectSegment[] | null;
  weeklyVolume: VolumeDataPoint[] | null;
  focusQuality: FocusQualityPoint[] | null;
  personalRecords: PersonalRecords | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Analytics state actions
 * Returned by useAnalyticsState hook
 */
export interface AnalyticsActions {
  loadAllData: () => Promise<void>;
  loadWeeklyStats: () => Promise<void>;
  loadRecentSessions: () => Promise<void>;
  loadProjectSegments: () => Promise<void>;
  loadWeeklyVolume: () => Promise<void>;
  loadFocusQuality: () => Promise<void>;
  loadPersonalRecords: () => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * Complete analytics state hook return type
 */
export interface UseAnalyticsState {
  state: AnalyticsState;
  actions: AnalyticsActions;
}
