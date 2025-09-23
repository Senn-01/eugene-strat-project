import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ThemeDetector } from '@/components/layout/ThemeDetector'

interface ProtectedLayoutProps {
  children: React.ReactNode
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

  return (
    <ThemeDetector user={user}>
      {children}
    </ThemeDetector>
  )
}