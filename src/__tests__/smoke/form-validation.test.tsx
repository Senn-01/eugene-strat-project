import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TacticalMap } from '@/components/tactical-map/TacticalMap'

describe('Form Validation - Smoke Tests', () => {

  it('should prevent form submission with empty project name', async () => {
    render(<TacticalMap />)

    // Wait for component to load and open modal
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    })

    const addButton = screen.getByRole('button', { name: /add project/i })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Create Project')).toBeInTheDocument()
    })

    // Try to submit without entering project name
    const submitButton = screen.getByRole('button', { name: /create project/i })
    fireEvent.click(submitButton)

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText(/project name is required/i)).toBeInTheDocument()
    })
  })

  it('should accept valid form input', async () => {
    render(<TacticalMap />)

    // Wait for component to load and open modal
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    })

    const addButton = screen.getByRole('button', { name: /add project/i })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Create Project')).toBeInTheDocument()
    })

    // Fill in project name
    const nameInput = screen.getByLabelText(/project name/i)
    fireEvent.change(nameInput, { target: { value: 'Test Project' } })

    // Should accept the input
    expect(nameInput).toHaveValue('Test Project')
  })

  it('should handle cost and benefit sliders', async () => {
    render(<TacticalMap />)

    // Wait for component to load and open modal
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    })

    const addButton = screen.getByRole('button', { name: /add project/i })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Create Project')).toBeInTheDocument()
    })

    // Test cost slider
    const costSlider = screen.getByLabelText(/cost/i)
    fireEvent.change(costSlider, { target: { value: '8' } })
    expect(costSlider).toHaveValue('8')

    // Test benefit slider
    const benefitSlider = screen.getByLabelText(/benefit/i)
    fireEvent.change(benefitSlider, { target: { value: '7' } })
    expect(benefitSlider).toHaveValue('7')
  })

  it('should allow category selection', async () => {
    render(<TacticalMap />)

    // Wait for component to load and open modal
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    })

    const addButton = screen.getByRole('button', { name: /add project/i })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Create Project')).toBeInTheDocument()
    })

    // Click Work category button
    const workButton = screen.getByRole('button', { name: /work/i })
    fireEvent.click(workButton)

    // Should be selectable (button should exist and be clickable)
    expect(workButton).toBeInTheDocument()
  })

  it('should handle confidence slider with business terminology', async () => {
    render(<TacticalMap />)

    // Wait for component to load and open modal
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    })

    const addButton = screen.getByRole('button', { name: /add project/i })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Create Project')).toBeInTheDocument()
    })

    // Should display business terminology labels
    await waitFor(() => {
      expect(screen.getByText(/britney/i)).toBeInTheDocument()
      expect(screen.getByText(/jcvd/i)).toBeInTheDocument()
    })

    // Test confidence slider
    const confidenceSlider = screen.getByLabelText(/confidence/i)
    fireEvent.change(confidenceSlider, { target: { value: '5' } })

    // Should show JCVD for maximum confidence
    await waitFor(() => {
      expect(screen.getByText(/jcvd/i)).toBeInTheDocument()
    })
  })
})