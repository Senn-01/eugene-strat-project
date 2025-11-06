---
rationale: De-risked implementation plan for Story 1.9 Analytics Dashboard - removes high-complexity visualizations (heatmap, scatter plot) and focuses on core performance metrics using proven patterns and Recharts library
version: 1.0.0
changelog:
  - 1.0.0: Initial de-risked plan with 6 core components, verified patterns, Context7 research
links:
  - docs/stories/1.9.analytics-strava-dashboard.md: Original full-scope analytics vision
  - docs/ai-context/HANDOFF.md: Story 1.8 completion context and patterns
  - docs/architecture.md: Neo-brutalist design system reference
---

# Story 1.9 Analytics Dashboard - De-Risked Implementation Plan

## Executive Summary

**Status**: Ready for implementation (Story 1.8 complete ✅)

**Scope**: Simplified from 9 components → **6 core components** (removed high-risk visualizations)

**Risk Level**: MEDIUM (down from MEDIUM-HIGH)

**Estimated Time**: 16-20 hours (down from 24-30 hours)

**Key De-Risking Decisions**:
- ❌ **REMOVED**: Time-of-Day Heatmap (complex grid calculations)
- ❌ **REMOVED**: Strategic Alignment Scatter (variable dot sizes, complex)
- ❌ **REMOVED**: Achievements (optional, can be added post-validation)
- ✅ **KEPT**: 6 core components using simple bar/line charts
- ✅ **SIMPLIFIED**: Recharts with minimal customization (avoid neo-brutalist styling conflicts)
- ✅ **VERIFIED**: Uses existing patterns from Story 1.8 (deep-focus/page.tsx)

---

## Problem Statement

### Current State
- Story 1.8 completed: Enriched session data with goals, completion tracking, daily intentions
- Analytics page is placeholder (`src/app/(protected)/analytics/page.tsx`)
- Users have no visibility into work patterns, trends, or strategic alignment

### Desired State
Users can:
1. See weekly performance at a glance (hero metrics)
2. Review recent work sessions (activity feed)
3. Understand time allocation per project (segments)
4. Track daily capacity patterns (volume chart)
5. Monitor focus quality trends (line chart)
6. Celebrate personal records (best performances)

### Success Criteria
1. ✅ Page loads in <200ms with initial data
2. ✅ Charts render smoothly without layout shift
3. ✅ All data updates after completing sessions
4. ✅ Neo-brutalist design consistent (borders, shadows, approved colors)
5. ✅ Mobile responsive (1024px breakpoint)
6. ✅ Accessibility: WCAG AA, keyboard navigation, ARIA labels

---

## Technical Approach

### Architecture Decisions

**1. Charting Library: Recharts (Context7 verified)**
- **Rationale**:
  - Trust Score 8.2, 89 code snippets available
  - Native React components (no wrapper complexity)
  - SVG-based (customizable via CSS)
  - ResponsiveContainer built-in
- **Trade-off**: Default styling is rounded/soft → will apply minimal neo-brutalist overrides
- **Decision**: Use Recharts with **80% default styling** to avoid customization rabbit holes

**2. Data Fetching Strategy**
- **Pattern**: Server-side RPC calls (matches Story 1.8 `useDeepFocusState.ts`)
- **Initial Load**: Fetch hero metrics + recent sessions on mount
- **Progressive**: Load charts after initial render (reduce blocking time)
- **Caching**: Client-side state management via custom hook `useAnalyticsState.ts`

**3. Component Architecture**
```
src/components/analytics/
├── HeroMetricsBar.tsx          # Weekly stats strip (simple)
├── RecentSessionsFeed.tsx      # Activity cards (reuses SessionCard)
├── ProjectSegmentsTable.tsx    # Time per project (HTML table, sortable)
├── WeeklyVolumeChart.tsx       # Bar chart via Recharts (14 days)
├── FocusQualityChart.tsx       # Line chart via Recharts (14 days)
├── PersonalRecordsGrid.tsx     # 2×2 stat cards (simple)
├── types.ts                    # Analytics-specific types
└── useAnalyticsState.ts        # Custom hook for state management
```

**4. Page Layout**
```
┌────────────────────────────────────────────────┐
│ Hero Metrics Bar (Full Width)                 │
├────────────────────────────────────────────────┤
│ LEFT (60%)              │ RIGHT (40%)          │
│ ┌────────────────────┐  │ ┌──────────────────┐│
│ │ Recent Sessions    │  │ │ Project Segments ││
│ │ Feed (7 days)      │  │ │ (sorted table)   ││
│ │                    │  │ │                  ││
│ └────────────────────┘  │ └──────────────────┘│
│ ┌────────────────────┐  │ ┌──────────────────┐│
│ │ Weekly Volume      │  │ │ Personal Records ││
│ │ (Bar Chart)        │  │ │ (2×2 Grid)       ││
│ └────────────────────┘  │ └──────────────────┘│
│ ┌──────────────────────────────────────────┐  │
│ │ Focus Quality Trends (Line Chart)        │  │
│ └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

**5. Color System (Analytics Theme)**
- **Primary**: Dark Purple `#451969` (authority, depth)
- **Accent**: Pink `#E5B6E5` (energy, highlights)
- **Background**: Cream `#E5EED0` (existing from Story 1.8)
- **Structure**: Black `#000000` borders, white `#FFFFFF` content
- **Charts**: Use approved palette only, no Recharts defaults

---

## Database Queries & RPC Functions

### Query 1: Weekly Hero Metrics
**Purpose**: Top bar stats (sessions, hours, XP, streak)

