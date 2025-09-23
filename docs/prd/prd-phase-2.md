---
rationale: Streamlined Product Requirements Document for Eugene Strat Phase 2, focusing on TacticalMap chart component implementation and project creation modal functionality built upon Phase 1 authentication foundation
version: 0.3.0
changelog:
  - 0.3.0: Simplified architectural decisions - reduced component architecture from 20 to 6 components, replaced service classes with simple functions, streamlined utility documentation
  - 0.2.0: Simplified PRD structure - consolidated 6 verbose user stories across 4 epics into 2 focused deliverables with bullet-point requirements
  - 0.1.0: Initial Phase 2 PRD - TacticalMap matrix visualization, project creation modal, database schema, and placeholder systems for future features
links:
  - docs/brief.md: Complete product vision and strategic context (lines 95-98 for TacticalMap requirements)
  - docs/front-end-specs.md: Neo-brutalist design system specifications (lines 424-784 TacticalMap, lines 786-1180 Modal)
  - docs/prd-phase-1.md: Phase 1 authentication foundation requirements
  - PRPs/eugene-strat-phase1.md: Phase 1 implementation patterns and established architecture
---

# Eugene Strat Phase 2 Product Requirements Document (PRD)

## Executive Summary

Eugene Strat Phase 2 transforms the Phase 1 authentication foundation into a functional strategic visualization platform through **two core deliverables**: the TacticalMap visualization component and the project creation system.

**Deliverable Focus**: 800×800px cost/benefit matrix with project nodes, comprehensive modal-based project creation/editing, and basic management workflows (edit/complete/prioritize).

**Technology Foundation**: Next.js 15, TypeScript strict mode, Supabase database, Tailwind CSS v4, building directly on established Phase 1 authentication and navigation infrastructure.

**Scope Boundaries**: No weekly XP reset, no complex achievements system, no universal capture bar implementation. Includes placeholder buttons for Triage/Parking Lot future functionality.

## Goals and Background Context

### Goals

**Goal 1: TacticalMap Visualization** - Deliver functional 800×800px cost/benefit matrix with visual project positioning, category patterns, and Boss Battle prioritization system

**Goal 2: Project Creation System** - Complete modal-based project creation/editing with structured assessment, form validation, and position conflict resolution

**Goal 3: Management Foundation** - Database schema, XP calculation, and placeholder buttons for future Phase 3 features (Triage/Parking Lot)

### Background Context

Phase 1 established authentication infrastructure and empty page navigation. Phase 2 builds the core strategic visualization engine that enables users to assess and position projects systematically.

Per `docs/brief.md:19-21`, the strategic pause before execution requires deliberate cost/benefit assessment through visual clarity. The TacticalMap serves as the primary interface for this strategic decision-making process.

## Requirements

### Functional Requirements

**FR1**: TacticalMap Matrix - 800×800px cost/benefit visualization with 32×32px project nodes, quadrant labels, and category-specific visual patterns

**FR2**: Project Modal System - 900×700px creation/editing interface with form validation, position conflict detection, and required assessment fields

**FR3**: Project Management - Click interactions for edit/complete/prioritize, Boss Battle toggle, XP calculation, and accuracy rating workflow

**FR4**: Database & Placeholders - Projects/captures tables with RLS policies, plus placeholder buttons for future Triage/Parking Lot features

### Non-Functional Requirements

