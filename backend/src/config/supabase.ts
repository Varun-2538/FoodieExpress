import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from './env';
import { Database } from '../types/database.types';

// Admin client with service role key (for server-side operations)
export const supabaseAdmin: SupabaseClient<Database> = createClient<Database>(
  config.supabase.url,
  config.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Standard client with anon key (for user-specific operations)
export const supabase: SupabaseClient<Database> = createClient<Database>(
  config.supabase.url,
  config.supabase.anonKey
);