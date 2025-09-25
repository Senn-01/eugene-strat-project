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

  const calculateXP = (): number => {
    // Flat XP regardless of accuracy rating - rating is for learning only
    return xpUtils.calculateProjectXP(project.cost, project.benefit, project.isBossBattle)
  }

  const handleComplete = () => {
    const xpEarned = calculateXP()

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

  const getRatingLabel = (rating: number): string => {
    switch (rating) {
      case 1: return 'HARDER'
      case 2: return 'TOUGH'
      case 3: return 'ACCURATE'
      case 4: return 'EASY'
      case 5: return 'BREEZE'
      default: return 'ACCURATE'
    }
  }

  const getRatingDescription = (rating: number): string => {
    switch (rating) {
      case 1: return 'Much Harder - Significantly underestimated effort'
      case 2: return 'Harder - Somewhat underestimated'
      case 3: return 'Spot On - Accurate estimation!'
      case 4: return 'Easier - Somewhat overestimated'
      case 5: return 'Much Easier - Significantly overestimated'
      default: return 'Spot On - Accurate estimation!'
    }
  }


  return (
    <div className="accuracy-rating-modal">
      <div className="rating-header">
        <div className="rating-title">Complete Project</div>
        <div className="project-summary">{project.name}</div>
        <div className="meta-chips">
          <span className="chip chip-grey">C:{project.cost}</span>
          <span className="chip chip-grey">B:{project.benefit}</span>
          {project.isBossBattle && (
            <span className="boss-star" aria-label="Boss Battle">
              <Star size={14} />
            </span>
          )}
        </div>
      </div>

      <div className="rating-body">
        <div className="rating-question">
          <label className="field-label">How was the actual effort compared to your estimate?</label>
          <div className="question-helper">This won’t change XP; it improves future estimates.</div>
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
                  {getRatingLabel(rating)}
                </div>
              </button>
            ))}
          </div>
          <div className="scale-legend">
            <span className="legend-left">Underestimated</span>
            <span className="legend-right">Overestimated</span>
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