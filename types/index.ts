// User types
export interface User {
  name: string
  email: string
  role: string
  isAdmin?: boolean
}

// Navigation types
export type Route = typeof import('../utils/constants').ROUTES[keyof typeof import('../utils/constants').ROUTES]

export interface NavItem {
  id?: string
  href?: string | null
  label: string
  route?: Route
  onClick?: () => void
}

// Form types
export interface WaitlistFormData {
  name: string
  email: string
  country: string
}

// Component prop types
export interface HeaderProps {
  user?: User | null
  currentPage?: string
  onNavigate?: (page: Route) => void
  onLogout?: () => void
  isAdmin?: boolean
}

export interface LandingPageProps {
  onJoinClick: () => void
  onNavigate?: (page: Route) => void
}

export interface NewsletterSectionProps {
  variant?: 'default' | 'compact' | 'feature'
  className?: string
}

