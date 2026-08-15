import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Returns null when Supabase env vars aren't configured yet, so the
// public site can keep rendering from static fallback data instead
// of crashing during build/dev before the CMS is wired up.
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function createClient() {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // called from a Server Component render — safe to ignore,
            // middleware refreshes the session cookie on navigation.
          }
        },
      },
    }
  );
}
