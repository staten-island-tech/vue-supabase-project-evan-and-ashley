import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://kzqlgtcpzttmatwfxlxz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cWxndGNwenR0bWF0d2Z4bHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzYzMzUsImV4cCI6MjAyNzgxMjMzNX0.16WLZsbQhRyIuYaEoMrvrBq7i3TtluZzgDBRxShK5Q0')

// npm install @supabase/supabase-js