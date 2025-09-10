# Eugene Strat Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Establish foundation infrastructure and authentication system for strategic visual planning tool
- Deliver core TacticalMap functionality enabling users to visualize projects on cost/benefit matrix  
- Implement basic project management CRUD operations with strategic positioning
- Create visual prioritization system (Boss Battle marking) for project focus
- Build universal navigation and XP gamification systems across application
- Provide seamless authentication and onboarding experience for idea validation phase

### Background Context

Eugene Strat addresses the critical gap between having multiple projects and making strategic decisions about what to execute next. The application creates a "strategic pause" before execution, forcing users to assess cost/benefit/priority through visual clarity rather than reactive task management.

This Phase 1 PRD focuses exclusively on establishing the authentication foundation and core TacticalMap visualization - the strategic heart of the application. By implementing the cost/benefit matrix with project positioning, users can immediately gain helicopter view of their initiatives and apply critical thinking to project selection. The gamified XP system and Boss Battle prioritization add motivational elements while maintaining the professional, neo-brutalist design philosophy.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-09-08 | 1.0 | Initial PRD creation focusing on auth and TacticalMap phase | John (PM Agent) |

## Requirements

### Functional

1. **FR1**: The application provides email/password authentication using Supabase Auth with combined landing/login page
2. **FR2**: Users can create projects with required fields: name, cost (1-10), benefit (1-10), category, priority, and confidence level
3. **FR3**: The TacticalMap displays projects as visual elements positioned on a 10x10 cost/benefit matrix grid
4. **FR4**: Users can mark one project as "Boss Battle" with visual star icon (UI state only, no database persistence)
5. **FR5**: Users can edit existing projects and update their position on the cost/benefit matrix
6. **FR6**: Users can mark projects as completed, triggering XP calculation and accuracy assessment dialog
7. **FR7**: The XP system displays current weekly points with ⚡ icon in top-right header position
8. **FR8**: Universal navigation grid (2x2 quadrant) in bottom-right provides access to all four pages
9. **FR9**: Project creation validates coordinate uniqueness and displays error message if position is occupied, requiring user to select different coordinates
d10. **FR10**: Projects approaching deadlines (≤3 days) display gentle pulse animation for visual attention

### Non Functional

1. **NFR1**: All database operations use Supabase with Row Level Security policies ensuring user data isolation
2. **NFR2**: The application is optimized for desktop browsers (Chrome, Firefox, Safari) with modern web standards
3. **NFR3**: Page load times must not exceed 3 seconds on standard broadband connections  
4. **NFR4**: Visual design adheres to neo-brutalist principles with clean typography hierarchy and generous whitespace
5. **NFR5**: Data persistence uses standard HTTP requests with optimistic UI updates for immediate feedback
6. **NFR6**: All user interactions provide visual feedback within 200ms response time
7. **NFR7**: Database schema supports future capture/triage functionality without breaking changes

## User Interface Design Goals

### Overall UX Vision

Strategic thinking enabled through visual clarity and immediate comprehension. The interface eliminates cognitive friction by presenting information with surgical precision - no progressive disclosure, no hidden complexity. Users gain helicopter view of their strategic landscape through data-focused presentation that prioritizes decision-making over decoration.

### Key Interaction Paradigms

- **Direct Manipulation**: Projects positioned through creation modal and edited via right-click context menu
- **Visual-First Strategy**: Understanding emerges through spatial relationships and visual hierarchy
- **Respecting User Intelligence**: No cheesy motivational language or unnecessary explanations - users discover functionality through intuitive interaction
- **Meaningful Animation**: Thoughtful animations enhance visual clarity by communicating state changes and relationships rather than jarring transitions

### Core Screens and Views

- **Landing/Authentication Screen**: Combined value proposition and login with clear benefit communication
- **TacticalMap**: Primary strategic visualization with cost/benefit matrix and project positioning controls  
- **Navigation Shell**: Persistent header with branding and 2x2 quadrant navigation grid
- **Empty Page Shells**: Minimal scaffolding for DeepFocus, Analytics, and Prime pages with "Coming Soon" messaging

