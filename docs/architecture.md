---
rationale: architecture documentation focused on current codebase structure and patterns for developer onboarding
version: 5.0.0
changelog:
  - 5.0.0: MAJOR UPDATE - DeepFocus Implementation Complete (Story 1.6) - Full timer system, session management, willpower tracking, XP rewards, daily commitment tracking, and phase-adaptive UI
  - 4.2.0: Refined Enhanced Header Component - improved font coherency, enhanced 80px height for better visual weight, semantic button elements, and comprehensive layout improvements
  - 4.1.0: Updated with Phase 4 progress - Enhanced Header Component with ThemeDetector pattern, complete page-specific theming working across all pages
  - 4.0.0: MAJOR UPDATE - CSS Architecture Refactoring complete, Tailwind v4 modular system implemented with 85% reduction in globals.css size, dynamic page theming system
  - 3.0.0: MAJOR UPDATE - TacticalMap feature complete, moved from "Partially Complete" to "Complete" status, Story 1.4 fully implemented with all UI polish and testing requirements met
  - 2.2.0: Updated TacticalMap implementation status following Story 1.4 UI polish progress - core fixes completed but design issues remain
  - 2.1.0: Added page-specific neo-brutalist color system, Lucide icon standards, and validation-phase testing approach
  - 2.0.0: Complete rewrite - simplified from verbose 628-line document to concise developer-focused guide
  - 1.0.0: Initial comprehensive architecture documentation with 7 ADRs and Phase 2 guidelines
links:
  - docs/brief.md: Product vision and strategic context - "The Strava of Project Management"
  - docs/stories/1.5.universal-components-theming.md: Current Story 1.5 with Enhanced Header Component implementation details
  - docs/stories/1.4.ui-polish-frontend-testing.md: Completed Story 1.4 with full implementation details
---

# Eugene Strat - Architecture Guide

## Overview

Eugene Strat is **"The Strava of Project Management"** - a strategic project visualization platform that combines visual project prioritization with performance analytics. Built with modern React/Next.js architecture, now featuring complete TacticalMap implementation ready for user validation.

## Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript 5 (strict mode)
- Tailwind CSS v4

**Backend & Database:**
- Supabase (PostgreSQL + Auth)
- Row Level Security (RLS)

## Project Structure

```
/src/
├── app/                              # Next.js App Router
│   ├── (protected)/                 # Route group for authenticated pages
│   │   ├── layout.tsx               # Protected layout with auth validation
│   │   ├── tactical-map/            # Strategic project matrix (complete)
│   │   ├── deep-focus/              # Deep work sessions (complete)
│   │   ├── analytics/               # Performance dashboard (placeholder)
│   │   └── prime/                   # Personal OS (placeholder)
│   ├── auth/callback/               # OAuth callback handling
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Landing/login page
├── components/                       # Reusable UI components
│   ├── auth/                        # Authentication components
│   ├── layout/                      # Layout components (enhanced header 80px height, semantic theming, nav, XP gauge)
│   ├── tactical-map/                # Complete TacticalMap feature components
│   ├── deep-focus/                  # Complete DeepFocus feature components
│   │   ├── ActiveSession.tsx        # Timer countdown and session controls
│   │   ├── SessionSetup.tsx         # Project/duration/willpower selection
│   │   ├── SessionComplete.tsx      # Mindset feedback and XP rewards
│   │   ├── DailyCommitmentSlider.tsx# Daily session target setting
│   │   ├── useDeepFocusState.ts     # State management with timer persistence
│   │   ├── useSessionTimer.ts       # Timer logic with localStorage sync
│   │   ├── types.ts                 # TypeScript definitions
│   │   └── constants.ts             # Duke Nukem quotes and XP calculations
│   └── ui/                          # Generic UI primitives
├── styles/                          # Modular CSS Architecture (Tailwind v4)
│   ├── globals.css                  # Core @theme definitions & imports (80 lines)
│   ├── base/                        # Typography & utility classes
│   ├── components/                  # Universal component styles
│   ├── features/tactical-map/       # Feature-specific styles
│   └── themes/                      # Page-specific theming system
└── lib/                             # Business logic & utilities
    ├── supabase/                    # Database client configurations
    └── types/                       # TypeScript definitions
```

## Core Architecture Patterns

### Authentication & Theming Flow
```
Browser Request → Middleware Auth Check → Protected Layout → Server User Fetch → ThemeDetector → Page Render
                       ↓                                          ↓
                 Redirect to Auth                        Client-side theme detection
                 (if unauthenticated)                   & dynamic page theming
```

