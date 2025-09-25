---
rationale: Project brief defining vision, scope, and technical specifications for "The Strava of Project Management" - comprehensive strategic planning tool
version: 2.0.0
changelog:
  - 2.0.0: MAJOR UPDATE - Updated tech stack to match actual implementation, marked DeepFocus as complete (Story 1.6), corrected validation criteria
  - 1.0.0: Initial project brief with core concept, user journey, and idea validation criteria
links:
  - docs/architecture.md: Technical implementation details and component structure
  - README.md: Current project status and setup instructions
  - docs/stories/1.6.deepfocus-implementation.md: Complete DeepFocus implementation details
---

# Eugene Strat - Brief

## What it is

- A professional strategic visual planning tool, 'strava of project management',  with integrated deep work sessions and analytics.

- **Two Core Functions:**
  - **STRATEGIC MAP**: Visual project overview using cost/benefit positioning
  - **DEEP WORK**: deep work sessions with post-session analysis - understand your patterns, improve your practice

- We try to create a **strategic meta-layer** above task and project management tools, todoist, calendar, etc.(note: complementary to these tools, routing to them will be an option post-mvp) - not managing the details, but understanding the bigger picture and focus patterns.

- It integrates proven methodologies (GTD capture, Deep Work principles, visual project management) with elegant execution and thoughtful design. also, some gaming references/methodology (Duke Nukem quotes, XP system ("points"), etc.).

## Why This Matters

- This tool objective is to create the strategic pause before execution.
- User deliberatly needs to assess and add all his projects to the strategic map before executing them. The assessment with cost/benefit/priority is the first critical thinking step. then has the possibility to make better choices through visual clarity.
- Once user want to execute deep work sessions, he has also another tool to log those and understand his patterns through an analytics page, inspired by Strava.

## Key Concepts

**XP System**: Gamified point system rewarding productive behaviors (focus sessions, project completions). Displayed as "⚡ Points" to users, resets weekly.

**Boss Battle**: Visual priority indicator allowing users to mark important projects with crown icon and gold highlighting. Multiple projects can be marked as Boss Battle (UI-only, no XP impact).

**Strategic Pause**: The deliberate assessment step before execution—evaluating cost/benefit/priority before committing to track projects.

## Core App Features

The user experience flows through **four distinct pages**, each serving a specific purpose:

1. **TacticalMap** - Strategic project visualization on a cost/benefit scatter plot with visual prioritization
2. **DeepFocus** - deep work sessions with willpower tracking and gamified difficulty levels
3. **Analytics** - Data-driven insights with heatmaps, treemaps, and achievement tracking. (Strava like)
4. **Prime** - Personal operating system with values definition and daily reflection.

**Universal Systems** present across all paintings:

- **App Header with Capture Bar** - Brand identity and navigation menu, Frictionless thought capture with GTD-inspired triage workflow
- **XP System** - gauge (⚡ icon + points) in top-right
- **Navigation Grid** - Fixed bottom-right 2x2 quadrant for seamless page switching

### User Journey Flow

```
ONBOARD → CAPTURE → STRATEGIZE → EXECUTE → ANALYZE
    ↓         ↓          ↓          ↓         ↓
  Login → Brain Dump → TacticalMap → DeepFocus → Analytics
    ↓         ↓          ↓          ↓         ↓
Set Values → Triage → Project Mgmt → Sessions → Insights
             ↓          ↓          ↓         ↓
        Parking Lot → Boss Battle → Streaks → Records
```

## UI/UX Design Principles

1. **Visual-First Neo-Brutalism Design**
   Strategic thinking enabled through visual clarity. Clean typography hierarchy, precise grid alignment, generous whitespace, and data-focused presentation. Information architecture prioritizes immediate comprehension over progressive disclosure. Professional minimalism that eliminates cognitive friction and enables strategic decision-making at a glance.

2. **Raw**
   No cheesy motivational language, no corporate fluff. No handholding, Don't tell user what to do. He will find his way.

3. **Intuitive by Design**
   The interface teaches itself through visual enhancement. Understanding through discovery.

4. **Light Through Function**
   Clarity emerges through use.

## Target User Profile

This app speaks to **anyone** that has a list of projects and is motivated to transform ideas into concrete endeavour. this app helps them to have an helicopter view of their projects, in order to use their critical thinking to decide what's next. With the help of a tool to understand their focus patterns. Those could be :

