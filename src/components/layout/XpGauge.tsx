'use client'

import { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'

interface XpGaugeProps {
  className?: string
}

export function XpGauge({ className = '' }: XpGaugeProps) {
  const [currentXp, setCurrentXp] = useState(0)
  const [displayXp, setDisplayXp] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch current XP from user preferences
  useEffect(() => {
    const fetchUserXp = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()

        const { data: user } = await supabase.auth.getUser()
        if (!user.user) return

        const { data, error } = await supabase
          .from('user_preferences')
          .select('xp_points')
          .eq('user_id', user.user.id)
          .single()

        if (!error && data) {
          setCurrentXp(data.xp_points || 0)
          setDisplayXp(data.xp_points || 0)
        }
      } catch (error) {
        console.error('Error fetching user XP:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserXp()
  }, [])

  // Listen for immediate XP updates from project completions
  useEffect(() => {
    const handleXpUpdate = (event: CustomEvent<{ newXp: number }>) => {
      setCurrentXp(event.detail.newXp)
    }

    window.addEventListener('xp-update', handleXpUpdate as EventListener)

    return () => {
      window.removeEventListener('xp-update', handleXpUpdate as EventListener)
    }
  }, [])

  // Animate XP changes
  useEffect(() => {
    if (currentXp !== displayXp && !isLoading) {
      setIsAnimating(true)

      const difference = currentXp - displayXp
      const duration = 1000 // 1 second animation
      const steps = 30
      const stepValue = difference / steps
      const stepTime = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        if (currentStep <= steps) {
          setDisplayXp(prev => Math.round(prev + stepValue))
        } else {
          setDisplayXp(currentXp)
          setIsAnimating(false)
          clearInterval(interval)
        }
      }, stepTime)

      return () => clearInterval(interval)
    }
  }, [currentXp, displayXp, isLoading])


  const formatXp = (xp: number): string => {
    return xp.toLocaleString()
  }

  if (isLoading) {
    return (
      <div className={`xp-gauge loading ${className}`}>
        <div className="xp-display">
          <Zap size={16} className="xp-icon" aria-hidden="true" />
          <span className="xp-value">...</span>
          <span className="xp-label">Points</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`xp-gauge ${isAnimating ? 'animating' : ''} ${className}`}>
      <div className="xp-display">
        <Zap size={16} className="xp-icon" aria-hidden="true" />
        <span className="xp-value">{formatXp(displayXp)}</span>
        <span className="xp-label">Points</span>
      </div>
    </div>
  )
}