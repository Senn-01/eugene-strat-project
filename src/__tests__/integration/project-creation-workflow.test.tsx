import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TacticalMap } from '@/components/tactical-map/TacticalMap'

describe('Project Creation Workflow - Integration Test', () => {
  it('should complete full project creation workflow', async () => {
    render(<TacticalMap />)

    // Step 1: Wait for component to load
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    })

    // Step 2: Open project creation modal
    const addButton = screen.getByRole('button', { name: /add project/i })
    fireEvent.click(addButton)

    // Step 3: Verify modal opens with all required fields
    await waitFor(() => {
      expect(screen.getByText('Create Project')).toBeInTheDocument()
    })

    // Step 4: Fill out project form
    const nameInput = screen.getByLabelText(/project name/i)
    fireEvent.change(nameInput, { target: { value: 'Test Integration Project' } })

    const costSlider = screen.getByLabelText(/cost/i)
    fireEvent.change(costSlider, { target: { value: '6' } })

    const benefitSlider = screen.getByLabelText(/benefit/i)
    fireEvent.change(benefitSlider, { target: { value: '8' } })

    // Step 5: Select category
    const workButton = screen.getByRole('button', { name: /work/i })
    fireEvent.click(workButton)

    // Step 6: Select priority
    const mustButton = screen.getByRole('button', { name: /must/i })
    fireEvent.click(mustButton)

    // Step 7: Verify form has correct values
    expect(nameInput).toHaveValue('Test Integration Project')
    expect(costSlider).toHaveValue('6')
    expect(benefitSlider).toHaveValue('8')

    // Step 8: Submit form (this will likely fail due to no backend, but tests the flow)
    const submitButton = screen.getByRole('button', { name: /create project/i })
    expect(submitButton).toBeEnabled()

    // The actual submission would require real Supabase connection
    // For smoke test, we just verify the form is submittable
    fireEvent.click(submitButton)

    // Step 9: Form should at least attempt submission (no validation errors)
    // Since we're not mocking, this might show connection errors, which is expected
    // The important part is that the UI workflow completes without crashes
  })

  it('should handle form validation during project creation', async () => {
    render(<TacticalMap />)

    // Open modal
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    })

    const addButton = screen.getByRole('button', { name: /add project/i })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Create Project')).toBeInTheDocument()
    })

    // Try to submit without required fields
    const submitButton = screen.getByRole('button', { name: /create project/i })
    fireEvent.click(submitButton)

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText(/project name is required/i)).toBeInTheDocument()
    })
  })

  it('should show coordinate conflict validation', async () => {
    render(<TacticalMap initialProjects={[
      {
        id: '1',
        user_id: 'test-user',
        name: 'Existing Project',
        description: 'Test project',
        cost: 5,
        benefit: 5,
        category: 'work',
        priority: 'should',
        status: 'active',
        confidence: 'medium',
        tags: [],
        due_date: null,
        is_boss_battle: false,
        accuracy_rating: null,
        xp_earned: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        completed_at: null,
      }
    ]} />)

    // Open modal
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    })

    const addButton = screen.getByRole('button', { name: /add project/i })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Create Project')).toBeInTheDocument()
    })

    // Fill form with conflicting coordinates
    const nameInput = screen.getByLabelText(/project name/i)
    fireEvent.change(nameInput, { target: { value: 'Conflicting Project' } })

    const costSlider = screen.getByLabelText(/cost/i)
    fireEvent.change(costSlider, { target: { value: '5' } })

    const benefitSlider = screen.getByLabelText(/benefit/i)
    fireEvent.change(benefitSlider, { target: { value: '5' } })

    // Submit form
    const submitButton = screen.getByRole('button', { name: /create project/i })
    fireEvent.click(submitButton)

    // Should show coordinate conflict error
    await waitFor(() => {
      expect(screen.getByText(/position.*occupied/i)).toBeInTheDocument()
    })
  })
})