- **Academic**: PhD students managing research, teaching, and life - need visual clarity for projects
- **Creative Professional**: Freelance designers, writers, architects
- **Knowledge Worker**: Developers, consultants, analysts - drowning in initiatives at work and side projects at home
- **Entrepreneur**: Building while maintaining day job - need to maximize limited focus time
- **Multi-Passionate**: People with diverse interests - struggling to balance learning, creating, and doing

What unites them:

- They are motivated
- Appreciation for visual organization
- Like Strava/Whoop feedback mechanism, they want to see their progress, keep tracks and improve their performance

## Idea Validation Success Criteria

### Definition of Done for Idea Validation

**It will be considered ready for idea validation when the following are operational:**

1. **Three Core pages**
   - ✅ **TacticalMap: COMPLETE** - Full implementation with chart header, project creation modal, cost/benefit matrix, and all interactions
   - ✅ **DeepFocus: COMPLETE** - Complete session tracking with willpower system, timer functionality, XP rewards, daily commitment tracking (Story 1.6)
   - 🔄 Analytics/Data: Basic visualizations (heatmaps, streaks, achievements) (placeholder - Story 2.x)

2. **Universal Components**
   - 🔄 'Brain Dump' capture bar (CMD+K activated) (placeholder - Story 2.x)
   - ✅ **XP system: COMPLETE** - Backend calculation, storage, and UI display with animated gauge fully implemented
   - ✅ Navigation grid (2x2 quadrant)
   - ✅ Consistent design across all pages

3. **Authentication & Onboarding**
   - ✅ Combined landing/login page with value proposition
   - ✅ Supabase authentication (email/password)

4. **Data Persistence**
   - ✅ **Core operational tables** (projects, captures, user_preferences)
   - ✅ **Real-time project CRUD operations** with optimistic updates
   - ✅ **Project lifecycle management** - create, edit, complete, delete
   - ✅ **XP tracking and calculation** with Boss Battle multipliers
   - ✅ **Data reset functionality** via hamburger menu
   - ✅ **20-project limit enforcement** for performance

**Notes**:

- Prime page will only have universal components for now and a brief explanation of the future features.
- Pricing/payment will not be implemented during idea validation

## Idea Validation Model

### Idea Validation Access

**Open beta approach:**

- Direct signup with Supabase auth
- Everyone who signs up can use the app
- feedback widget in hamburger menu

### Idea Validation Tester Expectations

- Regular usage (at least weekly)
- Feedback on bugs and UX issues
- Feature request submissions

## Assumptions & Risks

### Key Assumptions

- Users value strategic thinking over immediate task execution
- Visual project mapping creates behavioral change
- Gamification motivates without feeling juvenile
- Deep work sessions logging activties help user understand his patterns and improve his practice, motivating him to follow that path.

### Primary Risks

- **Adoption Risk**: Strategic pause may feel like friction vs. instant task creation
- **Engagement Risk**: Requires habit formation—what if users don't return?
- **Technical Risk**: Real-time sync complexity with Supabase scaling

### Mitigation Strategies

- Focus on immediate visual value in project mapping
- Strong onboarding emphasizing quick wins (clear and targeted explanations on the landing page)
- Progressive feature disclosure to prevent overwhelm

## Tech Stack

### Frontend

- **Next.js 15** (App Router) - Simple structure, combined landing/auth
- **React 19**
- **TypeScript 5**
- **@supabase/supabase-js v2** - Database client
- **@supabase/ssr** - Server-side rendering support
- **Tailwind CSS v4** - CSS-first configuration with modular architecture
- **lucide-react** - Icons (clean, consistent, lightweight)
- **react-use** - React hooks library for state management

### Backend & Database

- **Supabase** (PostgreSQL + Auth + Realtime)
- Row Level Security for all tables

### Testing Stack & Strategy

#### Testing Tools

- **Vitest** - Unit testing (faster than Jest, better ESM support)
- **@testing-library/react** - Component testing
- **@testing-library/user-event** - User interaction simulation
- **MSW (Mock Service Worker)** - API mocking for integration tests
- **Playwright (via MCP)** - E2E testing for critical user journeys using MCP browser automation
- **@vitest/ui** - Visual test runner

#### Quality Gates (Pre-commit & CI)

