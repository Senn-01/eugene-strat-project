'use client'

import { useState, FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface AuthFormProps {
  initialMode?: 'login' | 'signup'
}

export function AuthForm({ initialMode = 'login' }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { error } = mode === 'signup' 
        ? await supabase.auth.signUp({ 
            email, 
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback`
            }
          })
        : await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError(error.message)
      } else {
        // Redirect will be handled by middleware
        window.location.href = '/tactical-map'
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
    setError(null)
  }

  return (
    <div className="auth-form">
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      
      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-grid">
        <div>
          <label htmlFor="email" className="field-label">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input-brutal"
            placeholder="ENTER YOUR EMAIL"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className="input-brutal"
            placeholder="ENTER YOUR PASSWORD"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-brutal btn-primary"
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" color="black" />
              <span style={{ marginLeft: '8px' }}>
                {mode === 'login' ? 'Logging In...' : 'Creating Account...'}
              </span>
            </>
          ) : (
            mode === 'login' ? 'Login' : 'Create Account'
          )}
        </button>
      </form>

      <div className="auth-form-toggle">
        <p>
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={toggleMode} disabled={loading}>
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}