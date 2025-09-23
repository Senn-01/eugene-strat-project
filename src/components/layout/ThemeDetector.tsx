'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { AppHeader } from '@/components/layout/AppHeader'
import { Navigation } from '@/components/layout/Navigation'
import { XpGauge } from '@/components/layout/XpGauge'
import { PageId } from '@/lib/types/auth.types'

interface ThemeDetectorProps {
  children: React.ReactNode
  user: {
    id: string
    email?: string
  } | null
}

function getPageIdFromPathname(pathname: string): PageId {
  if (pathname.includes('/tactical-map')) return 'tactical-map'
  if (pathname.includes('/deep-focus')) return 'deep-focus'
  if (pathname.includes('/analytics')) return 'analytics'
  if (pathname.includes('/prime')) return 'prime'
  return 'tactical-map' // Default fallback
}

export function ThemeDetector({ children, user }: ThemeDetectorProps) {
  const pathname = usePathname()
  const currentPageId = getPageIdFromPathname(pathname)

  useEffect(() => {
    // Set theme attributes on both html and body for maximum CSS targeting
    document.documentElement.setAttribute('data-page-theme', currentPageId)
    document.body.setAttribute('data-page-theme', currentPageId)
  }, [currentPageId])

  return (
    <div className="page-layout" data-page-theme={currentPageId}>
      <AppHeader pageId={currentPageId} user={user} />
      <XpGauge className="xp-gauge-layout" />
      <main className="page-content">
        {children}
      </main>
      <Navigation currentPage={currentPageId} />
    </div>
  )
}