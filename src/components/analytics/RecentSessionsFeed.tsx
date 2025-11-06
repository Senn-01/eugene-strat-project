/**
 * Recent Sessions Feed Component
 * Story 1.9 - Phase 3
 *
 * Displays last 7 completed sessions using SessionCard component
 * Adapts analytics data format to SessionCard's expected format
 */

'use client'

import { SessionCard } from '../deep-focus/SessionCard';
import type { CompletedSession } from '../deep-focus/types';
import type { RecentSession } from './types';

interface RecentSessionsFeedProps {
  sessions: RecentSession[] | null;
  isLoading: boolean;
}

/**
 * Convert RecentSession (analytics format) to CompletedSession (SessionCard format)
 */
function adaptSessionData(session: RecentSession): CompletedSession {
  return {
    id: session.id,
    project_id: '', // Not needed for display
    project_name: session.project_name,
    duration: session.duration as any, // Analytics returns actual minutes, SessionCard expects SessionDuration type
    started_at: session.started_at,
    willpower: 'medium', // Not available in analytics data, use default
    mindset: session.mindset,
    session_goal: session.session_goal,
    goal_completed: session.goal_completed,
    session_notes: undefined, // Not included in analytics query
    xp_earned: session.xp_earned,
  };
}

export function RecentSessionsFeed({ sessions, isLoading }: RecentSessionsFeedProps) {
  if (isLoading) {
    return (
      <div className="recent-sessions-feed">
        <div className="rsf-header">Recent Sessions</div>
        <div className="rsf-loading">Loading sessions...</div>
      </div>
    );
  }

  if (!sessions || sessions.length === 0) {
    return (
      <div className="recent-sessions-feed">
        <div className="rsf-header">Recent Sessions</div>
        <div className="rsf-empty">
          No sessions yet. Complete a session in DeepFocus to see it here.
        </div>
      </div>
    );
  }

  return (
    <div className="recent-sessions-feed">
      <div className="rsf-header">
        <span>Recent Sessions</span>
        <span className="rsf-count">({sessions.length})</span>
      </div>

      <div className="rsf-list">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={adaptSessionData(session)}
          />
        ))}
      </div>
    </div>
  );
}
