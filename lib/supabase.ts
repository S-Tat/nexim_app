import { createBrowserClient as createSsrBrowserClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserInstance: SupabaseClient | null = null;

/**
 * Browser client — uses the public anon key (safe to expose).
 * Singleton so auth session persists across components.
 */
export function createBrowserClient(): SupabaseClient {
  if (browserInstance) return browserInstance;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set.",
    );
  }
  browserInstance = createSsrBrowserClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return browserInstance;
}

/**
 * Server-only admin client — uses the service-role key.
 * Bypasses RLS; NEVER import in "use client" files.
 */
export function createServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars not set (server).");
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
