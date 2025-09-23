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
        left: position.x + 36, // Offset from project node
        top: position.y,
        zIndex: 1000,
      }}
    >
      <div className="menu-header">
        <div className="project-name">{project.name}</div>
        <div className="project-coords">
          Cost: {project.cost} • Benefit: {project.benefit}
        </div>
      </div>

      <div className="menu-actions">
        <button
          className="menu-action edit-action"
          onClick={handleEdit}
        >
          <Edit size={16} aria-label="Edit project" />
          Edit Project
        </button>

        <button
          className="menu-action complete-action"
          onClick={handleComplete}
          disabled={project.status === 'completed'}
        >
          <Check size={16} aria-label="Complete project" />
          {project.status === 'completed' ? 'Completed' : 'Complete'}
        </button>

        <button
          className="menu-action boss-battle-action"
          onClick={handleToggleBossBattle}
        >
          {project.is_boss_battle ? (
            <Star size={16} aria-label="Remove Boss Battle" fill="currentColor" />
          ) : (
            <StarOff size={16} aria-label="Make Boss Battle" />
          )}
          {project.is_boss_battle ? 'Remove Boss Battle' : 'Make Boss Battle'}
        </button>
      </div>
    </div>
  )
}