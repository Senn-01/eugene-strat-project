/**
 * Hero Metrics Bar Component
 * Story 1.9 - Phase 3
 *
 * Displays weekly aggregate statistics across the top of analytics page
 * Simple stat cards in horizontal layout
 */

'use client'

import type { WeeklyStats } from './types';

interface HeroMetricsBarProps {
  stats: WeeklyStats | null;
  isLoading: boolean;
}

export function HeroMetricsBar({ stats, isLoading }: HeroMetricsBarProps) {
  if (isLoading) {
    return (
      <div className="hero-metrics-bar">
        <div className="hero-metric-card">
          <div className="hero-metric-loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="hero-metrics-bar">
        <div className="hero-metric-card">
          <div className="hero-metric-empty">No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-metrics-bar">
      {/* Sessions Count */}
      <div className="hero-metric-card">
        <div className="hero-metric-label">Sessions</div>
        <div className="hero-metric-value">{stats.sessions_count}</div>
        <div className="hero-metric-period">Last 7 days</div>
      </div>

      {/* Total Hours */}
      <div className="hero-metric-card">
        <div className="hero-metric-label">Hours</div>
        <div className="hero-metric-value">{stats.total_hours}</div>
        <div className="hero-metric-period">Deep work time</div>
      </div>

      {/* Total XP */}
      <div className="hero-metric-card">
        <div className="hero-metric-label">XP</div>
        <div className="hero-metric-value">{stats.total_xp}</div>
        <div className="hero-metric-period">Performance points</div>
      </div>

      {/* Current Streak */}
      <div className="hero-metric-card">
        <div className="hero-metric-label">Streak</div>
        <div className="hero-metric-value">
          {stats.current_streak}
          <span className="hero-metric-unit">days</span>
        </div>
        <div className="hero-metric-period">Current</div>
      </div>
    </div>
  );
}