**NFR1**: Design System Compliance
- Strict adherence to neo-brutalist specifications per `docs/front-end-specs.md`
- 4px black borders, aggressive shadows, bold typography throughout
- Page-specific header colors: TacticalMap (#FDE047) per `docs/front-end-specs.md:20`

**NFR2**: Technical Standards
- TypeScript strict mode compliance with zero type errors
- Desktop-only responsive design (1024px minimum width)
- Comprehensive unit test coverage (70% target)
- Supabase RLS policies securing all user data

## Core Deliverables

### Deliverable 1: TacticalMap Visualization Component

Complete implementation of the main strategic visualization interface with project management capabilities.

**Requirements:**
- **Matrix Display**: 800×800px cost/benefit matrix with 10×10 grid positioning system
- **Project Nodes**: 32×32px rectangles with category-specific visual patterns:
  - Work: Dot pattern | Learn: Diagonal stripes | Build: Grid pattern | Manage: Horizontal stripes
- **Quadrant System**: Labels for No-Brainer, Breakthrough, Side-Projects, Trap-Zone with axis labels
- **Visual Hierarchy**: Boss Battle projects display gold star overlay with animation
- **Project Interactions**: Click opens management options (Edit/Complete/Boss Battle toggle)
- **Project Management**: 
  - Edit modal with same fields as creation
  - Completion workflow with accuracy rating (1-5 scale) and XP calculation: `cost × benefit × 10 × (boss_battle ? 2 : 1)`
  - Boss Battle toggle (multiple projects allowed) with visual star indicator
- **Visual States**: Active projects at 100% opacity, inactive at 60% opacity
- **Header Controls**: "Add Project" button, placeholder Triage/Parking Lot buttons

### Deliverable 2: Project Creation & Management System

Modal-based project creation and validation system with comprehensive form handling.

**Requirements:**
- **Modal Layout**: 900×700px bento-grid design per front-end specifications
- **Core Fields**: Name, cost/benefit (1-10 scales with guidance text), category (2×2 grid), priority, status
- **Assessment Guidance**:
  - Cost: 1-3 "Quick wins", 4-6 "Moderate effort", 7-10 "Major undertaking" 
  - Benefit: 1-3 "Minor improvement", 4-6 "Notable progress", 7-10 "Game-changer"
- **Confidence Scale**: 5-option scale (JCVD/Magna Cum/Gut feel/Leap Faith/Britney Spears)
- **Optional Fields**: Tags (comma-separated), due date, description textarea
- **Form Validation**: 
  - Required field validation with real-time feedback
  - Position conflict detection (prevent duplicate cost/benefit coordinates)
  - Error recovery with clear correction guidance
  - Form persistence during validation errors
- **Success Flow**: Immediate matrix placement after creation with coordinate positioning

**Placeholder Systems:**
- Triage button (header) with count badge when captures exist → placeholder modal
- Parking Lot button (header) → placeholder modal
- Simple modals explaining "Coming in Phase 3" with design system consistency

## Technical Requirements

### Database Schema ✅ MIGRATED

#### Projects Table
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL CHECK (length(name) > 0),
    description TEXT DEFAULT '',
    cost INTEGER NOT NULL CHECK (cost >= 1 AND cost <= 10),
    benefit INTEGER NOT NULL CHECK (benefit >= 1 AND benefit <= 10),
    category TEXT NOT NULL CHECK (category IN ('work', 'learn', 'build', 'manage')),
    priority TEXT NOT NULL CHECK (priority IN ('must', 'should', 'nice')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
    confidence TEXT NOT NULL CHECK (confidence IN ('very_high', 'high', 'medium', 'low', 'very_low')),
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    due_date DATE,
    is_boss_battle BOOLEAN DEFAULT FALSE,
    accuracy_rating INTEGER CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
    xp_earned INTEGER, -- XP calculated when project completed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    -- Partial unique constraint - coordinates freed when project completed
    UNIQUE(user_id, cost, benefit) WHERE (status != 'completed')
);

-- RLS Policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (auth.uid() = user_id);
```

#### Captures Table (Triage Foundation)
```sql
CREATE TABLE captures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL CHECK (length(content) > 0),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'project', 'parking_lot', 'doing_now', 'routing', 'deleted')),
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE captures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own captures" ON captures FOR ALL USING (auth.uid() = user_id);
```

#### User Preferences Table (XP Storage)
```sql
CREATE TABLE user_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    xp_points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own preferences" ON user_preferences FOR ALL USING (auth.uid() = user_id);
```

### TypeScript Interfaces

```typescript
// Core project management types
export interface Project {
  id: string
  user_id: string
  name: string
  description: string
  cost: number // 1-10
  benefit: number // 1-10
  category: 'work' | 'learn' | 'build' | 'manage'
  priority: 'must' | 'should' | 'nice'
  status: 'active' | 'inactive' | 'completed' | 'archived'
  confidence: 'very_high' | 'high' | 'medium' | 'low' | 'very_low'
  tags: string[]
  due_date?: string
  is_boss_battle: boolean
  accuracy_rating?: number // 1-5, only for completed projects
  created_at: string
  updated_at: string
  completed_at?: string
}

