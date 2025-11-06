'use client'

import { useSupabaseQuery } from '@/hooks/use-supabase-query'
import { Button } from '@/components/ui/button'

/**
 * Example component demonstrating React Query + Supabase integration
 * Replace 'your_table' with your actual Supabase table name
 */
export function ExampleQuery() {
  const { data, isLoading, error, refetch } = useSupabaseQuery(
    ['example-data'],
    'your_table', // Replace with your table name
    {
      enabled: false, // Set to true to fetch on mount
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => refetch()}>Fetch Data</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}




