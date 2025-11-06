// src/components/deep-focus/TodaysActivityFeed.tsx
'use client'

import { CompletedSession } from './types';
import { SessionCard } from './SessionCard';

interface TodaysActivityFeedProps {
  sessions: CompletedSession[];
  isLoading: boolean;
}

export function TodaysActivityFeed({ sessions, isLoading }: TodaysActivityFeedProps) {
  if (isLoading) {
    return (
      <div className="activity-feed-container">
        <div className="activity-feed-header">TODAY'S SESSIONS</div>
        <div className="activity-feed-empty">
          Loading...
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="activity-feed-container">
        <div className="activity-feed-header">TODAY'S SESSIONS</div>
        <div className="activity-feed-empty">
          No sessions today
        </div>
      </div>
    );
  }

  return (
    <div className="activity-feed-container">
      <div className="activity-feed-header">
        TODAY'S SESSIONS
      </div>
      <div className="activity-feed-list">
        {sessions.map(session => (
          <SessionCard
            key={session.id}
            session={session}
          />
        ))}
      </div>
    </div>
  );
}
