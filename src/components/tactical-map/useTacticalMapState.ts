'use client'

import { useState, useCallback, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Project,
  ProjectCreateInput,
  ProjectUpdateInput,
  ProjectCompletionInput,
  MAX_PROJECTS,
  calculateProjectXP
} from '@/lib/types/project.types'

interface TacticalMapState {
  projects: Project[]
  selectedProject: Project | null
  isModalOpen: boolean
  modalMode: 'create' | 'edit'
  totalXP: number
  isLoading: boolean
  error: string | null
  isInitialized: boolean
}

const initialState: TacticalMapState = {
  projects: [],
  selectedProject: null,
  isModalOpen: false,
  modalMode: 'create',
  totalXP: 0,
  isLoading: false,
  error: null,
  isInitialized: false,
}

export function useTacticalMapState() {
  const [state, setState] = useState<TacticalMapState>(initialState)
  const supabase = createClient()

  // Fetch projects from database
  const fetchProjects = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const totalXP = await fetchUserXP()

      setState(prev => ({
        ...prev,
        projects: projects || [],
        totalXP,
        isLoading: false,
        isInitialized: true,
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to load projects. Please try again.',
        isLoading: false,
      }))
    }
  }, [supabase])

  // Fetch user XP from preferences
  const fetchUserXP = useCallback(async (): Promise<number> => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('xp_points')
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return data?.xp_points || 0
    } catch (error) {
      return 0
    }
  }, [supabase])

  // Initialize data on mount
  useEffect(() => {
    if (!state.isInitialized) {
      fetchProjects()
    }
  }, [fetchProjects, state.isInitialized])

  // Initialize with server-side data
  const initializeProjects = useCallback((initialProjects: Project[]) => {
    setState(prev => ({
      ...prev,
      projects: initialProjects,
      isInitialized: true,
    }))
  }, [])

  // Create new project with 20-project limit enforcement
  const createProject = useCallback(async (projectInput: ProjectCreateInput): Promise<boolean> => {
    // Check project limit first
    if (state.projects.length >= MAX_PROJECTS) {
      setState(prev => ({
        ...prev,
        error: `Maximum ${MAX_PROJECTS} projects allowed. Please complete or delete existing projects.`,
      }))
      return false
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Check authentication first
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        setState(prev => ({
          ...prev,
          error: 'Authentication required. Please refresh the page and try again.',
          isLoading: false,
        }))
        return false
      }

      const { data, error } = await supabase
        .from('projects')
        .insert({
          ...projectInput,
          user_id: user.id, // Explicitly set user_id
          status: projectInput.status || 'active',
          description: projectInput.description || '',
          tags: projectInput.tags || [],
          is_boss_battle: false,
        })
        .select()
        .single()

      if (error) {
        console.error('Project creation error:', error)
        if (error.code === '23505') {
          setState(prev => ({
            ...prev,
            error: 'A project with this cost/benefit combination already exists.',
            isLoading: false,
          }))
          return false
        }
        throw error
      }

      // Optimistic update
      setState(prev => ({
        ...prev,
        projects: [data, ...prev.projects],
        isLoading: false,
      }))

      return true
    } catch (error) {
      console.error('Failed to create project:', error)
      setState(prev => ({
        ...prev,
        error: 'Failed to create project. Please try again.',
        isLoading: false,
      }))
      return false
    }
  }, [supabase, state.projects.length])

  // Update existing project
  const updateProject = useCallback(async (projectInput: ProjectUpdateInput): Promise<boolean> => {
    const originalProject = state.projects.find(p => p.id === projectInput.id)
    if (!originalProject) {
      setState(prev => ({ ...prev, error: 'Project not found.' }))
      return false
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    // Optimistic update
    const updatedProject = { ...originalProject, ...projectInput }
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === projectInput.id ? updatedProject : p
      ),
    }))

    try {
      const { error } = await supabase
        .from('projects')
        .update(projectInput)
        .eq('id', projectInput.id)

      if (error) {
        if (error.code === '23505') {
          setState(prev => ({
            ...prev,
            error: 'A project with this cost/benefit combination already exists.',
            projects: prev.projects.map(p =>
              p.id === projectInput.id ? originalProject : p
            ),
            isLoading: false,
          }))
          return false
        }
        throw error
      }

      setState(prev => ({ ...prev, isLoading: false }))
      return true
    } catch (error) {
      // Rollback optimistic update
      setState(prev => ({
        ...prev,
        error: 'Failed to update project. Changes have been reverted.',
        projects: prev.projects.map(p =>
          p.id === projectInput.id ? originalProject : p
        ),
        isLoading: false,
      }))
      return false
    }
  }, [supabase, state.projects])

  // Delete project
  const deleteProject = useCallback(async (projectId: string): Promise<boolean> => {
    const originalProject = state.projects.find(p => p.id === projectId)
    if (!originalProject) {
      setState(prev => ({ ...prev, error: 'Project not found.' }))
      return false
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    // Optimistic update
    setState(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId),
    }))

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (error) throw error

      setState(prev => ({ ...prev, isLoading: false }))
      return true
    } catch (error) {
      // Rollback optimistic update
      setState(prev => ({
        ...prev,
        error: 'Failed to delete project. It has been restored.',
        projects: [...prev.projects, originalProject],
        isLoading: false,
      }))
      return false
    }
  }, [supabase, state.projects])

  // Complete project with XP calculation
  const completeProject = useCallback(async (completionInput: ProjectCompletionInput): Promise<boolean> => {
    const project = state.projects.find(p => p.id === completionInput.id)
    if (!project) {
      setState(prev => ({ ...prev, error: 'Project not found.' }))
      return false
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    const xpEarned = calculateProjectXP(project.cost, project.benefit, project.is_boss_battle)
    const completedAt = new Date().toISOString()

    // Optimistic update
    const completedProject = {
      ...project,
      status: 'completed' as const,
      accuracy_rating: completionInput.accuracy_rating,
      xp_earned: xpEarned,
      completed_at: completedAt,
    }

    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === completionInput.id ? completedProject : p
      ),
      totalXP: prev.totalXP + xpEarned,
    }))

    try {
      // Update project and user XP in parallel
      const [projectResult, xpResult] = await Promise.all([
        supabase
          .from('projects')
          .update({
            status: 'completed',
            accuracy_rating: completionInput.accuracy_rating,
            xp_earned: xpEarned,
            completed_at: completedAt,
          })
          .eq('id', completionInput.id),
        supabase.rpc('increment_user_xp', { xp_amount: xpEarned })
      ])

      if (projectResult.error) throw projectResult.error
      if (xpResult.error) throw xpResult.error

      setState(prev => ({ ...prev, isLoading: false }))
      return true
    } catch (error) {
      // Rollback optimistic update
      setState(prev => ({
        ...prev,
        error: 'Failed to complete project. Changes have been reverted.',
        projects: prev.projects.map(p =>
          p.id === completionInput.id ? project : p
        ),
        totalXP: prev.totalXP - xpEarned,
        isLoading: false,
      }))
      return false
    }
  }, [supabase, state.projects])

  // Toggle boss battle status
  const toggleBossBattle = useCallback(async (projectId: string): Promise<boolean> => {
    const project = state.projects.find(p => p.id === projectId)
    if (!project) {
      setState(prev => ({ ...prev, error: 'Project not found.' }))
      return false
    }

    const newBossBattleStatus = !project.is_boss_battle

    // Optimistic update
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === projectId ? { ...p, is_boss_battle: newBossBattleStatus } : p
      ),
    }))

    try {
      const { error } = await supabase
        .from('projects')
        .update({ is_boss_battle: newBossBattleStatus })
        .eq('id', projectId)

      if (error) throw error
      return true
    } catch (error) {
      // Rollback optimistic update
      setState(prev => ({
        ...prev,
        error: 'Failed to update project. Changes have been reverted.',
        projects: prev.projects.map(p =>
          p.id === projectId ? project : p
        ),
      }))
      return false
    }
  }, [supabase, state.projects])

  // Reset all user data
  const resetAllUserData = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Delete all projects and reset XP
      await Promise.all([
        supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('user_preferences').upsert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          xp_points: 0
        })
      ])

      setState(prev => ({
        ...prev,
        projects: [],
        totalXP: 0,
        isLoading: false,
      }))

      return true
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to reset data. Please try again.',
        isLoading: false,
      }))
      return false
    }
  }, [supabase])

  // Modal state management
  const openCreateModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      isModalOpen: true,
      modalMode: 'create',
      selectedProject: null,
    }))
  }, [])

  const openEditModal = useCallback((project: Project) => {
    setState(prev => ({
      ...prev,
      isModalOpen: true,
      modalMode: 'edit',
      selectedProject: project,
    }))
  }, [])

  const closeModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      isModalOpen: false,
      selectedProject: null,
      error: null,
    }))
  }, [])

  // Project interaction handlers
  const handleProjectEdit = useCallback((project: Project) => {
    openEditModal(project)
  }, [openEditModal])

  const handleProjectSave = useCallback(async (projectData: ProjectCreateInput | ProjectUpdateInput) => {
    let success = false

    if (state.modalMode === 'edit' && 'id' in projectData) {
      success = await updateProject(projectData as ProjectUpdateInput)
    } else {
      success = await createProject(projectData as ProjectCreateInput)
    }

    if (success) {
      closeModal()
    }
  }, [state.modalMode, updateProject, createProject, closeModal])

  const handleProjectComplete = useCallback(async (
    project: Project,
    accuracyRating: number
  ) => {
    const success = await completeProject({
      id: project.id,
      accuracy_rating: accuracyRating,
    })
    return success
  }, [completeProject])

  const handleBossBattleToggle = useCallback(async (project: Project) => {
    return await toggleBossBattle(project.id)
  }, [toggleBossBattle])

  // Error handling
  const setError = useCallback((error: string) => {
    setState(prev => ({ ...prev, error }))
  }, [])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    // State
    ...state,

    // Initialize
    initializeProjects,
    fetchProjects,

    // CRUD operations
    createProject,
    updateProject,
    deleteProject,
    completeProject,
    toggleBossBattle,

    // Data management
    resetAllUserData,

    // Modal management
    openCreateModal,
    openEditModal,
    closeModal,

    // Project interactions
    handleProjectEdit,
    handleProjectSave,
    handleProjectComplete,
    handleBossBattleToggle,

    // Utility
    setError,
    clearError,
  }
}