- **TypeScript** - `tsc --noEmit` for type checking
- **ESLint** - Code quality (`eslint . --ext .ts,.tsx`)
- **Prettier** - Code formatting (`prettier --check .`)
- **Vitest** - Unit/integration tests (`vitest run`)
- **Bundle size** - Track with `next-bundle-analyzer`

#### Testing Strategy: Hybrid Pragmatic Testing

**Philosophy:** Use best practics, Unit tests, Integration tests, E2E tests, Component tests, etc.
**todo** : define test coverage targets and strategies.

## Pages & Universal Components

### Universal Components Present on all Pages

Fixed top header across all pages containing:

- **Left**: text logo
- **Right**: menu icon for settings/profile/reset user datas/etc.

#### Universal Capture Bar

##### Rationale

In top header (middle position), to provide a frictionless, always-accessible method for capturing thoughts the moment they occur, adhering to the core "capture" principle of GTD. This decouples the act of capturing from the act of organizing, preventing context-switching and reducing cognitive load.

##### UX Flow

**Capture Flow:**
The capture bar sits directly in the app header, always visible across all paintings. When the user has a thought, they click (or CMD+K) on the static input bar labeled "Brain Dump". This transforms into an active textarea where they can type freely. They submit by clicking "Capture" or using Cmd/Ctrl+Enter.
Then two things happened :

1. next to "brain dump" appears a badge with "xx to triage"
2. on the TacticalMap, a hidden (if no element in it) "triage" button appears with a badge showing pending items count.
   User can decide wheneevr he want to empty his Inbox (triage queue), by clicking on the "Triage" button. (GTD principles)

##### Data Captured

**Captures Table Fields:**

- id: uuid (PK)
- user_id: uuid (FK → users.id)
- content: text (the captured thought)
- status: text ('pending', 'project', 'parking_lot', 'doing_now', 'routing', 'deleted')
- created_at: timestamp

_Simplified: Single status field directly indicates triage outcome (KISS principle)_

#### Navigation System

##### Rationale

Fixed navigation ensures users always know where they are and can quickly switch between the four pages. The 2x2 grid reinforces the spatial concepp.

##### UX Flow

A 2x2 grid sits fixed in the bottom-right corner with four quadrants: "Map" (top-left - TacticalMap page), "Focus" (top-right - DeepFocus page), "Data" (bottom-left), "Prime" (bottom-right).

The current page is highlighted.

#### XP Points Display ("points" for users)

##### Rationale

gamification rewards. The XP system provides continuous positive reinforcement for all productive behaviors. ⚡ icon with numbers in top-right corner (under header).

##### Position & Display

