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

🔄 **DeepFocus** (Planned): Gamified deep work sessions with willpower tracking
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

🚀 **Next Phase** - Universal Components & Global CSS Refactoring:
- Page-specific neo-brutalist color adaptation for all pages
- Breaking down 1800+ line globals.css into modular stylesheets

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
│   │   ├── deep-focus/        # Deep work sessions (planned)
│   │   ├── analytics/         # Performance insights (planned)
│   │   └── prime/             # Personal OS (future)
│   ├── auth/                  # Authentication callbacks
│   └── page.tsx              # Landing/auth page
├── components/
│   ├── auth/                  # Authentication components
│   ├── layout/                # Universal components
│   │   ├── AppHeader.tsx      # Page-specific colored headers
│   │   ├── Navigation.tsx     # 2×2 grid navigation
│   │   ├── XpGauge.tsx        # Real-time XP display
│   │   └── HamburgerMenu.tsx  # Settings and data reset
│   ├── tactical-map/          # Complete TacticalMap implementation
│   │   ├── TacticalMap.tsx            # Matrix visualization
│   │   ├── ProjectNode.tsx            # Interactive project nodes
│   │   ├── ProjectModal.tsx           # Streamlined creation/editing
│   │   ├── ProjectActionsMenu.tsx     # Edit/Complete/Boss Battle
│   │   ├── AccuracyRatingSelector.tsx # Completion feedback
│   │   ├── ChartHeader.tsx            # Navigation and controls
│   │   └── useTacticalMapState.ts     # State management
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
