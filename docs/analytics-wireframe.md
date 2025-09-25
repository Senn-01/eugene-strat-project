---
rationale: Analytics page wireframe showing compact single-screen layout, refined neo-brutalist styling, and 4 core visualizations for professional productivity dashboard
version: 0.4.0
changelog:
  - 0.4.0: UX REFINEMENT - Reduced to 4 core components in single-screen layout, softened neo-brutalist elements for professional appeal, emphasized strategic completion dots
  - 0.3.0: SIMPLIFICATION - Removed Daily Momentum Wheel component, replaced all emojis with Lucide React icons (<Trophy>, <Flame>, <Zap>, <Clock>), reduced to 5 core visualizations
  - 0.2.0: MAJOR UPDATE - Removed all mobile considerations, focused on desktop-only web app with optimized layout and interactions for 1200px+ screens
  - 0.1.0: Initial wireframe with purple-pink color scheme, simple visualizations, and ASCII layout diagrams
links:
  - docs/stories/1.7.analytics-implementation.md: Complete implementation specifications
  - docs/brief.md: Analytics requirements from core product vision
  - docs/architecture.md: Page theming and component patterns
---

# Analytics Page Wireframe

## Color Palette & Visual Identity

```
🟣 DOMINANT: #451969    (Dark Purple) - Authority, depth, strategic mastery
🩷 ACCENT:   #E5B6E5    (Pink)        - Achievement, energy, celebration
🟫 CREAM:    #F5F5DC    (Cream)       - Data clarity, breathing space
⚫ BLACK:    #000000    (Black)       - Structure, borders, emphasis
⚪ WHITE:    #FFFFFF    (White)       - Contrast, negative space
```

## Page Layout - Single-Screen Desktop Experience

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [🔹 Header: App Brand + XP Gauge + Hamburger Menu]                          │ 80px
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  COMPACT STATS BAR (Horizontal Strip)                                      │ 80px
│  [📊 3] Sessions Today  |  [⚡ 1,240] XP This Week  |  [🔥 7] Day Streak   │
│  Purple bg, white text, subtle borders (2px), no shadows                   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LEFT COLUMN (60%)          │  RIGHT COLUMN (40%)                          │
│  ┌─────────────────────────┐ │  ┌───────────────────────────────────────┐   │
│  │ 2-WEEK INTENSITY GRID   │ │  │ STRATEGIC COMPLETION DOTS             │   │ 180px
│  │ ┌─┬─┬─┬─┬─┬─┬─┐          │ │  │  10│        ●                        │   │
│  │ │🟫│🟣│🟫│🩷│🟣│🟫│🩷│     │ │  │   8│    ●       ●●                  │   │
│  │ ├─┼─┼─┼─┼─┼─┼─┤          │ │  │   6│●           ●                     │   │
│  │ │🟣│🟣│🟫│🩷│🟣│🟣│🟫│     │ │  │   4│        ●                       │   │
│  │ └─┴─┴─┴─┴─┴─┴─┘          │ │  │   2│                                 │   │
│  │ GitHub-style heatmap     │ │  │    └─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─              │   │
│  └─────────────────────────┘ │  │     2 4 6 8 10 COST                   │   │
│                              │  │  Purple intensity by project count     │   │
│  ┌─────────────────────────┐ │  └───────────────────────────────────────┘   │
│  │ FOCUS QUALITY METRICS   │ │                                              │
│  │ (This Week - 12 Sessions)│ │  ┌───────────────────────────────────────┐   │ 180px
│  │ Shaolin Mode     8      │ │  │ PERSONAL BESTS (2×2 Grid)             │   │
│  │ Getting There    3      │ │  │ ┌─────────┬─────────────────────────┐ │   │
│  │ What Zone?       1      │ │  │ │BEST DAY │ LONGEST STREAK          │ │   │
│  │ Simple counts, no %     │ │  │ │<Trophy> │ <Flame> [12] Days      │ │   │
│  └─────────────────────────┘ │  │ │   [5]   │                       │ │   │
│                              │  │ ├─────────┼─────────────────────────┤ │   │
│                              │  │ │BEST WEEK│ LONGEST SESSION         │ │   │
│                              │  │ │<Zap>    │ <Clock> [2.5h]          │ │   │
│                              │  │ │[2,840]XP│                       │ │   │
│                              │  │ └─────────┴─────────────────────────┘ │   │
│                              │  │ Pink bg, black text, soft shadows     │   │
│                              │  └───────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────────┤
│ [🔹 Fixed Navigation Grid: 2x2 quadrant - bottom right]                     │ 60px
└─────────────────────────────────────────────────────────────────────────────┘
Total Height: ~600px (fits in single viewport)
```


## Component Specifications

### 1. Compact Stats Bar

```
Horizontal Strip Layout (full width × 80px):

