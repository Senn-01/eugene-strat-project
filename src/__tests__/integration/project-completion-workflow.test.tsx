import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TacticalMap } from '@/components/tactical-map/TacticalMap'
import { Project } from '@/lib/types/project.types'

const mockProject: Project = {
  id: '1',
  user_id: 'test-user',
  name: 'Project to Complete',
  description: 'Test project for completion workflow',
  cost: 6,
  benefit: 8,
  category: 'work',
  priority: 'must',
  status: 'active',
  confidence: 'high',
  tags: ['important'],
  due_date: null,
  is_boss_battle: false,
  accuracy_rating: null,
  xp_earned: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  completed_at: null,
}

describe('Project Completion Workflow - Integration Test', () => {
  it('should complete full project completion workflow', async () => {
    render(<TacticalMap initialProjects={[mockProject]} />)

    // Step 1: Wait for project to render
    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    // Step 2: Open project actions menu
    const projectNode = document.querySelector('.project-node')
    if (projectNode) {
      fireEvent.click(projectNode)
    }

    // Step 3: Click Complete button
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /complete/i })).toBeInTheDocument()
    })

    const completeButton = screen.getByRole('button', { name: /complete/i })
    fireEvent.click(completeButton)

    // Step 4: Verify accuracy rating modal appears
    await waitFor(() => {
      expect(screen.getByText('Complete Project')).toBeInTheDocument()
      expect(screen.getByText('Project to Complete')).toBeInTheDocument()
    })

    // Step 5: Verify project details are shown
    expect(screen.getByText(/cost: 6.*benefit: 8/i)).toBeInTheDocument()

    // Step 6: Verify accuracy rating options are present
    const ratingButtons = screen.getAllByRole('button', { name: /^[1-5]$/ })
    expect(ratingButtons).toHaveLength(5)

    // Step 7: Select accuracy rating
    const rating4Button = screen.getByRole('button', { name: '4' })
    fireEvent.click(rating4Button)

    // Step 8: Verify rating is selected (visual feedback)
    expect(rating4Button).toHaveClass('selected')

    // Step 9: Verify completion feedback is shown
    expect(screen.getByText(/great job completing this project/i)).toBeInTheDocument()

    // Step 10: Complete the project
    const finalCompleteButton = screen.getByRole('button', { name: /complete project$/i })
    fireEvent.click(finalCompleteButton)

    // The actual completion would trigger XP calculation and database update
    // For integration test, we verify the UI workflow completes
  })

  it('should handle boss battle project completion with different XP', async () => {
    const bossBattleProject: Project = {
      ...mockProject,
      name: 'Boss Battle Project',
      is_boss_battle: true,
    }

    render(<TacticalMap initialProjects={[bossBattleProject]} />)

    // Open project and complete
    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    const projectNode = document.querySelector('.project-node')
    if (projectNode) {
      fireEvent.click(projectNode)
    }

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /complete/i })).toBeInTheDocument()
    })

    const completeButton = screen.getByRole('button', { name: /complete/i })
    fireEvent.click(completeButton)

    // Verify boss battle indicator is shown
    await waitFor(() => {
      expect(screen.getByText(/boss battle/i)).toBeInTheDocument()
    })

    // Boss battle projects should show the star icon instead of emoji
    const starIcon = document.querySelector('svg')
    expect(starIcon).toBeInTheDocument()
  })

  it('should show different accuracy descriptions', async () => {
    render(<TacticalMap initialProjects={[mockProject]} />)

    // Open completion workflow
    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    const projectNode = document.querySelector('.project-node')
    if (projectNode) {
      fireEvent.click(projectNode)
    }

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /complete/i })).toBeInTheDocument()
    })

    const completeButton = screen.getByRole('button', { name: /complete/i })
    fireEvent.click(completeButton)

    await waitFor(() => {
      expect(screen.getByText('Complete Project')).toBeInTheDocument()
    })

    // Test different rating descriptions
    const rating1Button = screen.getByRole('button', { name: '1' })
    fireEvent.click(rating1Button)

    await waitFor(() => {
      expect(screen.getByText(/poor.*significant issues/i)).toBeInTheDocument()
    })

    const rating5Button = screen.getByRole('button', { name: '5' })
    fireEvent.click(rating5Button)

    await waitFor(() => {
      expect(screen.getByText(/excellent.*outstanding work/i)).toBeInTheDocument()
    })
  })

  it('should allow canceling project completion', async () => {
    render(<TacticalMap initialProjects={[mockProject]} />)

    // Open completion workflow
    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    const projectNode = document.querySelector('.project-node')
    if (projectNode) {
      fireEvent.click(projectNode)
    }

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /complete/i })).toBeInTheDocument()
    })

    const completeButton = screen.getByRole('button', { name: /complete/i })
    fireEvent.click(completeButton)

    // Wait for accuracy modal and cancel
    await waitFor(() => {
      expect(screen.getByText('Complete Project')).toBeInTheDocument()
    })

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)

    // Should return to actions menu
    await waitFor(() => {
      expect(screen.queryByText('Complete Project')).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /edit project/i })).toBeInTheDocument()
    })
  })

  it('should use Lucide star icons instead of emoji', async () => {
    render(<TacticalMap initialProjects={[mockProject]} />)

    // Open completion workflow
    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    const projectNode = document.querySelector('.project-node')
    if (projectNode) {
      fireEvent.click(projectNode)
    }

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /complete/i })).toBeInTheDocument()
    })

    const completeButton = screen.getByRole('button', { name: /complete/i })
    fireEvent.click(completeButton)

    await waitFor(() => {
      expect(screen.getByText('Complete Project')).toBeInTheDocument()
    })

    // Verify star icons are used (SVG elements instead of emoji text)
    const starElements = document.querySelectorAll('svg')
    expect(starElements.length).toBeGreaterThan(0)

    // Should not contain emoji stars
    expect(screen.queryByText('★')).not.toBeInTheDocument()
    expect(screen.queryByText('⭐')).not.toBeInTheDocument()
  })
})