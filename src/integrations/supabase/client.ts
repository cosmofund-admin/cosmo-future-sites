
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Используем реальные учетные данные или fallback значения
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uhxkfyqxhqxfsjkobcdd.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoeGtmeXF4aHF4ZnNqa29iY2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTk4NTksImV4cCI6MjA2NjI3NTg1OX0.Hec39Gi-G5fPXpBJIgVIl25V0CPsztLy1nVj3XNK5oI'

// Создаем клиент с обработкой ошибок
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Проверяем, настроен ли Supabase с реальными учетными данными
export const isSupabaseConfigured = () => {
  return supabaseUrl.includes('uhxkfyqxhqxfsjkobcdd.supabase.co') && 
         supabaseAnonKey.length > 50 && 
         supabaseAnonKey !== 'demo-key'
}
