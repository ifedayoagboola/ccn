import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseClient, hasSupabaseConfig } from '@/lib/supabase/client'

export function useSupabaseQuery<TData = any>(
  queryKey: string[],
  table: string,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
) {
  if (!hasSupabaseConfig) {
    throw new Error('Supabase is not configured. Please add Supabase environment variables before using useSupabaseQuery.')
  }

  return useQuery<TData>({
    queryKey,
    queryFn: async () => {
      const supabase = getSupabaseClient() as SupabaseClient<any, any, any>
      const { data, error } = await supabase.from(table).select('*')
      if (error) throw error
      return data as TData
    },
    ...options,
  })
}




