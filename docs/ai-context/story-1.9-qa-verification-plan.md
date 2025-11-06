---
rationale: Comprehensive QA verification plan for Story 1.9 Analytics Dashboard implementation - ensures correctness, completeness, performance, accessibility, and production readiness
version: 1.0.0
changelog:
  - 1.0.0: Initial QA plan with pre-implementation checks, phase gates, test cases, regression suite
links:
  - docs/ai-context/story-1.9-implementation-plan-simplified.md: Implementation plan being verified
  - docs/ai-context/HANDOFF.md: Story 1.8 patterns and baseline
---

# Story 1.9 Analytics Dashboard - QA Verification Plan

## QA Strategy Overview

**Verification Approach**: Phase-gated with mandatory checkpoints

**Quality Gates**: Each phase must pass verification before proceeding to next phase

**Test Levels**:
1. **Unit Level**: Component-level behavior (manual verification)
2. **Integration Level**: Data flow from database → components → UI
3. **System Level**: Full page functionality in production-like environment
4. **Regression Level**: Ensure Story 1.8 functionality unchanged

**Success Criteria**: All test cases pass + zero critical/high severity bugs + performance targets met

---

## Pre-Implementation Verification (1 hour)

### Checklist 1: Prerequisites Validation

**Verify Story 1.8 is fully functional:**
- [ ] Navigate to `/deep-focus` - page loads without errors
- [ ] Complete a full session with goal → verify saves to database
- [ ] Check database schema via Supabase Dashboard:
  - [ ] `sessions` table has columns: `session_goal`, `goal_completed`, `session_notes`
  - [ ] `daily_intentions` table exists
  - [ ] `get_daily_stats` RPC function exists
- [ ] Verify Story 1.8 data exists (at least 3-5 completed sessions)
- [ ] Check localStorage for any session persistence

**Result**: PASS ✅ / FAIL ❌ (if FAIL, resolve Story 1.8 issues first)

---

### Checklist 2: Implementation Plan Review

**Verify plan completeness:**
- [ ] All 6 RPC functions have complete SQL (no TODOs or placeholders)
- [ ] All TypeScript types defined with correct properties
- [ ] Component code examples compile (check for syntax errors)
- [ ] CSS follows existing patterns from `deep-focus/index.css`
- [ ] Phase dependencies are clear (Phase N cannot start until Phase N-1 complete)

**Risk Assessment:**
- [ ] No HIGH risk items remain unmitigated
- [ ] All MEDIUM risks have documented solutions
- [ ] Recharts library version compatible with Next.js 15 + React 19

**Result**: PASS ✅ / FAIL ❌

---

### Checklist 3: Development Environment

**Verify tooling ready:**
- [ ] `npm install` completes successfully
- [ ] `npm run dev` starts dev server on port 3000
- [ ] TypeScript compilation works: `./node_modules/.bin/tsc --noEmit`
- [ ] Supabase connection working (test with existing queries)
- [ ] Browser DevTools available (Chrome/Firefox recommended)
- [ ] Network throttling available for performance testing

**Result**: PASS ✅ / FAIL ❌

---

## Phase 1: Database Setup Verification (30 minutes)

### Test Case DB-1: Migration File Creation

**Steps**:
1. Verify file exists: `supabase/migrations/20251106_analytics_rpcs.sql`
2. File contains exactly 6 RPC function definitions
3. Each function has:
   - `CREATE OR REPLACE FUNCTION`
   - `SECURITY DEFINER` clause
   - `auth.uid()` authorization check
   - `RETURNS JSON`
4. No syntax errors (check for missing semicolons, unmatched parentheses)

**Expected**: All 6 functions present with correct structure
**Result**: PASS ✅ / FAIL ❌

---

### Test Case DB-2: Migration Application

**Steps**:
1. Open Supabase Dashboard → SQL Editor
2. Copy entire migration file content
3. Paste into SQL Editor
4. Click "Run"
5. Observe output messages

**Expected**:
- No ERROR messages
- 6 SUCCESS messages (one per function creation)
- Each function listed in Database → Functions section

**Result**: PASS ✅ / FAIL ❌

**If FAIL**: Document error message, check for:
- Missing database tables (`sessions`, `projects`, `daily_intentions`)
- RLS policy conflicts
- Syntax errors in SQL

---

### Test Case DB-3: RPC Function Testing (Manual Query)

**For each RPC function, execute in SQL Editor:**

```sql
-- Replace YOUR_USER_ID with actual user ID from auth.users
SELECT get_weekly_stats('YOUR_USER_ID');
SELECT get_recent_sessions('YOUR_USER_ID');
SELECT get_project_segments('YOUR_USER_ID');
SELECT get_weekly_volume('YOUR_USER_ID');
SELECT get_focus_quality('YOUR_USER_ID');
SELECT get_personal_records('YOUR_USER_ID');
```

**Expected for each function**:
- Returns valid JSON (not NULL, not error)
- JSON structure matches TypeScript interface
- Empty data returns `[]` or `{}` (not NULL)
- Authorization works (try with wrong user_id → should fail)

