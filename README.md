# Eugene Strat

**The Strava of Project Management** - A professional strategic planning tool that transforms project work into trackable, analyzable performance data. Like Strava turns runs into rich performance insights, Eugene Strat turns work sessions into strategic intelligence.

## Core Vision: The Strava of Project Management

Just as Strava transforms running data into insights and motivation, Eugene Strat transforms your project work into strategic clarity and performance improvement through visual planning and time-boxing analytics.

**Strategic Meta-Layer Philosophy:**
Create a strategic layer above task management tools (Todoist, Calendar, etc.)—not managing details, but understanding the bigger picture through time-boxing and performance analysis. Track WHERE you spend focus time and analyze if it aligns with strategic value.

**Three Core Functions:**
- **TACTICAL MAP**: Visual project overview using cost/benefit positioning - your strategic decision arena
- **TIME-BOXED SESSIONS**: Deep work sessions with pre-commitment and performance tracking - plan, execute, analyze
- **PERFORMANCE ANALYTICS**: Strava-inspired dashboard showing work patterns, project segments, and productivity trends

## Current Status

### ✅ **Completed Features**

**TacticalMap** (Story 1.5):
- Interactive cost/benefit matrix for visual project prioritization
- Real-time project CRUD operations with optimistic updates
- Boss Battle system with 2x XP multipliers for priority projects
- Category-specific visual patterns (Work: dots, Learn: stripes, Build: grid, Manage: lines)
- Focus/Visible toggle system for strategic attention management
- Business terminology confidence levels (JCVD, Magna Cum, Gut Feel, etc.)
- 20-project limit enforcement for performance

**DeepFocus - Basic Session Tracking** (Story 1.6):
- Timer functionality (60/90/120 minutes) with persistence across navigation
- Willpower assessment system with Duke Nukem difficulty quotes
- Post-session mindset feedback ("Shaolin mode!", "Getting there", "What the heck is the zone?")
- XP rewards with variable multipliers based on willpower and duration
- Daily commitment slider with progress tracking
- Sound notifications for session completion
- Session interruption handling (10 XP reward)

**Universal Components**:
- ✅ Page-specific color theming (TacticalMap: Yellow, DeepFocus: Green, Analytics: Purple, Prime: Blue)
- ✅ Enhanced header (80px) with hamburger menu, user info, logout
- ✅ XP gauge with animated real-time updates and lighting effects
- ✅ 2×2 navigation grid with active states
- ✅ Supabase email/password authentication with protected routing

### 🔄 **In Development - Idea Validation Requirements**

**Story 1.8 - DeepFocus Time-Boxing Enhancements** (Ready for implementation):
- **Session goals**: Set objectives before starting (optional, removes friction)
- **Goal completion tracking**: Did you achieve what you planned? (Yes/Partially/No)
- **Session notes**: Quick post-session reflection (optional)
- **Daily intention ritual**: First-visit modal for daily hour commitment (builds habit loop)
- **Today's activity feed**: Strava-style session cards showing completed work
- **Daily capacity meter**: Visual progress toward daily target
- **Quick Start integration**: Click project on TacticalMap → start session (removes friction)

**Story 1.9 - Analytics Strava Dashboard** (Planned after 1.8):
- Recent sessions feed (last 7 days of activity cards)
- Project segments (time invested per project, like Strava routes)
- Weekly volume chart (daily capacity patterns)
- Time-of-day heatmap (when you work best)
- Focus quality trends (mindset patterns over time)
- Strategic alignment analysis (time allocation vs. project value)
- Personal records (best day, week, session, streak)
- Achievement badges

### 🔜 **Future Enhancements**

- **Deep Focus Mode**: Strict constraints (no notifications, environment setup) for bonus XP multipliers
- **Universal Capture**: GTD-inspired brain dump with CMD+K activation
- **Prime Page**: Personal operating system with values definition and daily reflection
- **Smart Strategic Nudges**: Analytics-driven alerts for priority misalignment

## Key Concepts

**Time-Boxing Philosophy**: Like athletes plan training sessions, users pre-commit to focused work blocks. This transforms vague "I'll work on it" into concrete "2-hour time-boxed session on Project X with goal Y."

**XP System**: Gamified point system rewarding productive behaviors (focus sessions, project completions). Displayed as "⚡ Points" to users, resets weekly.

**Boss Battle**: Visual priority indicator allowing users to mark important projects with crown icon and gold highlighting. Earns 2x XP on completion.

**Strategic Pause**: The deliberate assessment step before execution—evaluating cost/benefit/priority before committing to track projects.

## Tech Stack

**Frontend:**
- Next.js 15 (App Router) with React 19
- TypeScript 5 (strict mode)
- Tailwind CSS v4 with modular CSS architecture
- Lucide React icons (16px standard, no emoji)
- react-use for state management hooks

**Backend & Database:**
- Supabase (PostgreSQL + Auth + Realtime)
- Row Level Security for all tables
- RPC functions for complex operations

**Testing:**
- Vitest for unit testing
- @testing-library/react for component testing
- Playwright (via MCP) for E2E critical user journeys
- Target: 30% coverage for validation phase

## Implementation Stories