### Accessibility: None

Phase 1 focuses on core functionality validation. Accessibility compliance will be addressed in future iterations based on user feedback and validation results.

### Branding

**Neo-Brutalist Professional Minimalism**

Raw, uncompromising visual design that eliminates unnecessary elements. Clean typography hierarchy with generous whitespace creates information architecture that prioritizes immediate comprehension. Professional aesthetic without corporate sanitization - the interface should feel powerful and direct.

**Color Strategy**: Each page features a distinct dominant color for intuitive spatial navigation - users immediately understand their location within the application through color association.

Typography choices prioritize readability and hierarchy. Visual elements serve functional purposes rather than decorative goals.

### Target Device and Platforms: Desktop Only

Optimized exclusively for desktop browsers (Chrome, Firefox, Safari) running on modern web standards. Mobile considerations explicitly deferred to post-validation phases to maintain development focus and speed.

## Technical Assumptions

### Repository Structure: Monorepo

Single repository structure containing the full-stack Next.js application. This approach simplifies deployment, versioning, and development workflow for the MVP phase while avoiding the complexity of coordinating multiple repositories.

### Service Architecture

**Next.js Full-Stack Monolith**: Single Next.js 15 application with App Router handling both frontend and API routes. Supabase serves as the backend-as-a-service, providing database, authentication, and real-time capabilities. This architecture minimizes operational complexity and accelerates development velocity for idea validation.

**Rationale**: Monolithic structure reduces architectural complexity during rapid iteration phase. Easy deployment, simplified debugging, and faster feature development. Migration to microservices can be evaluated post-validation if scaling requirements emerge.

### Testing Requirements

**Hybrid Pragmatic Testing Strategy**: 
- **Unit Tests**: Vitest for component logic and utility functions
- **Integration Tests**: @testing-library/react with MSW for API mocking
- **E2E Tests**: Playwright via MCP for critical user journeys (auth flow, project creation, TacticalMap interactions)
- **Quality Gates**: TypeScript checking, ESLint, Prettier, and automated testing in CI

**Coverage Targets**: Focus on critical paths rather than arbitrary percentage targets. Prioritize authentication, project CRUD operations, and XP calculations.

### Additional Technical Assumptions and Requests

- **Frontend Framework**: Next.js 15 with App Router for simplified routing and server components
- **Database**: PostgreSQL via Supabase with Row Level Security for user data isolation
- **Authentication**: Supabase Auth with email/password, no social login for MVP
- **State Management**: @tanstack/react-query v5 for server state, React useState for local UI state
- **Styling**: Tailwind CSS v4 with shadcn/ui v4 components customized for neo-brutalist design
- **Icons**: lucide-react for consistent, lightweight iconography
- **Animations**: Framer Motion v11 for meaningful transitions and visual feedback
- **Data Visualization**: Recharts v2 for future analytics charts (not Phase 1)
- **Deployment**: Vercel for Next.js optimization and Supabase for database hosting
- **Environment**: Node.js 18+ with modern browser support (ES2022+)
- **Package Manager**: npm for dependency management and script execution

## Epic List

**Epic 1: Foundation & Authentication System**  
Establish project infrastructure, authentication, and universal navigation shell to provide secure user access and basic application framework.

**Epic 2: TacticalMap Core Visualization**  
Implement the strategic cost/benefit matrix with basic project display, enabling users to visualize their project landscape spatially.

**Epic 3: Project Management Workflows**  
Build complete project lifecycle with creation, editing, and completion workflows, including Boss Battle prioritization system.

**Epic 4: XP Gamification System**  
Implement the motivational XP system with point calculations, visual feedback, to drive user engagement.

## Epic 1: Foundation & Authentication System

**Epic Goal**: Establish secure, functional application foundation with user authentication, database schema, and universal navigation components. Users can successfully register, login, and navigate between pages, setting the stage for all strategic planning functionality.

### Story 1.1: Complete Dependencies & Configuration