**Verification Checklist**:
- [ ] `get_weekly_stats`: Returns object with `sessions_count`, `total_hours`, `total_xp`, `current_streak`
- [ ] `get_recent_sessions`: Returns array of session objects (max 7)
- [ ] `get_project_segments`: Returns array of project objects with aggregated data
- [ ] `get_weekly_volume`: Returns array of 14 objects (one per day, including days with 0 hours)
- [ ] `get_focus_quality`: Returns array of 14 objects with high/medium/low counts
- [ ] `get_personal_records`: Returns object with `best_day`, `best_week`, `longest_session`

**Result**: PASS ✅ / FAIL ❌ (must pass all 6)

---

### Test Case DB-4: Data Accuracy Spot Check

**Manually verify one query is accurate:**
1. Choose a project you know you worked on
2. Count actual sessions in Supabase dashboard (Database → sessions table → filter by project_id)
3. Run `SELECT get_project_segments('YOUR_USER_ID');`
4. Verify `session_count` matches manual count
5. Verify `total_hours` ≈ sum of durations / 60

**Expected**: Manual count matches RPC result (±1 for rounding)
**Result**: PASS ✅ / FAIL ❌

---

**PHASE 1 GATE**: All Test Cases DB-1 through DB-4 must PASS before proceeding to Phase 2

---

## Phase 2: State Management Verification (30 minutes)

### Test Case SM-1: Types File Creation

**Steps**:
1. Verify file exists: `src/components/analytics/types.ts`
2. Contains all 7 interfaces:
   - `WeeklyStats`
   - `RecentSession`
   - `ProjectSegment`
   - `VolumeDataPoint`
   - `FocusQualityPoint`
   - `PersonalRecords`
   - `AnalyticsState`
3. Run TypeScript compiler: `./node_modules/.bin/tsc --noEmit`

**Expected**: Zero compilation errors
**Result**: PASS ✅ / FAIL ❌

---

### Test Case SM-2: Custom Hook Creation

**Steps**:
1. Verify file exists: `src/components/analytics/useAnalyticsState.ts`
2. Contains `useAnalyticsState` function
3. Returns object with `state` and `actions`
4. All 6 load functions use `useCallback`
5. Run TypeScript compiler

**Expected**:
- Zero compilation errors
- Hook structure matches `useDeepFocusState.ts` pattern
- All functions wrapped in `useCallback` (prevents re-renders)

**Result**: PASS ✅ / FAIL ❌

---

### Test Case SM-3: Hook Integration Test (Temporary Page)

**Create temporary test page**:

```typescript
// src/app/(protected)/analytics-test/page.tsx
'use client'
import { useEffect } from 'react';
import { useAnalyticsState } from '@/components/analytics/useAnalyticsState';

export default function AnalyticsTestPage() {
  const { state, actions } = useAnalyticsState();

  useEffect(() => {
    actions.loadWeeklyStats();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Hook Test</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
```

**Steps**:
1. Navigate to `/analytics-test`
2. Open browser console
3. Observe state updates
4. Check for errors in console

**Expected**:
- Page loads without errors
- `isLoading: true` appears briefly
- `weeklyStats` populates with data
- No console errors (red messages)
- No network errors (check Network tab)

**Result**: PASS ✅ / FAIL ❌

**Cleanup**: Delete `analytics-test` directory after verification

---

**PHASE 2 GATE**: All Test Cases SM-1 through SM-3 must PASS before proceeding to Phase 3

---

## Phase 3: Component Verification (2 hours)

### Test Case CO-1: HeroMetricsBar Component

**Steps**:
1. Verify file exists: `src/components/analytics/HeroMetricsBar.tsx`
2. Component accepts `stats` and `isLoading` props
3. Renders 4 metrics: Sessions, Hours, XP, Streak
4. Run TypeScript compiler

**Visual Test** (create temporary page):
```typescript
<HeroMetricsBar
  stats={{
    sessions_count: 12,
    total_hours: 18.5,
    total_xp: 1850,
    current_streak: 5
  }}
  isLoading={false}
/>
```

