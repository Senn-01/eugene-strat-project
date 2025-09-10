# Eugene Strat PHASE 1Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Establish foundation infrastructure and authentication system for strategic visual planning tool
- Deliver core TacticalMap functionality enabling users to visualize projects on cost/benefit matrix 
- Build universal navigation and XP gamification for tactical map.
- Provide seamless authentication and onboarding experience for idea validation phase (landing page combined with login page/onboarding, no detailed yet - for phase 2)

### Background Context

Eugene Strat addresses a gap between having multiple projects and making strategic decisions about what to execute next. The application aims to provide a "strategic visual overview (map)" before execution, by assessing cost/benefit/priority to projects, user can assess their project portfolio and make decisions about what to focus on next.

This Phase 1 PRD focuses exclusively on establishing the authentication foundation and core TacticalMap visualization - the strategic heart of the application. By implementing the cost/benefit matrix with project positioning, users can immediately gain helicopter view of their initiatives and apply critical thinking to project selection. The gamified XP system, achievements system and Boss Battle prioritization add motivational elements while maintaining the professional, neo-brutalist design philosophy.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-09-08 | 1.0 | Initial PRD creation focusing on auth and TacticalMap phase | John (PM Agent) |

## Requirements

### Functional

1. **FR1**: The application provides email/password authentication using Supabase Auth with combined landing/login page
2. **FR2**: Users can create projects with required fields: name, cost (1-10), benefit (1-10), category, priority, and confidence level
3. **FR3**: The TacticalMap displays projects as visual elements positioned on a 10x10 cost/benefit matrix grid
4. **FR4**: Users can mark projects as "Boss Battle" with visual star icon (simplified logic for this phase, no double XP triggering yet)
5. **FR5**: Users can edit existing projects and update their position on the cost/benefit matrix
6. **FR6**: Users can mark projects as completed, triggering XP calculation and accuracy assessment dialog (project is removed from the matrix and updated in the database as completed. (liberate coordinate for new projects))
7. **FR7**: The XP system displays current weekly points with ⚡ icon in top-right header position
8. **FR8**: Universal navigation grid (2x2 quadrant) in bottom-right provides access to all four pages (for future page development readiness)
9. **FR9**: Project creation validates coordinate uniqueness and displays error message if position is occupied, requiring user to select different coordinates
10. **FR10**: Projects approaching deadlines (≤3 days) display gentle pulse animation for visual attention

### Non Functional

1. **NFR1**: All database operations use Supabase with Row Level Security policies ensuring user data isolation
2. **NFR2**: The application is optimized for desktop browsers (Chrome, Firefox, Safari) with modern web standards
3. **NFR3**: Page load times must not exceed 3 seconds on standard broadband connections  
4. **NFR4**: Visual design adheres to neo-brutalist principles (/docs/front-end-specs.md)
5. **NFR5**: Data persistence uses standard HTTP requests with optimistic UI updates for immediate feedback
6. **NFR6**: All user interactions provide visual feedback within 200ms response time


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