As a developer,  
I want all required dependencies installed and properly configured,  
so that I have the complete toolchain to build Eugene Strat features.

#### Acceptance Criteria

1. Supabase client (@supabase/supabase-js v2) installed and configured with MCP credential retrieval
2. TanStack Query (@tanstack/react-query v5) added for server state management  
3. shadcn/ui v4 components initialized with neo-brutalist theme customization
4. Framer Motion v11 installed for meaningful animations and transitions
5. Lucide React icons package added for consistent iconography
6. Vitest testing framework configured with @testing-library/react and @testing-library/user-event
7. MSW (Mock Service Worker) configured for API mocking in tests
8. Environment variables configured using MCP tools for Supabase credentials
9. TypeScript configuration updated for strict checking and Supabase types

### Story 1.2: Supabase Database Schema & Security via MCP

As a developer,  
I want a secure database schema with proper RLS policies using Supabase MCP tools,  
so that user data is isolated and protected according to best practices.

**note to ai coding agent** use supabase mcp to retrieve creds, migrate, etc.

### Story 1.3: Authentication System

As a user,  
I want to register and login with email/password,  
so that I can securely access my personal strategic planning data.

#### Acceptance Criteria

1. Combined landing/login page displays Eugene Strat value proposition and authentication forms
2. User registration with email/password validation, error handling, and email confirmation
3. User login with email/password authentication using Supabase Auth
4. Password reset flow with email confirmation link
5. Authentication state management using Supabase session handling
6. Protected routes redirect unauthenticated users to landing/login page
7. User session persistence across browser refreshes and tab closes
8. Logout functionality with proper session cleanup and redirect

### Story 1.4: Universal App Shell & Navigation

As a user,  
I want consistent navigation and branding across all pages,  
so that I can easily move between different parts of the application.

#### Acceptance Criteria

1. Universal header with Eugene Strat text logo on left side
2. Placeholder capture bar in center with "Brain Dump ⌘+K" label text (for future functionality)
3. Hamburger menu icon on right side of header for settings/profile access
4. 2x2 navigation grid fixed in bottom-right corner with labeled quadrants
5. Current page highlighted in navigation grid with clear visual distinction
6. Navigation routing works correctly between all four pages (TacticalMap, DeepFocus, Analytics, Prime)
7. XP points display in top-right showing "⚡ 0 Points" initially with live updates
8. Responsive layout maintained across desktop viewport sizes (1024px+)
9. Smooth page transitions using Framer Motion animations

### Story 1.5: Empty Page Scaffolding & Navigation Testing

As a user,  
I want placeholder pages for future features,  
so that I understand the complete application scope and can navigate consistently.

#### Acceptance Criteria

1. TacticalMap page shell with "Strategic Planning" content and dominant color theme
2. DeepFocus page shell with "Focus Sessions" content and distinct dominant color theme  
3. Analytics page shell with "Performance Analytics" content and distinct dominant color theme
4. Prime page shell with "Personal Operating System" content and distinct dominant color theme
5. Each page maintains universal header and navigation components consistency
6. Page-specific dominant colors clearly differentiate sections for spatial navigation
7. Typography hierarchy and spacing follow neo-brutalist design principles
8. All navigation routes functional with proper URL management and browser history

## Epic 2: TacticalMap Core Visualization

**Epic Goal**: Implement the strategic cost/benefit matrix with project display and positioning capabilities. Users can visualize their project landscape spatially and understand strategic relationships between initiatives.

### Story 2.1: Cost/Benefit Matrix Grid Display

As a user,  
I want to see a visual 10x10 cost/benefit matrix grid,  
so that I can understand the strategic framework for project positioning.

#### Acceptance Criteria

