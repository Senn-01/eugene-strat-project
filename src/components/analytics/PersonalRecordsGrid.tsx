/**
 * Personal Records Grid Component
 * Story 1.9 - Phase 3
 *
 * Displays personal best statistics in a 2x2 grid
 * Shows best day, best week, and longest session
 */

'use client'

import type { PersonalRecords } from './types';

interface PersonalRecordsGridProps {
  records: PersonalRecords | null;
  isLoading: boolean;
}

/**
 * Format date for display (e.g., "Nov 4" or "Nov 4, 2025" depending on year)
 */
function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'N/A';

  try {
    const date = new Date(dateStr);
    const now = new Date();
    const sameYear = date.getFullYear() === now.getFullYear();

    if (sameYear) {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  } catch {
    return 'Invalid date';
  }
}

/**
 * Format duration in minutes to hours/minutes display
 */
function formatDuration(minutes: number): string {
  if (minutes === 0) return '0 min';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} min`;
  } else if (mins === 0) {
    return `${hours} hr`;
  } else {
    return `${hours}h ${mins}m`;
  }
}

export function PersonalRecordsGrid({ records, isLoading }: PersonalRecordsGridProps) {
  if (isLoading) {
    return (
      <div className="personal-records-grid">
        <div className="pr-card">
          <div className="pr-loading">Loading records...</div>
        </div>
      </div>
    );
  }

  if (!records) {
    return (
      <div className="personal-records-grid">
        <div className="pr-card">
          <div className="pr-empty">No records yet</div>
        </div>
      </div>
    );
  }

  const { best_day, best_week, longest_session } = records;

  return (
    <div className="personal-records-grid">
      <div className="pr-section-header">Personal Records</div>

      {/* 2x2 Grid of Records */}
      <div className="pr-grid">
        {/* Best Day - Most sessions */}
        <div className="pr-card">
          <div className="pr-label">Best Day</div>
          <div className="pr-value">{best_day.sessions}</div>
          <div className="pr-unit">sessions</div>
          {best_day.date && (
            <div className="pr-date">{formatDate(best_day.date)}</div>
          )}
        </div>

        {/* Best Week - Highest XP */}
        <div className="pr-card">
          <div className="pr-label">Best Week</div>
          <div className="pr-value">{best_week.xp}</div>
          <div className="pr-unit">XP</div>
          {best_week.week_start && (
            <div className="pr-date">Week of {formatDate(best_week.week_start)}</div>
          )}
        </div>

        {/* Longest Session */}
        <div className="pr-card">
          <div className="pr-label">Longest Session</div>
          <div className="pr-value-alt">{formatDuration(longest_session.duration)}</div>
          {longest_session.date && (
            <div className="pr-date">{formatDate(longest_session.date)}</div>
          )}
        </div>

        {/* Placeholder for future record (e.g., Best Streak) */}
        <div className="pr-card pr-card-placeholder">
          <div className="pr-label">More Coming Soon</div>
          <div className="pr-placeholder-text">Additional records</div>
        </div>
      </div>
    </div>
  );
}
