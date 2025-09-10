interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'black' | 'white'
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'black',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-3', 
    lg: 'w-6 h-6 border-3'
  }

  const colorStyles = {
    black: 'border-black border-t-transparent',
    white: 'border-white border-t-transparent'
  }

  return (
    <div 
      className={`loading-spinner ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}