1. 10x10 grid displayed with cost (1-10) on Y-axis and benefit (1-10) on X-axis
2. Grid lines clearly visible with neo-brutalist styling and appropriate contrast
3. Axis labels clearly marked: "Cost" (vertical) and "Benefit" (horizontal)
4. Grid responsive to desktop viewport with minimum 800px width requirement
5. Grid coordinates visually accessible for project positioning reference
6. Matrix positioned centrally on TacticalMap page with appropriate margins
7. Visual hierarchy emphasizes the strategic quadrants (high benefit/low cost prioritized)
8. Grid styling consistent with overall neo-brutalist design language

### Story 2.2: Project Data Model & Database Operations

As a developer,  
I want project data properly stored and retrieved using MCP tools,  
so that project information persists securely with user isolation.

#### Acceptance Criteria

1. Projects table schema created via `mcp__supabase__apply_migration` with required fields
2. Table includes: id, user_id, name, cost, benefit, category, priority, confidence, created_at, updated_at
3. RLS policy created using `mcp__supabase__execute_sql` ensuring users only access their projects
4. CRUD operations implemented using Supabase client with TanStack Query integration
5. Coordinate uniqueness validation enforced at database level for user's projects
6. TypeScript types generated using `mcp__supabase__generate_typescript_types` for type safety
7. Database operations tested using MSW mocking for unit tests
8. Error handling implemented for constraint violations and network issues

### Story 2.3: Project Creation Modal

As a user,  
I want to create new projects through a structured form,  
so that I can add initiatives to my strategic matrix with proper evaluation.

#### Acceptance Criteria

1. Modal triggered by "Add Project" button in TacticalMap header area
2. Form fields: name (required), cost (1-10 slider), benefit (1-10 slider), category (select), priority (select), confidence (select)
3. Cost guidance provided: 1-3 (quick wins), 4-6 (moderate effort), 7-10 (major undertaking)
4. Benefit guidance provided: 1-3 (minor improvement), 4-6 (notable progress), 7-10 (game-changer)
5. Category options: Work, Learn, Build, Manage (single selection)
6. Priority options: Must-Do, Should-Do, Nice-to-Have (single selection)
7. Confidence options: JCVD, Magna Cum, Gut feel, Leap Faith, Britney Spears (single selection)
8. Coordinate uniqueness validation with clear error messaging if position occupied
9. Form submission creates project and closes modal with success feedback

### Story 2.4: Project Display on Matrix

As a user,  
I want to see my projects positioned on the cost/benefit matrix,  
so that I can visualize strategic relationships and make informed decisions.

#### Acceptance Criteria

1. Projects displayed as visual elements positioned at their cost/benefit coordinates
2. Each project shows project name as primary identifier
3. Projects styled consistently with neo-brutalist design principles
4. Visual distinction between different project categories using color or iconography
5. Projects with approaching deadlines (≤3 days) show gentle pulse animation
6. Boss Battle project displays star icon overlay (UI state only)
7. Visual handling for projects at same coordinates with slight offset positioning
8. Projects rendered using React components with proper key management for list updates

### Story 2.5: Project Interaction & Editing

As a user,  
I want to interact with projects on the matrix,  
so that I can manage and update my strategic initiatives.

#### Acceptance Criteria

1. Click on project opens context menu with options: Edit, Complete, Delete
2. Edit option opens project modification modal with pre-populated current values
3. Project updates reflected immediately on matrix with optimistic UI updates
4. Complete option triggers XP calculation and accuracy assessment dialog
5. Delete option requires confirmation before permanent removal
6. Coordinate changes validated for uniqueness with error handling
7. All project interactions provide immediate visual feedback
8. Context menu positioned appropriately to avoid viewport edge clipping

## Epic 3: Project Management Workflows

**Epic Goal**: Build complete project lifecycle management with creation, editing, and completion workflows, including Boss Battle prioritization system. Users can manage their strategic initiatives from creation through completion.

### Story 3.1: Enhanced Project Creation Workflow

As a user,  
I want a comprehensive project creation experience,  
so that I can thoroughly evaluate and strategically position new initiatives.

#### Acceptance Criteria

