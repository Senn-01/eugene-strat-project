'use client'

import { PageId } from '@/lib/types/auth.types'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { HamburgerMenu } from './HamburgerMenu'
import { createClient } from '@/lib/supabase/client'

interface AppHeaderProps {
  pageId: PageId
  user: {
    id: string
    email?: string
  } | null
}

const PAGE_CONFIGS = {
  'tactical-map': {
    id: 'tactical-map' as const,
    title: 'Tactical Map',
    headerColor: '#FDE047', // Yellow
    route: '/tactical-map',
    navLabel: 'MAP'
  },
  'deep-focus': {
    id: 'deep-focus' as const,
    title: 'Deep Focus',
    headerColor: '#CFE820', // Yellow-Green
    route: '/deep-focus',
    navLabel: 'FOC'
  },
  'analytics': {
    id: 'analytics' as const,
    title: 'Analytics',
    headerColor: '#E5B6E5', // Pink
    route: '/analytics',
    navLabel: 'DAT'
  },
  'prime': {
    id: 'prime' as const,
    title: 'Prime',
    headerColor: '#2563EB', // Blue
    route: '/prime',
    navLabel: 'PRI'
  }
}

export function AppHeader({ pageId, user }: AppHeaderProps) {
  const pageConfig = PAGE_CONFIGS[pageId]

  const handleResetData = async (): Promise<boolean> => {
    const supabase = createClient()

    try {
      // Delete all projects and reset XP
      await Promise.all([
        supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('user_preferences').upsert({
          user_id: user?.id,
          xp_points: 0
        })
      ])

      // Reload the page to reflect changes
      window.location.reload()
      return true
    } catch (error) {
      console.error('Failed to reset data:', error)
      return false
    }
  }

  return (
    <header
      className="app-header"
      style={{ backgroundColor: pageConfig.headerColor }}
    >
      <div className="header-left">
        <div className="header-logo">
          Eugene Strat
        </div>
      </div>

      <div className="header-center">
        <div className="brain-dump-placeholder">
          Brain Dump Placeholder
        </div>
      </div>

      <div className="header-right">
        {user && (
          <>
            <span className="text-mono" style={{ fontSize: '0.875rem' }}>
              {user.email || 'User'}
            </span>
            <LogoutButton variant="secondary" />
          </>
        )}
        <HamburgerMenu onResetData={handleResetData} />
      </div>
    </header>
  )
}