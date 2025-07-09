
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Use demo/fallback values that won't cause crashes
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

// Create client with error handling
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
})

// Check if we have real Supabase credentials
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://demo.supabase.co' && supabaseAnonKey !== 'demo-key'
}