1. Project creation modal includes optional fields: due date, description, tags
2. Due date picker integrated for deadline tracking functionality
3. Description text area for additional context and links
4. Tags field accepts comma-separated values for flexible categorization
5. Status selection: Focus (ready to work on) or Visible (not current focus)
6. Form validation ensures required fields completed before submission
7. Real-time coordinate availability checking as cost/benefit values change
8. Modal supports keyboard navigation and accessibility standards

### Story 3.2: Boss Battle Priority System

As a user,  
I want to mark one project as "Boss Battle" priority,  
so that I can visually identify my most important current initiative.

#### Acceptance Criteria

1. Boss Battle toggle available in project context menu and creation modal
2. Only one project can be marked as Boss Battle at a time (UI enforcement)
3. Boss Battle project displays star icon overlay on matrix visualization
4. Selecting new Boss Battle automatically removes previous Boss Battle status
5. Boss Battle status persists in UI state only (no database storage for Phase 1)
6. Visual distinction clear and consistent with neo-brutalist design principles
7. Boss Battle status resets on page refresh (acceptable for Phase 1)
8. Boss Battle selection provides immediate visual feedback

### Story 3.3: Project Completion Workflow

As a user,  
I want to complete projects and assess my estimation accuracy,  
so that I can learn from my strategic planning and improve future estimates.

#### Acceptance Criteria

1. Complete action triggers accuracy assessment dialog before final completion
2. Assessment asks: "How accurate was your cost/benefit estimate?" with 1-5 scale
3. Scale options: 1 (much harder), 2 (harder), 3 (accurate), 4 (easier), 5 (much easier)
4. Completion triggers XP calculation based on cost × benefit formula
5. XP award displayed with visual animation and points counter update
6. Completed projects are removed from the matrix and updated in the database as completed. (liberate coordinate for new projects)
7. Completion data stored for future analytics and learning insights

### Story 3.4: Project Status Management

As a user,  
I want to manage project active status,  
so that I can control which initiatives are currently in focus.

#### Acceptance Criteria

1. Project status toggle between Focus (active) and Visible (inactive) states
2. Focus projects displayed at full opacity with normal visual emphasis
3. Visible projects displayed at 60% opacity to indicate inactive status
4. Status changes reflected immediately with smooth opacity transitions
5. Status filtering capabilities for viewing only Focus projects
6. Status changes persist across browser sessions via database storage
7. Visual status indicators consistent with neo-brutalist design language
8. Status management available through project context menu

## Epic 4: XP Gamification System

**Epic Goal**: Implement the motivational XP system with point calculations, visual feedback, to drive user engagement and provide positive reinforcement for productive strategic planning behaviors.

### Story 4.1: XP Calculation & Display System

As a user,  
I want to earn and see XP points for completing projects,  
so that I receive positive reinforcement for strategic planning achievements.

#### Acceptance Criteria

1. XP calculated using formula: `cost × benefit × 10` for completed projects
2. Boss Battle are only UI-only state, they do not earn XP multiplier when marked during completion (for now)
3. XP display in top-right header shows current weekly total with ⚡ icon format
4. XP counter animates upward when new points earned with smooth count animation
5. Weekly XP resets every Monday at 00:00:00 (configurable timezone)
6. XP history stored in database for future analytics
7. XP earning triggers immediate visual feedback with celebration animation
8. Point values displayed clearly during completion workflow for transparency


### Story 4.2: XP Animation & Visual Feedback

As a user,  
I want engaging visual feedback when earning XP,  
so that achievements feel rewarding and motivating.

#### Acceptance Criteria

1. XP counter displays smooth counting animation from old value to new value
3. Project completion displays XP award prominently before closing completion dialog
4. Animation timing feels natural and not disruptive to workflow
5. Visual effects consistent with meaningful animation principles (not decorative)
6. Animations performant across target desktop browsers
7. Animation preferences respect user system settings for reduced motion
8. Visual feedback provides clear cause-and-effect relationship between actions and rewards


**IMPORTANT** DOCS TO READ FOR CONTEXT : docs/brief.md and DOCS TO READ FOR FRONT-END SPECS DETAILS : docs/front-end-specs.md