### Completed
- ✅ **Story 1.1-1.4**: Authentication, TacticalMap foundation, UI polish
- ✅ **Story 1.5**: Universal components and enhanced theming
- ✅ **Story 1.6**: DeepFocus basic session tracking

### Ready to Implement
- 📋 **Story 1.8**: DeepFocus Time-Boxing Enhancements (18-25 hours estimated)
  - Database: Extend sessions table + create daily_intentions table
  - Frontend: 4 new components + 3 enhanced components
  - UX: Session goals, daily intentions, activity feed, capacity meter

### Planned
- 📋 **Story 1.9**: Analytics Strava Dashboard (after Story 1.8)
  - 9 core visualizations with professional neo-brutalist design
  - Dark purple/pink color system
  - Actionable insights over vanity metrics

### Deferred
- ❌ **Story 1.7**: Original analytics plan (replaced by Story 1.9)

## Database Schema

### Core Tables
- **projects**: User projects with cost/benefit positioning, status, priority
- **sessions**: Time-boxed work sessions with willpower, mindset, XP, goals (extended in Story 1.8)
- **user_preferences**: XP points, settings, daily commitments
- **captures**: GTD-style thought capture (future)
- **daily_intentions**: Daily hour commitments and priority projects (Story 1.8)

All tables have Row Level Security policies ensuring users can only access their own data.

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd eugene-strat
   npm install
   ```

2. **Set up Supabase:**
   - Create a new Supabase project
   - Run the database migrations (see `/docs/stories/` for SQL)
   - Add environment variables to `.env.local`:
     ```bash
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest test suite
- `npx tsc --noEmit` - Type checking (strict mode)

## Project Structure

```
src/
├── app/
│   ├── (protected)/              # Protected authenticated pages
│   │   ├── tactical-map/         # Strategic project matrix ✅
│   │   ├── deep-focus/           # Time-boxed sessions 🔄
│   │   ├── analytics/            # Performance dashboard 📋
│   │   └── prime/                # Personal OS (future)
│   ├── auth/callback/            # OAuth callbacks
│   └── page.tsx                  # Landing/login page
├── components/
│   ├── auth/                     # Authentication components
│   ├── layout/                   # Universal components (header, nav, XP gauge)
│   ├── tactical-map/             # Complete TacticalMap implementation
│   ├── deep-focus/               # DeepFocus components (extending in Story 1.8)
│   └── ui/                       # Reusable UI primitives
├── styles/                       # Modular CSS architecture (Tailwind v4)
│   ├── globals.css               # Core @theme definitions & imports
│   ├── base/                     # Typography & utilities
│   ├── components/               # Universal component styles
│   ├── features/                 # Page-specific feature styles
│   └── themes/                   # Page-specific theming system
└── lib/
    ├── supabase/                 # Database client configurations
    └── types/                    # TypeScript definitions
```

## Design System

**Neo-Brutalist Principles:**
- 2-4px black borders on components
- 4-8px hard shadows (no blur)
- No rounded corners (geometric precision)
- High contrast for accessibility (WCAG AA compliant)
- Page-specific color dominance

**Color Palette by Page:**
- **TacticalMap**: Yellow (#FDE047) for strategic energy
- **DeepFocus**: Dark Green (#224718) + Lime (#CFE820) for focused calm
- **Analytics**: Dark Purple (#451969) + Pink (#E5B6E5) for insights
- **Prime**: Blue (future)

## Documentation

Comprehensive documentation available in `/docs/`:

- **brief.md** - Product vision, features, validation criteria (v3.1.0)
- **architecture.md** - Technical patterns and component structure (v5.0.0)
- **stories/** - Implementation stories with detailed specifications:
  - `1.6.deepfocus-implementation.md` - Current DeepFocus baseline
  - `1.8.deepfocus-timebox-enhancements.md` - Next implementation (ready)
  - `1.9.analytics-strava-dashboard.md` - Analytics plan (after 1.8)

## Strategic Vision

Eugene Strat represents a new category: **Strategic Project Analytics**.

Like how Strava transformed running from a simple activity into a data-driven practice with community insights, Eugene Strat transforms project management from reactive task completion into strategic, visual decision-making with performance improvement.

**Core Philosophy:**
1. **Strategic Pause**: Deliberate assessment before execution
2. **Time-Boxing**: Pre-commitment to focused work blocks with specific goals
3. **Performance Intelligence**: Pattern recognition from tracked sessions
4. **Actionable Insights**: Data that drives better strategic decisions

**The Feedback Loop:**
- **Plan**: Set projects on TacticalMap, commit to daily intentions
- **Execute**: Time-box focused work with session goals
- **Analyze**: Review patterns, capacity, and strategic alignment
- **Improve**: Make data-informed adjustments to approach

The goal is not to replace your task manager—it's to create the strategic layer that helps you choose *which* projects deserve your focus, understand your execution patterns, and improve your strategic decision-making over time.

## Contributing

This project is currently in idea validation phase. Contributions and feedback are welcome!

## License

[Add your license here]

---

**Current Focus:** Implementing Story 1.8 (DeepFocus Time-Boxing Enhancements) to enrich session data before building the Analytics dashboard.
