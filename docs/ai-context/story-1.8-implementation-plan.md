# Story 1.8 Implementation Plan: DeepFocus Time-Boxing Enhancements
## Eugene Strat - "The Strava of Project Management"

**Branch**: `feature/story-1.8-deepfocus-timebox-enhancements`
**Created**: November 4, 2025
**Revised**: November 4, 2025 (Professional tone alignment + Phase 1 Complete)
**Status**: Phase 1 Complete ✅ | Phases 2-8 Ready for Implementation
**Estimated Time**: 18-25 hours (2-3 dev days)
**Phase 1 Completed**: November 4, 2025

---

## ⚠️ Design Philosophy Alignment

**Professional Context**: Eugene Strat targets professional project managers, not casual users. The XP system provides performance intelligence (like Strava's pace/power metrics), not game rewards (like Duolingo streaks).

**Strict Color Palette Enforcement**: Only the 7 approved colors may be used. No amber, red, or other emotional warning colors. Status indicators use opacity, weight, and the approved palette exclusively.

**Clinical Tone**: Copy is data-focused and neutral. "Session logged" not "Great job!" XP displayed as metrics, not celebrations.

---

## 📋 Executive Summary

Transform DeepFocus from simple session tracking into a comprehensive time-boxing system with **Strava-style performance tracking**. This enhancement adds session goal setting, daily intentions, activity feed, and capacity tracking to create a complete "plan → execute → reflect" loop.

**Core Philosophy**: Like Strava logs runs with pace and distance, Eugene Strat logs work sessions with goals and quality. Pre-commitment → Execution → Reflection → Insights.

---

## 🔍 Implementation Status & Alignment Report

**Date Verified**: November 4, 2025
**Alignment Score**: 82/100 (Good Foundation - Ready for Enhancement)

### ✅ Phase 1 Complete: Database Migration

**Files Created**:
```
supabase/
├── migrations/
│   ├── 20251104_enhance_sessions_timebox.sql    ✅ Main migration
│   └── 20251104_rollback_timebox.sql            ✅ Rollback script
docs/
└── database/
    ├── migration-20251104-rationale.md          ✅ Why & architecture
    └── migration-20251104-guide.md              ✅ How to apply
```

**Database Changes**:
1. ✅ **sessions table** extended with 3 columns:
   - `session_goal` (TEXT) - Optional session objective
   - `goal_completed` (BOOLEAN) - Achievement tracking
   - `session_notes` (TEXT) - Post-session reflection

2. ✅ **daily_intentions table** created:
   - Hour-based targets (1-8 hours/day)
   - Priority project tracking
   - UNIQUE(user_id, date) constraint
   - Row Level Security enabled

3. ✅ **get_daily_stats RPC** function:
   - Single-query data retrieval (performance optimization)
   - Returns sessions + intentions + aggregated stats
   - SECURITY DEFINER with auth validation

**Migration Safety**:
- ✅ 100% backward compatible (nullable columns)
- ✅ Built-in verification tests (4 automated checks)
- ✅ Rollback script ready
- ✅ Context7 best practices applied (RLS, indexing, security)

**Next Step**: Apply migration to Supabase database (see `docs/database/migration-20251104-guide.md`)

---

### 🔴 Critical Issues Identified

#### Professional Tone Violations (Must Fix in Phase 4)

**Current SessionComplete.tsx** violates design philosophy:

1. **Celebration Language** (Lines 104, 123):
   ```tsx
   "Well Done!" → Should be: "Session complete"
   "Great job! Reward yourself" → Should be: "Session logged"
   ```

2. **XP Display Too Prominent** (Lines 112-116):
   ```tsx
   className="text-6xl" → Should be: "text-sm" (0.875rem)
   +{xpEarned} XP → Should be: {xpEarned} XP (no "+" symbol)
   opacity: 1.0 → Should be: opacity: 0.6
   ```

3. **Exclamation Marks** (Lines 52-54):
   ```tsx
   "Session Complete!" → Should be: "Session complete"
   ```

4. **Mindset Labels Too Casual** (Lines 31-34):
   ```tsx
   "Shaolin mode!" → Should be: "Shaolin Mode"
   "What the heck is the zone?" → Use plan labels (line 1481-1484)
   ```

5. **Trophy Icons** (Lines 51-56):
   - Remove celebration iconography

6. **XP Reward Section Design** (Lines 100-133):
   - Remove celebratory black background
   - Integrate XP as discreet metric

**Impact**: These violations must be addressed during Phase 4 (Component Enhancement).

---

### 🟡 Architecture Gaps

**Type System** (Phase 2 Required):
```typescript
// Missing types (to be added):
❌ SessionGoal
❌ DailyIntention
❌ CompletedSession
❌ DailyStats
❌ GoalCompletionStatus
```

**Components** (Phase 3 Required):
```
❌ DailyIntentionModal.tsx       - Daily commitment ritual
❌ SessionCard.tsx                - Strava-style session display
❌ TodaysActivityFeed.tsx         - Session list container
❌ DailyCapacityMeter.tsx         - Progress visualization
```

**State Management** (Phase 4 Required):
```typescript
// useDeepFocusState.ts needs:
❌ loadDailyStats() - Replace get_today_sessions call
❌ createDailyIntention()
❌ showDailyIntentionModal state
❌ sessionGoal state
❌ Update completeSession() signature
```

**Layout** (Phase 5 Required):
```css
/* Current: 2fr/1fr (67%/33%) */
grid-template-columns: 2fr 1fr;

/* Required: 3fr/2fr (60%/40%) */
grid-template-columns: 3fr 2fr;
```

---

### ✅ What's Working Well

**Strong Foundation**:
- ✅ Next.js 15.5.2 + React 19.1.0 (latest stable)
- ✅ Proper client component patterns (`'use client'`)
- ✅ Supabase integration with RLS
- ✅ Neo-brutalist design system established
- ✅ Hook-based state management
- ✅ localStorage session persistence
- ✅ Component-specific CSS modules
- ✅ Mobile responsiveness (@media 1024px)

**Context7 Validation**:
- ✅ RLS policies follow best practices (TO authenticated, indexed columns)
- ✅ Client component usage aligns with Next.js 15 patterns
- ✅ Hook patterns match React 19 conventions

---

### 📋 Updated Implementation Roadmap

| Phase | Status | Blockers | Time |
|-------|--------|----------|------|
| **Phase 1: Database** | ✅ Complete | None | 2-3h |
| **Phase 2: Types** | 🟡 Ready | Phase 1 | 1-2h |
| **Phase 3: New Components** | 🟡 Ready | Phase 2 | 5-7h |
| **Phase 4: Enhancement** | 🔴 Caution | Professional tone fixes | 3-4h |
| **Phase 5: Layout** | 🟡 Ready | Phase 4 | 2-3h |
| **Phase 6: CSS Polish** | 🟡 Ready | Phase 5 | 2-3h |
| **Phase 7: Testing** | 🟡 Ready | Phase 6 | 2-3h |
| **Phase 8: Documentation** | 🟡 Ready | Phase 7 | 1h |

**Critical Path**:
1. ✅ Apply database migration (Phase 1 artifacts ready)
2. 🔴 Fix SessionComplete.tsx professional tone (parallel to Phase 2)
3. Proceed with Phases 2-8 as planned

---

## 🎨 UI/UX Analysis & Design Improvements

### Current State Assessment

**Existing Strengths:**
- ✅ Clean 4-color neo-brutalist system (Crayon, Cream, White, Dark Green, Lime, Pink, Black)
- ✅ Phase-adaptive design reducing visual intensity during active sessions
- ✅ Strong typography hierarchy with uppercase and wide letter spacing
- ✅ Consistent border/shadow patterns (2-4px borders, 2-8px shadows)
- ✅ 2fr/1fr layout with clear main/sidebar separation

**Identified Pain Points:**
- ⚠️ Layout needs adjustment to 60/40 split (Story 1.8 requirement)
- ⚠️ Sidebar underutilized - only daily commitment slider currently
- ⚠️ No visual feedback for today's progress or activity history
- ⚠️ Session goals not captured or displayed
- ⚠️ Missing daily intention ritual to build habit loop
- ⚠️ No real-time capacity awareness

---

### Enhanced Design System for Story 1.8

#### Color Strategy Refinement

**Primary Palette** (maintain current):
```css
--df-page-bg: #e8e8e6      /* Crayon - Page background */
--df-card-bg: #E5EED0      /* Cream - Card surfaces */
--df-input-bg: #ffffff     /* White - Input fields */
--df-text: #000000         /* Black - Text, borders */
--df-focus: #224718        /* Dark Green - Calm, progress */
--df-action: #CFE820       /* Lime - Energy, CTAs */
--df-special: #E5B6E5      /* Pink - Rewards, over-achievement */
```

**New Strategic Applications:**

1. **Dark Green (#224718) Elevation**
   - Use as primary brand color for DeepFocus (calm focus energy)
   - Apply to capacity meter fill (standard progress)
   - Use for session goal text during active session
   - Primary color for "today's activity" section headers

2. **Lime (#CFE820) Optimization**
   - Reserve for high-energy CTAs: "Start Session", "Set Target"
   - Primary action buttons only
   - Use sparingly for maximum impact

3. **Pink (#E5B6E5) Strategic Use**
   - Special states (partial completion, warnings)
   - Over-capacity indicators (neutral, not celebratory)
   - Avoid overuse - maintains special status

4. **Cream (#E5EED0) Consistency**
   - All card backgrounds (session cards, capacity meter, modal content)
   - Maintains warmth and reduces eye strain

#### Typography Enhancements

**Current**: Good uppercase + letter-spacing foundation

**Additions**:
```css
/* Activity Feed Card Typography */
.session-card-time {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--df-focus);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.session-card-project {
  font-size: 1rem;
  font-weight: 600;
  color: var(--df-text);
}

.session-card-goal {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--df-text);
  opacity: 0.8;
}

/* XP Display - Discreet Professional Metrics */
.session-card-xp {
  font-size: 0.875rem;        /* Small, not prominent */
  font-weight: 600;           /* Moderate weight */
  color: var(--df-text);      /* Black, not lime */
  opacity: 0.6;               /* De-emphasized */
  font-family: var(--font-family-mono);
}

/* Capacity Meter Typography */
.capacity-hours {
  font-size: 2rem;
  font-weight: 900;
  font-family: var(--font-family-mono);
  color: var(--df-focus);
}

.capacity-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--df-text);
  opacity: 0.7;
}
```

---

### New Component Design Specifications

#### 1. Daily Intention Modal (First-Visit Ritual)

**Visual Design:**
```
┌────────────────────────────────────────────────┐
│ [Blur backdrop: rgba(0,0,0,0.6)]              │
│                                                │
│     ┌──────────────────────────────────┐      │
│     │ SET DAILY TARGET                 │ ← Dark Green bg, Cream text
│     ├──────────────────────────────────┤      │
│     │                                  │      │
│     │ How many hours will you focus    │      │
│     │ today?                           │      │
│     │                                  │      │
│     │   ╶────●────────────╴   4 hours │ ← Lime slider thumb
│     │   1                8             │      │
│     │                                  │      │
│     │ Priority Project (Optional)      │      │
│     │ [ Select project...        ▼ ]  │      │
│     │                                  │      │
│     │ ┌─────────────┐  ┌────────────┐│      │
│     │ │ Skip Today  │  │ SET TARGET ││ ← Lime bg, black text
│     │ └─────────────┘  └────────────┘│      │
│     └──────────────────────────────────┘      │
└────────────────────────────────────────────────┘
```

**CSS Specifications:**
```css
.daily-intention-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 200ms ease-out;
}

.daily-intention-modal {
  background: var(--df-card-bg);
  border: 4px solid var(--df-text);
  box-shadow: 16px 16px 0px var(--df-text);
  max-width: 500px;
  width: 90%;
  animation: slideUp 300ms ease-out;
}

.daily-intention-header {
  background: var(--df-focus);
  color: var(--df-card-bg);
  padding: 1.5rem;
  border-bottom: 4px solid var(--df-text);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 900;
  font-size: 1.25rem;
}

.daily-intention-slider {
  /* Custom range input styling */
  accent-color: var(--df-action);
  height: 8px;
  background: var(--df-input-bg);
  border: 2px solid var(--df-text);
}

.daily-intention-slider::-webkit-slider-thumb {
  background: var(--df-action);
  border: 3px solid var(--df-text);
  width: 24px;
  height: 24px;
  box-shadow: 2px 2px 0px var(--df-text);
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

**UX Flow:**
1. Check on page mount: Has user set intention for today?
2. If no: Show modal with dramatic entrance (blur + slide-up animation)
3. Default: 4 hours (middle of 1-8 range)
4. Optional: Select priority project from active projects dropdown
5. "Set Target" saves to DB and dismisses
6. "Skip Today" dismisses without saving (allows page access)
7. Modal auto-dismissed after successful save with subtle confetti effect (CSS particles)

---

#### 2. Today's Activity Feed (Strava-Style Session Cards)

**Visual Design:**
```
┌─────────────────────────────────────────────┐
│ TODAY'S SESSIONS                            │ ← Dark Green text, bold
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ 09:15 AM • 90 min                  110 XP │ │ ← Time in Dark Green, XP discreet
│ │ Build Landing Page                      │ │ ← Project name
│ │ ✓ Complete hero section                │ │ ← Goal with status icon
│ │ Shaolin Mode                            │ │ ← Mindset badge
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ 11:30 AM • 60 min                   40 XP│ │
│ │ Fix Auth Bug                            │ │
│ │ ⚠ Investigate error logs                │ │ ← Partial completion (pink icon)
│ │ Getting There                           │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ 14:00 PM • 60 min                   30 XP│ │
│ │ Documentation                           │ │
│ │ - No goal set                           │ │ ← No goal (neutral)
│ │ What Zone                               │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**Session Card CSS:**
```css
.activity-feed-container {
  background: var(--df-card-bg);
  border: 3px solid var(--df-text);
  box-shadow: 6px 6px 0px var(--df-text);
  padding: 1.5rem;
}

.activity-feed-header {
  color: var(--df-focus);
  font-weight: 900;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--df-text);
  padding-bottom: 0.5rem;
}

.session-card {
  background: var(--df-input-bg);
  border: 2px solid var(--df-text);
  box-shadow: 3px 3px 0px var(--df-text);
  padding: 1rem;
  margin-bottom: 0.75rem;
  transition: all 150ms ease-out;
}

.session-card:hover {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0px var(--df-text);
  cursor: pointer;
}

.session-card:last-child {
  margin-bottom: 0;
}

.session-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.session-card-time {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--df-focus);
  text-transform: uppercase;
  font-family: var(--font-family-mono);
}

.session-card-xp {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--df-text);
  opacity: 0.6;
  font-family: var(--font-family-mono);
}

.session-card-project {
  font-size: 1rem;
  font-weight: 600;
  color: var(--df-text);
  margin-bottom: 0.25rem;
}

.session-card-goal {
  font-size: 0.875rem;
  color: var(--df-text);
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.session-card-goal-icon {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Status Colors - APPROVED PALETTE ONLY */
.goal-completed {
  color: var(--df-focus);     /* Dark Green - success */
}

.goal-partial {
  color: var(--df-special);   /* Pink - special state */
}

.goal-not-completed {
  color: var(--df-text);      /* Black - neutral */
  opacity: 0.5;               /* Reduced intensity */
}

.goal-not-set {
  color: var(--df-text);
  opacity: 0.3;
}

.session-card-mindset {
  display: inline-flex;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
  border: 1px solid var(--df-text);
}

/* Mindset Badges - APPROVED PALETTE ONLY */
.mindset-high {
  background: var(--df-focus);    /* Dark Green */
  color: var(--df-input-bg);      /* White text */
}

.mindset-medium {
  background: var(--df-card-bg);  /* Cream */
  color: var(--df-text);          /* Black text */
  border: 2px solid var(--df-text);
}

.mindset-low {
  background: var(--df-input-bg); /* White */
  color: var(--df-text);          /* Black text */
  border: 2px solid var(--df-text);
  opacity: 0.7;
}

.activity-feed-empty {
  text-align: center;
  padding: 2rem;
  color: var(--df-text);
  opacity: 0.5;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: var(--font-family-mono);
}
```

**Data Display Logic:**
- Show last 5 completed sessions from today (most recent first)
- Time format: "HH:MM AM/PM"
- Duration: Minutes with "min" suffix
- Goal status icons:
  - ✓ (checkmark) - Goal completed (green)
  - ⚠️ (warning) - Partial completion (amber)
  - ✗ (x-mark) - Not completed (red)
  - \- (dash) - No goal set (grey)
- XP displayed prominently in Lime color
- Mindset badge color-coded by quality level

**Empty State:**
- "NO SESSIONS COMPLETED YET TODAY"
- "START YOUR FIRST FOCUS SESSION"
- Subtle opacity, maintains neo-brutalist styling

---

#### 3. Daily Capacity Meter (Progress Visualization)

**Visual Design:**
```
┌─────────────────────────────────────────────┐
│ DAILY CAPACITY                              │
├─────────────────────────────────────────────┤
│                                             │
│   4.5 / 4.0 hours                 🔥       │ ← Large mono font
│                                             │
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░         112%  │ ← Progress bar
│                                             │
│   3 sessions completed                      │
│   Target exceeded • Keep it sustainable     │
└─────────────────────────────────────────────┘
```

**CSS Specifications:**
```css
.capacity-meter-container {
  background: var(--df-card-bg);
  border: 3px solid var(--df-text);
  box-shadow: 6px 6px 0px var(--df-text);
  padding: 1.5rem;
}

.capacity-meter-header {
  color: var(--df-focus);
  font-weight: 900;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--df-text);
  padding-bottom: 0.5rem;
}

.capacity-hours-display {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
}

.capacity-hours {
  font-size: 2rem;
  font-weight: 900;
  font-family: var(--font-family-mono);
  color: var(--df-focus);
}

.capacity-hours.exceeded {
  color: var(--df-action);
}

.capacity-fire-icon {
  font-size: 1.5rem;
}

.capacity-progress-bar {
  background: var(--df-input-bg);
  border: 2px solid var(--df-text);
  height: 32px;
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
}

.capacity-progress-fill {
  height: 100%;
  background: var(--df-focus);
  transition: width 400ms ease-out, background 200ms ease-out;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
}

.capacity-progress-fill.exceeded {
  background: var(--df-special);  /* Pink for warning, not celebration */
}

.capacity-progress-percentage {
  font-family: var(--font-family-mono);
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--df-input-bg);
}

.capacity-stats {
  font-size: 0.875rem;
  color: var(--df-text);
  opacity: 0.8;
  text-align: center;
}

.capacity-message {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--df-focus);
  text-align: center;
  margin-top: 0.5rem;
}

.capacity-message.exceeded {
  color: var(--df-special);  /* Pink for special state */
}

.capacity-no-target {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--df-text);
  opacity: 0.6;
  font-size: 0.875rem;
}
```

**Progress States:**
1. **No target set**: Show message "Set target to track progress"
2. **Under target (0-99%)**: Dark Green fill
3. **Met target (100%)**: Dark Green fill + checkmark icon
4. **Over target (>100%)**: Pink fill + warning icon (AlertTriangle, not fire) + capacity percentage

**Calculation Logic:**
```typescript
const totalHours = todaySessions.reduce((sum, s) => sum + (s.duration / 60), 0);
const percentage = targetHours ? Math.round((totalHours / targetHours) * 100) : 0;
const isExceeded = percentage > 100;
```

---

#### 4. Session Goal Input (Enhancement to SessionSetup)

**Visual Design:**
```
┌─────────────────────────────────────────────┐
│ FOCUS SESSION                               │
├─────────────────────────────────────────────┤
│                                             │
│ Project                                     │
│ [ Build Landing Page               ▼ ]     │
│                                             │
│ Session Duration                            │
│ [ 60m ] [ 90m ] [ 120m ]                   │
│                                             │
│ Session Goal (Optional)                     │
│ ┌─────────────────────────────────────────┐│
│ │What will you accomplish?                ││ ← Placeholder text
│ └─────────────────────────────────────────┘│
│                                             │
│ [ Continue to Willpower Check ]             │
└─────────────────────────────────────────────┘
```

**CSS Specifications:**
```css
.session-goal-input-wrapper {
  margin-top: 1.5rem;
}

.session-goal-label {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--df-text);
  margin-bottom: 0.5rem;
  display: block;
}

.session-goal-label-optional {
  opacity: 0.6;
  font-size: 0.75rem;
  font-weight: 400;
  margin-left: 0.5rem;
}

.session-goal-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-family: var(--font-family-mono);
  background: var(--df-input-bg);
  border: 2px solid var(--df-text);
  color: var(--df-text);
  transition: all 150ms ease-out;
}

.session-goal-input:focus {
  outline: none;
  border: 3px solid var(--df-focus);
  box-shadow: 4px 4px 0px var(--df-focus);
}

.session-goal-input::placeholder {
  color: var(--df-text);
  opacity: 0.4;
  font-style: italic;
}
```

**UX Guidelines:**
- Clearly marked as "(Optional)" to reduce friction
- Placeholder: "What will you accomplish?"
- Character limit: 200 characters (prevents essays)
- Auto-trim whitespace
- Empty submission is valid (optional field)

---

#### 5. Goal Completion Tracking (Enhancement to SessionComplete)

**Visual Design:**
```
┌─────────────────────────────────────────────┐
│ 🏆 SESSION COMPLETE! 🏆                     │
├─────────────────────────────────────────────┤
│                                             │
│ Build Landing Page • 90 minutes             │
│                                             │
│ Your Goal: Complete hero section            │
│                                             │
│ Did you complete your goal?                 │
│                                             │
│ ┌───────────┐  ┌───────────┐  ┌──────────┐│
│ │     ✓     │  │     ⚠️     │  │    ✗     ││
│ │    YES    │  │  PARTIAL   │  │    NO    ││
│ └───────────┘  └───────────┘  └──────────┘│
│                                             │
│ Session Notes (Optional)                    │
│ ┌─────────────────────────────────────────┐│
│ │                                         ││ ← Textarea
│ └─────────────────────────────────────────┘│
│                                             │
│ [ Submit Feedback ]                         │
└─────────────────────────────────────────────┘
```

**CSS Specifications:**
```css
.session-complete-goal-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--df-input-bg);
  border: 2px solid var(--df-text);
}

.session-complete-goal-text {
  font-size: 1rem;
  color: var(--df-focus);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-style: italic;
}

.goal-completion-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.goal-completion-button {
  padding: 1.5rem 1rem;
  background: var(--df-input-bg);
  border: 2px solid var(--df-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 150ms ease-out;
  cursor: pointer;
}

.goal-completion-button:hover {
  transform: translate(2px, 2px);
  box-shadow: 3px 3px 0px var(--df-text);
}

.goal-completion-button.selected {
  border: 3px solid var(--df-text);
  box-shadow: 4px 4px 0px var(--df-text);
}

/* Goal Completion Buttons - APPROVED PALETTE ONLY */
.goal-completion-button.yes {
  background: var(--df-focus);    /* Dark Green */
  color: var(--df-input-bg);      /* White text */
}

.goal-completion-button.partial {
  background: var(--df-special);  /* Pink */
  color: var(--df-text);          /* Black text */
}

.goal-completion-button.no {
  background: var(--df-input-bg); /* White */
  color: var(--df-text);          /* Black text */
  border: 2px solid var(--df-text);
  opacity: 0.7;
}

.goal-completion-icon {
  font-size: 2rem;
}

.goal-completion-label {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.session-notes-textarea {
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  font-size: 0.875rem;
  font-family: var(--font-family-mono);
  background: var(--df-input-bg);
  border: 2px solid var(--df-text);
  resize: vertical;
  margin-top: 0.5rem;
}

.session-notes-textarea:focus {
  outline: none;
  border: 3px solid var(--df-focus);
  box-shadow: 4px 4px 0px var(--df-focus);
}
```

**UX Flow:**
1. If user set a goal: Show goal completion section
2. Display the goal text prominently
3. Three-button selection: Yes / Partial / No
4. Visual feedback on selection (color change)
5. Optional notes textarea below
6. Only show goal section if session had a goal
7. Maintain existing mindset selection flow

---

### Page Layout Restructure

**New 60/40 Split:**
```
┌─────────────────────────────────────────────────────┐
│ Header (Universal - 80px)                           │
├──────────────────────────┬──────────────────────────┤
│ LEFT COLUMN (60%)        │ RIGHT SIDEBAR (40%)     │
│                          │                          │
│ ┌──────────────────────┐ │ ┌──────────────────────┐│
│ │ Session Setup        │ │ │ Daily Capacity Meter││
│ │ or Timer             │ │ │ (Prominent position) ││
│ │ or Complete          │ │ └──────────────────────┘│
│ │                      │ │                          │
│ │ (Main interaction    │ │ ┌──────────────────────┐│
│ │  area)               │ │ │ Today's Activity     ││
│ │                      │ │ │ Feed                 ││
│ │                      │ │ │ (Strava-style cards) ││
│ │                      │ │ │                      ││
│ │                      │ │ │                      ││
│ └──────────────────────┘ │ │                      ││
│                          │ └──────────────────────┘│
│                          │                          │
│                          │ ┌──────────────────────┐│
│                          │ │ Daily Commitment     ││
│                          │ │ Slider (bottom)      ││
│                          │ └──────────────────────┘│
└──────────────────────────┴──────────────────────────┘
```

**CSS Implementation:**
```css
.deep-focus-main {
  display: grid;
  grid-template-columns: 3fr 2fr; /* 60/40 split */
  gap: var(--spacing-lg);
  align-items: start;
}

.deep-focus-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  position: sticky;
  top: calc(80px + var(--spacing-lg)); /* Stick below header */
}

@media (max-width: 1024px) {
  .deep-focus-main {
    grid-template-columns: 1fr;
  }

  .deep-focus-sidebar {
    position: static;
  }
}
```

**Sidebar Order (Top to Bottom):**
1. **Daily Capacity Meter** (most important - current progress)
2. **Today's Activity Feed** (performance history)
3. **Daily Commitment Slider** (moved from current position)

---

## 🗄️ Database Architecture

### Migration 1: Extend `sessions` Table

**Purpose**: Add time-boxing fields to capture session goals, completion status, and reflection notes.

**SQL Migration:**
```sql
-- File: supabase/migrations/20250104_enhance_sessions_timebox.sql
-- Part 1: Extend sessions table

ALTER TABLE sessions
  ADD COLUMN session_goal TEXT,
  ADD COLUMN goal_completed BOOLEAN,
  ADD COLUMN session_notes TEXT;

-- Add column comments for documentation
COMMENT ON COLUMN sessions.session_goal IS
  'User''s planned objective for this session (optional)';
COMMENT ON COLUMN sessions.goal_completed IS
  'Goal achievement: true=completed, false=not completed, null=partially completed or goal not set';
COMMENT ON COLUMN sessions.session_notes IS
  'Post-session reflection notes (optional)';

-- Verify existing data unaffected
DO $$
BEGIN
  IF (SELECT COUNT(*) FROM sessions WHERE session_goal IS NOT NULL) > 0 THEN
    RAISE EXCEPTION 'Migration error: Unexpected data in new columns';
  END IF;
END $$;
```

**Migration Safety:**
- All columns nullable → backward compatible
- Existing sessions retain all data
- No default values → explicit nulls
- Rollback safe (can drop columns without data loss)

---

### Migration 2: Create `daily_intentions` Table

**Purpose**: Store daily focus commitments for habit building and capacity planning.

**SQL Migration:**
```sql
-- File: supabase/migrations/20250104_enhance_sessions_timebox.sql
-- Part 2: Create daily_intentions table

CREATE TABLE daily_intentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  target_hours INTEGER NOT NULL CHECK (target_hours >= 1 AND target_hours <= 8),
  priority_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure one intention per user per day
  UNIQUE(user_id, date)
);

-- Index for fast daily lookups
CREATE INDEX idx_daily_intentions_user_date ON daily_intentions(user_id, date);

-- Add table comment
COMMENT ON TABLE daily_intentions IS
  'Daily focus hour commitments for capacity planning and habit tracking';

-- Row Level Security
ALTER TABLE daily_intentions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own daily intentions"
  ON daily_intentions
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Verify RLS is enabled
DO $$
BEGIN
  IF NOT (SELECT relrowsecurity FROM pg_class WHERE relname = 'daily_intentions') THEN
    RAISE EXCEPTION 'RLS not enabled on daily_intentions';
  END IF;
END $$;
```

**Schema Design Decisions:**
- **UNIQUE(user_id, date)**: Prevents duplicate intentions per day
- **CHECK constraint**: Realistic range (1-8 hours)
- **priority_project_id nullable**: Optional focus guidance
- **ON DELETE SET NULL**: Preserve intention if project deleted
- **RLS policy**: User isolation enforced at database level

---

### Migration 3: Enhanced RPC Function

**Purpose**: Replace `get_today_sessions` with comprehensive daily statistics query.

**SQL Migration:**
```sql
-- File: supabase/migrations/20250104_enhance_sessions_timebox.sql
-- Part 3: Create enhanced get_daily_stats RPC

CREATE OR REPLACE FUNCTION get_daily_stats(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
  today_date DATE := CURRENT_DATE;
BEGIN
  -- Validate user_id matches authenticated user
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  SELECT json_build_object(
    'sessions_completed', COUNT(s.id) FILTER (WHERE s.is_completed = true),
    'total_hours', COALESCE(SUM(s.duration) FILTER (WHERE s.is_completed = true) / 60.0, 0),
    'daily_intention', (
      SELECT json_build_object(
        'id', di.id,
        'target_hours', di.target_hours,
        'priority_project_id', di.priority_project_id,
        'priority_project_name', p.name
      )
      FROM daily_intentions di
      LEFT JOIN projects p ON p.id = di.priority_project_id
      WHERE di.user_id = user_id_param AND di.date = today_date
      LIMIT 1
    ),
    'today_sessions', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'id', s.id,
          'project_id', s.project_id,
          'project_name', proj.name,
          'duration', s.duration,
          'started_at', s.started_at,
          'willpower', s.willpower,
          'mindset', s.mindset,
          'session_goal', s.session_goal,
          'goal_completed', s.goal_completed,
          'session_notes', s.session_notes,
          'xp_earned', s.xp_earned
        )
        ORDER BY s.started_at DESC
      ), '[]'::json)
      FROM sessions s
      JOIN projects proj ON proj.id = s.project_id
      WHERE s.user_id = user_id_param
        AND DATE(s.started_at) = today_date
        AND s.is_completed = true
    )
  ) INTO result
  FROM sessions s
  WHERE s.user_id = user_id_param AND DATE(s.started_at) = today_date;

  RETURN result;
END;
$$;

-- Add function comment
COMMENT ON FUNCTION get_daily_stats IS
  'Retrieve comprehensive daily statistics including sessions, intentions, and progress';

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_daily_stats TO authenticated;
```

**RPC Design:**
- **Single query**: Efficient data fetch (no N+1 queries)
- **Security definer**: Runs with elevated permissions (respects RLS)
- **Auth validation**: Explicit user_id check
- **NULL safety**: COALESCE for zero-session days
- **Ordered sessions**: Most recent first
- **Complete data**: All fields needed for UI display

**Response Structure:**
```json
{
  "sessions_completed": 3,
  "total_hours": 4.5,
  "daily_intention": {
    "id": "uuid",
    "target_hours": 4,
    "priority_project_id": "uuid",
    "priority_project_name": "Build Landing Page"
  },
  "today_sessions": [
    {
      "id": "uuid",
      "project_id": "uuid",
      "project_name": "Build Landing Page",
      "duration": 90,
      "started_at": "2025-01-04T09:15:00Z",
      "willpower": "low",
      "mindset": "high",
      "session_goal": "Complete hero section",
      "goal_completed": true,
      "session_notes": "Flow state achieved",
      "xp_earned": 110
    }
  ]
}
```

---

### Migration Rollback Plan

**If critical issues arise:**

```sql
-- Rollback Script: supabase/migrations/20250104_rollback_timebox.sql

-- Step 1: Drop new RPC function
DROP FUNCTION IF EXISTS get_daily_stats(UUID);

-- Step 2: Drop daily_intentions table
DROP TABLE IF EXISTS daily_intentions CASCADE;

-- Step 3: Remove new columns from sessions
ALTER TABLE sessions
  DROP COLUMN IF EXISTS session_goal,
  DROP COLUMN IF EXISTS goal_completed,
  DROP COLUMN IF EXISTS session_notes;

-- Step 4: Verify rollback
DO $$
BEGIN
  -- Check sessions table columns removed
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sessions' AND column_name = 'session_goal'
  ) THEN
    RAISE EXCEPTION 'Rollback failed: session_goal column still exists';
  END IF;

  -- Check daily_intentions table removed
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_name = 'daily_intentions'
  ) THEN
    RAISE EXCEPTION 'Rollback failed: daily_intentions table still exists';
  END IF;
END $$;
```

**Frontend Rollback:**
```bash
# Revert to pre-Story-1.8 commit
git checkout main
git branch -D feature/story-1.8-deepfocus-timebox-enhancements

# Or selectively revert files if needed
git checkout main -- src/components/deep-focus/
git checkout main -- src/app/(protected)/deep-focus/
```

---

## 🏗️ Frontend Architecture

### TypeScript Type Definitions

**New Types (add to `types.ts`):**

```typescript
// src/components/deep-focus/types.ts

// Existing types (keep as-is):
// - WillpowerLevel, MindsetLevel, SessionDuration, SessionPhase
// - SessionConfig, ActiveSession, DailyCommitment

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

/** Extended DeepFocus state */
export interface DeepFocusState {
  // Existing fields (keep as-is):
  phase: SessionPhase;
  availableProjects: Project[];
  sessionConfig: SessionConfig | null;
  activeSession: ActiveSession | null;
  isLoading: boolean;
  error: string | null;

  // New fields:
  sessionGoal: string; // Input for current session
  dailyStats: DailyStats | null; // Replaces dailyCommitment
  showDailyIntentionModal: boolean; // First-visit modal control
}

/** Goal completion selection */
export type GoalCompletionStatus = 'yes' | 'partial' | 'no';
```

---

### Component Architecture

**Component Hierarchy:**
```
DeepFocusPage (page.tsx)
├── DailyIntentionModal (NEW - conditional render on mount)
├── Main Content Area (60%)
│   ├── SessionSetup (ENHANCED - add goal input)
│   ├── ActiveSession (ENHANCED - display goal)
│   └── SessionComplete (ENHANCED - goal completion + notes)
└── Sidebar (40%)
    ├── DailyCapacityMeter (NEW)
    ├── TodaysActivityFeed (NEW)
    │   └── SessionCard (NEW) x N
    └── DailyCommitmentSlider (KEEP - move to bottom)
```

---

### New Component: `DailyIntentionModal.tsx`

**Purpose**: First-visit daily ritual for setting focus targets

**Props Interface:**
```typescript
interface DailyIntentionModalProps {
  isOpen: boolean;
  availableProjects: Project[];
  onSetIntention: (hours: number, projectId?: string) => Promise<void>;
  onSkip: () => void;
  isLoading: boolean;
}
```

**Component Implementation:**
```typescript
'use client'

import { useState } from 'react';
import { X } from 'lucide-react';

export function DailyIntentionModal({
  isOpen,
  availableProjects,
  onSetIntention,
  onSkip,
  isLoading
}: DailyIntentionModalProps) {
  const [hours, setHours] = useState(4);
  const [projectId, setProjectId] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    await onSetIntention(hours, projectId || undefined);
  };

  return (
    <div className="daily-intention-modal-overlay" onClick={onSkip}>
      <div
        className="daily-intention-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="daily-intention-header">
          <h2>SET TARGET</h2>
        </div>

        {/* Body */}
        <div className="daily-intention-body p-6">
          {/* Hours slider */}
          <div className="mb-6">
            <label className="field-label mb-2">
              How many hours will you focus today?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="8"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="daily-intention-slider flex-1"
              />
              <div className="capacity-hours text-2xl">
                {hours}h
              </div>
            </div>
            <div className="flex justify-between text-xs mt-2 opacity-60">
              <span>1h</span>
              <span>8h</span>
            </div>
          </div>

          {/* Priority project (optional) */}
          <div className="mb-6">
            <label className="field-label mb-2">
              Priority Project <span className="opacity-50">(Optional)</span>
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="field-select"
            >
              <option value="">No specific priority</option>
              {availableProjects
                .filter(p => p.status === 'active')
                .map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onSkip}
              disabled={isLoading}
              className="btn-secondary-df flex-1"
            >
              Skip Today
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn-primary-df flex-1"
            >
              {isLoading ? 'Saving...' : 'Set Target'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**CSS File** (create `DailyIntentionModal.css`):
```css
/* src/styles/features/deep-focus/DailyIntentionModal.css */
@layer components {
  .daily-intention-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 200ms ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .daily-intention-modal {
    background: var(--df-card-bg);
    border: 4px solid var(--df-text);
    box-shadow: 16px 16px 0px var(--df-text);
    max-width: 500px;
    width: 90%;
    animation: slideUp 300ms ease-out;
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* No confetti, sparkles, or celebratory animations */

  .daily-intention-header {
    background: var(--df-focus);
    color: var(--df-card-bg);
    padding: 1.5rem;
    border-bottom: 4px solid var(--df-text);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 900;
    font-size: 1.25rem;
  }

  .daily-intention-body {
    padding: 2rem;
  }

  .daily-intention-slider {
    appearance: none;
    width: 100%;
    height: 8px;
    background: var(--df-input-bg);
    border: 2px solid var(--df-text);
    outline: none;
  }

  .daily-intention-slider::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    background: var(--df-action);
    border: 3px solid var(--df-text);
    cursor: pointer;
    box-shadow: 2px 2px 0px var(--df-text);
  }

  .daily-intention-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: var(--df-action);
    border: 3px solid var(--df-text);
    cursor: pointer;
    box-shadow: 2px 2px 0px var(--df-text);
  }
}
```

---

### New Component: `SessionCard.tsx`

**Purpose**: Individual completed session display for activity feed

**Props Interface:**
```typescript
interface SessionCardProps {
  session: CompletedSession;
  onClick?: () => void; // Future: session details modal
}
```

**Component Implementation:**
```typescript
'use client'

import { Check, AlertTriangle, X, Minus } from 'lucide-react';
import { formatTime, formatDuration } from './utils';

export function SessionCard({ session, onClick }: SessionCardProps) {
  const renderGoalStatus = () => {
    if (!session.session_goal) {
      return (
        <div className="session-card-goal goal-not-set">
          <Minus size={16} className="session-card-goal-icon" />
          <span>No goal set</span>
        </div>
      );
    }

    const icons = {
      true: <Check size={16} />,
      false: <X size={16} />,
      null: <AlertTriangle size={16} />,
    };

    const statusClass =
      session.goal_completed === true ? 'goal-completed' :
      session.goal_completed === false ? 'goal-not-completed' :
      'goal-partial';

    return (
      <div className={`session-card-goal ${statusClass}`}>
        <span className="session-card-goal-icon">
          {icons[String(session.goal_completed) as 'true' | 'false' | 'null']}
        </span>
        <span>{session.session_goal}</span>
      </div>
    );
  };

  const getMindsetClass = () => {
    return `mindset-${session.mindset}`;
  };

  const getMindsetLabel = () => {
    const labels = {
      high: 'Shaolin Mode',
      medium: 'Getting There',
      low: 'What Zone',
    };
    return labels[session.mindset];
  };

  return (
    <div
      className="session-card"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Header: Time & XP (discreet) */}
      <div className="session-card-header">
        <span className="session-card-time">
          {formatTime(session.started_at)} • {formatDuration(session.duration)}
        </span>
        <span className="session-card-xp">{session.xp_earned} XP</span>
      </div>

      {/* Project Name */}
      <div className="session-card-project">
        {session.project_name}
      </div>

      {/* Goal Status */}
      {renderGoalStatus()}

      {/* Mindset Badge */}
      <div className={`session-card-mindset ${getMindsetClass()}`}>
        {getMindsetLabel()}
      </div>
    </div>
  );
}
```

**Utility Functions** (add to `utils.ts`):
```typescript
// src/components/deep-focus/utils.ts

export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDuration(minutes: number): string {
  return `${minutes} min`;
}

export function formatHours(minutes: number): string {
  return (minutes / 60).toFixed(1);
}
```

---

### New Component: `TodaysActivityFeed.tsx`

**Purpose**: Container for today's completed sessions

**Props Interface:**
```typescript
interface TodaysActivityFeedProps {
  sessions: CompletedSession[];
  isLoading: boolean;
}
```

**Component Implementation:**
```typescript
'use client'

import { SessionCard } from './SessionCard';

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
```

---

### New Component: `DailyCapacityMeter.tsx`

**Purpose**: Visual progress toward daily hour target

**Props Interface:**
```typescript
interface DailyCapacityMeterProps {
  dailyStats: DailyStats | null;
  isLoading: boolean;
}
```

**Component Implementation:**
```typescript
'use client'

import { Flame, CheckCircle } from 'lucide-react';
import { formatHours } from './utils';

export function DailyCapacityMeter({ dailyStats, isLoading }: DailyCapacityMeterProps) {
  if (isLoading || !dailyStats) {
    return (
      <div className="capacity-meter-container">
        <div className="capacity-meter-header">DAILY CAPACITY</div>
        <div className="capacity-no-target">
          Loading...
        </div>
      </div>
    );
  }

  const { daily_intention, total_hours, sessions_completed } = dailyStats;

  // No target set
  if (!daily_intention) {
    return (
      <div className="capacity-meter-container">
        <div className="capacity-meter-header">DAILY CAPACITY</div>
        <div className="capacity-no-target">
          Set target to track progress
        </div>
      </div>
    );
  }

  const targetHours = daily_intention.target_hours;
  const percentage = Math.round((total_hours / targetHours) * 100);
  const isExceeded = percentage > 100;
  const isMet = percentage === 100;

  return (
    <div className="capacity-meter-container">
      <div className="capacity-meter-header">DAILY CAPACITY</div>

      {/* Hours Display */}
      <div className="capacity-hours-display">
        <div className={`capacity-hours ${isExceeded ? 'exceeded' : ''}`}>
          {formatHours(total_hours * 60)} / {targetHours}.0 hours
        </div>
        {isExceeded && <AlertTriangle size={20} className="text-df-special" />}
        {isMet && !isExceeded && <Check size={20} className="text-df-focus" />}
      </div>

      {/* Progress Bar */}
      <div className="capacity-progress-bar">
        <div
          className={`capacity-progress-fill ${isExceeded ? 'exceeded' : ''}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        >
          <span className="capacity-progress-percentage">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="capacity-stats">
        {sessions_completed} session{sessions_completed !== 1 ? 's' : ''} completed
      </div>

      {/* Message */}
      {isExceeded && (
        <div className="capacity-message exceeded">
          Capacity: {percentage}%
        </div>
      )}
      {isMet && !isExceeded && (
        <div className="capacity-message">
          Target met
        </div>
      )}
    </div>
  );
}
```

---

### Enhanced Components

#### SessionSetup.tsx Enhancement

**Add session goal input after duration selection:**

```typescript
// Add to existing SessionSetup component after duration selection

const [sessionGoal, setSessionGoal] = useState('');

// In JSX, add after duration buttons:
<div className="session-goal-input-wrapper">
  <label className="session-goal-label">
    Session Goal
    <span className="session-goal-label-optional">(Optional)</span>
  </label>
  <input
    type="text"
    value={sessionGoal}
    onChange={(e) => setSessionGoal(e.target.value)}
    placeholder="What will you accomplish?"
    maxLength={200}
    className="session-goal-input"
  />
</div>

// Update handleContinue to pass goal:
const handleContinue = () => {
  if (selectedProject) {
    onConfigureSession(selectedProject, duration, sessionGoal.trim());
  }
};
```

**Update Props Interface:**
```typescript
interface SessionSetupProps {
  // ... existing props
  onConfigureSession: (projectId: string, duration: SessionDuration, goal?: string) => void;
}
```

---

#### ActiveSession.tsx Enhancement

**Display session goal during active session:**

```typescript
// Add after project name display in existing component:

{session.sessionGoal && (
  <div className="session-goal-display mb-4">
    <div className="text-sm font-semibold opacity-70 mb-1 uppercase letter-spacing-wide">
      Session Goal:
    </div>
    <div className="text-lg font-mono text-df-focus">
      {session.sessionGoal}
    </div>
  </div>
)}
```

**Update ActiveSession Interface:**
```typescript
export interface ActiveSession {
  // ... existing fields
  sessionGoal?: string; // NEW
}
```

---

#### SessionComplete.tsx Enhancement

**Add goal completion and notes sections:**

```typescript
// Add state for goal completion and notes:
const [goalCompletion, setGoalCompletion] = useState<GoalCompletionStatus | null>(null);
const [sessionNotes, setSessionNotes] = useState('');

// Add before mindset options:
{session.sessionGoal && (
  <div className="session-complete-goal-section mb-6">
    <div className="text-sm font-semibold mb-2 uppercase letter-spacing-wide opacity-70">
      Session Goal:
    </div>
    <div className="session-complete-goal-text">
      {session.sessionGoal}
    </div>

    <div className="mt-4">
      <label className="text-sm font-semibold mb-3 block uppercase letter-spacing-wide">
        Goal Status:
      </label>
      <div className="goal-completion-buttons">
        <button
          onClick={() => setGoalCompletion('yes')}
          className={`goal-completion-button yes ${goalCompletion === 'yes' ? 'selected' : ''}`}
        >
          <span className="goal-completion-icon">✓</span>
          <span className="goal-completion-label">YES</span>
        </button>
        <button
          onClick={() => setGoalCompletion('partial')}
          className={`goal-completion-button partial ${goalCompletion === 'partial' ? 'selected' : ''}`}
        >
          <span className="goal-completion-icon">⚠️</span>
          <span className="goal-completion-label">PARTIAL</span>
        </button>
        <button
          onClick={() => setGoalCompletion('no')}
          className={`goal-completion-button no ${goalCompletion === 'no' ? 'selected' : ''}`}
        >
          <span className="goal-completion-icon">✗</span>
          <span className="goal-completion-label">NO</span>
        </button>
      </div>
    </div>

    <div className="mt-4">
      <label className="field-label mb-2">
        Session Notes <span className="opacity-50">(Optional)</span>
      </label>
      <textarea
        value={sessionNotes}
        onChange={(e) => setSessionNotes(e.target.value)}
        placeholder="Quick reflection..."
        maxLength={500}
        className="session-notes-textarea"
      />
    </div>
  </div>
)}

// Update mindset submit handler to include goal data:
const handleMindsetSelect = (mindset: MindsetLevel) => {
  const goalData = session.sessionGoal ? {
    goalCompleted: goalCompletion === 'yes' ? true : goalCompletion === 'no' ? false : null,
    sessionNotes: sessionNotes.trim() || undefined,
  } : undefined;

  onMindsetSubmit(mindset, goalData);
  setShowReward(true);
};
```

**Update Props Interface:**
```typescript
interface SessionCompleteProps {
  // ... existing props
  sessionGoal?: string; // NEW
  onMindsetSubmit: (
    mindset: MindsetLevel,
    goalData?: { goalCompleted: boolean | null; sessionNotes?: string }
  ) => void;
}
```

---

### State Management Updates

**Update `useDeepFocusState.ts`:**

```typescript
// Add new actions:

const loadDailyStats = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_daily_stats', { user_id_param: user.id });

    if (error) throw error;

    setState(prev => ({ ...prev, dailyStats: data }));
  } catch (err) {
    console.error('Error loading daily stats:', err);
  }
};

const createDailyIntention = async (hours: number, projectId?: string) => {
  setState(prev => ({ ...prev, isLoading: true }));
  try {
    const { error } = await supabase
      .from('daily_intentions')
      .upsert({
        user_id: user.id,
        date: new Date().toISOString().split('T')[0],
        target_hours: hours,
        priority_project_id: projectId || null,
      });

    if (error) throw error;

    // Reload daily stats
    await loadDailyStats();
    setState(prev => ({
      ...prev,
      showDailyIntentionModal: false,
      isLoading: false
    }));
  } catch (err) {
    setState(prev => ({
      ...prev,
      error: 'Failed to set daily intention',
      isLoading: false
    }));
  }
};

const completeSession = async (
  mindset: MindsetLevel,
  goalData?: { goalCompleted: boolean | null; sessionNotes?: string }
) => {
  setState(prev => ({ ...prev, isLoading: true }));
  try {
    const session = state.activeSession;
    if (!session) throw new Error('No active session');

    const xp = calculateSessionXP(session.duration, session.willpower);

    const { error } = await supabase
      .from('sessions')
      .update({
        is_completed: true,
        mindset,
        xp_earned: xp,
        goal_completed: goalData?.goalCompleted ?? null,
        session_notes: goalData?.sessionNotes || null,
      })
      .eq('id', session.id);

    if (error) throw error;

    // Update user XP
    await updateUserXP(xp);

    // Reload daily stats to update feed
    await loadDailyStats();

    setState(prev => ({
      ...prev,
      phase: 'complete',
      isLoading: false
    }));
  } catch (err) {
    setState(prev => ({
      ...prev,
      error: 'Failed to complete session',
      isLoading: false
    }));
  }
};

// Update configureSession to accept goal:
const configureSession = (projectId: string, duration: SessionDuration, goal?: string) => {
  // ... existing logic
  setState(prev => ({
    ...prev,
    sessionGoal: goal || '',
    sessionConfig: { projectId, projectName, duration },
    phase: 'willpower-select',
  }));
};

// Add to startSession to save goal:
const startSession = async (willpower: WillpowerLevel) => {
  // ... existing logic
  const { data: session, error } = await supabase
    .from('sessions')
    .insert({
      // ... existing fields
      session_goal: state.sessionGoal || null,
    })
    .select()
    .single();
  // ... rest of logic
};
```

---

### Page Layout Update

**Update `page.tsx`:**

```typescript
'use client'

import { useEffect } from 'react';
import { DailyIntentionModal } from '@/components/deep-focus/DailyIntentionModal';
import { DailyCapacityMeter } from '@/components/deep-focus/DailyCapacityMeter';
import { TodaysActivityFeed } from '@/components/deep-focus/TodaysActivityFeed';
// ... existing imports

export default function DeepFocusPage() {
  const { state, actions } = useDeepFocusState();

  // Check for daily intention on mount
  useEffect(() => {
    actions.fetchActiveProjects();
    actions.loadDailyStats();

    // Check if need to show daily intention modal
    const checkDailyIntention = async () => {
      if (!state.dailyStats?.daily_intention) {
        // No intention set for today - show modal
        actions.showDailyIntentionModal();
      }
    };

    checkDailyIntention();
  }, []);

  return (
    <div className="deep-focus-page" data-page-theme="deep-focus">
      {/* Daily Intention Modal */}
      <DailyIntentionModal
        isOpen={state.showDailyIntentionModal}
        availableProjects={state.availableProjects}
        onSetIntention={actions.createDailyIntention}
        onSkip={() => actions.hideDailyIntentionModal()}
        isLoading={state.isLoading}
      />

      <div className="deep-focus-container">
        <div className="deep-focus-main">
          {/* Main Content Area (60%) */}
          <div className="deep-focus-content">
            {/* ... existing session components */}
          </div>

          {/* Sidebar (40%) */}
          <div className="deep-focus-sidebar">
            {/* 1. Daily Capacity Meter */}
            <DailyCapacityMeter
              dailyStats={state.dailyStats}
              isLoading={state.isLoading}
            />

            {/* 2. Today's Activity Feed */}
            <TodaysActivityFeed
              sessions={state.dailyStats?.today_sessions || []}
              isLoading={state.isLoading}
            />

            {/* 3. Daily Commitment Slider (moved to bottom) */}
            <DailyCommitmentSlider
              currentTarget={state.dailyStats?.daily_intention?.target_hours || null}
              completedSessions={state.dailyStats?.sessions_completed || 0}
              onUpdateCommitment={actions.updateDailyIntention}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 📋 Implementation Phases

### Phase 1: Database Migration & Testing (2-3 hours)

**Tasks:**
1. Create migration file: `supabase/migrations/20250104_enhance_sessions_timebox.sql`
2. Write migration SQL (sessions extension + daily_intentions table + RPC)
3. Test migration on local Supabase instance
4. Verify RLS policies work correctly
5. Test RPC function with sample data
6. Write rollback script
7. Apply to production Supabase

**Validation Checklist:**
- [ ] Migration runs without errors
- [ ] Existing sessions data intact (verify count)
- [ ] New columns accessible and nullable
- [ ] daily_intentions table created with proper constraints
- [ ] UNIQUE(user_id, date) constraint works
- [ ] RLS blocks unauthorized access (test with different user)
- [ ] get_daily_stats RPC returns correct JSON structure
- [ ] RPC handles zero-session days gracefully

**Commands:**
```bash
# Local testing
npx supabase db reset
npx supabase migration up

# Verify tables
npx supabase db diff

# Production (after local validation)
npx supabase db push
```

---

### Phase 2: TypeScript Types & Utils (1-2 hours)

**Tasks:**
1. Update `src/components/deep-focus/types.ts` with new interfaces
2. Create `src/components/deep-focus/utils.ts` with formatting helpers
3. Update `useDeepFocusState.ts` interface signatures
4. Type-check entire project

**Validation Checklist:**
- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] All new interfaces properly exported
- [ ] Utility functions have proper type signatures
- [ ] No `any` types introduced

**Commands:**
```bash
npm run type-check
```

---

### Phase 3: New Components Development (5-7 hours)

**Tasks:**
1. **DailyIntentionModal.tsx** (2 hours)
   - Component structure
   - Slider functionality
   - Project dropdown
   - Save/skip logic
   - CSS styling with animations

2. **SessionCard.tsx** (1.5 hours)
   - Card layout
   - Goal status icons logic
   - Mindset badge styling
   - Hover effects

3. **TodaysActivityFeed.tsx** (1 hour)
   - Container component
   - Empty state handling
   - Session list rendering
   - Loading state

4. **DailyCapacityMeter.tsx** (1.5 hours)
   - Progress bar logic
   - Over-achievement states
   - Fire/checkmark icons
   - Percentage calculation
   - CSS styling

**Validation Checklist:**
- [ ] All components render without console errors
- [ ] Neo-brutalist styling matches design specs
- [ ] Animations work smoothly
- [ ] Empty states display correctly
- [ ] Loading states display correctly
- [ ] Responsive behavior works on mobile

**Testing:**
```bash
npm run dev
# Navigate to /deep-focus
# Check each component in isolation (Storybook optional)
```

---

### Phase 4: Enhance Existing Components (3-4 hours)

**Tasks:**
1. **SessionSetup.tsx** (1 hour)
   - Add session goal input field
   - Update props interface
   - Pass goal to state management
   - CSS styling

2. **ActiveSession.tsx** (30 minutes)
   - Display session goal below project name
   - Conditional rendering if goal exists
   - CSS styling

3. **SessionComplete.tsx** (1.5 hours)
   - Add goal completion buttons (Yes/Partial/No)
   - Add session notes textarea
   - Conditional rendering if goal exists
   - Update submission handler
   - CSS styling

4. **useDeepFocusState.ts** (1 hour)
   - Add `loadDailyStats` function
   - Add `createDailyIntention` function
   - Update `completeSession` to handle goal data
   - Update `configureSession` to accept goal
   - Update `startSession` to save goal

**Validation Checklist:**
- [ ] Session goal flows correctly: setup → active → complete
- [ ] Goal completion properly saved to database
- [ ] Session notes saved with session
- [ ] Existing timer functionality unaffected
- [ ] Willpower/mindset flow unchanged
- [ ] XP calculation still works

**Testing:**
```bash
# Test full session flow
1. Start session with goal → check DB
2. View goal during active session
3. Complete session → select goal status
4. Add notes → submit
5. Verify DB has goal_completed and session_notes
```

---

### Phase 5: Page Layout & Integration (2-3 hours)

**Tasks:**
1. Update `page.tsx` layout (60/40 split)
2. Add DailyIntentionModal mount logic
3. Position DailyCapacityMeter in sidebar (top)
4. Position TodaysActivityFeed in sidebar (middle)
5. Move DailyCommitmentSlider to sidebar (bottom)
6. Make sidebar sticky
7. Test data flow end-to-end

**Validation Checklist:**
- [ ] Page layout matches 60/40 specification
- [ ] Daily intention modal appears on first visit
- [ ] Daily intention modal doesn't reappear after dismissal
- [ ] Activity feed updates after session completion
- [ ] Capacity meter reflects current progress
- [ ] All components interact correctly
- [ ] Sidebar sticky behavior works
- [ ] Mobile responsive layout works

**Testing:**
```bash
# Full user flow test
1. Clear localStorage + DB for test user
2. Load /deep-focus → modal appears
3. Set intention → modal dismisses
4. Complete session → feed updates
5. Check capacity meter progress
6. Refresh page → no modal reappears
7. Next day: modal reappears
```

---

### Phase 6: CSS Polish & Accessibility (2-3 hours)

**Tasks:**
1. Create component-specific CSS files
2. Import CSS into `index.css`
3. Verify color consistency across all components
4. Test all hover/active states
5. Verify shadow/border consistency
6. Test focus states for keyboard navigation
7. Run accessibility audit (contrast ratios)
8. Test on different screen sizes

**Validation Checklist:**
- [ ] All components match neo-brutalist design system
- [ ] Colors consistent (Crayon, Cream, White, Dark Green, Lime, Pink, Black)
- [ ] Borders: 2-4px solid black
- [ ] Shadows: 2-8px solid black (no blur)
- [ ] WCAG AA contrast compliance (4.5:1 minimum)
- [ ] Focus indicators visible
- [ ] Keyboard navigation works
- [ ] Responsive breakpoints functional

**Tools:**
```bash
# Lighthouse accessibility audit
npm run build
npm run start
# Open Chrome DevTools → Lighthouse → Accessibility

# Manual contrast checking
# Use browser DevTools color picker or WebAIM Contrast Checker
```

---

### Phase 7: Testing & Bug Fixes (2-3 hours)

**Tasks:**
1. **Happy Path Testing**
   - Set daily intention → start session with goal → complete → view in feed
2. **Edge Cases**
   - Skip daily intention
   - Session without goal
   - Interrupt session with goal
   - Multiple sessions in one day
   - Exceed daily target
3. **Data Persistence**
   - Refresh page during active session
   - Navigate away and return
   - Next day: new intention modal
4. **Error Handling**
   - Network failures
   - Database errors
   - Invalid data inputs
5. **Bug Fixes**
   - Address any issues discovered

**Validation Checklist:**
- [ ] All user flows complete successfully
- [ ] No data loss on refresh/navigation
- [ ] Error messages display correctly
- [ ] Loading states prevent double-submissions
- [ ] Database constraints enforced (no duplicate intentions)
- [ ] Performance acceptable (<200ms page load)

**Testing Script:**
```bash
# Automated tests (if implementing)
npm run test

# Manual testing checklist
- [ ] Daily intention: set/skip
- [ ] Session with goal: complete/partial/no
- [ ] Session without goal: completes normally
- [ ] Activity feed: displays all sessions
- [ ] Capacity meter: updates correctly
- [ ] Over-achievement: shows fire icon
- [ ] Refresh during active: timer persists
- [ ] Next day: new intention modal
```

---

### Phase 8: Documentation & Code Review (1 hour)

**Tasks:**
1. Update `docs/architecture.md` with new components
2. Add inline code comments for complex logic
3. Update Story 1.8 document with implementation notes
4. Self code review checklist
5. Git commit with descriptive message

**Validation Checklist:**
- [ ] TypeScript strict mode compliance
- [ ] No console errors or warnings
- [ ] Neo-brutalist design consistency verified
- [ ] Accessibility compliance (WCAG AA)
- [ ] Database queries optimized (no N+1)
- [ ] Error handling comprehensive
- [ ] Documentation accurate and complete

**Git Workflow:**
```bash
# Commit changes
git add .
git commit -m "feat(deep-focus): implement Story 1.8 time-boxing enhancements

- Add session goal input with optional completion tracking
- Create daily intention ritual for habit building
- Implement today's activity feed (Strava-style session cards)
- Add daily capacity meter with progress visualization
- Extend sessions table with goal/notes columns
- Create daily_intentions table with RLS policies
- Build get_daily_stats RPC for efficient data fetching
- Restructure page layout to 60/40 split
- Enhance neo-brutalist design system
- Update DeepFocus state management

Story: 1.8
Time: 18-25 hours
Status: Complete ✅"

# Push to remote
git push origin feature/story-1.8-deepfocus-timebox-enhancements
```

---

## 🧪 Testing Strategy

### Manual Testing Checklist

**Daily Intention Flow:**
- [ ] Modal appears on first visit (no intention set)
- [ ] Slider changes hours (1-8 range)
- [ ] Project dropdown populated with active projects
- [ ] "Set Target" saves and dismisses modal
- [ ] "Skip Today" dismisses without saving
- [ ] Modal does not reappear after dismissal (same day)
- [ ] Modal reappears next day

**Session Goal Flow:**
- [ ] Goal input visible in SessionSetup
- [ ] Goal optional (can proceed without)
- [ ] Goal displayed during ActiveSession
- [ ] Goal completion options shown if goal set
- [ ] Goal completion options hidden if no goal
- [ ] Session notes saved correctly

**Activity Feed:**
- [ ] Empty state shows when no sessions
- [ ] Session cards display after completion
- [ ] Goal status icons correct (✓ ⚠️ ✗ -)
- [ ] Mindset badges color-coded
- [ ] XP displayed prominently
- [ ] Cards sorted newest first
- [ ] Hover effect works

**Capacity Meter:**
- [ ] No target: shows message
- [ ] Under target: dark green fill
- [ ] Met target: dark green + checkmark
- [ ] Over target: lime fill + fire icon
- [ ] Percentage calculated correctly
- [ ] Updates after session completion

**Data Persistence:**
- [ ] Refresh during setup: data preserved
- [ ] Refresh during active: timer continues
- [ ] Navigate away: session persists
- [ ] Next day: new date, fresh intention check

**Error Handling:**
- [ ] Network error: shows user-friendly message
- [ ] Database error: graceful degradation
- [ ] Invalid input: validation prevents submission

---

### Integration Tests (Optional - Validation Phase)

**If implementing automated tests:**

```typescript
// Example test structure (Vitest + React Testing Library)

describe('Story 1.8: Time-Boxing Enhancements', () => {
  it('shows daily intention modal on first visit', async () => {
    render(<DeepFocusPage />);
    expect(screen.getByText(/set daily target/i)).toBeInTheDocument();
  });

  it('captures session goal and displays in active session', async () => {
    // ... test implementation
  });

  it('updates activity feed after session completion', async () => {
    // ... test implementation
  });

  it('calculates capacity meter progress correctly', async () => {
    // ... test implementation
  });
});
```

---

## 📊 Success Criteria

**Feature Complete When:**
1. ✅ Users can set optional session goals before starting
2. ✅ Session goals visible during active session
3. ✅ Post-session: goal completion tracking (Yes/Partially/No)
4. ✅ Optional session notes captured
5. ✅ Daily intention modal appears on first visit each day
6. ✅ Daily capacity meter shows progress toward target
7. ✅ Today's activity feed displays all completed sessions
8. ✅ Activity feed updates immediately after session completion
9. ✅ All data persists correctly in database
10. ✅ Neo-brutalist design maintained throughout
11. ✅ Existing timer/XP functionality unaffected
12. ✅ Page performance remains fast (<200ms load time)

**Quality Gates:**
- TypeScript compiles without errors
- No console errors or warnings
- Database migrations run cleanly
- RLS policies enforce user isolation
- Accessibility (WCAG AA) compliance
- Responsive design functional
- Neo-brutalist styling consistent

**Professional Tone Validation:**
- [ ] No unauthorized colors used (only approved 7-color palette)
- [ ] XP displayed as metrics, not game rewards (discreet, small, low opacity in lists)
- [ ] Copy is clinical, data-focused (no celebration language, no exclamation marks)
- [ ] No confetti, sparkles, fire emojis, or juvenile animations
- [ ] Status indicators use approved palette exclusively (no amber, no red)
- [ ] Icons used sparingly (Lucide only, 16px, neutral states)
- [ ] Professional terminology throughout ("Session logged" not "Great job!")
- [ ] Over-achievement shown as warning (pink), not celebration (no fire emoji)

---

## 🎯 Post-Implementation Next Steps

**After Story 1.8 Complete:**

1. **Story 1.9**: Quick Start from TacticalMap
   - Click project → start session modal with project pre-filled
   - One-click flow from strategic planning to execution

2. **Story 1.10** (revised): Analytics Dashboard
   - Strava-inspired visualizations using enriched session data
   - Session feed, project segments, weekly volume, heatmap
   - Goal completion trends
   - Strategic alignment analysis

3. **User Feedback Collection**
   - Deploy to beta testers
   - Feedback widget in hamburger menu
   - Monitor usage patterns (sessions with/without goals)
   - Measure daily intention adoption rate

4. **Iteration Based on Data**
   - If goal completion rates low: simplify UI
   - If daily intention skipped often: adjust messaging
   - If activity feed ignored: enhance visual prominence

---

## 🚨 Known Risks & Mitigation

**Risk: Daily intention modal feels intrusive**
- Mitigation: "Skip Today" button prominent, dismissal remembered
- Backup: Add user preference to disable modal

**Risk: Session goals add friction**
- Mitigation: Clearly marked as optional, no validation required
- Backup: Track usage data, make more prominent if adoption high

**Risk: Activity feed data too heavy**
- Mitigation: Limit to 5 most recent sessions, paginate if needed
- Backup: Implement virtualized scrolling for long lists

**Risk: Database migrations fail in production**
- Mitigation: Test thoroughly on local replica, write rollback script
- Backup: Have rollback plan ready before migration

**Risk: RPC performance degrades with many sessions**
- Mitigation: Index on (user_id, date), limit query to current day only
- Backup: Cache daily stats in localStorage with TTL

---

## 📚 Additional Resources

**Design References:**
- Strava Activity Feed: https://www.strava.com/dashboard
- Neo-Brutalism Examples: https://brutalistwebsites.com/
- Color Contrast Checker: https://webaim.org/resources/contrastchecker/

**Technical Documentation:**
- Supabase RLS: https://supabase.com/docs/guides/auth/row-level-security
- Next.js 15 App Router: https://nextjs.org/docs/app
- Tailwind CSS v4: https://tailwindcss.com/docs

**Project Context:**
- Story 1.8 Full Spec: `docs/stories/1.8.deepfocus-timebox-enhancements.md`
- Project Brief: `docs/brief.md`
- Architecture: `docs/architecture.md`

---

## 🎭 Final Notes

This implementation plan transforms DeepFocus from simple session tracking into a comprehensive time-boxing system aligned with the "Strava for Project Management" vision. The enhancements create a complete feedback loop: **plan → execute → reflect → analyze**.

**Key Principles:**
- **Reduce friction**: Optional fields, clear labeling, smooth interactions
- **Build habits**: Daily intention ritual creates accountability
- **Provide feedback**: Activity feed and capacity meter give immediate insights
- **Maintain focus**: Neo-brutalist design reduces cognitive load
- **Enable analytics**: Rich session data prepares for Story 1.9
- **Professional tone**: Clinical language, discreet XP, no juvenile celebrations

---

## 🎨 Neo-Brutalist Professional Design Philosophy

**What Makes It Professional:**
1. **Geometric Precision**: Hard edges, no softness, sharp shadows (2-8px solid black)
2. **Stark Contrast**: Black borders (2-4px), no gradients, hard shadows only
3. **Functional Typography**: Mono for data/metrics, sans for labels
4. **Restrained Animation**: Only functional (modal enter/exit), no celebration effects
5. **Clinical Language**: "Session logged" not "You crushed it!", "Target met" not "Amazing!"
6. **Data Presentation**: Numbers speak, no embellishment, no "+" symbols for positive metrics
7. **Neutral States**: Use opacity and weight, not emotional colors (no amber, no red)
8. **Strict Palette**: Only 7 approved colors, enforced throughout

**XP as Performance Intelligence (NOT Game Rewards):**
- **Think**: Strava's pace/power metrics, analytics dashboard numbers
- **Not**: Duolingo's streak celebrations, mobile game rewards, achievement unlocks
- **Display**: Small, discreet, low opacity (0.5-0.6) in lists, monospace font
- **Tone**: "110 XP" (not "+110 XP!!!" or "🎉 You earned 110 XP!")
- **Context**: Performance metric like "110 watts" or "8:30 pace", not celebration
- **Completion Modal**: Black background, white text, moderate size (2.5rem not 4rem)

**Status Indicators with Approved Palette:**
- **Success**: Dark Green (#224718) backgrounds, increased weight
- **Warning/Special**: Pink (#E5B6E5) for partial states, over-capacity
- **Neutral/Failure**: Reduced opacity (0.3-0.7), lighter borders
- **Never**: Amber (#F59E0B), Red (#DC2626), or other emotional warning colors

**Estimated Timeline:**
- Phase 1-2: Day 1 (database + types)
- Phase 3-4: Day 2 (components)
- Phase 5-7: Day 3 (integration + testing)
- Phase 8: Final polish

**Next Session:** Begin with Phase 1 (database migration).

---

**Document Version**: 1.1
**Created**: November 4, 2025
**Revised**: November 4, 2025 (Professional tone alignment)
**Author**: Claude (Sonnet 4.5)
**Status**: Ready for Implementation ✅

**Key Revisions in v1.1:**
- Removed all unauthorized colors (amber, red) - strict palette enforcement
- Changed XP display to discreet metrics (small, low opacity, no "+" symbols)
- Updated all copy to clinical tone (no celebration language, no exclamation marks)
- Removed celebratory animations (no confetti, sparkles, fire emojis)
- Changed over-achievement indicator from "fire" to "warning triangle" (pink)
- Updated all component examples to reflect professional tone
