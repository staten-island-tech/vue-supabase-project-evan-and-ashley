import { createClient } from '@supabase/supabase-js'

// if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
//   throw new Error('Supabase URL or Anon Key is not set')
// } uncomment if supabaseUrl error affects running

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// npm install @supabase/supabase-js
