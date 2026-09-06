import { createClient } from '@supabase/supabase-js';

// IMPORTANT: this file must only ever be imported from server code
// (Server Components, Server Actions, Route Handlers) — never from a
// 'use client' component — because it holds the service-role key, which
// bypasses Row Level Security. That is intentional here: it's how the app
// keeps photos and family data private from the public anon key while still
// letting the app itself read/write everything server-side.
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}
