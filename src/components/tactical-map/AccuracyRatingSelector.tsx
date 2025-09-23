'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { xpUtils } from './utils'

interface Project {
  id: string
  name: string
  cost: number
  benefit: number
  isBossBattle?: boolean
}

interface AccuracyRatingSelectorProps {
  project: Project
  onComplete: (rating: number, xpEarned: number) => void
  onCancel: () => void
}

export function AccuracyRatingSelector({
  project,
  onComplete,
  onCancel,
}: AccuracyRatingSelectorProps) {
  const [selectedRating, setSelectedRating] = useState<number>(3)

  const calculateXP = (rating: number): number => {
    const baseXP = xpUtils.calculateProjectXP(project.cost, project.benefit, project.isBossBattle)
    // Apply accuracy rating multiplier: rating/5 (1=20%, 2=40%, 3=60%, 4=80%, 5=100%)
    return Math.round(baseXP * (rating / 5))
  }

  const handleComplete = () => {
    const xpEarned = calculateXP(selectedRating)

    // Immediately update XP gauge with lighting effect
    const currentXp = getCurrentXpFromGauge() || 0
    const newXp = currentXp + xpEarned

    window.dispatchEvent(new CustomEvent('xp-update', {
      detail: { newXp }
    }))

    onComplete(selectedRating, xpEarned)
  }

  const getCurrentXpFromGauge = (): number | null => {
    const xpElement = document.querySelector('.xp-value')
    if (xpElement) {
      const xpText = xpElement.textContent?.replace(/,/g, '') || '0'
      return parseInt(xpText) || 0
    }
    return null
  }

  const getRatingDescription = (rating: number): string => {
    switch (rating) {
      case 1: return 'Poor - Significant issues'
      case 2: return 'Below Average - Some problems'
      case 3: return 'Average - Met expectations'
      case 4: return 'Good - Exceeded expectations'
      case 5: return 'Excellent - Outstanding work'
      default: return 'Average'
    }
  }


  return (
    <div className="accuracy-rating-modal">
      <div className="rating-header">
        <div className="rating-title">Complete Project</div>
        <div className="project-summary">{project.name}</div>
        <div className="project-details">
          Cost: {project.cost} • Benefit: {project.benefit}
          {project.isBossBattle && <span className="boss-badge"><Star size={14} fill="currentColor" /> Boss Battle</span>}
        </div>
      </div>

      <div className="rating-body">
        <div className="rating-question">
          <label className="field-label">How accurate was your initial estimation?</label>
          <div className="accuracy-scale">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                className={`accuracy-option ${selectedRating === rating ? 'selected' : ''}`}
                onClick={() => setSelectedRating(rating)}
              >
                <div className="rating-number">{rating}</div>
                <div className="rating-label">
                  {Array.from({ length: rating }, (_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </button>
            ))}
          </div>
          <div className="rating-description">
            {getRatingDescription(selectedRating)}
          </div>
        </div>

        <div className="completion-feedback">
          <div className="feedback-text">
            Great job completing this project! Your accuracy assessment helps improve future estimations.
          </div>
        </div>
      </div>

      <div className="rating-actions">
        <button
          type="button"
          className="button-cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="button-complete"
          onClick={handleComplete}
        >
          Complete Project
        </button>
      </div>
    </div>
  )
}