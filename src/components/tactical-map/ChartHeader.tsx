'use client'

import { Plus, Archive, Inbox, Eye, EyeOff } from 'lucide-react'

interface ChartHeaderProps {
  onAddProject: () => void
  onOpenParkingLot?: () => void
  onOpenTriage?: () => void
  triageCount?: number
  viewMode?: 'all' | 'focus'
  onViewModeChange?: (mode: 'all' | 'focus') => void
  projectCount?: number
}

export function ChartHeader({
  onAddProject,
  onOpenParkingLot,
  onOpenTriage,
  triageCount = 0,
  viewMode = 'all',
  onViewModeChange,
  projectCount = 0
}: ChartHeaderProps) {

  const handleParkingLot = () => {
    // Placeholder for future implementation
    alert('Parking Lot functionality coming in future release')
  }

  const handleTriage = () => {
    // Placeholder for future implementation
    alert('Triage functionality coming in future release')
  }

  const handleViewModeToggle = () => {
    if (onViewModeChange) {
      onViewModeChange(viewMode === 'all' ? 'focus' : 'all')
    }
  }

  return (
    <div className="chart-header-compact">
      <div className="chart-title-compact">
        <div className="chart-title-main">
          <div className="chart-title-text">TACTICAL MAP</div>
          <div className="chart-subtitle-text">Cost-Benefit Analysis</div>
        </div>
        <div className="chart-project-count">{projectCount} Projects Visible</div>
      </div>

      <div className="chart-controls-compact">
        <button
          className="chart-button-compact"
          onClick={onAddProject}
          type="button"
        >
          <Plus size={14} aria-hidden="true" />
          ADD
        </button>

        <button
          className={`chart-button-compact ${viewMode === 'focus' ? 'active' : ''}`}
          onClick={handleViewModeToggle}
          type="button"
          title={viewMode === 'all' ? 'Switch to Focus mode' : 'Show all projects'}
        >
          {viewMode === 'all' ? (
            <>
              <Eye size={14} aria-hidden="true" />
              ALL
            </>
          ) : (
            <>
              <EyeOff size={14} aria-hidden="true" />
              FOCUS
            </>
          )}
        </button>

        <button
          className="chart-button-compact"
          onClick={onOpenParkingLot || handleParkingLot}
          type="button"
        >
          <Archive size={14} aria-hidden="true" />
          PARKING
        </button>

        <button
          className="chart-button-compact"
          onClick={onOpenTriage || handleTriage}
          type="button"
          style={{ position: 'relative' }}
        >
          <Inbox size={14} aria-hidden="true" />
          TRIAGE
          {triageCount > 0 && (
            <span className="triage-badge-compact">
              {triageCount}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}