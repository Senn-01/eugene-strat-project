# Eugene Strat

A professional strategic visual planning tool with integrated deep work sessions and analytics.

## Core Objective

Eugene Strat aims to create a **strategic meta-layer** above traditional task and project management tools, focusing on the bigger picture and focus patterns rather than managing details.

**Two Core Functions:**
- **STRATEGIC MAP**: Visual project overview using cost/benefit positioning matrix for strategic decision-making
- **DEEP WORK**: Focused work sessions with post-session analysis to understand patterns and improve practice

The tool is designed to enable the **strategic pause** before execution—deliberately assessing cost/benefit/priority before committing to track projects, creating visual clarity for better decision-making.

## Key Features

- **TacticalMap**: Cost/benefit matrix for visual project prioritization
- **DeepFocus**: Gamified deep work sessions with willpower tracking
- **Analytics**: Strava-inspired performance insights with heatmaps and achievements
- **Prime**: Personal operating system with values definition (future)
- **XP System**: Gamified rewards for productive behaviors
- **Universal Capture**: GTD-inspired brain dump with CMD+K activation

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
- Neo-brutalist design system with page-specific header colors
- Universal 2×2 navigation grid with active states
- Desktop-only responsive design (1024px minimum)

🚀 **Phase 2 - TacticalMap Visualization** (In Progress):

🔍 **Story 1 - Core Matrix Display** (Ready for Review):
- ✅ 800×800px interactive cost/benefit positioning matrix
- ✅ Project nodes with category-specific visual patterns (Work: dots, Learn: diagonal stripes, Build: grid, Manage: horizontal stripes)
- ✅ Four strategic quadrants: No-Brainer, Breakthrough, Side-Projects, Trap-Zone
- ✅ Boss Battle priority indicators with star overlays
- ✅ SVG filters for organic hand-drawn visual effects
- ✅ Responsive design that maintains matrix integrity across screen sizes
- ✅ Complete coordinate conversion utilities for precise project positioning
- ✅ All acceptance criteria met, build/lint passes, tests implemented

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
│   ├── auth/                  # Authentication callbacks
│   └── page.tsx              # Landing/auth page
├── components/
│   ├── auth/                 # Authentication components
│   ├── layout/               # Header and navigation
│   ├── tactical-map/         # TacticalMap matrix components
│   │   ├── TacticalMap.tsx   # Main 800×800px matrix display
│   │   ├── ProjectNode.tsx   # Individual project nodes with patterns
│   │   ├── utils.ts          # Coordinate conversion utilities
│   │   └── __tests__/        # Component tests
│   └── ui/                   # Reusable UI components
└── lib/
    ├── supabase/            # Supabase client configurations
    └── types/               # TypeScript type definitions
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npx tsc --noEmit` - Type checking