**SQL**:
```sql
-- Create RPC: get_weekly_stats(user_id_param UUID)
CREATE OR REPLACE FUNCTION get_weekly_stats(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  -- Verify user authorization
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  SELECT json_build_object(
    'sessions_count', COUNT(*),
    'total_hours', ROUND(CAST(SUM(duration) AS NUMERIC) / 60.0, 1),
    'total_xp', COALESCE(SUM(xp_earned), 0),
    'current_streak', 0  -- Placeholder: streak calculation deferred to Phase 2
  )
  INTO result
  FROM sessions
  WHERE user_id = user_id_param
    AND is_completed = true
    AND started_at >= NOW() - INTERVAL '7 days';

  RETURN result;
END;
$$;
```

**Frontend Call**:
```typescript
const { data, error } = await supabase.rpc('get_weekly_stats', {
  user_id_param: session.user.id
});
```

---

### Query 2: Recent Sessions Feed
**Purpose**: Last 7 sessions with project names

**SQL**:
```sql
-- Create RPC: get_recent_sessions(user_id_param UUID)
CREATE OR REPLACE FUNCTION get_recent_sessions(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  SELECT json_agg(
    json_build_object(
      'id', s.id,
      'started_at', s.started_at,
      'duration', s.duration,
      'session_goal', s.session_goal,
      'goal_completed', s.goal_completed,
      'mindset', s.mindset,
      'xp_earned', s.xp_earned,
      'project_name', p.name
    )
    ORDER BY s.started_at DESC
  )
  INTO result
  FROM sessions s
  JOIN projects p ON p.id = s.project_id
  WHERE s.user_id = user_id_param
    AND s.is_completed = true
  ORDER BY s.started_at DESC
  LIMIT 7;

  RETURN COALESCE(result, '[]'::json);
END;
$$;
```

---

### Query 3: Project Segments
**Purpose**: Time investment per project (table data)

**SQL**:
```sql
-- Create RPC: get_project_segments(user_id_param UUID)
CREATE OR REPLACE FUNCTION get_project_segments(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  SELECT json_agg(
    json_build_object(
      'project_id', p.id,
      'project_name', p.name,
      'session_count', COALESCE(COUNT(s.id), 0),
      'total_hours', ROUND(CAST(COALESCE(SUM(s.duration), 0) AS NUMERIC) / 60.0, 1),
      'avg_duration', ROUND(CAST(AVG(s.duration) AS NUMERIC), 0),
      'high_mindset_pct', ROUND(
        CAST(COUNT(*) FILTER (WHERE s.mindset = 'high') AS NUMERIC) * 100.0 /
        NULLIF(COUNT(*), 0),
        0
      )
    )
    ORDER BY total_hours DESC
  )
  INTO result
  FROM projects p
  LEFT JOIN sessions s ON s.project_id = p.id
    AND s.is_completed = true
    AND s.user_id = user_id_param
  WHERE p.user_id = user_id_param
  GROUP BY p.id, p.name
  HAVING COUNT(s.id) > 0;

  RETURN COALESCE(result, '[]'::json);
END;
$$;
```

---

### Query 4: Weekly Volume Data (14 days)
**Purpose**: Bar chart data (hours per day)

**SQL**:
```sql
-- Create RPC: get_weekly_volume(user_id_param UUID)
CREATE OR REPLACE FUNCTION get_weekly_volume(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  -- Generate all dates in last 14 days, then left join sessions
  WITH date_series AS (
    SELECT generate_series(
      CURRENT_DATE - INTERVAL '13 days',
      CURRENT_DATE,
      '1 day'::interval
    )::date AS date
  )
  SELECT json_agg(
    json_build_object(
      'date', ds.date,
      'hours', ROUND(CAST(COALESCE(SUM(s.duration), 0) AS NUMERIC) / 60.0, 1)
    )
    ORDER BY ds.date
  )
  INTO result
  FROM date_series ds
  LEFT JOIN sessions s ON DATE(s.started_at) = ds.date
    AND s.user_id = user_id_param
    AND s.is_completed = true
  GROUP BY ds.date;

  RETURN COALESCE(result, '[]'::json);
END;
$$;
```

---

### Query 5: Focus Quality Trends (14 days)
**Purpose**: Line chart data (mindset distribution over time)

**SQL**:
```sql
-- Create RPC: get_focus_quality(user_id_param UUID)
CREATE OR REPLACE FUNCTION get_focus_quality(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  WITH date_series AS (
    SELECT generate_series(
      CURRENT_DATE - INTERVAL '13 days',
      CURRENT_DATE,
      '1 day'::interval
    )::date AS date
  )
  SELECT json_agg(
    json_build_object(
      'date', ds.date,
      'high_count', COALESCE(COUNT(*) FILTER (WHERE s.mindset = 'high'), 0),
      'medium_count', COALESCE(COUNT(*) FILTER (WHERE s.mindset = 'medium'), 0),
      'low_count', COALESCE(COUNT(*) FILTER (WHERE s.mindset = 'low'), 0)
    )
    ORDER BY ds.date
  )
  INTO result
  FROM date_series ds
  LEFT JOIN sessions s ON DATE(s.started_at) = ds.date
    AND s.user_id = user_id_param
    AND s.is_completed = true
  GROUP BY ds.date;

  RETURN COALESCE(result, '[]'::json);
END;
$$;
```

---

### Query 6: Personal Records
**Purpose**: Best day, best week, longest session

