// Application constants
export const APP_NAME = 'Counter-Cultural Nurses'
export const APP_DESCRIPTION = 'Empowering African nurses to soar beyond the bedside'

// Logo path
export const LOGO_PATH = '/assets/Main logo- CCN_20250326_205534_0000 (1).png'

// Route constants
export const ROUTES = {
  HOME: '/',
  LANDING: 'landing',
  ABOUT: 'about',
  PROGRAMS: 'programs',
  MEMBERSHIP: 'membership',
  COMMUNITY_PUBLIC: 'community-public',
  EVENTS: 'events',
  PARTNERSHIPS: 'partnerships',
  BLOG: 'blog',
  CONTACT: 'contact',
  JOIN: 'join',
  DASHBOARD: 'dashboard',
  COURSES: 'courses',
  JOBS: 'jobs',
  COMMUNITY: 'community',
  ADMIN: 'admin',
} as const

// Navigation items
export const LOGGED_IN_NAV_ITEMS = [
  { id: ROUTES.DASHBOARD, label: 'Dashboard' },
  { id: ROUTES.COURSES, label: 'Courses' },
  { id: ROUTES.JOBS, label: 'Jobs' },
  { id: ROUTES.COMMUNITY, label: 'Community' },
  { id: ROUTES.EVENTS, label: 'Events' },
] as const

export const PUBLIC_NAV_ITEMS = [
  { href: '#home', label: 'Home', route: ROUTES.LANDING },
  { href: null, label: 'About', route: ROUTES.ABOUT },
  { href: null, label: 'Programs', route: ROUTES.PROGRAMS },
  { href: null, label: 'Membership', route: ROUTES.MEMBERSHIP },
  { href: null, label: 'Community', route: ROUTES.COMMUNITY_PUBLIC },
  { href: null, label: 'Events', route: ROUTES.EVENTS },
  { href: null, label: 'Partners', route: ROUTES.PARTNERSHIPS },
  { href: null, label: 'Blog', route: ROUTES.BLOG },
  { href: null, label: 'Contact', route: ROUTES.CONTACT },
] as const

// African countries list
export const AFRICAN_COUNTRIES = [
  'Nigeria',
  'Ghana',
  'Kenya',
  'South Africa',
  'Egypt',
  'Tanzania',
  'Uganda',
  'Rwanda',
  'Ethiopia',
  'Zimbabwe',
  'Zambia',
  'Cameroon',
  'Senegal',
  'Côte d\'Ivoire',
  'Morocco',
  'Tunisia',
  'Algeria',
  'Botswana',
  'Namibia',
  'Mozambique',
  'Other Africa',
  'Outside Africa',
] as const

// API constants
export const QUERY_KEYS = {
  // Add your query keys here
  // Example:
  // users: ['users'] as const,
  // user: (id: string) => ['user', id] as const,
} as const

// Common layout classes
export const LAYOUT_CLASSES = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-20 lg:py-28',
  sectionCompact: 'py-12 lg:py-16',
} as const
