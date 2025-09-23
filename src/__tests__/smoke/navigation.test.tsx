import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TacticalMap } from '@/components/tactical-map/TacticalMap'

describe('Navigation - Smoke Tests', () => {

  it('should display chart header with title', async () => {
    render(<TacticalMap />)

    await waitFor(() => {
      expect(screen.getByText('Cost vs Benefit Analysis')).toBeInTheDocument()
      expect(screen.getByText('Strategic Project Matrix')).toBeInTheDocument()
    })
  })

  it('should display all control buttons', async () => {
    render(<TacticalMap />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /focus/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /parking lot/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /triage/i })).toBeInTheDocument()
    })
  })

  it('should toggle between Focus and All view modes', async () => {
    render(<TacticalMap />)

    // Initially should show Focus button (in All mode)
    const toggleButton = await waitFor(() =>
      screen.getByRole('button', { name: /focus/i })
    )

    // Click to switch to Focus mode
    fireEvent.click(toggleButton)

    // Should now show All button (in Focus mode)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
    })

    // Click again to switch back to All mode
    const allButton = screen.getByRole('button', { name: /all/i })
    fireEvent.click(allButton)

    // Should show Focus button again
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /focus/i })).toBeInTheDocument()
    })
  })

  it('should display parking lot button as placeholder', async () => {
    render(<TacticalMap />)

    const parkingButton = await waitFor(() =>
      screen.getByRole('button', { name: /parking lot/i })
    )

    // Should be clickable (shows alert for now)
    expect(parkingButton).toBeEnabled()
  })

  it('should display triage button as placeholder', async () => {
    render(<TacticalMap />)

    const triageButton = await waitFor(() =>
      screen.getByRole('button', { name: /triage/i })
    )

    // Should be clickable (shows alert for now)
    expect(triageButton).toBeEnabled()
  })

  it('should display matrix axis labels', async () => {
    render(<TacticalMap />)

    await waitFor(() => {
      expect(screen.getByText('COST')).toBeInTheDocument()
      expect(screen.getByText('BENEFIT')).toBeInTheDocument()
    })
  })

  it('should render tactical map container', async () => {
    render(<TacticalMap />)

    // Check that the main tactical map container exists
    const mapContainer = document.querySelector('.tactical-map-wrapper')
    expect(mapContainer).toBeInTheDocument()
  })
})