**SQL**:
```sql
-- Create RPC: get_personal_records(user_id_param UUID)
CREATE OR REPLACE FUNCTION get_personal_records(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  best_day_sessions INT;
  best_day_date DATE;
  best_week_xp INT;
  best_week_start DATE;
  longest_duration INT;
  longest_date TIMESTAMP;
  result JSON;
BEGIN
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  -- Best Day (most sessions)
  SELECT COUNT(*), DATE(started_at)
  INTO best_day_sessions, best_day_date
  FROM sessions
  WHERE user_id = user_id_param AND is_completed = true
  GROUP BY DATE(started_at)
  ORDER BY COUNT(*) DESC
  LIMIT 1;

  -- Best Week (highest XP)
  SELECT SUM(xp_earned), DATE_TRUNC('week', started_at)::date
  INTO best_week_xp, best_week_start
  FROM sessions
  WHERE user_id = user_id_param AND is_completed = true
  GROUP BY DATE_TRUNC('week', started_at)
  ORDER BY SUM(xp_earned) DESC
  LIMIT 1;

  -- Longest Session
  SELECT duration, started_at
  INTO longest_duration, longest_date
  FROM sessions
  WHERE user_id = user_id_param AND is_completed = true
  ORDER BY duration DESC
  LIMIT 1;

  SELECT json_build_object(
    'best_day', json_build_object(
      'sessions', COALESCE(best_day_sessions, 0),
      'date', best_day_date
    ),
    'best_week', json_build_object(
      'xp', COALESCE(best_week_xp, 0),
      'week_start', best_week_start
    ),
    'longest_session', json_build_object(
      'duration', COALESCE(longest_duration, 0),
      'date', longest_date
    )
  )
  INTO result;

  RETURN result;
END;
$$;
```

---

## TypeScript Types

**File**: `src/components/analytics/types.ts`

```typescript
// Analytics-specific types
export interface WeeklyStats {
  sessions_count: number;
  total_hours: number;
  total_xp: number;
  current_streak: number;
}

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

export interface ProjectSegment {
  project_id: string;
  project_name: string;
  session_count: number;
  total_hours: number;
  avg_duration: number;
  high_mindset_pct: number;
}

export interface VolumeDataPoint {
  date: string; // YYYY-MM-DD
  hours: number;
}

export interface FocusQualityPoint {
  date: string; // YYYY-MM-DD
  high_count: number;
  medium_count: number;
  low_count: number;
}

export interface PersonalRecords {
  best_day: {
    sessions: number;
    date: string; // YYYY-MM-DD
  };
  best_week: {
    xp: number;
    week_start: string; // YYYY-MM-DD
  };
  longest_session: {
    duration: number; // minutes
    date: string; // ISO datetime
  };
}

export interface AnalyticsState {
  weeklyStats: WeeklyStats | null;
  recentSessions: RecentSession[];
  projectSegments: ProjectSegment[];
  volumeData: VolumeDataPoint[];
  focusQuality: FocusQualityPoint[];
  personalRecords: PersonalRecords | null;
  isLoading: boolean;
  error: string | null;
}
```

---

## Implementation Guide

### Phase 1: Database Setup (2-3 hours)

**Step 1.1**: Create migration file
```bash
# File: supabase/migrations/20251106_analytics_rpcs.sql
```

**Step 1.2**: Add all 6 RPC functions (see SQL above)
- `get_weekly_stats`
- `get_recent_sessions`
- `get_project_segments`
- `get_weekly_volume`
- `get_focus_quality`
- `get_personal_records`

**Step 1.3**: Apply migration
```bash
# Via Supabase Dashboard SQL Editor:
# 1. Copy entire migration file
# 2. Paste into SQL Editor
# 3. Run
# 4. Verify success messages
```

**Step 1.4**: Test RPCs manually
```sql
-- In Supabase SQL Editor
SELECT get_weekly_stats('YOUR_USER_ID');
SELECT get_recent_sessions('YOUR_USER_ID');
-- ... test all 6 functions
```

**Verification**:
- ✅ All 6 functions return JSON without errors
- ✅ Empty results return `[]` or valid empty objects
- ✅ RLS authorization checks work (try with wrong user_id)

---

### Phase 2: State Management (2-3 hours)

**Step 2.1**: Create types file
```bash
# File: src/components/analytics/types.ts
# Content: See TypeScript Types section above
```

**Step 2.2**: Create custom hook `useAnalyticsState.ts`

**Pattern**: Follow `useDeepFocusState.ts` structure

