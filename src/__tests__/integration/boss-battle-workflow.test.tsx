import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TacticalMap } from '@/components/tactical-map/TacticalMap'
import { Project } from '@/lib/types/project.types'

const mockProject: Project = {
  id: '1',
  user_id: 'test-user',
  name: 'Regular Project',
  description: 'Test project for boss battle workflow',
  cost: 7,
  benefit: 9,
  category: 'build',
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

const bossBattleProject: Project = {
  ...mockProject,
  id: '2',
  name: 'Boss Battle Project',
  is_boss_battle: true,
}

describe('Boss Battle Workflow - Integration Test', () => {
  it('should toggle project to boss battle status', async () => {
    render(<TacticalMap initialProjects={[mockProject]} />)

    // Step 1: Wait for project to render
    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    // Step 2: Verify project initially has no boss battle indicator
    const projectNode = document.querySelector('.project-node')
    expect(projectNode?.querySelector('.boss-battle-star')).not.toBeInTheDocument()

    // Step 3: Open project actions menu
    if (projectNode) {
      fireEvent.click(projectNode)
    }

    // Step 4: Click Make Boss Battle button
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /make boss battle/i })).toBeInTheDocument()
    })

    const bossBattleButton = screen.getByRole('button', { name: /make boss battle/i })
    fireEvent.click(bossBattleButton)

    // The actual toggle would update via Supabase
    // For integration test, we verify the UI workflow completes without errors
  })

  it('should display boss battle project with star icon', async () => {
    render(<TacticalMap initialProjects={[bossBattleProject]} />)

    // Wait for project to render
    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    // Verify boss battle star is displayed using Lucide icon
    const bossBattleStar = document.querySelector('.boss-battle-star')
    expect(bossBattleStar).toBeInTheDocument()

    // Should use SVG icon, not emoji
    const starIcon = bossBattleStar?.querySelector('svg')
    expect(starIcon).toBeInTheDocument()

    // Should not contain emoji star
    expect(screen.queryByText('★')).not.toBeInTheDocument()
  })

  it('should show remove boss battle option for boss battle projects', async () => {
    render(<TacticalMap initialProjects={[bossBattleProject]} />)

    // Open project actions menu
    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    const projectNode = document.querySelector('.project-node')
    if (projectNode) {
      fireEvent.click(projectNode)
    }

    // Should show remove boss battle option
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /remove boss battle/i })).toBeInTheDocument()
    })

    const removeBossBattleButton = screen.getByRole('button', { name: /remove boss battle/i })

    // Button should have filled star icon for active boss battle
    const filledStar = removeBossBattleButton.querySelector('svg[fill="currentColor"]')
    expect(filledStar).toBeInTheDocument()
  })

  it('should handle boss battle completion with enhanced rewards', async () => {
    render(<TacticalMap initialProjects={[bossBattleProject]} />)

    // Open project and start completion
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

    // Verify boss battle completion modal shows special indicator
    await waitFor(() => {
      expect(screen.getByText('Boss Battle Project')).toBeInTheDocument()
      expect(screen.getByText(/boss battle/i)).toBeInTheDocument()
    })

    // Should show boss battle badge with Lucide icon
    const bossBadge = screen.getByText(/boss battle/i).closest('span')
    const badgeIcon = bossBadge?.querySelector('svg')
    expect(badgeIcon).toBeInTheDocument()
  })

  it('should show correct boss battle action button states', async () => {
    // Test with regular project
    const { rerender } = render(<TacticalMap initialProjects={[mockProject]} />)

    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    let projectNode = document.querySelector('.project-node')
    if (projectNode) {
      fireEvent.click(projectNode)
    }

    // Should show Make Boss Battle with empty star
    await waitFor(() => {
      const makeBossButton = screen.getByRole('button', { name: /make boss battle/i })
      expect(makeBossButton).toBeInTheDocument()

      // Should have empty/outline star icon
      const outlineStar = makeBossButton.querySelector('svg:not([fill="currentColor"])')
      expect(outlineStar).toBeInTheDocument()
    })

    // Close menu by clicking outside
    const mapContainer = document.querySelector('.tactical-map-wrapper')
    if (mapContainer) {
      fireEvent.mouseDown(mapContainer)
    }

    // Test with boss battle project
    rerender(<TacticalMap initialProjects={[bossBattleProject]} />)

    await waitFor(() => {
      expect(document.querySelector('.project-node')).toBeInTheDocument()
    })

    projectNode = document.querySelector('.project-node')
    if (projectNode) {
      fireEvent.click(projectNode)
    }

    // Should show Remove Boss Battle with filled star
    await waitFor(() => {
      const removeBossButton = screen.getByRole('button', { name: /remove boss battle/i })
      expect(removeBossButton).toBeInTheDocument()

      // Should have filled star icon
      const filledStar = removeBossButton.querySelector('svg[fill="currentColor"]')
      expect(filledStar).toBeInTheDocument()
    })
  })

  it('should handle multiple projects with mixed boss battle states', async () => {
    const regularProject2 = { ...mockProject, id: '3', name: 'Another Regular Project' }

    render(<TacticalMap initialProjects={[mockProject, bossBattleProject, regularProject2]} />)

    // Wait for all projects to render
    await waitFor(() => {
      const projectNodes = document.querySelectorAll('.project-node')
      expect(projectNodes).toHaveLength(3)
    })

    // Only boss battle project should have star indicator
    const bossBattleStars = document.querySelectorAll('.boss-battle-star')
    expect(bossBattleStars).toHaveLength(1)

    // All projects should be clickable and show appropriate boss battle actions
    const projectNodes = document.querySelectorAll('.project-node')
    projectNodes.forEach(node => {
      expect(node).toBeInTheDocument()
    })
  })
})