Fixed in top-right corner below the header, showing "⚡ 1,250 Points" format (current week's points).

##### Business Logic

When Points are earned anywhere in the app:

1. Calculate points based on the event (project completion, focus session, etc.)
2. Add to weekly total (stored as XP in database)
3. Trigger animation: number counts up from old value to new value
4. Return to static state after animation completes

The component listens for XP events from all pages and displays as "Points" to user.
Weekly reset happens Monday 00:00:00.

### Page 1: TacticalMap

#### Rationale

To provide a strategic, visual decision-making arena. This page answers, "Of all the things I could do, what should I do?" The Cost vs. Benefit matrix forces users to evaluate projects based on strategic value and priorities at ease. The triage queue and parking lot serve as essential access points for managing the flow of work. (in complement of the 'add a project' button present on the header, which opens the ProjectCreator modal)

#### Page Features

**Main View:**
The application's main page presents the Cost vs. Benefit Matrix. Projects appear as shapes on the grid. Text explanations will be parsed to reflect our design philosophy.

**Project Interactions:**

- Click on project: Opens options to edit, mark completed, or delete.
- When completed: First, a dialog box appears asking user if his cost/benefit appreciation was accurate(answer : scale 1-5, with 1=much harder than expected, 3=accurate estimate, 5=much easier than expected) (DB: 'accuracy' field)
- projects either completed or abandoned trigger relevant db updates and xp calculation.
- Boss Battle: User can designate one project at a time as Boss Battle (2x XP bonus).

**Visual Handling:**

- Projects with conflicting cost/benefit coordinates are automatically adjusted to nearest available position for visual clarity
- Visible but Inactive projects appear dimmed at 60% opacity
- Projects with approaching deadlines (≤3 days) show gentle pulse animation

**Chartheader :**
-"Cost vs Benefit Analysis" label.

- with **Buttons Controls:**
  - "Add Project" - Opens ProjectCreator modal for direct project creation
  - "Parking Lot" - Shows items from parking lot
  - "Triage (n)" - Appears when capture items are pending (rightmost position, shows badge with count)

#### Specific Modals

##### ProjectCreator Modal

###### Rationale

Provides structured project creation with guided scoring to ensure consistent evaluation. The modal helps users think strategically about effort vs impact before committing to track a project.

###### UX Flow

The modal opens when user clicks "Add Project" or chooses "Track Project" during triage. After submission, project appears on the map at coordinates.
**Field Entry Process:**

1. **Project Name** - Required, clear title
2. **Cost Score (1-10)** - With guidance:
   - 1-3: Quick wins (<5 hours) - "Could finish in one sitting"
   - 4-6: Moderate effort (5-20 hours) - "Multiple work sessions needed"
   - 7-10: Major undertaking (>20 hours) - "Significant time investment"
3. **Benefit Score (1-10)** - With guidance:
   - 1-3: Minor improvement - "Nice to have, marginal benefit"
   - 4-6: Notable progress - "Clear value, moves the needle"
   - 7-10: Game-changer - "Transformative, unlocks new possibilities"
4. **Category** - Select ONE:
   - Work: Career, clients, income-generating (DB: 'work')
   - Learn: Education, skill development (DB: 'learn')
   - Build: Creating, side ventures (DB: 'build')
   - Manage: Health, relationships, maintenance (DB: 'manage')
5. **Priority** - Choose one:
   - Must-Do (Critical/Deadline-driven) - DB: 'must'
   - Should-Do (Important but flexible) - DB: 'should'
   - Nice-to-Have (Valuable when time permits) - DB: 'nice'
6. **Due Date** - Optional date picker
7. **Description/Links** - Optional text area for context
8. **Tags** - Optional comma-separated tags for flexible categorization
9. **Status** - Select:

- Focus: Ready to work on (DB: 'active')
- Visible: Not current focus (DB: 'inactive')

11. **Confidence** - Required (last field): "Confidence level? 1-5"

- JCVD (DB: 'very_high')
- Magna Cum (DB: 'high')
- Gut feel (DB: 'medium')
- Leap Faith (DB: 'low')
- Britney Spears (DB: 'very_low')

##### Triage Modal

**Triage Flow:**
When the user decides to triage (clicking the "Triage" button on TacticalMap), a modal opens showing items one by one with these options:

- "Track project" → Opens ProjectCreator modal (same as "+ add a project" button present on "TacticalMap" page)
- "Parking Lot" → Moves to Parking Lot
- "Doing it now." → Removes from queue with reminder toast
- "Routing" → Placeholder for future integrations (Notion/Todoist/Calendar/...)
- "Delete" → Removes from system

##### ParkingLot Modal

**Rationale**
The Parking Lot is a simple list of items that the user has decided to postpone. It's a way to keep track of ideas that are not currently a priority.

### Page 2: DeepFocus

#### Rationale

To provide a dedicated, minimalist environment for deep work and execution. Once a strategic decision has been made on the Map, this page facilitates focused action on those projects, shielding the user from other distractions within the app. He can still navigate to other pages for his work, and capture new ideas.
**Important note**: Projects and deep focus are two separate entities. the only link is that user chooses a project to work on. but you can finish a project for example without having done a single deep work/focus session on it.

#### Page Features

**Main page**

1. Select project from active projects list (single project)
2. Choose session duration (60, 90, or 120 minutes)
3. Willpower level check:
   - Piece Of Cake (db: 'high' willpower)
   - Caffeinated (db: 'medium' willpower)
   - Don't Talk To Me (db: 'low' willpower)
4. "Start your session" button

**During Session:**

- Countdown timer displays
- Difficulty quote shows (based on willpower + duration with format "Your Difficulty Level : xxxx(placeholder) ")
- Project name visible (format : "Working on : xxxx " )
- Interrupt button (abandon session - no tracking, just ends and earns 10 xp)
- Universal Capture Bar remains accessible (header is always present)

**Session End:**

- **If Interrupted**: return to setup
- **If Completed**:
  - Timer completion sound (wav file in public folder)
  - Mindset check: "Were you in the zone for that session ?"
    - "Shaolin mode!" (db: 'high' mindset)
    - "Getting there" (db: 'medium' mindset)
    - "What the heck is the zone ?" (db: 'low' mindset)
  - After mindset check, button that says user :
    "Great job! Reward yourself and take a break."// new line // "you've earned xx points for this session (xp in database)"
  - Points awarded (XP in database), with visual upwardanimation.
  - Returns to main page with updated xp and sessions count of the day.

#### Difficulty & XP System

**Difficulty Quotes Matrix:**
Based on willpower + duration combination, display during session:

- "I'm Too Young to Die" (db: 'high' willpower + 60min)
- "Hey, Not Too Rough" (db: 'medium' willpower + 60min)
- "Bring It On" (db: 'high' willpower + 90min)
- "Come Get Some" (db: 'medium' willpower + 90min)
- "Damn I'm Good" (db: 'low' willpower + 60min)
- "Crunch Time" (db: 'high' willpower + 120min)
- "Balls of Steel" ⚪⚪ (db: 'medium' willpower + 120min)
- "Nightmare Deadline" (db: 'low' willpower + 90min)
- "Hail to the King" 👑 (db: 'low' willpower + 120min)

**XP Calculation (Standardized Formula):**

- **Session XP**: `(10 + duration_minutes × 0.5) × willpower_multiplier`
  - db: 'high' willpower (Piece of Cake): 1.0x
  - db: 'medium' willpower (Caffeinated): 1.5x
  - db: 'low' willpower (Don't Talk To Me): 2.0x
  - Example: 90min db: 'low' willpower = (10 + 45) × 2.0 = 110 XP
- **Interrupted Session**: Fixed 10 XP
- **Project Completion**: `cost × benefit × 10 × (boss_battle ? 2 : 1)`
  - Example: 8×9 Boss Battle = 720 × 2 = 1440 XP

### Page 3: Analytics/Data

#### Rationale

To provide clear, actionable performance data in a professional way. we will inspire from Strava for trends, charts, etc.

#### UX Flow

**Page Structure**

**1. User Stats Row**

- **Today**: Session count + total hours and xp(points)
- **This Week**: Session count + total hours and weekly xp(points)
- **Current Streak**: Consecutive days with a logged deep work sessions

**2. Weekly Activity Chart**
What user has worked on this week. (deep focus session and hours for each project)

**3. Session Heatmap**
last two weeks calendar grid (2 rows × 7 columns) showing recent activity:

- Each cell = one day
- Color intensity based on number of sessions completed
- Current day marked with border

**4. Project Completion Chart and summary**
Cost/Benefit scatter plot showing completed projects (left side):

- Same 10×10 grid as TacticalMap but way smaller.
- Each completed project = small dot at its original position
- Dot intensity increases with multiple projects at same coordinate:

**5. Personal Records**
Clean list of best performances (Best day, best week, max xp(points) in a week, longest streak)

**6. Achievements**

- Unlocked: Quote + description
- Locked: Not revealed

### Page 4: Prime

post idea validation, future features to be implemented.

## Appendix

### Achievement Triggers (10 Total for Idea Validation)

#### Rationale

simple implementation to trigger achievements for motivation and light gamification.

#### Names and Triggers: **todo** SQL are roughly done.

- "Paths are made by walking" - COUNT(captures WHERE user_id = current_user) = 1
- "Fake it until you make it." - COUNT(projects WHERE status = 'completed') = 1
- "We are what we repeatedly do. Excellence, then, is not an act, but a habit." - COUNT(projects WHERE status = 'completed') >= 10
- "The Impediment to action advances action, What stand in the way becomes the way" - EXISTS(projects WHERE cost = 10 AND status = 'completed')
- "Stop whining." - EXISTS(projects WHERE was_boss_battle = true AND confidence = 'low' AND status = 'completed')
- "La beauté sauvera le monde." - EXISTS(projects WHERE DATE(completed_at) = due_date)
- "Don't start counting until it hurts." - COUNT(week_streaks WHERE has_session = true) >= 4
- "Against all the evil that Hell can conjure, all the wickedness that mankind can produce, we will send unto them... only you. Rip and tear, until it is done." - SUM(sessions.duration WHERE date = today) >= 600
  -"Attention Is All You Need."- (COUNT(completed projects WHERE cost <= 5 AND benefit >= 5 AND status = 'completed') >5)
- "Aucun Homme ne devient bon par hasard" - (COUNT(completed projects WHERE cost > 5 AND benefit > 5 AND status = 'completed') >2)

---