**Expected Visual**:
- Dark purple background (#451969)
- White text
- 4 metrics displayed horizontally
- Large bold numbers, small uppercase labels
- 4px black border, hard shadow

**Edge Cases**:
- [ ] `isLoading={true}` → shows "Loading..." message
- [ ] `stats={null}` → renders nothing (no crash)

**Result**: PASS ✅ / FAIL ❌

---

### Test Case CO-2: RecentSessionsFeed Component

**Steps**:
1. Verify file exists: `src/components/analytics/RecentSessionsFeed.tsx`
2. Imports `SessionCard` from `@/components/deep-focus/SessionCard`
3. Maps over sessions array

**Visual Test** (with mock data):
```typescript
<RecentSessionsFeed
  sessions={[
    {
      id: '1',
      started_at: '2025-11-06T10:00:00Z',
      duration: 90,
      session_goal: 'Test goal',
      goal_completed: true,
      mindset: 'high',
      xp_earned: 150,
      project_name: 'Test Project'
    }
  ]}
  isLoading={false}
/>
```

**Expected Visual**:
- "Recent Sessions" title
- One SessionCard displayed
- SessionCard shows: time, project name, duration, goal status, XP

**Edge Cases**:
- [ ] `sessions={[]}` (empty array) → shows "No sessions completed yet" message
- [ ] `isLoading={true}` → shows "Loading sessions..." message
- [ ] 7 sessions → all 7 render without overlap

**Result**: PASS ✅ / FAIL ❌

---

### Test Case CO-3: ProjectSegmentsTable Component

**Steps**:
1. Verify file exists: `src/components/analytics/ProjectSegmentsTable.tsx`
2. Uses HTML `<table>` element (not Recharts)
3. Implements sorting on column headers

**Visual Test** (with mock data):
```typescript
<ProjectSegmentsTable
  segments={[
    {
      project_id: '1',
      project_name: 'Project A',
      session_count: 5,
      total_hours: 7.5,
      avg_duration: 90,
      high_mindset_pct: 80
    },
    {
      project_id: '2',
      project_name: 'Project B',
      session_count: 3,
      total_hours: 4.5,
      avg_duration: 90,
      high_mindset_pct: 67
    }
  ]}
  isLoading={false}
/>
```

**Expected Visual**:
- Table with 4 columns: Project, Sessions, Hours, Quality %
- Header row: dark purple background, white text
- Data rows: black borders, hover effect
- Clicking header sorts data

**Functional Tests**:
- [ ] Click "Project" header → sorts alphabetically (A→Z, then Z→A)
- [ ] Click "Sessions" header → sorts numerically (high→low, then low→high)
- [ ] Click "Hours" header → sorts numerically
- [ ] Click "Quality %" header → sorts numerically

**Edge Cases**:
- [ ] `segments={[]}` → shows "No project data yet" message
- [ ] Single segment → renders table with one row

**Result**: PASS ✅ / FAIL ❌

---

### Test Case CO-4: WeeklyVolumeChart Component (Recharts)

**Steps**:
1. Verify file exists: `src/components/analytics/WeeklyVolumeChart.tsx`
2. Imports from `recharts` package
3. Uses `BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`, `ResponsiveContainer`

**Visual Test** (with mock data):
```typescript
<WeeklyVolumeChart
  data={[
    { date: '2025-11-01', hours: 2.5 },
    { date: '2025-11-02', hours: 0 },
    { date: '2025-11-03', hours: 4.0 },
    { date: '2025-11-04', hours: 3.5 }
  ]}
  isLoading={false}
/>
```

**Expected Visual**:
- Bar chart with 4 bars
- X-axis shows dates (formatted as "Nov 1", "Nov 2", etc.)
- Y-axis shows hours (0-5 range)
- Bars with hours > 0: dark green (#224718)
- Bars with hours = 0: gray (#d4d4d2)
- Hover shows tooltip with exact value

**Functional Tests**:
- [ ] Chart responsive (resizes with window)
- [ ] Tooltip appears on hover
- [ ] Tooltip displays: date and hours
- [ ] All 14 days render (even with 0 hours)

**Edge Cases**:
- [ ] `data={[]}` → shows "No data yet" message
- [ ] All days 0 hours → gray bars render

**Result**: PASS ✅ / FAIL ❌

---

### Test Case CO-5: FocusQualityChart Component (Recharts)

**Steps**:
1. Verify file exists: `src/components/analytics/FocusQualityChart.tsx`
2. Uses `LineChart`, `Line`, `XAxis`, `YAxis`, `Tooltip`, `Legend`
3. Three lines: Shaolin Mode, Getting There, What Zone

**Visual Test** (with mock data):
```typescript
<FocusQualityChart
  data={[
    { date: '2025-11-01', high_count: 2, medium_count: 1, low_count: 0 },
    { date: '2025-11-02', high_count: 1, medium_count: 2, low_count: 1 },
    { date: '2025-11-03', high_count: 3, medium_count: 0, low_count: 0 }
  ]}
  isLoading={false}
/>
```

**Expected Visual**:
- Line chart with 3 colored lines
- Shaolin Mode: dark green (#224718)
- Getting There: lime (#CFE820)
- What Zone: pink (#E5B6E5)
- Legend shows all three labels
- Dots on data points (r=3)

**Functional Tests**:
- [ ] Chart responsive
- [ ] Hover shows tooltip with all 3 values
- [ ] Legend clickable to toggle lines on/off
- [ ] Lines connect data points smoothly

**Edge Cases**:
- [ ] All counts 0 → flat lines at y=0
- [ ] One line with data, others 0 → only one line visible

**Result**: PASS ✅ / FAIL ❌

---

### Test Case CO-6: PersonalRecordsGrid Component

**Steps**:
1. Verify file exists: `src/components/analytics/PersonalRecordsGrid.tsx`
2. 2×2 grid or 3 cards layout
3. Displays best day, best week, longest session

**Visual Test** (with mock data):
```typescript
<PersonalRecordsGrid
  records={{
    best_day: { sessions: 5, date: '2025-11-04' },
    best_week: { xp: 1850, week_start: '2025-11-01' },
    longest_session: { duration: 120, date: '2025-11-03T10:00:00Z' }
  }}
  isLoading={false}
/>
```

**Expected Visual**:
- 3 cards (or 2×2 grid with 3 filled)
- Each card: pink background (#E5B6E5), 3px black border
- Label (small uppercase), Value (large bold), Date (small)
- Best Day: "5 sessions"
- Best Week: "1850 XP"
- Longest Session: "120 min"

**Edge Cases**:
- [ ] `records={null}` → renders nothing
- [ ] All values 0 → shows "0 sessions", "0 XP", "0 min"

**Result**: PASS ✅ / FAIL ❌

---

**PHASE 3 GATE**: All Test Cases CO-1 through CO-6 must PASS before proceeding to Phase 4

---

## Phase 4: Page Integration Verification (45 minutes)

### Test Case PI-1: Page File Update

**Steps**:
1. Open `src/app/(protected)/analytics/page.tsx`
2. Verify imports all 6 components
3. Imports `useAnalyticsState` hook
4. Calls `actions.loadAllData()` in `useEffect`
5. Run TypeScript compiler

**Expected**: Zero compilation errors
**Result**: PASS ✅ / FAIL ❌

---

### Test Case PI-2: Page Layout Structure

**Steps**:
1. Start dev server: `npm run dev`
2. Navigate to `/analytics`
3. Open browser DevTools → Elements tab
4. Inspect DOM structure

**Expected DOM hierarchy**:
```
.analytics-page
  HeroMetricsBar (full width)
  .analytics-container
    .analytics-main
      .analytics-left (60%)
        RecentSessionsFeed
        WeeklyVolumeChart
        FocusQualityChart
      .analytics-right (40%)
        ProjectSegmentsTable
        PersonalRecordsGrid
```

**Visual Verification**:
- [ ] Hero bar spans full width
- [ ] Left column wider than right (60/40 ratio)
- [ ] Components don't overlap
- [ ] Spacing consistent between components

**Result**: PASS ✅ / FAIL ❌

---

### Test Case PI-3: Data Flow (Initial Load)

**Steps**:
1. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
2. Navigate to `/analytics`
3. Open DevTools → Network tab
4. Observe network requests

**Expected**:
- Multiple requests to Supabase (one per RPC function)
- All requests return 200 status
- Response bodies contain JSON data
- Loading states appear briefly, then data renders
- No console errors

**Verification Checklist**:
- [ ] HeroMetricsBar shows numbers (not "Loading...")
- [ ] RecentSessionsFeed shows sessions (or empty state)
- [ ] ProjectSegmentsTable shows projects
- [ ] WeeklyVolumeChart renders bars
- [ ] FocusQualityChart renders lines
- [ ] PersonalRecordsGrid shows records

**Result**: PASS ✅ / FAIL ❌

---

### Test Case PI-4: Error Handling

**Steps**:
1. Temporarily break Supabase connection (e.g., wrong API key in `.env.local`)
2. Navigate to `/analytics`
3. Observe error display

**Expected**:
- Error banner appears at top of page
- Error message displayed (not cryptic stack trace)
- Page doesn't crash (components show loading or empty states)
- Console shows error details (for debugging)

**Restore Supabase connection after test**

**Result**: PASS ✅ / FAIL ❌

---

**PHASE 4 GATE**: All Test Cases PI-1 through PI-4 must PASS before proceeding to Phase 5

---

## Phase 5: CSS Styling Verification (1 hour)

### Test Case CSS-1: Stylesheet Creation

**Steps**:
1. Verify file exists: `src/styles/features/analytics/index.css`
2. Contains all component styles:
   - `.hero-metrics-bar`
   - `.sessions-feed`
   - `.project-segments`, `.segments-table`
   - `.volume-chart`, `.focus-quality-chart`
   - `.personal-records`, `.records-grid`
3. Import added to `src/styles/globals.css`

**Expected**: File exists with complete styles
**Result**: PASS ✅ / FAIL ❌

---

### Test Case CSS-2: Neo-Brutalist Design Compliance

**Visual Inspection Checklist**:

Navigate to `/analytics` and verify:

**Borders**:
- [ ] Hero bar: 4px black border
- [ ] All white cards/sections: 3px black border
- [ ] Table cells: 2px black border
- [ ] Record cards: 3px black border

**Shadows**:
- [ ] Hero bar: 4px hard shadow (no blur)
- [ ] All cards: 4px hard shadow (no blur)
- [ ] Record cards: 2px hard shadow (no blur)
- [ ] NO soft shadows anywhere

**Colors** (approved palette only):
- [ ] Hero bar background: Dark purple (#451969)
- [ ] Hero bar text: White (#ffffff)
- [ ] Table headers: Dark purple (#451969)
- [ ] Record cards: Pink background (#E5B6E5)
- [ ] Bar chart bars (>0 hours): Dark green (#224718)
- [ ] Bar chart bars (0 hours): Gray (#d4d4d2)
- [ ] Line chart - Shaolin: Dark green (#224718)
- [ ] Line chart - Getting There: Lime (#CFE820)
- [ ] Line chart - What Zone: Pink (#E5B6E5)
- [ ] NO rounded corners anywhere (border-radius: 0)

**Typography**:
- [ ] All text: Monospace font (var(--font-family-mono))
- [ ] Section titles: Uppercase, bold, proper letter-spacing
- [ ] Numbers: Bold, appropriate sizing

**Result**: PASS ✅ / FAIL ❌

**If FAIL**: Document violations with screenshots

---

### Test Case CSS-3: Mobile Responsive (1024px breakpoint)

**Steps**:
1. Navigate to `/analytics` on desktop
2. Open DevTools → Device Toolbar (Cmd+Shift+M)
3. Set viewport to 1024px width
4. Set viewport to 768px width

**Expected at 1024px width**:
- [ ] Hero metrics stack vertically (not horizontal)
- [ ] Main grid becomes single column (60/40 → 100%)
- [ ] Left column components stack on top of right column
- [ ] Tables remain readable (no horizontal scroll if possible)
- [ ] Charts resize responsively (ResponsiveContainer)

**Expected at 768px width**:
- [ ] All components stack vertically
- [ ] Font sizes reduce slightly
- [ ] Record grid: 2×2 → 1 column stack
- [ ] Hero metric values: 3rem → 2rem

**Result**: PASS ✅ / FAIL ❌

---

### Test Case CSS-4: Consistency with Story 1.8

**Visual Comparison**:
1. Open `/deep-focus` in one tab
2. Open `/analytics` in another tab
3. Compare design elements

**Checklist**:
- [ ] Border widths match (2-4px)
- [ ] Shadows match (hard, no blur)
- [ ] Typography consistent (monospace, sizing)
- [ ] Spacing consistent (padding, margins)
- [ ] Color palette cohesive (different accents, same black/white)
- [ ] Overall "feel" consistent (professional, geometric)

**Result**: PASS ✅ / FAIL ❌

---

**PHASE 5 GATE**: All Test Cases CSS-1 through CSS-4 must PASS before proceeding to Phase 6

---

## Phase 6: End-to-End Testing (2 hours)

### Test Case E2E-1: New Session Updates Analytics

**Pre-Condition**: User has at least 2 completed sessions

**Steps**:
1. Navigate to `/analytics`
2. Note current stats:
   - Weekly stats: sessions count, total hours, total XP
   - Recent sessions: count first session timestamp
   - Project segments: note hours for a specific project
3. Navigate to `/deep-focus`
4. Complete a new session:
   - Select same project as noted in step 2
   - Duration: 60 minutes
   - Set a goal
   - Start session
   - Wait for timer (or skip by modifying localStorage)
   - Select mindset: "high"
   - Mark goal as "Yes"
   - Complete session
5. Navigate back to `/analytics`
6. Verify updates

**Expected**:
- [ ] Weekly stats: sessions_count +1
- [ ] Weekly stats: total_hours +1.0
- [ ] Weekly stats: total_xp increased (varies by mindset)
- [ ] Recent sessions: new session appears at top
- [ ] Project segments: selected project hours +1.0
- [ ] Project segments: high_mindset_pct recalculated
- [ ] Weekly volume: today's bar +1 hour
- [ ] Focus quality: today's high_count +1

**Result**: PASS ✅ / FAIL ❌

**If FAIL**: Check:
- RPC functions return latest data (no caching issues)
- `loadAllData()` called on page mount
- Session actually saved to database (check Supabase dashboard)

---

### Test Case E2E-2: Empty State (New User Simulation)

**Pre-Condition**: Create fresh user account OR use SQL to delete all sessions

```sql
-- WARNING: This deletes data, use test account only
DELETE FROM sessions WHERE user_id = 'TEST_USER_ID';
DELETE FROM daily_intentions WHERE user_id = 'TEST_USER_ID';
```

**Steps**:
1. Navigate to `/analytics` with empty data
2. Observe all components

**Expected**:
- [ ] Hero bar: All metrics show 0
- [ ] Recent sessions: "No sessions completed yet" message
- [ ] Project segments: "No project data yet" message
- [ ] Weekly volume: Chart with 14 gray bars (all 0 hours)
- [ ] Focus quality: Chart with flat lines at y=0
- [ ] Personal records: All show 0 or "N/A"

**Result**: PASS ✅ / FAIL ❌

**Restore test data after verification**

---

### Test Case E2E-3: Edge Case - 100+ Sessions

**Pre-Condition**: User with extensive session history (>100 sessions)

**If test data unavailable, create via SQL**:
```sql
-- Insert 100 test sessions (adjust user_id and project_id)
INSERT INTO sessions (user_id, project_id, duration, willpower, mindset, is_completed, started_at, xp_earned)
SELECT
  'TEST_USER_ID',
  'TEST_PROJECT_ID',
  60 + (random() * 60)::int, -- 60-120 minutes
  (ARRAY['high', 'medium', 'low'])[floor(random() * 3 + 1)],
  (ARRAY['high', 'medium', 'low'])[floor(random() * 3 + 1)],
  true,
  NOW() - (random() * 30 || ' days')::interval, -- Last 30 days
  100 + (random() * 100)::int -- 100-200 XP
FROM generate_series(1, 100);
```

**Steps**:
1. Navigate to `/analytics`
2. Monitor page load time (Network tab)
3. Check for performance issues

**Expected**:
- [ ] Page loads in <200ms (initial render)
- [ ] Recent sessions: Shows exactly 7 (not 100)
- [ ] Project segments: Shows all projects (with aggregated data)
- [ ] Charts: Render smoothly without lag
- [ ] No console warnings about performance

**Result**: PASS ✅ / FAIL ❌

**Clean up test data after verification**

---

### Test Case E2E-4: Sorting Persistence

**Steps**:
1. Navigate to `/analytics`
2. Click "Hours" column header in Project Segments table
3. Verify sorted descending (high→low)
4. Click same header again
5. Verify sorted ascending (low→high)
6. Navigate away (`/deep-focus`)
7. Navigate back to `/analytics`

**Expected**:
- [ ] Sorting works correctly (steps 2-5)
- [ ] Sorting resets to default on page refresh (step 7)
  - Default: "total_hours" descending

**Result**: PASS ✅ / FAIL ❌

---

### Test Case E2E-5: Browser Refresh Behavior

**Steps**:
1. Navigate to `/analytics`
2. Wait for all data to load
3. Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
4. Observe loading sequence

**Expected**:
- [ ] Loading states appear briefly
- [ ] All data re-fetches from Supabase
- [ ] No stale data displayed
- [ ] Page state resets (sorting, no client-side caching)

**Result**: PASS ✅ / FAIL ❌

---

## Regression Testing (1 hour)

### Test Case REG-1: Story 1.8 Functionality Unchanged

**Verify Deep Focus page still works**:

**Session Setup**:
- [ ] Navigate to `/deep-focus`
- [ ] Select project from dropdown
- [ ] Select duration (60/90/120)
- [ ] Enter optional session goal
- [ ] Click "Continue to Willpower Check"
- [ ] Select willpower level
- [ ] Click "Start Session"

**Active Session**:
- [ ] Timer displays and counts down
- [ ] Session goal displays (if set)
- [ ] "Interrupt Session" button works

**Session Complete**:
- [ ] Mindset selection buttons work
- [ ] Goal completion buttons appear (if goal set)
- [ ] Optional notes textarea works
- [ ] "Log Session" button saves to database
- [ ] XP displayed as small, discreet metric (text-sm, opacity-60)
- [ ] Professional tone maintained (no "Great job!")

**Sidebar**:
- [ ] Daily intention modal appears once per day
- [ ] Daily capacity meter shows progress
- [ ] Today's activity feed shows completed sessions
- [ ] Activity feed updates after new session

**Result**: PASS ✅ / FAIL ❌

**If FAIL**: Analytics implementation may have broken Story 1.8 - investigate

---

### Test Case REG-2: TacticalMap Functionality Unchanged

**Verify TacticalMap still works**:
- [ ] Navigate to `/tactical-map`
- [ ] Grid renders (10×10, cost/benefit axes)
- [ ] Projects display as dots
- [ ] Click "Add Project" → modal opens
- [ ] Create new project → saves successfully
- [ ] Drag project dot → position updates
- [ ] Right-click project → context menu appears
- [ ] Mark project complete → moves to completed section

**Result**: PASS ✅ / FAIL ❌

---

### Test Case REG-3: Shared Components Unchanged

**Verify SessionCard component** (used by both DeepFocus and Analytics):
- [ ] In DeepFocus sidebar: SessionCard displays correctly
- [ ] In Analytics feed: SessionCard displays correctly
- [ ] Both show: time, duration, goal status, mindset, XP
- [ ] Both have consistent styling

**Result**: PASS ✅ / FAIL ❌

---

## Performance Testing (30 minutes)

### Test Case PERF-1: Lighthouse Audit

**Steps**:
1. Navigate to `/analytics`
2. Open DevTools → Lighthouse tab
3. Select "Desktop" mode
4. Run audit

**Target Scores**:
- [ ] Performance: ≥85
- [ ] Accessibility: ≥90
- [ ] Best Practices: ≥90
- [ ] SEO: ≥80

**Result**: PASS ✅ / FAIL ❌

**If FAIL on Performance**:
- Check bundle size (should be <500KB)
- Check for render-blocking resources
- Consider code splitting or lazy loading

**If FAIL on Accessibility**:
- Check color contrast ratios
- Verify ARIA labels present
- Ensure keyboard navigation works

---

### Test Case PERF-2: Initial Page Load Time

**Steps**:
1. Clear browser cache
2. Open DevTools → Network tab
3. Enable "Disable cache" checkbox
4. Navigate to `/analytics`
5. Note "Load" time in Network tab summary

**Target**: <200ms for initial render (DOMContentLoaded)

**Verification**:
- [ ] Hero metrics appear within 200ms
- [ ] Charts load within 500ms total
- [ ] No layout shift (components reserve space)

**Result**: PASS ✅ / FAIL ❌

---

### Test Case PERF-3: Chart Rendering Performance

**Steps**:
1. Navigate to `/analytics`
2. Open DevTools → Performance tab
3. Click "Record" button
4. Wait 5 seconds (observe charts rendering)
5. Click "Stop" button
6. Analyze timeline

**Expected**:
- [ ] WeeklyVolumeChart renders in <100ms
- [ ] FocusQualityChart renders in <100ms
- [ ] No long tasks (>50ms) blocking main thread
- [ ] Smooth 60fps animation (if any)

**Result**: PASS ✅ / FAIL ❌

---

### Test Case PERF-4: Network Requests

**Steps**:
1. Navigate to `/analytics`
2. Open DevTools → Network tab
3. Count total requests
4. Sum total transfer size

**Expected**:
- [ ] Total requests: 6-10 (6 RPC calls + assets)
- [ ] Total transfer: <1MB
- [ ] All RPC responses: <50KB each
- [ ] No failed requests (status 200 for all)

**Result**: PASS ✅ / FAIL ❌

---

## Accessibility Testing (45 minutes)

### Test Case A11Y-1: Keyboard Navigation

**Steps**:
1. Navigate to `/analytics`
2. Use only keyboard (Tab, Shift+Tab, Enter, Space)
3. Attempt to interact with all elements

**Checklist**:
- [ ] Tab key cycles through interactive elements
- [ ] Focus indicator visible on all elements (3px outline)
- [ ] Table header cells focusable
- [ ] Enter/Space activates sort on table headers
- [ ] Chart tooltips accessible via keyboard (if possible)
- [ ] No keyboard traps (can tab out of all sections)

**Result**: PASS ✅ / FAIL ❌

---

### Test Case A11Y-2: Screen Reader Compatibility

**Tools**: VoiceOver (Mac), NVDA (Windows), or JAWS

**Steps**:
1. Enable screen reader
2. Navigate to `/analytics`
3. Listen to page announcements

**Expected Announcements**:
- [ ] "Hero Metrics Bar" or similar heading
- [ ] "12 Sessions" (reads metric value + label)
- [ ] "Recent Sessions, heading level 2"
- [ ] Table announces: "Project Segments table, 4 columns, X rows"
- [ ] Charts announce: "Weekly Volume chart" or similar
- [ ] All data points readable (even if verbose)

**Result**: PASS ✅ / FAIL ❌

**If FAIL**: Add ARIA labels:
- `aria-label="Analytics dashboard"`
- `<h2>` tags for section titles
- `role="table"` on table elements
- `aria-label="Bar chart showing weekly work volume"`

---

### Test Case A11Y-3: Color Contrast

**Tool**: Chrome DevTools → Accessibility panel

**Steps**:
1. Navigate to `/analytics`
2. Open DevTools → Elements tab
3. Select each text element
4. Check "Accessibility" pane → "Contrast"

**Target**: WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)

**Check These Elements**:
- [ ] Hero bar white text on dark purple (#451969)
- [ ] Table headers white text on dark purple
- [ ] Record card values dark purple on pink (#E5B6E5)
- [ ] Chart axis labels black on white
- [ ] Chart lines: sufficient contrast from background

**Expected**: All ratios meet WCAG AA

**Result**: PASS ✅ / FAIL ❌

**If FAIL**: Adjust colors or font weights to improve contrast

---

### Test Case A11Y-4: ARIA Labels Verification

**Steps**:
1. Navigate to `/analytics`
2. Open DevTools → Elements tab
3. Search for `aria-` attributes

**Expected ARIA attributes present**:
- [ ] `aria-label` on charts (describes data visualization)
- [ ] `aria-describedby` on interactive elements (if tooltips present)
- [ ] `role="table"` on table
- [ ] `role="row"` on table rows
- [ ] `role="columnheader"` on table headers
- [ ] `aria-sort` on sorted table columns ("ascending" or "descending")

**Result**: PASS ✅ / FAIL ❌

---

## Security Verification (30 minutes)

### Test Case SEC-1: RLS Policy Enforcement

**Steps**:
1. Open Supabase Dashboard → Authentication
2. Note your user ID (User A)
3. Create second test user (User B)
4. Create sessions for User B in Supabase Dashboard
5. Log in as User A
6. Navigate to `/analytics`

**Expected**:
- [ ] User A sees ONLY their own sessions
- [ ] User B's sessions NOT visible to User A
- [ ] No data leakage between users

**Verification in SQL Editor**:
```sql
-- Logged in as User A, attempt to access User B's data
SELECT get_weekly_stats('USER_B_ID');
-- Expected: Error "Unauthorized access"
```

**Result**: PASS ✅ / FAIL ❌

**If FAIL**: RLS policies not working - CRITICAL security issue

---

### Test Case SEC-2: SQL Injection Protection

**Steps**:
1. Manually call RPC with malicious input:

```sql
-- Attempt SQL injection via user_id parameter
SELECT get_weekly_stats(''; DROP TABLE sessions; --');
```

**Expected**:
- [ ] Query fails safely (UUID validation)
- [ ] No database changes
- [ ] Error message doesn't reveal schema info

**Result**: PASS ✅ / FAIL ❌

**Note**: Supabase RPC functions use parameterized queries by default (safe)

---

### Test Case SEC-3: XSS Protection

**Pre-Condition**: Create session with malicious goal text

```sql
-- Insert session with XSS payload in session_goal
INSERT INTO sessions (user_id, project_id, duration, willpower, mindset, is_completed, started_at, xp_earned, session_goal)
VALUES (
  'YOUR_USER_ID',
  'YOUR_PROJECT_ID',
  60,
  'high',
  'high',
  true,
  NOW(),
  150,
  '<script>alert("XSS")</script>'
);
```

**Steps**:
1. Navigate to `/analytics`
2. Observe recent sessions feed

**Expected**:
- [ ] Script does NOT execute (no alert popup)
- [ ] Text displayed as plain text: `<script>alert("XSS")</script>`
- [ ] React escapes HTML by default

**Result**: PASS ✅ / FAIL ❌

**Clean up test data after verification**

---

## Cross-Browser Testing (30 minutes)

### Test Case BROWSER-1: Chrome/Edge

**Version**: Latest stable

**Test Checklist**:
- [ ] Page loads without errors
- [ ] All 6 components render
- [ ] Charts display correctly (Recharts)
- [ ] Sorting works in table
- [ ] Hover effects work
- [ ] Tooltips appear on charts
- [ ] Responsive breakpoints work

**Result**: PASS ✅ / FAIL ❌

---

### Test Case BROWSER-2: Firefox

**Version**: Latest stable

**Test Checklist**:
- [ ] Page loads without errors
- [ ] All 6 components render
- [ ] Charts display correctly
- [ ] Sorting works in table
- [ ] Hover effects work
- [ ] Tooltips appear on charts
- [ ] Responsive breakpoints work

**Known Issues**:
- [ ] Note any Firefox-specific rendering differences

**Result**: PASS ✅ / FAIL ❌

---

### Test Case BROWSER-3: Safari

**Version**: Latest stable (macOS/iOS)

**Test Checklist**:
- [ ] Page loads without errors
- [ ] All 6 components render
- [ ] Charts display correctly
- [ ] Sorting works in table
- [ ] Hover effects work
- [ ] Tooltips appear on charts
- [ ] Responsive breakpoints work

**Known Issues**:
- [ ] Note any Safari-specific rendering differences
- [ ] Test on iOS Safari if available

**Result**: PASS ✅ / FAIL ❌

---

## Final Production Readiness Checklist

### Pre-Launch Verification

**Code Quality**:
- [ ] TypeScript: Zero compilation errors
- [ ] ESLint: Zero warnings/errors (if configured)
- [ ] No `console.log` statements in production code
- [ ] No commented-out code blocks
- [ ] All TODOs resolved or documented

**Documentation**:
- [ ] Implementation plan followed completely
- [ ] All 6 phases completed
- [ ] HANDOFF.md updated with Story 1.9 completion
- [ ] Any deviations from plan documented

**Testing**:
- [ ] All 60+ test cases executed
- [ ] All PASS (or documented acceptable failures)
- [ ] No critical/high severity bugs
- [ ] Medium/low bugs documented in backlog

**Performance**:
- [ ] Lighthouse scores meet targets
- [ ] Page load <200ms
- [ ] Charts render <100ms each
- [ ] No memory leaks (check DevTools Memory tab)

**Accessibility**:
- [ ] WCAG AA compliance verified
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Color contrast verified

**Security**:
- [ ] RLS policies enforced
- [ ] No data leakage between users
- [ ] XSS protection verified
- [ ] SQL injection protection verified

**Regression**:
- [ ] Story 1.8 (DeepFocus) still works
- [ ] TacticalMap still works
- [ ] Shared components unchanged

**Production Deployment**:
- [ ] Environment variables configured
- [ ] Database migration applied to production
- [ ] Backup created before deployment
- [ ] Rollback plan documented

---

## Bug Reporting Template

When a test case FAILS, document using this template:

```markdown
## Bug #[NUMBER] - [BRIEF TITLE]

**Severity**: Critical / High / Medium / Low

**Test Case**: [Test Case ID] (e.g., E2E-1)

**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result**:
[What should happen]

**Actual Result**:
[What actually happened]

**Screenshots/Videos**:
[Attach evidence]

**Environment**:
- Browser: [Chrome 120 / Firefox 121 / Safari 17]
- OS: [macOS 14 / Windows 11 / iOS 17]
- Viewport: [1920×1080 / 1024×768 / 375×667]

**Console Errors**:
```
[Paste console output]
```

**Network Errors**:
[Paste failed requests from Network tab]

**Suggested Fix**:
[If known, propose solution]

**Priority**: [P0 (blocker) / P1 (must fix) / P2 (should fix) / P3 (nice to have)]
```

---

## Sign-Off Criteria

**Story 1.9 can be marked COMPLETE when**:
1. ✅ All 6 phases implemented and verified
2. ✅ All phase gates PASS
3. ✅ All end-to-end test cases PASS
4. ✅ All regression tests PASS
5. ✅ All performance targets met
6. ✅ All accessibility requirements met
7. ✅ All security verifications PASS
8. ✅ Zero critical bugs, <5 high severity bugs
9. ✅ Production deployment successful
10. ✅ HANDOFF.md updated

**Sign-Off**:
- [ ] Developer: Implementation complete and tested
- [ ] QA: All test cases executed and documented
- [ ] Product Owner: Acceptance criteria met
- [ ] Security: RLS and data protection verified

---

**Total QA Effort Estimate**: 8-10 hours across all phases

**Recommended Approach**: Verify each phase immediately after implementation (don't batch all testing at the end)

**Key Success Factor**: Use phase gates - don't proceed to next phase until current phase verification PASSES completely
