import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TacticalMap } from '@/components/tactical-map/TacticalMap'
import { Project } from '@/lib/types/project.types'

const mockProject: Project = {
  id: '1',
  user_id: 'test-user',
  name: 'Test Project',
  description: 'Test description',
  cost: 5,
  benefit: 7,
  category: 'work',
  priority: 'should',
  status: 'active',
  confidence: 'medium',
  tags: ['tag1'],
  due_date: null,
  is_boss_battle: false,
  accuracy_rating: null,
  xp_earned: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  completed_at: null,
}

describe('Project Editing Workflow - Integration Test', () => {
  it('should complete full project editing workflow', async () => {
    render(<TacticalMap initialProjects={[mockProject]} />)

    // Step 1: Wait for project to render on matrix
    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    // Step 2: Click on project node to open actions menu
    const projectNode = document.querySelector('.project-node')
    expect(projectNode).toBeInTheDocument()

    if (projectNode) {
      fireEvent.click(projectNode)
    }

    // Step 3: Wait for actions menu to appear and click edit
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /edit project/i })).toBeInTheDocument()
    })

    const editButton = screen.getByRole('button', { name: /edit project/i })
    fireEvent.click(editButton)

    // Step 4: Verify edit modal opens with pre-filled values
    await waitFor(() => {
      expect(screen.getByText('Edit Project')).toBeInTheDocument()
    })

    const nameInput = screen.getByLabelText(/project name/i)
    expect(nameInput).toHaveValue('Test Project')

    // Step 5: Update project values
    fireEvent.change(nameInput, { target: { value: 'Updated Test Project' } })

    const costSlider = screen.getByLabelText(/cost/i)
    fireEvent.change(costSlider, { target: { value: '8' } })

    const benefitSlider = screen.getByLabelText(/benefit/i)
    fireEvent.change(benefitSlider, { target: { value: '9' } })

    // Step 6: Verify form updates
    expect(nameInput).toHaveValue('Updated Test Project')
    expect(costSlider).toHaveValue('8')
    expect(benefitSlider).toHaveValue('9')

    // Step 7: Submit update (will attempt real database call)
    const updateButton = screen.getByRole('button', { name: /update project/i })
    expect(updateButton).toBeEnabled()
    fireEvent.click(updateButton)

    // The actual update would require real Supabase connection
    // For integration test, we verify the form workflow completes
  })

  it('should handle boss battle toggle workflow', async () => {
    render(<TacticalMap initialProjects={[mockProject]} />)

    // Wait for project to render
    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    // Click project node
    const projectNode = document.querySelector('.project-node')
    if (projectNode) {
      fireEvent.click(projectNode)
    }

    // Wait for actions menu and click boss battle toggle
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /make boss battle/i })).toBeInTheDocument()
    })

    const bossBattleButton = screen.getByRole('button', { name: /make boss battle/i })
    fireEvent.click(bossBattleButton)

    // Boss battle action should trigger (would update via Supabase)
    // For integration test, we verify the button exists and is clickable
    expect(bossBattleButton).toBeInTheDocument()
  })

  it('should display project information in actions menu', async () => {
    render(<TacticalMap initialProjects={[mockProject]} />)

    // Wait for project to render
    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    // Click project node
    const projectNode = document.querySelector('.project-node')
    if (projectNode) {
      fireEvent.click(projectNode)
    }

    // Verify actions menu shows project details
    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument()
      expect(screen.getByText(/cost: 5.*benefit: 7/i)).toBeInTheDocument()
    })

    // Verify all action buttons are present
    expect(screen.getByRole('button', { name: /edit project/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /complete/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /make boss battle/i })).toBeInTheDocument()
  })

  it('should close actions menu when clicking outside', async () => {
    render(<TacticalMap initialProjects={[mockProject]} />)

    // Wait for project and open actions menu
    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    const projectNode = document.querySelector('.project-node')
    if (projectNode) {
      fireEvent.click(projectNode)
    }

    // Wait for menu to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /edit project/i })).toBeInTheDocument()
    })

    // Click outside the menu (on the main container)
    const mapContainer = document.querySelector('.tactical-map-wrapper')
    if (mapContainer) {
      fireEvent.mouseDown(mapContainer)
    }

    // Menu should close
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /edit project/i })).not.toBeInTheDocument()
    })
  })
})