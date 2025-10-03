import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  console.log("[v0] Middleware - NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "✓ Set" : "✗ Missing")
  console.log("[v0] Middleware - NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "✓ Set" : "✗ Missing")

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Middleware - Missing Supabase environment variables")
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    })

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: If you remove getUser() and you use server-side rendering
    // with the Supabase client, your users may be randomly logged out.
    const {
      data: { user },
    } = await supabase.auth.getUser()

    console.log("[v0] Middleware - User session:", user ? "✓ Authenticated" : "✗ No user")
  } catch (error) {
    console.error("[v0] Middleware - Error in Supabase operations:", error)
  }

  // For now, we don't require authentication for the food delivery MVP
  // This can be enabled later when user accounts are needed

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  return supabaseResponse
}
