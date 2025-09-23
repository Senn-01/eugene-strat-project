'use client'

import { PageId } from '@/lib/types/auth.types'
import { HamburgerMenu } from './HamburgerMenu'
import { createClient } from '@/lib/supabase/client'

interface AppHeaderProps {
  pageId: PageId
  user: {
    id: string
    email?: string
  } | null
}


export function AppHeader({ pageId, user }: AppHeaderProps) {

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
    <header className="app-header" data-page-theme={pageId}>
      <div className="header-left">
        <div className="header-logo">
          Eugene Strat
        </div>
      </div>

      <div className="header-center">
        <button className="brain-dump-placeholder">
          Brain Dump ⌘+K
        </button>
      </div>

      <div className="header-right">
        <HamburgerMenu onResetData={handleResetData} user={user} />
      </div>
    </header>
  )
}