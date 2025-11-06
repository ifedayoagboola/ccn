'use client'

import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'

/**
 * Example component demonstrating authentication context usage
 */
export function ExampleAuth() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Not authenticated</div>
  }

  return (
    <div className="space-y-4">
      <div>
        <p>Logged in as: {user.email}</p>
        <p>User ID: {user.id}</p>
      </div>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  )
}




