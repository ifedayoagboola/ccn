'use client'

import { QueryProvider } from './query-provider'
import { AppProvider } from '@/contexts/app-context'
import { AuthProvider } from '@/contexts/auth-context'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </AuthProvider>
    </QueryProvider>
  )
}




