# Eugene Strat

**The Strava of Project Management** - A professional strategic visual planning tool that combines visual project prioritization with performance analytics to help you understand your strategic patterns and improve your execution practice.

## Core Vision: The Strava of Project Management

Just as Strava transforms running data into insights and motivation, Eugene Strat transforms your project work into strategic clarity and performance improvement.

**Strategic Meta-Layer Philosophy:**
Create a visual layer above traditional task management tools, focusing on the bigger picture and strategic patterns rather than managing granular details.

**Two Core Functions:**
- **STRATEGIC MAP**: Visual cost/benefit matrix for portfolio-level decision-making
- **PERFORMANCE ANALYTICS**: Track your strategic patterns and execution effectiveness over time

The tool enables the **strategic pause** before execution—deliberately assessing cost/benefit/priority before committing to track projects, creating visual clarity for better strategic decisions.

## Key Features

✅ **TacticalMap** (Complete): Interactive cost/benefit matrix for visual project prioritization
- Real-time project CRUD operations with optimistic updates
- Boss Battle system with 2x XP multipliers for priority projects
- Category-specific visual patterns (Work: dots, Learn: stripes, Build: grid, Manage: lines)
- Focus/Visible toggle system for strategic attention management
- Business terminology confidence levels (JCVD, Magna Cum, Gut Feel, etc.)

✅ **DeepFocus** (Complete): Gamified deep work sessions with willpower tracking
- Complete timer functionality (60/90/120 minutes) with persistence across navigation
- Willpower assessment system with Duke Nukem difficulty quotes
- Post-session mindset feedback ("Shaolin mode!", "Getting there", "What the heck is the zone?")
- XP rewards with variable multipliers based on willpower and duration
- Daily commitment slider with progress tracking
- Sound notifications for session completion
- Session interruption handling (10 XP reward)
🔄 **Analytics** (Planned): Strava-inspired performance insights with heatmaps and achievements
🔄 **Prime** (Future): Personal operating system with values definition
✅ **XP System** (Complete): Gamified rewards with immediate visual feedback
🔄 **Universal Capture** (Planned): GTD-inspired brain dump with CMD+K activation

## Tech Stack

- **Next.js 15** with App Router and React 19
- **TypeScript 5** with strict mode
- **Supabase** for authentication and database
- **Tailwind CSS v4** with neo-brutalist design system
- **Framer Motion v11** for animations
- **Recharts v2** for data visualizations

## Current Progress

✅ **Phase 1 Complete** - Authentication Foundation:
- Supabase email/password authentication with protected routing
- Four authenticated pages with navigation: `/tactical-map`, `/deep-focus`, `/analytics`, `/prime`
- Neo-brutalist design system with page-specific header colors (Yellow for TacticalMap)
- Universal 2×2 navigation grid with active states
- Desktop-optimized responsive design (1024px minimum)

✅ **Phase 2 Complete** - TacticalMap Strategic Visualization:

**Strategic Matrix & Project Management:**
- ✅ Interactive 800×800px cost/benefit positioning matrix
- ✅ Real-time project CRUD with Supabase integration and optimistic updates
- ✅ Project nodes with category-specific visual patterns (Work: dots, Learn: stripes, Build: grid, Manage: lines)
- ✅ Four strategic quadrants with clear positioning logic
- ✅ Priority-based visual hierarchy (gold shadows for "Must" priority projects)

**Gamification & User Experience:**
- ✅ Boss Battle system with star indicators and 2x XP multipliers
- ✅ XP system with immediate visual feedback and lighting animations
- ✅ Chart header with Focus/All toggle for attention management
- ✅ Simplified project creation modal (streamlined for rapid entry)
- ✅ Business terminology throughout (JCVD confidence levels, Focus/Visible status)

**Technical Foundation:**
- ✅ Complete database schema with RLS for projects, user_preferences, captures
- ✅ Lucide React icons replacing all emoji for professional interface
- ✅ Yellow-dominant neo-brutalist design with consistent shadows and borders
- ✅ Validation-phase testing with 30% coverage of critical user paths
- ✅ TypeScript strict mode with comprehensive type safety

✅ **Phase 3 Complete** - Modular CSS Architecture & Dynamic Theming:
- Refactored 2,068-line globals.css into Tailwind v4 modular architecture (85% reduction)
- Implemented page-specific theming system with CSS custom properties
- Created scalable component-based stylesheet organization

✅ **Phase 4 Complete** - Universal Components Enhancement (Story 1.5):
- ✅ **Enhanced Header Component** with comprehensive improvements:
  - ✅ Page-specific color theming (TacticalMap: Yellow, DeepFocus: Green, Analytics: Purple, Prime: Blue)
  - ✅ Enhanced header height (80px) for better visual weight and layout containment
  - ✅ Improved flexbox layout preventing out-of-bounds issues
  - ✅ Enhanced typography (logo: 20px, brain dump: 18px) with unified letter spacing (0.08em)
  - ✅ Semantic button element for Brain Dump with "Brain Dump ⌘+K" text
  - ✅ User account information display and logout functionality in hamburger menu
