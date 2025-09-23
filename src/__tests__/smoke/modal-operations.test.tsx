import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TacticalMap } from '@/components/tactical-map/TacticalMap'

describe('Modal Operations - Smoke Tests', () => {

  it('should open project creation modal when Add Project is clicked', async () => {
    render(<TacticalMap />)

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    })

    // Click Add Project button
    const addButton = screen.getByRole('button', { name: /add project/i })
    fireEvent.click(addButton)

    // Modal should appear
    await waitFor(() => {
      expect(screen.getByText('Create Project')).toBeInTheDocument()
    })
  })

  it('should close modal when X button is clicked', async () => {
    render(<TacticalMap />)

    // Wait for component to load and open modal
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    })

    const addButton = screen.getByRole('button', { name: /add project/i })
    fireEvent.click(addButton)

    // Wait for modal to appear
    await waitFor(() => {
      expect(screen.getByText('Create Project')).toBeInTheDocument()
    })

    // Click close button
    const closeButton = screen.getByRole('button', { name: /close modal/i })
    fireEvent.click(closeButton)

    // Modal should disappear
    await waitFor(() => {
      expect(screen.queryByText('Create Project')).not.toBeInTheDocument()
    })
  })

  it('should close modal when Cancel button is clicked', async () => {
    render(<TacticalMap />)

    // Wait for component to load and open modal
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    })

    const addButton = screen.getByRole('button', { name: /add project/i })
    fireEvent.click(addButton)

    // Wait for modal to appear
    await waitFor(() => {
      expect(screen.getByText('Create Project')).toBeInTheDocument()
    })

    // Click cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)

    // Modal should disappear
    await waitFor(() => {
      expect(screen.queryByText('Create Project')).not.toBeInTheDocument()
    })
  })

  it('should display modal with correct form fields', async () => {
    render(<TacticalMap />)

    // Wait for component to load and open modal
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    })

    const addButton = screen.getByRole('button', { name: /add project/i })
    fireEvent.click(addButton)

    // Check required form elements are present
    await waitFor(() => {
      expect(screen.getByText('Create Project')).toBeInTheDocument()
      expect(screen.getByLabelText(/project name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/cost/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/benefit/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/confidence/i)).toBeInTheDocument()
    })
  })
})