export interface ProjectFormData {
  name: string
  description: string
  cost: string // Form handles as string, converts to number
  benefit: string
  category: Project['category'] | ''
  priority: Project['priority'] | ''
  status: 'active' | 'inactive'
  confidence: Project['confidence'] | ''
  tags: string // Comma-separated, converted to array
  due_date: string
}

export interface ProjectPosition {
  x: number // Direct pixel position (40-760px on 800px matrix)
  y: number // Direct pixel position (40-760px, inverted Y-axis)
}

export interface Capture {
  id: string
  user_id: string
  content: string
  status: 'pending' | 'project' | 'parking_lot' | 'doing_now' | 'routing' | 'deleted'
  processed_at?: string
  created_at: string
}

// Component prop interfaces
export interface TacticalMapProps {
  projects: Array<Project & { position: ProjectPosition }>
  onProjectClick: (project: Project) => void
  onAddProject: () => void
}

export interface ProjectCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: ProjectFormData) => Promise<void>
  existingProjects: Project[]
}

export interface ProjectNodeProps {
  project: Project
  position: ProjectPosition
  onClick: (project: Project) => void
  isSelected?: boolean
}
```

### Component Architecture

```
src/components/
├── tactical-map/
│   ├── TacticalMap.tsx                 # Complete matrix visualization with grid, labels, nodes
│   └── ProjectNode.tsx                 # Individual project node (32×32px)
├── projects/
│   ├── ProjectModal.tsx                # Single modal handling create/edit/complete workflows
│   └── ProjectForm.tsx                 # Complete form with all fields and validation
├── placeholders/
│   └── PlaceholderModal.tsx            # Reusable modal for Triage/Parking Lot
└── ui/ (existing)
    ├── Modal.tsx                       # Base modal wrapper
    └── Button.tsx                      # Neo-brutalist button component
```

### API Functions

```typescript
// Simple project management functions using Supabase client
export async function createProject(supabase: SupabaseClient, projectData: Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Project> {
  const { data, error } = await supabase.from('projects').insert(projectData).select().single()
  if (error) throw error
  return data
}

export async function updateProject(supabase: SupabaseClient, id: string, updates: Partial<Project>): Promise<Project> {
  const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function completeProject(supabase: SupabaseClient, id: string, accuracyRating: number): Promise<Project> {
  const xpEarned = calculateProjectXP(project.cost, project.benefit, project.is_boss_battle)
  const { data, error } = await supabase.from('projects')
    .update({ status: 'completed', accuracy_rating: accuracyRating, xp_earned: xpEarned, completed_at: new Date().toISOString() })
    .eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function getUserProjects(supabase: SupabaseClient): Promise<Project[]> {
  const { data, error } = await supabase.from('projects').select('*').neq('status', 'completed')
  if (error) throw error
  return data || []
}

// Matrix coordinate utilities
export const coordsToPixels = (cost: number, benefit: number): ProjectPosition => ({
  x: (cost - 1) * 80 + 40,        // cost 1-10 → 40-760px (80px grid spacing)
  y: (10 - benefit) * 80 + 40     // benefit 1-10 → 760-40px (inverted Y, top = high benefit)
})

export const calculateProjectXP = (cost: number, benefit: number, isBossBattle: boolean): number => 
  cost * benefit * 10 * (isBossBattle ? 2 : 1)
```

