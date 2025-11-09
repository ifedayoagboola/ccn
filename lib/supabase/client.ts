import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey)

let supabaseClient: SupabaseClient<Database> | null = null

if (hasSupabaseConfig) {
  supabaseClient = createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
} else {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Supabase environment variables are not set. Supabase features are disabled.')
  }
}

export function getSupabaseClient() {
  if (!supabaseClient) {
    throw new Error(
      'Supabase client is not configured. Please provide NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    )
  }
  return supabaseClient
}

export { supabaseClient }
