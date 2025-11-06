import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

export function useSupabaseQuery<TData = any>(
  queryKey: string[],
  table: string,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData>({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select('*')
      if (error) throw error
      return data as TData
    },
    ...options,
  })
}




