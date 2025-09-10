// Core authentication and user types for type safety and consistency

export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Session {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  user: User
}

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
}

// Page identification for navigation and styling
export type PageId = 'tactical-map' | 'deep-focus' | 'analytics' | 'prime'

export interface PageConfig {
  id: PageId
  title: string
  headerColor: string
  route: string
  navLabel: string
}

// Component prop interfaces
export interface AuthFormProps {
  mode: 'login' | 'signup'
  onSubmit: (email: string, password: string) => Promise<void>
  loading?: boolean
  error?: string | null
}

export interface AppHeaderProps {
  pageId: PageId
  user: User | null
}

export interface NavigationProps {
  currentPage: PageId
}