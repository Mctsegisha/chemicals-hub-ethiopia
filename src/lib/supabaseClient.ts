import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve public client credentials from Vite environment or default config
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  'https://orisdriuhxpqlnffznjg.supabase.co';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yaXNkcml1aHhwcWxuZmZ6bmpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyNTY5NzgsImV4cCI6MjEwMjgzMjk3OH0.yFfAb7CdWUKXNRQV_qQJ5xCfxBpXM9G01Wgr5c4938M';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-ref')
);

// Instantiate client
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

