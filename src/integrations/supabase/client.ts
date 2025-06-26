
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Fallback values for GitHub Pages deployment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uhxkfyqxhqxfsjkobcdd.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoeGtmeXF4aHF4ZnNqa29iY2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNzQwNjMsImV4cCI6MjA1MDc1MDA2M30.JcRMxhL_FfZyRiKOKy_kqB7H6CYgWQ11QC7n-5v7Nuk'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
