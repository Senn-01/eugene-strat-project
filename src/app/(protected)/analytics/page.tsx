/**
 * Analytics Dashboard Page
 * Story 1.9 - Phase 4
 *
 * Displays comprehensive performance analytics with Strava-style visualizations
 * Layout: Hero bar (full width) + 60/40 grid (main content / sidebar)
 */

'use client'

import { useEffect } from 'react';
import { Metadata } from 'next';
import { useAnalyticsState } from '@/components/analytics/useAnalyticsState';
import { HeroMetricsBar } from '@/components/analytics/HeroMetricsBar';
import { RecentSessionsFeed } from '@/components/analytics/RecentSessionsFeed';
import { ProjectSegmentsTable } from '@/components/analytics/ProjectSegmentsTable';
import { WeeklyVolumeChart } from '@/components/analytics/WeeklyVolumeChart';
import { FocusQualityChart } from '@/components/analytics/FocusQualityChart';
import { PersonalRecordsGrid } from '@/components/analytics/PersonalRecordsGrid';

export default function AnalyticsPage() {
  const { state, actions } = useAnalyticsState();

  // Load all analytics data on mount (empty dependency array = run once)
  useEffect(() => {
    actions.loadAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="analytics-page">
      {/* Hero Metrics Bar - Full Width */}
      <div className="analytics-hero-section">
        <HeroMetricsBar
          stats={state.weeklyStats}
          isLoading={state.isLoading}
        />
      </div>

      {/* Error Display */}
      {state.error && (
        <div className="analytics-error">
          <div className="analytics-error-icon">⚠️</div>
          <div className="analytics-error-message">{state.error}</div>
          <button
            className="analytics-error-retry"
            onClick={() => actions.refresh()}
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Content - 60/40 Grid */}
      <div className="analytics-content">
        {/* Left Column (60%) - Main Analytics */}
        <div className="analytics-main">
          {/* Recent Sessions Feed */}
          <section className="analytics-section">
            <RecentSessionsFeed
              sessions={state.recentSessions}
              isLoading={state.isLoading}
            />
          </section>

          {/* Weekly Volume Chart */}
          <section className="analytics-section">
            <WeeklyVolumeChart
              data={state.weeklyVolume}
              isLoading={state.isLoading}
            />
          </section>

          {/* Focus Quality Chart - Full Width */}
          <section className="analytics-section analytics-section-wide">
            <FocusQualityChart
              data={state.focusQuality}
              isLoading={state.isLoading}
            />
          </section>
        </div>

        {/* Right Column (40%) - Sidebar */}
        <div className="analytics-sidebar">
          {/* Project Segments Table */}
          <section className="analytics-section">
            <ProjectSegmentsTable
              segments={state.projectSegments}
              isLoading={state.isLoading}
            />
          </section>

          {/* Personal Records Grid */}
          <section className="analytics-section">
            <PersonalRecordsGrid
              records={state.personalRecords}
              isLoading={state.isLoading}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
