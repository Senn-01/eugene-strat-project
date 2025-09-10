'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface LogoutButtonProps {
  className?: string
  variant?: 'primary' | 'secondary' | 'danger'
}

export function LogoutButton({ 
  className = '', 
  variant = 'secondary' 
}: LogoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLogout = async () => {
    setLoading(true)
    
    try {
      await supabase.auth.signOut()
      // Redirect to auth page
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`btn-brutal btn-${variant} ${className}`}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" color={variant === 'primary' ? 'black' : 'white'} />
          <span style={{ marginLeft: '8px' }}>Logging out...</span>
        </>
      ) : (
        'Logout'
      )}
    </button>
  )
}