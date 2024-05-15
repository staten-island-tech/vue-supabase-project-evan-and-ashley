import { createClient } from '@supabase/supabase-js'

// if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
//   throw new Error('Supabase URL or Anon Key is not set')
// } uncomment if supabaseUrl error affects running

const supabaseUrl = 'https://kzqlgtcpzttmatwfxlxz.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cWxndGNwenR0bWF0d2Z4bHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzYzMzUsImV4cCI6MjAyNzgxMjMzNX0.16WLZsbQhRyIuYaEoMrvrBq7i3TtluZzgDBRxShK5Q0'
export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string)

// npm install @supabase/supabase-js
