---
rationale: Minimal Phase 1 PRD for Eugene Strat focusing on authentication and empty page structure foundation
version: 1.0.0
changelog:
  - 1.0.0: Initial minimal PRD for Phase 1 - Supabase auth + 4 empty pages with basic navigation
links:
  - docs/brief.md: Complete product vision and feature requirements
  - docs/front-end-specs.md: Detailed neo-brutalist design system and component specifications
---

# Eugene Strat Product Requirements Document (PRD)

## Goals and Background Context

### Goals

• **Basic Authentication Infrastructure**: Deliver Supabase email/password authentication enabling user access
• **Minimal Page Structure**: Create 4 empty authenticated pages with basic navigation  
• **Universal Component Placeholders**: Establish header structure with non-functional placeholder elements
• **Desktop Navigation Foundation**: Implement functional 2×2 navigation grid for page switching

### Background Context

Eugene Strat addresses the gap between strategic thinking and task execution. This Phase 1 PRD focuses on establishing the absolute minimum infrastructure—authentication and empty page structure—that will serve as foundation for future feature development.

This minimal viable foundation enables authenticated users to access the application and navigate between the four core pages, establishing the basic architecture without any business logic or complex features.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-09-10 | v1.0 | Simplified PRD for Phase 1 - auth + empty pages only | John (PM) |

## Requirements

### Functional Requirements

**FR1:** Combined landing/authentication page with Supabase email/password signup/login  
**FR2:** Four empty authenticated pages: /tactical-map, /deep-focus, /analytics, /prime  
**FR3:** Universal header on all pages with static logo text and placeholder elements  
**FR4:** Functional 2×2 navigation grid enabling page switching  
**FR5:** Page-specific header colors (TacticalMap: #FDE047, DeepFocus: #CFE820, Analytics: #E5B6E5, Prime: #2563EB)  
**FR6:** Protected routing preventing unauthenticated access to app pages  

### Non-Functional Requirements  

**NFR1:** Next.js 15 App Router with basic TypeScript setup  
**NFR2:** Supabase authentication within free tier limits  
**NFR3:** Desktop-only design with 1024px minimum width  
**NFR4:** Basic styling without complex design system  
**NFR5:** Manual testing only (no automated testing infrastructure)  

## User Interface Design Goals

### Overall UX Vision
Minimal interface establishing foundation structure. Basic styling with page-specific header colors providing visual orientation between pages.

### Core Screens and Views
**Landing/Authentication Screen**: Combined auth with neutral styling  
**TacticalMap Page**: Yellow header (#FDE047), empty page content  
**DeepFocus Page**: Yellow-green header (#CFE820), empty page content  
**Analytics Page**: Pink header (#E5B6E5), empty page content  
**Prime Page**: Blue header (#2563EB), empty page content  

### Target Device and Platforms: Desktop Only  
Desktop-exclusive with 1024px minimum width. No mobile responsiveness.

## Technical Assumptions

### Repository Structure: Monorepo
Single Next.js repository

### Service Architecture
Next.js 15 App Router with Supabase backend for authentication only

### Testing Requirements
- TypeScript type checking
- ESLint code quality  
- Manual authentication testing

### Additional Technical Assumptions
- **@supabase/supabase-js v2** for authentication
- **Basic Tailwind CSS** for minimal styling
- **No complex dependencies** (no Framer Motion, shadcn/ui, etc.)
- **Supabase RPC** only if needed for auth complexity

## Epic List

### Epic 1: Minimal Authentication & Empty Pages
Complete foundational setup with Supabase auth and four empty pages with basic navigation.

## Epic 1: Minimal Authentication & Empty Pages

**Epic Goal:** Deliver complete Phase 1 foundation: Supabase authentication, four empty pages with colored headers, and functional navigation grid.

### Story 1.1: Complete Phase 1 Foundation
As a user,  
I want to authenticate and navigate between empty application pages,  
so that I have the basic structure to build upon.

**Acceptance Criteria:**
1. **Supabase Setup**: Project created, @supabase/supabase-js v2 installed, environment variables configured
2. **Landing/Auth Page**: Combined signup/login page at / route with basic forms and validation
3. **Four Empty Pages**: Routes for /tactical-map, /deep-focus, /analytics, /prime with "Page under construction" content
4. **Protected Routing**: Authentication required for app pages, redirects work correctly
5. **Universal Header**: Logo on left, logout on right, page-specific colors (Map=#FDE047, Focus=#CFE820, Data=#E5B6E5, Prime=#2563EB)
6. **2×2 Navigation Grid**: Fixed bottom-right, functional page switching with active state highlighting
7. **Basic Styling**: Minimal CSS for desktop-only layout (1024px min-width)