┌─────────────────────────────────────────────────────────────────────────────┐
│ [📊 3] Sessions Today  |  [⚡ 1,240] XP This Week  |  [🔥 7] Day Streak     │
│ Purple background #451969, white text (16px Inter Medium)                   │
│ Subtle borders (2px), no shadows, clean separation                          │
└─────────────────────────────────────────────────────────────────────────────┘
Background: Dark Purple (#451969)
Text: White (#FFFFFF), 16px Inter Medium
Borders: 2px solid black
Height: 80px (compact)
```

### 2. Two-Week Focus Grid

```
Grid Layout (280px × 120px):

S  M  T  W  T  F  S    ← Day labels (12px)
┌─┬─┬─┬─┬─┬─┬─┐
│🟫│🟣│🟫│🩷│🟣│🟫│🩷│   ← Week 1 (each cell: 35px × 35px)
├─┼─┼─┼─┼─┼─┼─┤
│🟣│🟣│🟫│🩷│🟣│🟣│🟫│   ← Week 2
└─┴─┴─┴─┴─┴─┴─┘

Colors:
🟫 Cream #F5F5DC     (0 sessions)
🟣 Light Purple      (1 session)
🩷 Pink #E5B6E5      (2 sessions)
🟣 Dark Purple       (3+ sessions)

Borders: 4px black between cells
Hover: Shows "Mon, Dec 4 - 2 sessions, 3.5 hours"
```

### 3. Strategic Completion Dots

```
10×10 Grid (400px × 400px):

BENEFIT
   10 ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐
    9 ├─┼─┼─┼─┼─┼─┼─┼●┼─┼─┤  ● Dark Purple (3+ projects)
    8 ├─┼─┼─┼●┼─┼─┼●┼●┼─┼─┤  ◐ Medium Purple (2 projects)
    7 ├─┼─┼─┼─┼─┼─┼●┼─┼─┼─┤  ○ Light Purple (1 project)
    6 ├●┼─┼─┼─┼─┼─┼●┼─┼─┼─┤
    5 ├─┼─┼●┼─┼─┼─┼─┼─┼─┼─┤
    4 ├─┼─┼─┼─┼●┼─┼─┼─┼─┼─┤
    3 ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
    2 ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
    1 └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
      1 2 3 4 5 6 7 8 9 10 COST

Dot Sizes: 8px (1 project), 12px (2-3), 16px (4+)
Grid: 1px gray lines, 2px black border
Hover: "Cost 8, Benefit 9 - 2 projects completed"
```

### 4. Personal Bests Cards (Refined)

```
2×2 Grid Layout (Subtle Design):

┌─────────────┬─────────────┐
│   BEST DAY  │  LONGEST    │ ← Pink background #E5B6E5
│ <Trophy> [5]│   STREAK    │ ← Lucide icon + number (20px, black)
│  Sessions   │<Flame> [12] │ ← Label (12px, black)
│             │    Days     │
├─────────────┼─────────────┤
│  BEST WEEK  │  LONGEST    │
│<Zap> [2,840]│  SESSION    │
│     XP      │<Clock> [2.5h│
│             │             │
└─────────────┴─────────────┘

Each card: 140px × 120px
Borders: 2px black (refined)
Shadow: 4px 4px 0px #000000 at 40% opacity (soft)
Typography: Inter Medium numbers, Inter Regular labels
```

### 5. Focus Quality Metrics

```
Weekly Mindset Breakdown (300px wide × 120px tall):

FOCUS QUALITY (This Week - 12 Sessions)
┌─────────────────────────────────┐
│ Shaolin Mode     8              │ ← High mindset sessions
│ Getting There    3              │ ← Medium mindset sessions
│ What Zone?       1              │ ← Low mindset sessions
└─────────────────────────────────┘

Background: Cream #F5F5DC
Text: Purple #451969, 14px Inter Medium
Labels: 12px Inter Regular
Numbers: Right-aligned, 14px Inter Medium
Borders: 2px black outline
```

## Neo-Brutalist Design System

### Borders & Shadows (Professional Restraint)
```
Large Components:  2-3px solid black border, 4px 4px 0px black shadow at 40% opacity
Medium Components: 2px solid black border, 3px 3px 0px black shadow at 40% opacity
Small Elements:    1px solid black border, 2px 2px 0px black shadow at 30% opacity

No rounded corners (geometric precision maintained)
Shadows are hard (no blur) but reduced opacity for sophistication
```

### Typography (Refined Professional)
```
Stats Numbers:   20px, Inter Medium, #FFFFFF on purple (reduced from 48px)
Section Headers: 18px, Inter Bold, #000000 (reduced from 24px)
Labels:          14px, Inter Medium, #000000
Small Text:      12px, Inter Regular, #666666
Icon Numbers:    16px, Inter Medium (achievement cards)
```

### Spacing
```
Page margins:     24px
Component gaps:   16px
Card padding:     20px
Grid spacing:     8px
```

### Interactions (Subtle)
```
Hover: transform: translate(-1px, -1px) + slight shadow reduction (gentle)
Click: transform: translate(1px, 1px) + shadow reduction
Focus: 2px solid purple outline (professional, not pink)
Transitions: 200ms ease-out (smooth, not jarring)
```

## Data Requirements (Simple Queries)

### Today's Stats
- Count completed sessions where date = today
- Sum XP from today's sessions

### Weekly Stats
- Count completed sessions this week (Sunday-Saturday)
- Sum XP from this week's sessions

### Streak Calculation
- Count consecutive days with at least 1 completed session
- Break if gap > 1 day

### Two-Week Grid
- Daily session counts for last 14 days
- Map to color intensity (0=cream, 1=light purple, 2=pink, 3+=dark purple)

### Completion Dots
- Group completed projects by cost×benefit coordinates
- Count projects per position
- Map count to dot size and color intensity

### Personal Bests
- MAX(daily_sessions) = Best Day
- MAX(weekly_xp) = Best Week
- MAX(streak_length) = Longest Streak
- MAX(session_duration) = Longest Session

### Focus Quality (This Week)
- Count sessions by mindset: 'high', 'medium', 'low' from sessions table
- Total completed sessions this week for header
- Simple queries using existing mindset field from DeepFocus

## Success Criteria (Refined)

🎯 **Strategic Clarity**: Users immediately understand their productivity patterns and strategic focus
⚡ **Performance**: Page loads under 2 seconds with smooth, subtle animations
🖥️ **Single-Screen Experience**: All core insights visible without scrolling (fits ~600px viewport)
📊 **Actionable Insights**: Data presentation drives strategic decisions, not just celebration
🏢 **Professional**: Sophisticated design appropriate for corporate environments
🔍 **Immediate Comprehension**: Key metrics clear within 3 seconds of page load