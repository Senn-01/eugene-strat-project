import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AuthForm } from '@/components/auth/AuthForm'

export default async function Home() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // If user is already authenticated, redirect to tactical-map
  if (user) {
    redirect('/tactical-map')
  }

  return (
    <div className="page-layout">
      <div className="page-content flex-center">
        <div className="text-center mb-8">
          <h1 className="text-display mb-4">Eugene Strat</h1>
          <p className="text-subheading text-mono">
            Strategic Project Management
          </p>
        </div>
        
        <AuthForm />
      </div>
    </div>
  )
}
