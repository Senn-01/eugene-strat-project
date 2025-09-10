---
rationale: Comprehensive TypeScript PRP for Eugene Strat Phase 1 implementation with complete authentication, empty pages, and neo-brutalist design system foundation
version: 1.0.0
changelog:
  - 1.0.0: Initial comprehensive PRP with Supabase auth, Next.js 15 App Router, Tailwind CSS v4, and complete design system integration
links:
  - docs/prd.md: Phase 1 product requirements and user stories
  - docs/front-end-specs.md: Complete neo-brutalist design system and component specifications
  - docs/brief.md: Complete product vision and feature requirements
---

# Eugene Strat Phase 1 Product Requirement Prompt (PRP)

## Goal

**Feature Goal**: Deliver complete Phase 1 foundation with Supabase authentication, four empty authenticated pages with navigation, and neo-brutalist design system implementation enabling strategic project visualization.

**Deliverable**: Fully functional Next.js 15 TypeScript application with:
- Supabase email/password authentication with protected routing
- Four empty authenticated pages (/tactical-map, /deep-focus, /analytics, /prime) 
- Universal header with page-specific colors and functional 2×2 navigation grid
- Neo-brutalist design system with Tailwind CSS v4 configuration
- Desktop-only responsive design (1024px minimum width)

**Success Definition**: Authenticated users can signup/login, access all four pages, navigate between them using the 2×2 grid, see page-specific header colors, and experience the neo-brutalist design system foundation that will support future strategic visualization features.

## User Persona

**Target User**: Strategic professionals, project managers, entrepreneurs, and decision-makers who need to visualize and manage complex strategic initiatives.

**Use Case**: Primary scenario is accessing the authenticated application to navigate between strategic thinking modules (TacticalMap for project matrix, DeepFocus for concentrated work, Analytics for insights, Prime for high-value tasks).

**User Journey**: 
1. Land on combined auth page at `/` 
2. Sign up with email/password or login with existing credentials
3. Automatically redirect to protected pages after successful authentication
4. Navigate between four strategic modules using fixed 2×2 navigation grid
5. Experience consistent neo-brutalist design with page-specific visual cues

**Pain Points Addressed**: 
- Complex authentication barriers preventing quick access to strategic tools
- Lack of visual distinction between different strategic thinking modes
- Poor navigation between strategic contexts

## Why

- **Strategic Foundation**: Establishes authentication and navigation infrastructure for complex strategic visualization features
- **Design System Foundation**: Implements complete neo-brutalist design system that supports future TacticalMap matrix, project creation modals, and strategic interfaces
- **User Experience Consistency**: Creates unified experience across strategic thinking modules with clear visual hierarchy and navigation patterns
- **Technical Architecture**: Builds scalable foundation using modern Next.js 15 App Router, TypeScript strict mode, and Supabase authentication patterns

## What

**Core Authentication System:**
- Landing page with combined signup/login forms at `/` route
- Supabase email/password authentication with @supabase/ssr v2 integration
- Protected routing middleware preventing unauthorized access to app pages
- Automatic session management with secure cookie handling

**Four Empty Authenticated Pages:**
- `/tactical-map`: Strategic project matrix interface (empty placeholder)
- `/deep-focus`: Concentrated work session interface (empty placeholder) 
- `/analytics`: Strategic insights and metrics interface (empty placeholder)
- `/prime`: High-value task prioritization interface (empty placeholder)

