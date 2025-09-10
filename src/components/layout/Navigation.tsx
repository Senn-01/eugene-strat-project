import Link from 'next/link'
import { PageId } from '@/lib/types/auth.types'

interface NavigationProps {
  currentPage: PageId
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

export function Navigation({ currentPage }: NavigationProps) {
  const getNavButtonClass = (pageId: PageId) => {
    const baseClass = 'nav-button'
    const pageClass = `nav-${pageId.replace('-', '')}`
    const activeClass = currentPage === pageId ? 'active' : ''
    
    return `${baseClass} ${pageClass} ${activeClass}`.trim()
  }

  return (
    <nav className="quick-nav">
      {/* Top row: MAP, FOC */}
      <Link
        href={PAGE_CONFIGS['tactical-map'].route}
        className={getNavButtonClass('tactical-map')}
      >
        <span>{PAGE_CONFIGS['tactical-map'].navLabel}</span>
      </Link>
      
      <Link
        href={PAGE_CONFIGS['deep-focus'].route}
        className={getNavButtonClass('deep-focus')}
      >
        <span>{PAGE_CONFIGS['deep-focus'].navLabel}</span>
      </Link>

      {/* Bottom row: DAT, PRI */}
      <Link
        href={PAGE_CONFIGS['analytics'].route}
        className={getNavButtonClass('analytics')}
      >
        <span>{PAGE_CONFIGS['analytics'].navLabel}</span>
      </Link>

      <Link
        href={PAGE_CONFIGS['prime'].route}
        className={getNavButtonClass('prime')}
      >
        <span>{PAGE_CONFIGS['prime'].navLabel}</span>
      </Link>
    </nav>
  )
}