### Component Organization
- **Feature-based structure**: Components grouped by domain (auth/, layout/)
- **UI primitives**: Reusable base components in ui/
- **Clear separation**: Domain-specific vs generic components

### Multi-Layer Security
1. **Middleware**: Request-level authentication validation
2. **Server Components**: Server-side user validation with RLS
3. **Client Components**: Authentication actions and form handling

## Key Architectural Decisions

**Next.js 15 App Router**: Modern routing with Server Components and better TypeScript integration

**Supabase BaaS**: PostgreSQL with built-in auth, RLS for data isolation, and real-time capabilities

**Tailwind CSS v4**: CSS-first configuration with @theme directive, modular architecture, and page-specific theming system

**Page-Specific Neo-Brutalism**: Each page maintains neo-brutalist design with unique dominant color:
- TacticalMap: Yellow (#FDE047) dominance
- DeepFocus: Yellow-Green (#CFE820) dominance
- Analytics: Pink (#E5B6E5) dominance
- Prime: Blue (#2563EB) dominance
- Consistent: Black borders, shadows, typography across all pages
- This creates visual wayfinding while maintaining design cohesion

**Lucide Icons Only**: No emoji icons in production interface - exclusively Lucide React icons with 16px standard sizing

**Feature-based Components**: Organized by domain (auth/, layout/) rather than technical concerns

**Multi-layer Auth**: Defense-in-depth with middleware, server, and client validation layers

**TypeScript Strict Mode**: Comprehensive type checking with domain-specific type organization

**Validation-Phase Testing**: Simplified testing approach focusing on 30% coverage of critical user paths during user validation phase

**React Built-in State**: useState/useContext for current needs, with planned React Query for server state

## Current Implementation Status

**✅ Complete:**
- **Authentication Foundation**: Supabase email/password authentication with protected routing
- **Navigation System**: Four authenticated pages with 2×2 grid navigation and active states
- **Neo-brutalist Design System**: Page-specific color schemes with consistent shadows and borders
- **TypeScript Configuration**: Strict mode with comprehensive type safety
- **TacticalMap Strategic Visualization** (Complete as of Story 1.4):
  - Interactive 800×800px cost/benefit positioning matrix
  - Real-time project CRUD with Supabase integration and optimistic updates
  - XP system with Boss Battle functionality and immediate visual feedback
  - Category-specific visual patterns (Work: dots, Learn: stripes, Build: grid, Manage: lines)
  - Priority-based visual hierarchy with gold shadows for "Must" projects
  - Business terminology throughout (JCVD confidence levels, Focus/Visible status)
  - Professional Lucide React icons replacing all emoji
  - Yellow-dominant color scheme with complete design system compliance
  - Chart header with Focus/All toggle and project management controls
  - Streamlined project creation modal (description removed, tags repositioned)
  - AccuracyRatingSelector with subtle gamification (no numerical XP exposure)
  - XP Gauge component with real-time updates and lighting animations
  - Validation-phase testing with 30% coverage of critical user paths

- **DeepFocus Session Management** (Complete as of Story 1.6):
  - Complete timer functionality (60/90/120 minutes) with real-time countdown
  - Timer persistence across page navigation using localStorage + timestamp sync
  - Project integration with active project selection from TacticalMap
  - Willpower assessment system with Duke Nukem-themed difficulty quotes
  - Session management with interrupt (10 XP) and complete functionality
  - Post-session mindset feedback ("Shaolin mode!", "Getting there", "What the heck is the zone?")
  - XP calculation with variable multipliers based on willpower and duration
  - Daily commitment slider with session target setting and progress tracking
  - Sound notifications for session completion (.wav file support)
  - Neo-brutalist design system optimized for cognitive load reduction
  - Phase-adaptive UI reducing visual intensity during active focus sessions

**🔄 Next Phase Features (Planned):**
- **Universal Capture**: GTD-inspired brain dump with CMD+K activation and triage workflow
- **Analytics Page**: Strava-inspired performance insights with heatmaps, treemaps, and achievements
- **Prime Page**: Personal operating system with values definition and daily reflection

✅ **Phase 3 Complete** - Modular CSS Architecture & Dynamic Theming:
- **CSS Refactoring**: Transformed 2,068-line globals.css into Tailwind v4 modular architecture (85% reduction)
- **Component-Based Styles**: Organized CSS into focused modules (base/, components/, features/, themes/)
- **Dynamic Theming**: Implemented page-specific theming system using CSS custom properties and data attributes
- **Tailwind v4 Architecture**: CSS-first configuration with @theme directive and @layer organization
- **Performance**: Maintained tree-shaking and build optimization with modular structure

✅ **Phase 4 Complete** - Universal Components Enhancement (Story 1.5):
- **Enhanced Header Component**: Page-specific color theming, enhanced 80px height, font coherency, semantic button elements, user account info and logout in hamburger menu
- **Quick-Nav Color Enhancement**: All four page colors visible with active/inactive opacity system, enhanced hover states, proper color inheritance across all pages
- **XP Gauge Adaptive Theming**: Background adapts to page colors, page-appropriate lighting animations, consistent positioning maintained
- **ThemeDetector Component**: Next.js 15 App Router pattern for dynamic client-side theming with proper Server/Client component separation

✅ **Phase 5 Complete** - DeepFocus Implementation (Story 1.6):
- **Complete Timer System**: Real-time countdown with localStorage persistence across navigation
- **Session Management**: Setup → Active → Complete workflow with interrupt handling
- **Project Integration**: Active project selection from TacticalMap with session linking
- **Willpower Assessment**: Duke Nukem difficulty scaling ("I'm Too Young to Die" to "Hail to the King")
- **XP Rewards**: Variable multipliers (1.0x to 2.0x) based on willpower and duration
- **Mindset Tracking**: Post-session feedback for analytics data collection
- **Daily Commitment**: Optional session target setting with progress indicators
- **Neo-brutalist Design**: 4-color system optimized for cognitive load reduction
- **Phase-Adaptive UI**: Reduced visual intensity during active focus sessions

**🚀 Technical Improvements (Next Priority):**
- **Feature Expansion**: Implement Universal Capture (GTD brain dump) with CMD+K activation
- **Analytics Implementation**: Transform placeholder Analytics page with session data visualization
- **Advanced Theming**: Extend theme system for light/dark mode support
- **Testing Evolution**: Transition from validation-phase (30%) to production-ready testing coverage

**🏆 Validation Ready:**
The TacticalMap feature is production-ready for user validation testing. The "Strava of Project Management" vision is clearly implemented with strategic visual project management and immediate performance feedback.

**Key Achievement**: Complete transformation from basic authentication foundation to full strategic project visualization platform in Phase 2.

## Development Guidelines

### File Conventions
- **Components**: PascalCase (AuthForm.tsx)
- **Pages**: kebab-case (tactical-map/)
- **Utilities**: camelCase

### Import Order
1. External libraries
2. Internal imports
3. Relative imports

### Icon Standards
- **Library**: Lucide React exclusively
- **Size**: 16px standard for all icons
- **Import pattern**: `import { IconName } from 'lucide-react'`
- **Accessibility**: Always include `aria-label` for interactive icons
- **NO emoji**: Never use emoji icons in production components

### Color System Guidelines
- **Page Context**: Components inherit their page's dominant color
- **TacticalMap**: Yellow (#FDE047) for all primary actions
- **Consistent Elements**: Black borders, shadows, and grey backgrounds across all pages
- **Button Hierarchy**: Primary (page color), Secondary (white), Tertiary (grey)

### Error Handling
- Always handle async operations with try-catch
- Use TypeScript for compile-time validation
- Supabase client handles SQL injection prevention

### Component Structure
```typescript
interface Props {
  // Props interface first
}

export default function Component({ ...props }: Props) {
  // Component implementation
}
```

### Testing Guidelines (Validation Phase)
- **Focus**: 30% coverage of critical user paths
- **Types**: Integration tests and smoke tests only
- **Location**: `src/__tests__/integration/` and `src/__tests__/smoke/`
- **No unit tests**: Component-level testing deferred to post-validation
- **Mock strategy**: Mock Supabase operations, test UI workflows

## Environment Configuration

Required environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Quick Start

1. **Authentication**: All routes under `(protected)/` require authentication
2. **Page Colors**: Each page has unique dominant color:
   - TacticalMap: Yellow background and yellow primary buttons
   - DeepFocus: Yellow-green background and yellow-green primary buttons
   - Analytics: Pink background and pink primary buttons
   - Prime: Blue background and blue primary buttons
3. **Navigation**: Fixed 2×2 grid in bottom-right corner with page-specific colors
4. **Icons**: Use Lucide React icons exclusively (16px, with proper aria-labels)
5. **User Data**: Fetched server-side in protected layout with RLS
6. **Testing**: Validation-phase approach with 30% coverage target
7. **New Features**: Add under `(protected)/` for automatic auth protection