import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppHeader } from '@/components/layout/AppHeader'
import { Navigation } from '@/components/layout/Navigation'
import { XpGauge } from '@/components/layout/XpGauge'
import { PageId } from '@/lib/types/auth.types'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

// Helper function to determine current page from pathname
function getCurrentPageId(): PageId {
  // This is a temporary implementation - in a real app, you'd use usePathname() 
  // or get this from the actual route params. For now, we'll default to tactical-map
  // since this will be corrected when we implement the individual pages
  return 'tactical-map'
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const supabase = await createClient()
  
  // Check authentication
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/')
  }

  // Get current page - this would be dynamic in a real implementation
  const currentPageId = getCurrentPageId()

  return (
    <div className="page-layout">
      <AppHeader pageId={currentPageId} user={user} />
      <XpGauge className="xp-gauge-layout" />
      <main className="page-content">
        {children}
      </main>
      <Navigation currentPage={currentPageId} />
    </div>
  )
}