'use client'

import { useState, useRef, useEffect } from 'react'
import { Edit, Check, Star, StarOff } from 'lucide-react'
import { AccuracyRatingSelector } from './AccuracyRatingSelector'
import { Project } from '@/lib/types/project.types'

interface ProjectActionsMenuProps {
  project: Project
  position: { x: number; y: number }
  onEdit: (project: Project) => void
  onComplete: (project: Project, accuracyRating: number, xpEarned: number) => void
  onToggleBossBattle: (project: Project) => void
  onClose: () => void
}

export function ProjectActionsMenu({
  project,
  position,
  onEdit,
  onComplete,
  onToggleBossBattle,
  onClose
}: ProjectActionsMenuProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showAccuracyRating, setShowAccuracyRating] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleEdit = () => {
    onEdit(project)
    onClose()
  }

  const handleComplete = () => {
    setShowAccuracyRating(true)
  }

  const handleAccuracyComplete = (rating: number, xpEarned: number) => {
    onComplete(project, rating, xpEarned)
    setShowAccuracyRating(false)
    onClose()
  }

  const handleAccuracyCancel = () => {
    setShowAccuracyRating(false)
  }

  const handleToggleBossBattle = () => {
    onToggleBossBattle(project)
    onClose()
  }

  // Show accuracy rating selector in overlay
  if (showAccuracyRating) {
    return (
      <div className="modal-overlay">
        <AccuracyRatingSelector
          project={project}
          onComplete={handleAccuracyComplete}
          onCancel={handleAccuracyCancel}
        />
      </div>
    )
  }

  return (
    <div
      ref={menuRef}
      className={`project-actions-menu ${isVisible ? 'visible' : ''}`}
      style={{
        position: 'absolute',
        left: position.x + 36,
        top: position.y,
        zIndex: 1000,
      }}
    >
      <div className="menu-header">
        <div className="project-name">{project.name}</div>
        <div className="project-meta">
          <span className="project-state">
            <span className="state-pill">{project.is_boss_battle ? 'Focus' : 'Visible'}</span>
          </span>
        </div>
        <div className="meta-chips">
          <span className="chip chip-grey">C:{project.cost}</span>
          <span className="chip chip-grey">B:{project.benefit}</span>
          {project.is_boss_battle && (
            <span className="boss-star" aria-label="Boss Battle">
              <Star size={14} />
            </span>
          )}
        </div>
      </div>

      <div className="menu-actions">
        <button
          className="menu-action complete-action"
          onClick={handleComplete}
          disabled={project.status === 'completed'}
        >
          <span className="action-icon"><Check size={16} aria-label="Complete project" /></span>
          <span className="action-copy">
            <span className="action-title">{project.status === 'completed' ? 'Completed' : 'Complete'}</span>
            <span className="action-sublabel">Finalize and rate accuracy</span>
          </span>
        </button>

        <button
          className="menu-action edit-action"
          onClick={handleEdit}
        >
          <span className="action-icon"><Edit size={16} aria-label="Edit project" /></span>
          <span className="action-copy">
            <span className="action-title">Edit Project</span>
            <span className="action-sublabel">Change project details</span>
          </span>
        </button>

        <button
          className="menu-action boss-battle-action"
          onClick={handleToggleBossBattle}
        >
          <span className="action-icon">
            {project.is_boss_battle ? (
              <Star size={16} aria-label="Remove Boss Battle" fill="currentColor" />
            ) : (
              <StarOff size={16} aria-label="Make Boss Battle" />
            )}
          </span>
          <span className="action-copy">
            <span className="action-title">{project.is_boss_battle ? 'Remove Boss Battle' : 'Make Boss Battle'}</span>
            <span className="action-sublabel">{project.is_boss_battle ? 'Prime work active this week' : 'Mark as prime work this week'}</span>
          </span>
        </button>
      </div>
    </div>
  )
}