```typescript
// src/components/analytics/useAnalyticsState.ts
'use client'

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { AnalyticsState, WeeklyStats, RecentSession /* ... */ } from './types';

const initialState: AnalyticsState = {
  weeklyStats: null,
  recentSessions: [],
  projectSegments: [],
  volumeData: [],
  focusQuality: [],
  personalRecords: null,
  isLoading: false,
  error: null,
};

export function useAnalyticsState() {
  const [state, setState] = useState<AnalyticsState>(initialState);
  const supabase = createClient();

  // Load weekly stats
  const loadWeeklyStats = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

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
      setState(prev => ({
        ...prev,
        error: error.message,
        isLoading: false,
      }));
    }
  }, [supabase]);

  // Load recent sessions
  const loadRecentSessions = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.rpc('get_recent_sessions', {
        user_id_param: session.user.id
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        recentSessions: data as RecentSession[],
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message,
      }));
    }
  }, [supabase]);

  // Load project segments
  const loadProjectSegments = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.rpc('get_project_segments', {
        user_id_param: session.user.id
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        projectSegments: data as ProjectSegment[],
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message,
      }));
    }
  }, [supabase]);

  // Load volume data
  const loadVolumeData = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.rpc('get_weekly_volume', {
        user_id_param: session.user.id
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        volumeData: data as VolumeDataPoint[],
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message,
      }));
    }
  }, [supabase]);

  // Load focus quality
  const loadFocusQuality = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.rpc('get_focus_quality', {
        user_id_param: session.user.id
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        focusQuality: data as FocusQualityPoint[],
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message,
      }));
    }
  }, [supabase]);

  // Load personal records
  const loadPersonalRecords = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.rpc('get_personal_records', {
        user_id_param: session.user.id
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        personalRecords: data as PersonalRecords,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message,
      }));
    }
  }, [supabase]);

  // Load all data
  const loadAllData = useCallback(async () => {
    await Promise.all([
      loadWeeklyStats(),
      loadRecentSessions(),
      loadProjectSegments(),
      loadVolumeData(),
      loadFocusQuality(),
      loadPersonalRecords(),
    ]);
  }, [
    loadWeeklyStats,
    loadRecentSessions,
    loadProjectSegments,
    loadVolumeData,
    loadFocusQuality,
    loadPersonalRecords,
  ]);

  return {
    state,
    actions: {
      loadAllData,
      loadWeeklyStats,
      loadRecentSessions,
      loadProjectSegments,
      loadVolumeData,
      loadFocusQuality,
      loadPersonalRecords,
    },
  };
}
```

**Verification**:
- ✅ TypeScript compiles with zero errors
- ✅ Hook follows existing pattern from `useDeepFocusState.ts`
- ✅ All actions return stable references via `useCallback`

---

### Phase 3: Core Components (6-8 hours)

**Step 3.1**: Install Recharts
```bash
npm install recharts
```

**Step 3.2**: Create HeroMetricsBar component

```typescript
// src/components/analytics/HeroMetricsBar.tsx
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
        <div className="hero-metric">
          <div className="hero-metric-label">Loading...</div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="hero-metrics-bar">
      <div className="hero-metric">
        <div className="hero-metric-value">{stats.sessions_count}</div>
        <div className="hero-metric-label">Sessions</div>
      </div>
      <div className="hero-metric">
        <div className="hero-metric-value">{stats.total_hours}h</div>
        <div className="hero-metric-label">Hours</div>
      </div>
      <div className="hero-metric">
        <div className="hero-metric-value">{stats.total_xp}</div>
        <div className="hero-metric-label">XP Earned</div>
      </div>
      <div className="hero-metric">
        <div className="hero-metric-value">{stats.current_streak}</div>
        <div className="hero-metric-label">Day Streak</div>
      </div>
    </div>
  );
}
```

**Step 3.3**: Create RecentSessionsFeed component

```typescript
// src/components/analytics/RecentSessionsFeed.tsx
'use client'

import type { RecentSession } from './types';
import { SessionCard } from '@/components/deep-focus/SessionCard'; // Reuse from Story 1.8

interface RecentSessionsFeedProps {
  sessions: RecentSession[];
  isLoading: boolean;
}

export function RecentSessionsFeed({ sessions, isLoading }: RecentSessionsFeedProps) {
  if (isLoading) {
    return <div className="sessions-feed">Loading sessions...</div>;
  }

  if (sessions.length === 0) {
    return (
      <div className="sessions-feed-empty">
        <p>No sessions completed yet.</p>
        <p>Start a session to see your activity here.</p>
      </div>
    );
  }

  return (
    <div className="sessions-feed">
      <h2 className="section-title">Recent Sessions</h2>
      <div className="sessions-list">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={{
              id: session.id,
              project_name: session.project_name,
              duration: session.duration,
              started_at: session.started_at,
              mindset: session.mindset,
              session_goal: session.session_goal,
              goal_completed: session.goal_completed,
              xp_earned: session.xp_earned,
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

**Step 3.4**: Create ProjectSegmentsTable component

```typescript
// src/components/analytics/ProjectSegmentsTable.tsx
'use client'

import { useState } from 'react';
import type { ProjectSegment } from './types';

interface ProjectSegmentsTableProps {
  segments: ProjectSegment[];
  isLoading: boolean;
}

type SortKey = 'project_name' | 'session_count' | 'total_hours' | 'high_mindset_pct';

