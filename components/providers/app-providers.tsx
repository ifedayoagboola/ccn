'use client'

import { QueryProvider } from './query-provider'
import { AuthProvider } from '@/contexts/auth-context'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryProvider>
  )
}
