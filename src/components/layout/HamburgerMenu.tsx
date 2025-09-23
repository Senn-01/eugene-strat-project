'use client'

import { useState } from 'react'

interface HamburgerMenuProps {
  onResetData: () => Promise<boolean>
}

export function HamburgerMenu({ onResetData }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

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
              <button
                className="hamburger-menu-item reset-data-item"
                onClick={handleResetClick}
              >
                <span className="menu-item-icon">🗑️</span>
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

      <style jsx>{`
        .hamburger-menu-container {
          position: relative;
        }

        .header-menu-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .header-menu-button:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .hamburger-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
        }

        .hamburger-menu-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: #FDE047;
          border: 3px solid #000;
          border-radius: 0;
          min-width: 200px;
          z-index: 1000;
          box-shadow: 4px 4px 0px #000;
        }

        .hamburger-menu-item {
          width: 100%;
          padding: 1rem;
          background: none;
          border: none;
          border-bottom: 2px solid #000;
          text-align: left;
          cursor: pointer;
          font-family: 'SF Mono', 'Monaco', monospace;
          font-weight: 600;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hamburger-menu-item:last-child {
          border-bottom: none;
        }

        .hamburger-menu-item:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .reset-data-item {
          color: #dc2626;
        }

        .reset-data-item:hover {
          background-color: rgba(220, 38, 38, 0.1);
        }

        .menu-item-icon {
          font-size: 1rem;
        }

        .reset-confirmation-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .reset-confirmation-dialog {
          background: #FDE047;
          border: 4px solid #000;
          border-radius: 0;
          max-width: 400px;
          width: 90%;
          box-shadow: 8px 8px 0px #000;
        }

        .confirmation-header {
          padding: 1.5rem 1.5rem 0;
          border-bottom: 3px solid #000;
          margin-bottom: 1.5rem;
        }

        .confirmation-header h3 {
          margin: 0;
          font-family: 'SF Mono', 'Monaco', monospace;
          font-weight: 800;
          font-size: 1.25rem;
          color: #dc2626;
        }

        .confirmation-content {
          padding: 0 1.5rem;
          font-family: 'SF Mono', 'Monaco', monospace;
          line-height: 1.6;
        }

        .confirmation-content ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .confirmation-content li {
          margin: 0.5rem 0;
        }

        .confirmation-actions {
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .confirmation-button {
          padding: 0.75rem 1.5rem;
          border: 3px solid #000;
          font-family: 'SF Mono', 'Monaco', monospace;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 0;
        }

        .confirmation-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cancel-button {
          background: #fff;
          color: #000;
        }

        .cancel-button:hover:not(:disabled) {
          background: #f3f4f6;
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0px #000;
        }

        .confirm-button {
          background: #dc2626;
          color: #fff;
        }

        .confirm-button:hover:not(:disabled) {
          background: #b91c1c;
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0px #000;
        }
      `}</style>
    </>
  )
}