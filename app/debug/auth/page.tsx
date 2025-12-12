"use client"

import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'

export default function AuthDebugPage() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking session…</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <div className="max-w-xl w-full rounded-2xl border border-border bg-card p-6 shadow-warm">
        <h1 className="mb-4 text-xl font-semibold">Auth debug</h1>
        {user ? (
          <div className="space-y-4">
            <p className="text-sm text-foreground">
              You are <span className="font-semibold">signed in</span>.
            </p>
            <pre className="max-h-64 overflow-auto rounded-xl bg-muted p-3 text-xs text-muted-foreground">
{`ID: ${user.id}
Email: ${user.email ?? '-'}
Provider: ${user.app_metadata?.provider ?? '-'}`}
            </pre>
            <Button variant="outline" onClick={signOut}>
              Sign out
            </Button>
          </div>
        ) : (
          <p className="text-sm text-destructive">
            No active Supabase session was found. If you just used Google sign-in and landed back on <code>/</code>,
            the redirect is working but the session is not being created or persisted.
          </p>
        )}
      </div>
    </main>
  )
}