**Universal Design System:**
- Neo-brutalist header with logo, logout, and page-specific background colors
- Fixed 2×2 navigation grid (bottom-right) with active state highlighting
- Page-specific header colors: TacticalMap (#FDE047), DeepFocus (#CFE820), Analytics (#E5B6E5), Prime (#2563EB)
- Complete Tailwind CSS v4 theme configuration with design tokens
- Desktop-only responsive design with 1024px minimum width

### Success Criteria

- [ ] Complete Supabase authentication flow (signup, login, logout, protected routes)
- [ ] All four authenticated pages accessible and protected by middleware
- [ ] Functional 2×2 navigation grid with page switching and active states
- [ ] Page-specific header colors displaying correctly
- [ ] Neo-brutalist design system fully implemented with Tailwind CSS v4
- [ ] TypeScript strict mode compliance with zero type errors
- [ ] Desktop responsive design working at 1024px+ widths
- [ ] All authentication states handled (loading, error, success, redirects)

## All Needed Context

### Context Completeness Check

_"If someone knew nothing about this codebase, would they have everything needed to implement Eugene Strat Phase 1 successfully with complete authentication, navigation, and neo-brutalist design system?"_

### Documentation & References

```yaml
# MUST READ - Supabase Authentication Documentation
- url: https://supabase.com/docs/guides/auth/server-side/nextjs
  why: Complete Next.js 15 App Router integration patterns with @supabase/ssr
  critical: Use createServerClient for Server Components, createBrowserClient for Client Components

- url: https://supabase.com/docs/guides/auth/auth-helpers/nextjs#install-the-supabase-auth-helpers-package
  why: Deprecated auth-helpers info - DO NOT USE, use @supabase/ssr instead
  critical: Avoid auth-helpers package completely, use @supabase/ssr v2

# Next.js 15 App Router Patterns  
- url: https://nextjs.org/docs/app/building-your-application/routing/middleware
  why: Protected routing implementation with middleware.ts patterns
  critical: Middleware runs on edge runtime, cookie handling must be correct

- url: https://nextjs.org/docs/app/building-your-application/authentication
  why: Authentication patterns and session management best practices
  critical: Server Components vs Client Components usage for auth

# Tailwind CSS v4 Setup
- url: https://tailwindcss.com/docs/v4-beta
  why: CSS-first configuration with @theme directive and PostCSS setup
  critical: Use @import "tailwindcss" not @tailwind directives, CSS variables with --prefix

# Design System Reference
- file: docs/front-end-specs.md
  why: Complete neo-brutalist design system with Tailwind v4 theme configuration
  pattern: All component styling, color system, typography, spacing, animations
  gotcha: Must follow exact design tokens and component specifications

# Existing Codebase Patterns
- file: src/app/layout.tsx
  why: Current Next.js 15 layout structure and font loading patterns
  pattern: Geist fonts, metadata export, layout component structure
  gotcha: Preserve existing font configuration and layout patterns

- file: package.json
  why: Current dependency versions and build scripts
  pattern: Next.js 15.5.2, React 19.1.0, TypeScript ^5, Tailwind CSS v4
  gotcha: Use exact versions, Turbopack enabled for dev and build
```

### Current Codebase Tree

```bash
.
├── .git/
├── docs/
│   ├── brief.md                    # Complete product vision
│   ├── front-end-specs.md         # Complete design system (MUST FOLLOW)
│   ├── prd.md                     # Phase 1 requirements
│   └── prd-phase-1.md
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── globals.css            # Current Tailwind v4 imports
│       ├── layout.tsx             # Root layout with Geist fonts
│       └── page.tsx               # Default Next.js homepage
├── eslint.config.mjs              # ESLint with Next.js TypeScript rules
├── next.config.ts                 # Basic Next.js configuration
├── next-env.d.ts                  # Next.js TypeScript definitions
├── package.json                   # Dependencies and scripts
├── postcss.config.mjs             # PostCSS with @tailwindcss/postcss
├── tsconfig.json                  # TypeScript strict configuration
└── tailwind.config.js             # (TO BE REMOVED - v4 uses CSS config)
```

### Desired Codebase Tree with Files to be Added

```bash
.
├── middleware.ts                  # Authentication middleware for protected routes
├── .env.local                     # Supabase environment variables
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthForm.tsx       # Combined login/signup form component
│   │   │   └── LogoutButton.tsx   # Logout functionality component
│   │   ├── layout/
│   │   │   ├── AppHeader.tsx      # Universal header with page-specific colors
│   │   │   └── Navigation.tsx     # 2×2 navigation grid component
│   │   └── ui/
│   │       └── LoadingSpinner.tsx # Loading state component
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts          # Browser Supabase client
│   │   │   ├── server.ts          # Server Supabase client  
│   │   │   └── middleware.ts      # Middleware Supabase utilities
│   │   └── types/
│   │       └── auth.types.ts      # TypeScript auth type definitions
│   └── app/
│       ├── globals.css            # Enhanced with complete design system
│       ├── layout.tsx             # Enhanced root layout
│       ├── page.tsx               # Authentication landing page
│       ├── (auth)/
│       │   └── login/
│       │       └── page.tsx       # Login page (redirect to /)
│       ├── (protected)/
│       │   ├── layout.tsx         # Protected pages layout
│       │   ├── tactical-map/
│       │   │   └── page.tsx       # TacticalMap page (empty)
│       │   ├── deep-focus/
│       │   │   └── page.tsx       # DeepFocus page (empty)
│       │   ├── analytics/
│       │   │   └── page.tsx       # Analytics page (empty)
│       │   └── prime/
│       │       └── page.tsx       # Prime page (empty)
│       └── auth/
│           └── callback/
│               └── route.ts       # Supabase auth callback handler
```

### Known Gotchas of Codebase & Library Quirks

```typescript
// CRITICAL: Supabase @supabase/ssr v2 Requirements
// Must use createServerClient for Server Components, createBrowserClient for Client Components
// Always await cookies() before creating server client
// Middleware must handle cookies properly for session persistence

// CRITICAL: Next.js 15 App Router Authentication Patterns
// Server Components can access user session directly via await supabase.auth.getUser()
// Client Components need useEffect and state management for auth
// Middleware runs on Edge Runtime - limited Node.js APIs available
// Protected routes must redirect BEFORE rendering protected content

// CRITICAL: Tailwind CSS v4 Configuration Changes
// NO tailwind.config.js file - all configuration in CSS with @theme directive
// Use @import "tailwindcss" NOT @tailwind base/components/utilities
// CSS-first configuration with CSS variables using -- prefix
// PostCSS setup required with @tailwindcss/postcss plugin

// CRITICAL: TypeScript Strict Mode Requirements  
// All interfaces must be properly typed, no any types allowed
// Next.js generates route parameter types automatically
// Supabase client methods return typed responses that must be handled
// Component props must have explicit interface definitions

// CRITICAL: Design System Implementation
// Must follow docs/front-end-specs.md exactly for all styling
// Neo-brutalist components with 4px borders, aggressive shadows, bold typography
// Page-specific header colors: TacticalMap #FDE047, DeepFocus #CFE820, Analytics #E5B6E5, Prime #2563EB
// Desktop-only design with 1024px minimum width requirement
```

## Implementation Blueprint

### Data Models and Structure

```typescript
// Core authentication and user types for type safety and consistency

// lib/types/auth.types.ts - TypeScript interfaces for authentication
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Session {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  user: User
}

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
}

// Page identification for navigation and styling
export type PageId = 'tactical-map' | 'deep-focus' | 'analytics' | 'prime'

export interface PageConfig {
  id: PageId
  title: string
  headerColor: string
  route: string
  navLabel: string
}

// Component prop interfaces
export interface AuthFormProps {
  mode: 'login' | 'signup'
  onSubmit: (email: string, password: string) => Promise<void>
  loading?: boolean
  error?: string | null
}

export interface AppHeaderProps {
  pageId: PageId
  user: User | null
}

export interface NavigationProps {
  currentPage: PageId
}
```

### Implementation Tasks (ordered by dependencies)

```yaml
Task 1: CREATE .env.local configuration
  - IMPLEMENT: Supabase environment variables setup
  - CONTENT: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
  - PATTERN: Standard Next.js environment variable naming with NEXT_PUBLIC_ prefix
  - PLACEMENT: Project root level for Next.js environment loading

Task 2: CREATE lib/types/auth.types.ts
  - IMPLEMENT: TypeScript interfaces and types for authentication domain
  - FOLLOW pattern: Strict TypeScript interfaces with explicit property types
  - NAMING: PascalCase for interfaces, camelCase for properties
  - DEPENDENCIES: None (foundation types)
  - PLACEMENT: Type definitions in lib/types/

Task 3: CREATE lib/supabase/server.ts
  - IMPLEMENT: Server-side Supabase client with @supabase/ssr
  - FOLLOW pattern: createServerClient with cookies integration
  - NAMING: createClient() function export, proper error handling
  - DEPENDENCIES: Requires environment variables from Task 1
  - PLACEMENT: Supabase utilities in lib/supabase/

Task 4: CREATE lib/supabase/client.ts
  - IMPLEMENT: Browser-side Supabase client for Client Components
  - FOLLOW pattern: createBrowserClient for browser-only usage
  - NAMING: createClient() function export, singleton pattern
  - DEPENDENCIES: Requires environment variables from Task 1
  - PLACEMENT: Supabase utilities in lib/supabase/

Task 5: CREATE lib/supabase/middleware.ts
  - IMPLEMENT: Middleware utilities for session management
  - FOLLOW pattern: Session refresh and cookie handling for middleware
  - NAMING: updateSession() function export with proper cookie handling
  - DEPENDENCIES: Import types from Task 2
  - PLACEMENT: Supabase utilities in lib/supabase/

Task 6: CREATE middleware.ts
  - IMPLEMENT: Next.js middleware for protected route authentication
  - FOLLOW pattern: Edge runtime compatible middleware with cookie handling
  - NAMING: Default export middleware function, config export for matcher
  - DEPENDENCIES: Import utilities from Task 5
  - PLACEMENT: Project root level for Next.js middleware

Task 7: ENHANCE src/app/globals.css
  - IMPLEMENT: Complete Tailwind CSS v4 theme configuration with neo-brutalist design system
  - FOLLOW pattern: docs/front-end-specs.md Tailwind v4 @theme directive configuration
  - CONTENT: All design tokens, color system, typography scale, spacing, shadows, borders
  - DEPENDENCIES: Existing globals.css as base
  - PLACEMENT: Enhance existing global styles

Task 8: CREATE components/ui/LoadingSpinner.tsx
  - IMPLEMENT: Loading state component for authentication and page transitions
  - FOLLOW pattern: Neo-brutalist styling with proper TypeScript props
  - NAMING: LoadingSpinner component with size and color props
  - DEPENDENCIES: Use design system from Task 7
  - PLACEMENT: Reusable UI components in components/ui/

Task 9: CREATE components/auth/AuthForm.tsx
  - IMPLEMENT: Combined login/signup form with validation and Supabase integration
  - FOLLOW pattern: Client Component with form handling and error states
  - NAMING: AuthForm component with proper TypeScript props interface
  - DEPENDENCIES: Import client from Task 4, types from Task 2, styling from Task 7
  - PLACEMENT: Authentication components in components/auth/

Task 10: CREATE components/auth/LogoutButton.tsx
  - IMPLEMENT: Logout functionality with session clearing
  - FOLLOW pattern: Client Component with Supabase signOut and redirect
  - NAMING: LogoutButton component with neo-brutalist styling
  - DEPENDENCIES: Import client from Task 4, styling from Task 7
  - PLACEMENT: Authentication components in components/auth/

Task 11: CREATE components/layout/AppHeader.tsx
  - IMPLEMENT: Universal header with page-specific colors and logout functionality
  - FOLLOW pattern: docs/front-end-specs.md header specifications
  - NAMING: AppHeader component with PageId props for color styling
  - DEPENDENCIES: Import LogoutButton from Task 10, types from Task 2, styling from Task 7
  - PLACEMENT: Layout components in components/layout/

Task 12: CREATE components/layout/Navigation.tsx
  - IMPLEMENT: Fixed 2×2 navigation grid with active state highlighting
  - FOLLOW pattern: docs/front-end-specs.md navigation grid specifications
  - NAMING: Navigation component with current page highlighting
  - DEPENDENCIES: Import types from Task 2, styling from Task 7
  - PLACEMENT: Layout components in components/layout/

Task 13: UPDATE src/app/page.tsx
  - IMPLEMENT: Authentication landing page with combined signup/login
  - FOLLOW pattern: Server Component with auth state checking and form rendering
  - NAMING: Default page export with proper metadata
  - DEPENDENCIES: Import AuthForm from Task 9, server client from Task 3
  - PLACEMENT: Root page route in app/

Task 14: CREATE app/(protected)/layout.tsx
  - IMPLEMENT: Protected pages layout with header and navigation
  - FOLLOW pattern: Server Component with user authentication verification
  - NAMING: Layout component with children prop and auth checks
  - DEPENDENCIES: Import header from Task 11, navigation from Task 12, server client from Task 3
  - PLACEMENT: Protected route group layout

Task 15: CREATE protected page components
  - IMPLEMENT: Four empty authenticated pages with page-specific styling
  - FOLLOW pattern: docs/front-end-specs.md page specifications with "under construction" content
  - NAMING: Page components with proper metadata export and page identification
  - DEPENDENCIES: Protected layout from Task 14
  - PLACEMENT: app/(protected)/tactical-map/page.tsx, deep-focus/page.tsx, analytics/page.tsx, prime/page.tsx

Task 16: CREATE app/auth/callback/route.ts
  - IMPLEMENT: Supabase authentication callback handler for email confirmation
  - FOLLOW pattern: Next.js App Router API route handler with proper redirects
  - NAMING: GET route handler with token verification and redirect logic
  - DEPENDENCIES: Import server client from Task 3
  - PLACEMENT: API route handler in app/auth/callback/
```

### Implementation Patterns & Key Details

```typescript
// Critical patterns and gotchas - focus on non-obvious details

// Server Component Authentication Pattern
// app/(protected)/layout.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  // CRITICAL: Always check auth in Server Components
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/') // Redirect to auth page if not authenticated
  }

  return (
    <div className="min-h-screen bg-crayon-grey">
      <AppHeader pageId={getCurrentPageId()} user={user} />
      <main className="min-w-[1024px]">
        {children}
      </main>
      <Navigation currentPage={getCurrentPageId()} />
    </div>
  )
}

// Client Component Form Pattern  
// components/auth/AuthForm.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function AuthForm({ mode = 'login' }: AuthFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = mode === 'signup' 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      window.location.href = '/tactical-map' // Redirect after auth
    }
    
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-md">
      {/* Neo-brutalist form styling from design system */}
    </form>
  )
}

// Middleware Pattern
// middleware.ts
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

// Page-Specific Header Color Pattern
// components/layout/AppHeader.tsx
const PAGE_CONFIGS: Record<PageId, PageConfig> = {
  'tactical-map': {
    id: 'tactical-map',
    title: 'Tactical Map',
    headerColor: '#FDE047', // Yellow
    route: '/tactical-map',
    navLabel: 'MAP'
  },
  'deep-focus': {
    id: 'deep-focus', 
    title: 'Deep Focus',
    headerColor: '#CFE820', // Yellow-Green
    route: '/deep-focus',
    navLabel: 'FOC'
  },
  'analytics': {
    id: 'analytics',
    title: 'Analytics', 
    headerColor: '#E5B6E5', // Pink
    route: '/analytics',
    navLabel: 'DAT'
  },
  'prime': {
    id: 'prime',
    title: 'Prime',
    headerColor: '#2563EB', // Blue  
    route: '/prime',
    navLabel: 'PRI'
  }
}

// Navigation Grid Pattern with Active States
// components/layout/Navigation.tsx
export function Navigation({ currentPage }: NavigationProps) {
  return (
    <nav className="quick-nav">
      {Object.values(PAGE_CONFIGS).map((page) => (
        <Link
          key={page.id}
          href={page.route}
          className={cn(
            'nav-button',
            `nav-${page.id}`,
            currentPage === page.id && 'active'
          )}
        >
          <span className="nav-label">{page.navLabel}</span>
        </Link>
      ))}
    </nav>
  )
}
```

### Integration Points

```yaml
SUPABASE:
  - project: "Create new Supabase project at https://supabase.com"
  - auth: "Enable email authentication, disable confirmations for development"
  - env: "Copy project URL and anon key to .env.local"
  - table: "Users table created automatically by Supabase Auth"

ENVIRONMENT:
  - file: .env.local
  - variables: |
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

ROUTES:
  - auth: "/" (landing page with combined auth)
  - protected: "/tactical-map", "/deep-focus", "/analytics", "/prime"
  - callback: "/auth/callback" for Supabase email confirmations
  - middleware: "Protects all routes except auth and static assets"

STYLING:
  - system: "Complete neo-brutalist design system from docs/front-end-specs.md"
  - configuration: "Tailwind CSS v4 with @theme directive in globals.css"
  - components: "All components follow brutal styling with 4px borders, shadows, bold typography"
```

## Validation Loop

### Level 1: Syntax & Style (Immediate Feedback)

```bash
# Run after each file creation - fix before proceeding
npm run lint                    # ESLint checks with Next.js TypeScript rules
npx tsc --noEmit               # TypeScript type checking (no JS output)  
npm run dev                    # Start development server for testing

# Project-wide validation
npm run build                  # Full Next.js production build with TypeScript validation

# Expected: Zero errors. If errors exist, READ output and fix before proceeding.
```

### Level 2: Authentication Testing (Component Validation)

```bash
# Test authentication flow manually
npm run dev &
sleep 5  # Allow Next.js startup time

# Test auth landing page
curl -I http://localhost:3000/
# Expected: 200 OK response with auth form

# Test protected route redirect (unauthenticated)
curl -I http://localhost:3000/tactical-map
# Expected: 302 redirect to auth page

# Test Supabase connection
curl -X POST http://localhost:3000/auth/callback \
  -H "Content-Type: application/json" \
  -d '{"token_hash": "test", "type": "signup"}' \
  | jq .
# Expected: Proper error handling, no 500 errors

# Manual authentication testing required:
# 1. Sign up with new email - should redirect to tactical-map
# 2. Log out - should redirect to auth page  
# 3. Log in with existing credentials - should access protected pages
# 4. Test navigation between all four pages
# 5. Verify page-specific header colors display correctly
```

### Level 3: Integration Testing (System Validation)

```bash
# Production build validation
npm run build
# Expected: Successful build with no TypeScript errors or warnings

# Page rendering validation 
curl http://localhost:3000/tactical-map | grep -q "Under Construction"
curl http://localhost:3000/deep-focus | grep -q "Under Construction"  
curl http://localhost:3000/analytics | grep -q "Under Construction"
curl http://localhost:3000/prime | grep -q "Under Construction"
# Expected: All protected pages render with placeholder content

# Design system validation
curl http://localhost:3000/ | grep -q "FDE047\|CFE820\|E5B6E5\|2563EB"
# Expected: Page-specific colors present in rendered HTML

# Responsive design validation
curl -H "User-Agent: Mozilla/5.0" http://localhost:3000/ | grep -q "min-w-\[1024px\]"
# Expected: Desktop-first responsive classes present
```

### Level 4: Creative & Domain-Specific Validation

```bash
# Authentication Security Validation
# Test session persistence across page reloads
# Test logout functionality clears sessions properly
# Test protected route middleware blocks unauthenticated access
# Test Supabase JWT token validation and refresh

# Design System Validation  
# Verify neo-brutalist components match docs/front-end-specs.md exactly
# Test page-specific header colors for all four pages
# Verify 2×2 navigation grid positioning and active states
# Test desktop minimum width requirement (1024px)

# TypeScript Strict Mode Compliance
npx tsc --noEmit --strict        # Strict TypeScript checking
# Expected: Zero type errors, proper interface definitions

# Next.js 15 App Router Validation
# Test Server Component vs Client Component usage
# Verify middleware runs correctly on protected routes  
# Test route group organization for (auth) and (protected)
```

## Final Validation Checklist

### Technical Validation

- [ ] All 4 validation levels completed successfully
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No linting errors: `npm run lint`
- [ ] Production build succeeds: `npm run build`
- [ ] Development server runs: `npm run dev`

### Authentication Validation

- [ ] Supabase connection established and working
- [ ] Sign up flow creates user and redirects properly
- [ ] Login flow authenticates and redirects properly
- [ ] Logout flow clears session and redirects to auth page
- [ ] Protected routes blocked for unauthenticated users
- [ ] Middleware correctly redirects unauthorized access
- [ ] Session persistence works across page reloads

### Feature Validation

- [ ] All four protected pages accessible and rendering
- [ ] Page-specific header colors display correctly:
  - TacticalMap: #FDE047 (Yellow)
  - DeepFocus: #CFE820 (Yellow-Green)  
  - Analytics: #E5B6E5 (Pink)
  - Prime: #2563EB (Blue)
- [ ] 2×2 Navigation grid positioned correctly (bottom-right)
- [ ] Navigation grid shows active state for current page
- [ ] All pages show "Under Construction" placeholder content

### Design System Validation

- [ ] Complete neo-brutalist design system implemented
- [ ] Tailwind CSS v4 @theme directive configuration working
- [ ] All components follow brutal styling (4px borders, shadows, bold typography)
- [ ] Desktop-first responsive design working (1024px+ minimum)
- [ ] Typography scale and spacing system consistent
- [ ] Component styling matches docs/front-end-specs.md specifications

### Code Quality Validation

- [ ] TypeScript strict mode compliance with proper interface definitions
- [ ] Server Components used for auth checks and static content
- [ ] Client Components used only for interactive elements
- [ ] Proper error handling for all authentication states
- [ ] File structure matches desired codebase tree
- [ ] Environment variables properly configured
- [ ] No hardcoded values that should be configuration

---

## Anti-Patterns to Avoid

- ❌ Don't use deprecated @supabase/auth-helpers - use @supabase/ssr v2
- ❌ Don't create tailwind.config.js - use CSS @theme directive for Tailwind v4
- ❌ Don't use @tailwind directives - use @import "tailwindcss" for v4
- ❌ Don't trust client-side auth state in Server Components - always verify server-side
- ❌ Don't skip middleware cookie handling - session persistence will break
- ❌ Don't use any types - maintain TypeScript strict mode compliance
- ❌ Don't ignore docs/front-end-specs.md - all styling must follow design system
- ❌ Don't make pages responsive below 1024px - desktop-only requirement
- ❌ Don't hardcode colors - use design system CSS variables
- ❌ Don't create complex features - Phase 1 is authentication and empty pages only

**Confidence Score**: 9/10 for one-pass TypeScript implementation success likelihood

This comprehensive PRP provides everything needed to implement Eugene Strat Phase 1 successfully with complete authentication, protected routing, navigation, and neo-brutalist design system foundation using Next.js 15, TypeScript, Supabase, and Tailwind CSS v4.