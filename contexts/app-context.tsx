'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface AppContextType {
  // Add your app-wide state here
  // Example:
  // user: User | null
  // setUser: (user: User | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Initialize your app-wide state here
  // Example:
  // const [user, setUser] = useState<User | null>(null)

  const value: AppContextType = {
    // Add your state values here
    // Example:
    // user,
    // setUser,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}




