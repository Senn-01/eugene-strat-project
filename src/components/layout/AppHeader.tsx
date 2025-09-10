import { PageId } from '@/lib/types/auth.types'
import { LogoutButton } from '@/components/auth/LogoutButton'

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
        <button className="header-menu-button">
          ≡
        </button>
      </div>
    </header>
  )
}