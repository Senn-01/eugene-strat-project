'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LogOut, Trash2, User } from 'lucide-react'

interface HamburgerMenuProps {
  onResetData: () => Promise<boolean>
  user: {
    id: string
    email?: string
  } | null
}

export function HamburgerMenu({ onResetData, user }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const supabase = createClient()

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleResetClick = () => {
    setShowConfirmDialog(true)
    setIsOpen(false)
  }

  const handleConfirmReset = async () => {
    setIsResetting(true)
    try {
      const success = await onResetData()
      if (success) {
        setShowConfirmDialog(false)
      }
    } finally {
      setIsResetting(false)
    }
  }

  const handleCancelReset = () => {
    setShowConfirmDialog(false)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setIsOpen(false)

    try {
      await supabase.auth.signOut()
      // Redirect to auth page
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      <div className="hamburger-menu-container">
        <button
          className="header-menu-button"
          onClick={handleMenuToggle}
          aria-label="Menu"
        >
          ≡
        </button>

        {isOpen && (
          <>
            <div
              className="hamburger-menu-overlay"
              onClick={() => setIsOpen(false)}
            />
            <div className="hamburger-menu-dropdown">
              {/* User Info Section */}
              {user && (
                <div className="hamburger-menu-user-section">
                  <div className="user-info">
                    <User size={16} className="user-icon" />
                    <div className="user-details">
                      <div className="user-email">{user.email || 'User'}</div>
                      <div className="user-meta">Account Active</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Menu Actions */}
              <button
                className="hamburger-menu-item logout-item"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut size={16} className="menu-item-icon" />
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>

              <button
                className="hamburger-menu-item reset-data-item"
                onClick={handleResetClick}
              >
                <Trash2 size={16} className="menu-item-icon" />
                Reset All Data
              </button>
            </div>
          </>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="reset-confirmation-overlay">
          <div className="reset-confirmation-dialog">
            <div className="confirmation-header">
              <h3>Reset All Data</h3>
            </div>

            <div className="confirmation-content">
              <p>This will permanently delete:</p>
              <ul>
                <li>All your projects</li>
                <li>All your XP points</li>
                <li>All your progress</li>
              </ul>
              <p><strong>This action cannot be undone.</strong></p>
            </div>

            <div className="confirmation-actions">
              <button
                className="confirmation-button cancel-button"
                onClick={handleCancelReset}
                disabled={isResetting}
              >
                Cancel
              </button>
              <button
                className="confirmation-button confirm-button"
                onClick={handleConfirmReset}
                disabled={isResetting}
              >
                {isResetting ? 'Resetting...' : 'Yes, Reset Everything'}
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}