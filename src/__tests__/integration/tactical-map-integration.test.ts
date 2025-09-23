import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTacticalMapState } from '@/components/tactical-map/useTacticalMapState'
import { ProjectCreateInput, ProjectUpdateInput, MAX_PROJECTS } from '@/lib/types/project.types'

// Mock Supabase client
const mockSupabase = {
  from: vi.fn(),
  auth: {
    getUser: vi.fn(),
  },
  rpc: vi.fn(),
}

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => mockSupabase,
}))

// Mock project data
const mockProject = {
  id: '1',
  user_id: 'user-123',
  name: 'Test Project',
  description: 'Test description',
  cost: 5,
  benefit: 8,
  category: 'work' as const,
  priority: 'must' as const,
  status: 'active' as const,
  confidence: 'high' as const,
  tags: ['test'],
  due_date: null,
  is_boss_battle: false,
  accuracy_rating: null,
  xp_earned: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  completed_at: null,
}

describe('TacticalMap Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Setup default mock implementations
    mockSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockReturnValue({
          data: [],
          error: null,
        }),
      }),
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: mockProject,
            error: null,
          }),
        }),
      }),
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: null,
          error: null,
        }),
      }),
      delete: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: null,
          error: null,
        }),
        neq: vi.fn().mockResolvedValue({
          data: null,
          error: null,
        }),
      }),
      upsert: vi.fn().mockResolvedValue({
        data: null,
        error: null,
      }),
    })

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'user-123' } },
      error: null,
    })

    mockSupabase.rpc.mockResolvedValue({
      data: null,
      error: null,
    })
  })

  describe('Core Workflow: Create → Edit → Complete → Reset', () => {
    it('should handle the complete project lifecycle', async () => {
      const { result } = renderHook(() => useTacticalMapState())

      // Wait for initialization
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
      })

      // Test 1: Create Project
      const createInput: ProjectCreateInput = {
        name: 'Test Project',
        description: 'Test description',
        cost: 5,
        benefit: 8,
        category: 'work',
        priority: 'must',
        confidence: 'high',
        tags: ['test'],
      }

      let createSuccess = false
      await act(async () => {
        createSuccess = await result.current.createProject(createInput)
      })

      expect(createSuccess).toBe(true)
      expect(mockSupabase.from).toHaveBeenCalledWith('projects')

      // Test 2: Update Project
      const updateInput: ProjectUpdateInput = {
        id: '1',
        name: 'Updated Test Project',
        cost: 6,
      }

      let updateSuccess = false
      await act(async () => {
        updateSuccess = await result.current.updateProject(updateInput)
      })

      expect(updateSuccess).toBe(true)

      // Test 3: Complete Project
      let completeSuccess = false
      await act(async () => {
        completeSuccess = await result.current.completeProject({
          id: '1',
          accuracy_rating: 4,
        })
      })

      expect(completeSuccess).toBe(true)
      expect(mockSupabase.rpc).toHaveBeenCalledWith('increment_user_xp', { xp_amount: 480 })

      // Test 4: Reset All Data
      let resetSuccess = false
      await act(async () => {
        resetSuccess = await result.current.resetAllUserData()
      })

      expect(resetSuccess).toBe(true)
      expect(mockSupabase.from).toHaveBeenCalledWith('projects')
      expect(mockSupabase.from).toHaveBeenCalledWith('user_preferences')
    })
  })

  describe('20-Project Limit Enforcement', () => {
    it('should prevent creating more than 20 projects', async () => {
      // Mock 20 existing projects
      const projects = Array.from({ length: 20 }, (_, i) => ({
        ...mockProject,
        id: `project-${i}`,
        name: `Project ${i}`,
      }))

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            data: projects,
            error: null,
          }),
        }),
      })

      const { result } = renderHook(() => useTacticalMapState())

      // Wait for initialization to load the 20 projects
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
      })

      // Try to create the 21st project
      const createInput: ProjectCreateInput = {
        name: 'Project 21',
        cost: 5,
        benefit: 8,
        category: 'work',
        priority: 'must',
        confidence: 'high',
      }

      let createSuccess = false
      await act(async () => {
        createSuccess = await result.current.createProject(createInput)
      })

      expect(createSuccess).toBe(false)
      expect(result.current.error).toContain('Maximum 20 projects allowed')
    })
  })

  describe('Error Handling and Rollback', () => {
    it('should rollback optimistic updates on database failure', async () => {
      // Mock database error
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            data: null,
            error: { message: 'Database error' },
          }),
        }),
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            data: [mockProject],
            error: null,
          }),
        }),
      })

      const { result } = renderHook(() => useTacticalMapState())

      // Wait for initialization
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
      })

      // Try to update project (should fail and rollback)
      const updateInput: ProjectUpdateInput = {
        id: '1',
        name: 'This update will fail',
      }

      let updateSuccess = false
      await act(async () => {
        updateSuccess = await result.current.updateProject(updateInput)
      })

      expect(updateSuccess).toBe(false)
      expect(result.current.error).toContain('Failed to update project')
    })
  })

  describe('Boss Battle Toggle', () => {
    it('should toggle boss battle status correctly', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            data: [mockProject],
            error: null,
          }),
        }),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            data: null,
            error: null,
          }),
        }),
      })

      const { result } = renderHook(() => useTacticalMapState())

      // Wait for initialization
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
      })

      // Toggle boss battle
      let toggleSuccess = false
      await act(async () => {
        toggleSuccess = await result.current.toggleBossBattle('1')
      })

      expect(toggleSuccess).toBe(true)
      expect(mockSupabase.from).toHaveBeenCalledWith('projects')
    })
  })

  describe('XP Calculation', () => {
    it('should calculate XP correctly for project completion', async () => {
      const testProject = {
        ...mockProject,
        cost: 8,
        benefit: 9,
        is_boss_battle: true,
      }

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            data: [testProject],
            error: null,
          }),
        }),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            data: null,
            error: null,
          }),
        }),
      })

      const { result } = renderHook(() => useTacticalMapState())

      // Wait for initialization
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
      })

      // Complete boss battle project
      await act(async () => {
        await result.current.completeProject({
          id: '1',
          accuracy_rating: 5,
        })
      })

      // XP should be: 8 * 9 * 10 * 2 (boss battle) = 1440
      expect(mockSupabase.rpc).toHaveBeenCalledWith('increment_user_xp', { xp_amount: 1440 })
    })
  })
})