- ✅ **Quick-Nav Color Enhancement** with comprehensive color system:
  - ✅ All four page colors (Yellow, Green, Purple, Blue) visible in 48px × 48px navigation grid
  - ✅ Active/inactive opacity system (1.0 active, 0.5 inactive) with proper color inheritance
  - ✅ Enhanced hover states and consistent button sizing across all page contexts
- ✅ **XP Gauge Adaptive Theming** with page-context color adaptation and lighting animations
- ✅ **ThemeDetector Component** with Next.js 15 App Router pattern for seamless dynamic theming

✅ **Phase 5 Complete** - DeepFocus Implementation (Story 1.6):
- ✅ **Complete Timer System** with real-time countdown and localStorage persistence
- ✅ **Project Integration** with active project selection from TacticalMap
- ✅ **Willpower Assessment** with Duke Nukem-themed difficulty scaling
- ✅ **Session Management** with interrupt/complete functionality and XP rewards
- ✅ **Mindset Feedback** post-session with mood tracking for analytics
- ✅ **Daily Commitment Slider** for session target setting with progress tracking
- ✅ **Neo-brutalist Color System** optimized for cognitive load reduction during focus
- ✅ **Phase-Adaptive UI** reducing visual intensity during active sessions

🚀 **Next Phase** - Feature Expansion:
- Implement Universal Capture (GTD brain dump) with CMD+K activation
- Develop Analytics and Prime page content
- Advanced theming system with light/dark mode support

## Getting Started

1. Set up Supabase project and add environment variables to `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Install dependencies and run development server:
   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to access the authentication page

## Project Structure

```
src/
├── app/
│   ├── (protected)/           # Protected authenticated pages
│   │   ├── tactical-map/      # Strategic project matrix (complete)
│   │   ├── deep-focus/        # Deep work sessions (complete)
│   │   ├── analytics/         # Performance insights (planned)
│   │   └── prime/             # Personal OS (planned)
│   ├── auth/                  # Authentication callbacks
│   └── page.tsx              # Landing/auth page
├── components/
│   ├── auth/                  # Authentication components
│   ├── layout/                # Universal components
│   │   ├── AppHeader.tsx      # Page-specific colored headers with enhanced hamburger menu
│   │   ├── ThemeDetector.tsx  # Client component for dynamic page theme detection
│   │   ├── Navigation.tsx     # 2×2 grid navigation
│   │   ├── XpGauge.tsx        # Real-time XP display
│   │   └── HamburgerMenu.tsx  # Enhanced menu with user info and logout
│   ├── tactical-map/          # Complete TacticalMap implementation
│   │   ├── TacticalMap.tsx            # Matrix visualization
│   │   ├── ProjectNode.tsx            # Interactive project nodes
│   │   ├── ProjectModal.tsx           # Streamlined creation/editing
│   │   ├── ProjectActionsMenu.tsx     # Edit/Complete/Boss Battle
│   │   ├── AccuracyRatingSelector.tsx # Completion feedback
│   │   ├── ChartHeader.tsx            # Navigation and controls
│   │   └── useTacticalMapState.ts     # State management
│   ├── deep-focus/            # Complete DeepFocus implementation
│   │   ├── ActiveSession.tsx          # Timer countdown and session controls
│   │   ├── SessionSetup.tsx           # Project/duration/willpower selection
│   │   ├── SessionComplete.tsx        # Mindset feedback and XP rewards
│   │   ├── DailyCommitmentSlider.tsx  # Daily session target setting
│   │   ├── useDeepFocusState.ts       # State management with timer persistence
│   │   ├── useSessionTimer.ts         # Timer logic with localStorage sync
│   │   ├── types.ts                   # TypeScript definitions
│   │   └── constants.ts               # Duke Nukem quotes and XP calculations
│   └── ui/                    # Reusable UI primitives
├── __tests__/                 # Validation-phase testing
│   ├── integration/           # Complete workflow tests
│   └── smoke/                 # Basic functionality tests
└── lib/
    ├── supabase/              # Database client configurations
    └── types/                 # TypeScript definitions
        └── project.types.ts   # Complete project domain types
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production (passes with zero errors)
- `npm run lint` - Run ESLint (clean)
- `npm run test` - Run Vitest test suite (30% validation coverage)
- `npx tsc --noEmit` - Type checking (strict mode, zero errors)

## Strategic Vision

Eugene Strat represents a new category: **Strategic Project Analytics**. Like how Strava transformed running from a simple activity into a data-driven practice with community insights, Eugene Strat transforms project management from reactive task completion into strategic, visual decision-making with performance improvement.

The goal is not to replace your task manager—it's to create the strategic layer that helps you choose *which* projects deserve your focus, and then track how well your strategic instincts align with reality over time.