export function ProjectSegmentsTable({ segments, isLoading }: ProjectSegmentsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('total_hours');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  if (isLoading) {
    return <div className="project-segments">Loading segments...</div>;
  }

  if (segments.length === 0) {
    return (
      <div className="project-segments-empty">
        <p>No project data yet.</p>
      </div>
    );
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const sortedSegments = [...segments].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const modifier = sortDirection === 'asc' ? 1 : -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * modifier;
    }
    return (Number(aVal) - Number(bVal)) * modifier;
  });

  return (
    <div className="project-segments">
      <h2 className="section-title">Project Segments</h2>
      <table className="segments-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('project_name')}>Project</th>
            <th onClick={() => handleSort('session_count')}>Sessions</th>
            <th onClick={() => handleSort('total_hours')}>Hours</th>
            <th onClick={() => handleSort('high_mindset_pct')}>Quality %</th>
          </tr>
        </thead>
        <tbody>
          {sortedSegments.map((segment) => (
            <tr key={segment.project_id}>
              <td>{segment.project_name}</td>
              <td>{segment.session_count}</td>
              <td>{segment.total_hours}h</td>
              <td>{segment.high_mindset_pct}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

**Step 3.5**: Create WeeklyVolumeChart component (Recharts)

```typescript
// src/components/analytics/WeeklyVolumeChart.tsx
'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { VolumeDataPoint } from './types';

interface WeeklyVolumeChartProps {
  data: VolumeDataPoint[];
  isLoading: boolean;
}

export function WeeklyVolumeChart({ data, isLoading }: WeeklyVolumeChartProps) {
  if (isLoading) {
    return <div className="volume-chart">Loading chart...</div>;
  }

  if (data.length === 0) {
    return <div className="volume-chart-empty">No data yet</div>;
  }

  // Format date for display (e.g., "Nov 4")
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartData = data.map(d => ({
    date: formatDate(d.date),
    hours: d.hours,
    // Color: dark green if >0, gray if 0
    fill: d.hours > 0 ? '#224718' : '#d4d4d2',
  }));

  return (
    <div className="volume-chart">
      <h2 className="section-title">Weekly Volume (14 days)</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis
            dataKey="date"
            stroke="#000000"
            style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)' }}
          />
          <YAxis
            stroke="#000000"
            label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
            style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '2px solid #000000',
              borderRadius: 0,
              fontFamily: 'var(--font-family-mono)',
            }}
          />
          <Bar dataKey="hours">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

**Step 3.6**: Create FocusQualityChart component (Recharts)

```typescript
// src/components/analytics/FocusQualityChart.tsx
'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { FocusQualityPoint } from './types';

interface FocusQualityChartProps {
  data: FocusQualityPoint[];
  isLoading: boolean;
}

export function FocusQualityChart({ data, isLoading }: FocusQualityChartProps) {
  if (isLoading) {
    return <div className="focus-quality-chart">Loading chart...</div>;
  }

  if (data.length === 0) {
    return <div className="focus-quality-chart-empty">No data yet</div>;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartData = data.map(d => ({
    date: formatDate(d.date),
    'Shaolin Mode': d.high_count,
    'Getting There': d.medium_count,
    'What Zone': d.low_count,
  }));

  return (
    <div className="focus-quality-chart">
      <h2 className="section-title">Focus Quality Trends</h2>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis
            dataKey="date"
            stroke="#000000"
            style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)' }}
          />
          <YAxis
            stroke="#000000"
            label={{ value: 'Sessions', angle: -90, position: 'insideLeft' }}
            style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '2px solid #000000',
              borderRadius: 0,
              fontFamily: 'var(--font-family-mono)',
            }}
          />
          <Legend
            wrapperStyle={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '0.75rem',
            }}
          />
          <Line
            type="monotone"
            dataKey="Shaolin Mode"
            stroke="#224718"
            strokeWidth={2}
            dot={{ fill: '#224718', r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="Getting There"
            stroke="#CFE820"
            strokeWidth={2}
            dot={{ fill: '#CFE820', r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="What Zone"
            stroke="#E5B6E5"
            strokeWidth={2}
            dot={{ fill: '#E5B6E5', r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

**Step 3.7**: Create PersonalRecordsGrid component

```typescript
// src/components/analytics/PersonalRecordsGrid.tsx
'use client'

import type { PersonalRecords } from './types';

interface PersonalRecordsGridProps {
  records: PersonalRecords | null;
  isLoading: boolean;
}

export function PersonalRecordsGrid({ records, isLoading }: PersonalRecordsGridProps) {
  if (isLoading) {
    return <div className="personal-records">Loading records...</div>;
  }

  if (!records) return null;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="personal-records">
      <h2 className="section-title">Personal Records</h2>
      <div className="records-grid">
        <div className="record-card">
          <div className="record-label">Best Day</div>
          <div className="record-value">{records.best_day.sessions} sessions</div>
          <div className="record-date">{formatDate(records.best_day.date)}</div>
        </div>
        <div className="record-card">
          <div className="record-label">Best Week</div>
          <div className="record-value">{records.best_week.xp} XP</div>
          <div className="record-date">{formatDate(records.best_week.week_start)}</div>
        </div>
        <div className="record-card">
          <div className="record-label">Longest Session</div>
          <div className="record-value">{records.longest_session.duration} min</div>
          <div className="record-date">{formatDate(records.longest_session.date)}</div>
        </div>
      </div>
    </div>
  );
}
```

**Verification**:
- ✅ All 6 components created
- ✅ TypeScript compiles with zero errors
- ✅ Recharts imported successfully
- ✅ Components follow existing patterns (SessionCard reused)

---

### Phase 4: Page Integration (2-3 hours)

**Step 4.1**: Update analytics page

```typescript
// src/app/(protected)/analytics/page.tsx
'use client'

import { useEffect } from 'react';
import { useAnalyticsState } from '@/components/analytics/useAnalyticsState';
import { HeroMetricsBar } from '@/components/analytics/HeroMetricsBar';
import { RecentSessionsFeed } from '@/components/analytics/RecentSessionsFeed';
import { ProjectSegmentsTable } from '@/components/analytics/ProjectSegmentsTable';
import { WeeklyVolumeChart } from '@/components/analytics/WeeklyVolumeChart';
import { FocusQualityChart } from '@/components/analytics/FocusQualityChart';
import { PersonalRecordsGrid } from '@/components/analytics/PersonalRecordsGrid';

export default function AnalyticsPage() {
  const { state, actions } = useAnalyticsState();

  // Load all data on mount
  useEffect(() => {
    actions.loadAllData();
  }, []); // Empty dependency - actions are stable via useCallback

  return (
    <div className="analytics-page" data-page-theme="analytics">
      {/* Error Display */}
      {state.error && (
        <div className="error-banner">
          {state.error}
        </div>
      )}

      {/* Hero Metrics Bar - Full Width */}
      <HeroMetricsBar
        stats={state.weeklyStats}
        isLoading={state.isLoading}
      />

      <div className="analytics-container">
        <div className="analytics-main">

          {/* LEFT COLUMN (60%) */}
          <div className="analytics-left">
            <RecentSessionsFeed
              sessions={state.recentSessions}
              isLoading={state.isLoading}
            />

            <WeeklyVolumeChart
              data={state.volumeData}
              isLoading={state.isLoading}
            />

            <FocusQualityChart
              data={state.focusQuality}
              isLoading={state.isLoading}
            />
          </div>

          {/* RIGHT COLUMN (40%) */}
          <div className="analytics-right">
            <ProjectSegmentsTable
              segments={state.projectSegments}
              isLoading={state.isLoading}
            />

            <PersonalRecordsGrid
              records={state.personalRecords}
              isLoading={state.isLoading}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
```

**Verification**:
- ✅ Page renders without errors
- ✅ All components load progressively
- ✅ Layout matches 60/40 split design
- ✅ Data flows from hook to components

---

### Phase 5: CSS Styling (3-4 hours)

**Step 5.1**: Create analytics CSS file

```bash
# File: src/styles/features/analytics/index.css
```

```css
/* Analytics Page Layout */
.analytics-page {
  min-height: 100vh;
  background-color: var(--color-grey-crayon);
  padding-top: calc(var(--header-height) + var(--spacing-lg));
}

.analytics-page[data-page-theme="analytics"] {
  --page-accent: #451969; /* Dark purple */
  --page-accent-light: #E5B6E5; /* Pink */
}

/* Hero Metrics Bar */
.hero-metrics-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--page-accent);
  border: 4px solid var(--color-black);
  box-shadow: var(--shadow-base);
  padding: var(--spacing-md);
  margin: 0 var(--spacing-lg) var(--spacing-lg);
  gap: var(--spacing-md);
}

.hero-metric {
  text-align: center;
  color: var(--color-white);
}

.hero-metric-value {
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-black);
  font-family: var(--font-family-mono);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.hero-metric-label {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-normal);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  opacity: 0.9;
}

/* Analytics Container */
.analytics-container {
  padding: 0 var(--spacing-lg) var(--spacing-xl);
}

.analytics-main {
  display: grid;
  grid-template-columns: 3fr 2fr; /* 60/40 split */
  gap: var(--spacing-lg);
}

.analytics-left,
.analytics-right {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* Section Titles */
.section-title {
  font-size: var(--font-size-subheading);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-mono);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--spacing-md);
  color: var(--color-black);
}

/* Sessions Feed */
.sessions-feed {
  background-color: var(--color-white);
  border: 3px solid var(--color-black);
  box-shadow: var(--shadow-base);
  padding: var(--spacing-md);
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.sessions-feed-empty {
  text-align: center;
  padding: var(--spacing-xl);
  font-family: var(--font-family-mono);
  color: var(--color-grey-unselected);
}

/* Project Segments Table */
.project-segments {
  background-color: var(--color-white);
  border: 3px solid var(--color-black);
  box-shadow: var(--shadow-base);
  padding: var(--spacing-md);
}

.segments-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-family-mono);
}

.segments-table th {
  text-align: left;
  padding: var(--spacing-sm);
  background-color: var(--page-accent);
  color: var(--color-white);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  font-size: var(--font-size-caption);
  letter-spacing: var(--letter-spacing-wide);
  border: 2px solid var(--color-black);
  cursor: pointer;
  transition: background-color 150ms ease-out;
}

.segments-table th:hover {
  background-color: var(--page-accent-light);
  color: var(--color-black);
}

.segments-table td {
  padding: var(--spacing-sm);
  border: 2px solid var(--color-black);
  font-size: var(--font-size-body);
}

.segments-table tbody tr:hover {
  background-color: var(--color-grey-crayon);
}

/* Charts */
.volume-chart,
.focus-quality-chart {
  background-color: var(--color-white);
  border: 3px solid var(--color-black);
  box-shadow: var(--shadow-base);
  padding: var(--spacing-md);
}

/* Personal Records Grid */
.personal-records {
  background-color: var(--color-white);
  border: 3px solid var(--color-black);
  box-shadow: var(--shadow-base);
  padding: var(--spacing-md);
}

.records-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sm);
}

.record-card {
  background-color: var(--page-accent-light);
  border: 3px solid var(--color-black);
  padding: var(--spacing-md);
  text-align: center;
  box-shadow: var(--shadow-active);
}

.record-label {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: 0.5rem;
  color: var(--color-black);
}

.record-value {
  font-size: var(--font-size-heading);
  font-weight: var(--font-weight-black);
  font-family: var(--font-family-mono);
  color: var(--page-accent);
  line-height: 1.2;
  margin-bottom: 0.25rem;
}

.record-date {
  font-size: var(--font-size-caption);
  font-family: var(--font-family-mono);
  color: var(--color-black);
  opacity: 0.7;
}

/* Error Banner */
.error-banner {
  margin: 0 var(--spacing-lg) var(--spacing-md);
  padding: var(--spacing-md);
  background-color: #ffebee;
  border: 3px solid #d32f2f;
  box-shadow: var(--shadow-base);
  font-family: var(--font-family-mono);
  color: #d32f2f;
  text-transform: uppercase;
  font-weight: var(--font-weight-bold);
}

/* Mobile Responsive (1024px breakpoint) */
@media (max-width: 1024px) {
  .analytics-main {
    grid-template-columns: 1fr; /* Stack on mobile */
    gap: var(--spacing-md);
  }

  .hero-metrics-bar {
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
  }

  .hero-metric-value {
    font-size: 2rem;
  }

  .segments-table {
    font-size: 0.75rem;
  }

  .records-grid {
    grid-template-columns: 1fr; /* Stack records on mobile */
  }
}
```

**Step 5.2**: Import analytics CSS in globals.css

```css
/* Add to src/styles/globals.css after line 82 */
@import "./features/analytics/index.css" layer(components);
```

**Verification**:
- ✅ Neo-brutalist design consistent (2-4px borders, hard shadows)
- ✅ Approved color palette (dark purple #451969, pink #E5B6E5)
- ✅ Mobile responsive at 1024px breakpoint
- ✅ Typography follows monospace standards

---

### Phase 6: Testing & Polish (2-3 hours)

**Step 6.1**: Manual testing checklist

**Data Loading**:
- [ ] Page loads without errors
- [ ] Loading states appear correctly
- [ ] Empty states show for new users
- [ ] Error messages display if RPC fails

**Hero Metrics Bar**:
- [ ] Weekly stats display correctly
- [ ] Numbers format properly (hours with 'h', XP as integer)
- [ ] Streak shows 0 (placeholder until implemented)

**Recent Sessions Feed**:
- [ ] Last 7 sessions display in reverse chronological order
- [ ] SessionCard component renders with goals, mindset, XP
- [ ] Empty state shows if no sessions

**Project Segments Table**:
- [ ] All projects with sessions appear
- [ ] Sorting works on all columns (click headers)
- [ ] Quality % calculates correctly (high mindset sessions / total)
- [ ] Hover effects work

**Weekly Volume Chart**:
- [ ] 14 days of data display
- [ ] Bars colored correctly (green if >0, gray if 0)
- [ ] X-axis shows dates (e.g., "Nov 4")
- [ ] Y-axis shows hours
- [ ] Tooltip displays on hover

**Focus Quality Chart**:
- [ ] 14 days of data display
- [ ] Three lines render (Shaolin Mode, Getting There, What Zone)
- [ ] Colors match approved palette (dark green, lime, pink)
- [ ] Legend displays correctly
- [ ] Tooltip shows all three values

**Personal Records**:
- [ ] Best Day shows correct session count and date
- [ ] Best Week shows correct XP and week start date
- [ ] Longest Session shows correct duration and date
- [ ] Cards have pink background with dark purple text

**Responsive Design**:
- [ ] Desktop (>1024px): 60/40 layout works
- [ ] Mobile (<1024px): Components stack vertically
- [ ] Hero metrics stack on mobile
- [ ] Tables remain readable on small screens

**Accessibility**:
- [ ] All charts have proper aria-labels
- [ ] Keyboard navigation works (tab through interactive elements)
- [ ] Focus indicators visible on all interactive elements
- [ ] Screen reader can access data (test with table fallbacks if needed)

**Step 6.2**: Performance testing

```bash
# Build production bundle
npm run build

# Check bundle size for analytics page
# Should be <500KB including Recharts

# Test page load time in browser Network tab
# Target: <200ms for initial render
```

**Step 6.3**: TypeScript compilation check

```bash
./node_modules/.bin/tsc --noEmit
# Should report: 0 errors
```

**Verification**:
- ✅ All manual tests pass
- ✅ Page loads in <200ms
- ✅ Charts render smoothly
- ✅ Zero TypeScript errors
- ✅ Mobile responsive works

---

## Potential Challenges & Solutions

### Challenge 1: Recharts Styling Conflicts
**Problem**: Recharts defaults (rounded, soft colors) clash with neo-brutalist design

**Solution**:
- Use 80% default Recharts styling (don't fight the library)
- Apply minimal overrides: `stroke="#000000"`, monospace font, custom tooltip styles
- Avoid trying to make charts perfectly neo-brutalist (accept compromise)

---

### Challenge 2: Empty State Handling
**Problem**: New users have no session data, charts look broken

**Solution**:
- All components check for empty data: `if (data.length === 0) return <EmptyState />`
- Empty states use friendly copy: "No sessions yet. Start a session to see your activity here."
- Personal Records return null values gracefully

---

### Challenge 3: Date Formatting Consistency
**Problem**: Database returns ISO strings, need consistent formatting

**Solution**:
- Create utility functions in `types.ts`:
  ```typescript
  export const formatShortDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  export const formatFullDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  ```
- Use consistently across all components

---

### Challenge 4: Performance with Large Datasets
**Problem**: Users with hundreds of sessions may experience slow queries

**Solution**:
- All queries already limited to 7-14 day windows
- `LIMIT 7` on recent sessions feed
- PostgreSQL indexes on `user_id`, `started_at`, `is_completed` (verify exist)
- Consider pagination if >100 sessions per query in future

---

### Challenge 5: Streak Calculation Complexity
**Problem**: Longest streak requires iterating through all sessions to find consecutive days

**Solution**:
- **Phase 1**: Return `current_streak: 0` as placeholder
- **Phase 2** (future): Implement streak calculation in separate RPC with window functions:
  ```sql
  WITH daily_sessions AS (
    SELECT DISTINCT DATE(started_at) as session_date
    FROM sessions
    WHERE user_id = user_id_param AND is_completed = true
    ORDER BY session_date DESC
  ),
  streaks AS (
    SELECT
      session_date,
      session_date - (ROW_NUMBER() OVER (ORDER BY session_date))::int AS streak_id
    FROM daily_sessions
  )
  SELECT MAX(COUNT(*)) as longest_streak
  FROM streaks
  GROUP BY streak_id;
  ```

---

## Testing Strategy

### Unit Testing (Optional - Can defer to post-launch)
```typescript
// src/components/analytics/__tests__/useAnalyticsState.test.ts
// Test hook behavior, mock Supabase calls
// Verify state updates correctly
```

### Integration Testing
**Manual E2E Test Flow**:
1. Log in as user with existing sessions
2. Navigate to `/analytics`
3. Verify all 6 components render
4. Complete a new session in DeepFocus
5. Navigate back to Analytics
6. Verify new session appears in feed
7. Verify weekly stats updated

### Performance Testing
- Use Chrome DevTools Lighthouse
- Target scores:
  - Performance: >85
  - Accessibility: >90
  - Best Practices: >90

---

## Success Criteria

### Functional Requirements
1. ✅ Page loads and displays all 6 components
2. ✅ Data fetches from 6 RPC functions without errors
3. ✅ Charts render using Recharts library
4. ✅ Empty states display for new users
5. ✅ Recent sessions feed updates after session completion
6. ✅ Project segments table sortable on all columns
7. ✅ Personal records calculate correctly

### Design Requirements
1. ✅ Neo-brutalist design: 2-4px borders, hard shadows, no rounded corners
2. ✅ Approved color palette: Dark purple #451969, pink #E5B6E5, black, white
3. ✅ Typography: Monospace font, proper sizing, letter spacing
4. ✅ Layout: 60/40 split on desktop, stacked on mobile
5. ✅ Consistent with existing pages (TacticalMap, DeepFocus)

### Performance Requirements
1. ✅ Initial page load: <200ms
2. ✅ Chart rendering: <100ms each
3. ✅ Smooth scrolling with all components visible
4. ✅ Bundle size: <500KB for analytics page

### Accessibility Requirements
1. ✅ WCAG AA color contrast
2. ✅ Keyboard navigation works
3. ✅ Focus indicators visible
4. ✅ ARIA labels on all charts
5. ✅ Screen reader compatible

---

## Implementation Timeline

### Phase 1: Database Setup (2-3 hours)
- Create migration file with 6 RPC functions
- Apply migration via Supabase Dashboard
- Test all RPCs manually
- **Checkpoint**: All queries return valid JSON

### Phase 2: State Management (2-3 hours)
- Create `types.ts` with all interfaces
- Create `useAnalyticsState.ts` custom hook
- Implement 6 data loading functions
- **Checkpoint**: TypeScript compiles, hook pattern correct

### Phase 3: Core Components (6-8 hours)
- Install Recharts
- Create 6 components (Hero, Feed, Segments, Volume, Quality, Records)
- Apply minimal styling
- **Checkpoint**: All components render in isolation

### Phase 4: Page Integration (2-3 hours)
- Update `analytics/page.tsx`
- Wire up state management
- Implement 60/40 layout
- **Checkpoint**: Page renders with all components

### Phase 5: CSS Styling (3-4 hours)
- Create `analytics/index.css`
- Implement neo-brutalist design
- Add responsive breakpoints
- **Checkpoint**: Design matches Story 1.8 quality

### Phase 6: Testing & Polish (2-3 hours)
- Manual testing checklist
- Performance testing
- Accessibility audit
- Bug fixes
- **Checkpoint**: All success criteria met

### Total Estimated Time: 16-20 hours

---

## Post-Implementation: Future Enhancements

**Deferred to Story 2.x** (post-validation):
1. Time-of-Day Heatmap (complex visualization)
2. Strategic Alignment Scatter plot (variable dot sizes)
3. Achievements badge system
4. Streak calculation implementation
5. Export data as CSV
6. Custom date range filters
7. Week/month comparison view
8. Goal completion analytics
9. Weekly email summaries (Strava-style)

---

## Risk Mitigation Summary

| Original Risk | Mitigation Applied |
|---------------|-------------------|
| Heatmap complexity (HIGH) | **REMOVED** from scope |
| Scatter plot variable sizing (HIGH) | **REMOVED** from scope |
| Charting library styling (HIGH) | Simplified to 80% defaults, minimal overrides |
| Multiple complex queries (MEDIUM) | Verified RLS patterns, limited time windows |
| Performance targets (MEDIUM) | Progressive loading, limited data ranges |
| Empty state handling (MEDIUM) | Explicit checks in all components |

**Result**: Risk reduced from **MEDIUM-HIGH** to **MEDIUM**

---

## Conclusion

This de-risked implementation plan removes high-complexity visualizations (heatmap, scatter plot, achievements) and focuses on 6 core components using proven patterns and simple Recharts charts. The approach prioritizes:

1. **Speed to delivery**: 16-20 hours (vs 24-30 for full scope)
2. **Proven patterns**: Reuses Story 1.8 component structure
3. **Minimal customization**: 80% default Recharts styling
4. **Progressive enhancement**: Core analytics first, advanced features later
5. **Verified solutions**: Context7 research, existing codebase patterns

The simplified scope delivers the essential "Strava for Project Management" vision—users can see their work patterns, track performance, and identify trends—without the technical risk of complex custom visualizations.

---

**Ready to implement**: All prerequisites met, patterns verified, risks mitigated.
