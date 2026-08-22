import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Test environment gate: only active when TEST_GATE_ENABLED=true
function handleTestGate(request: NextRequest): NextResponse | null {
  if (process.env.TEST_GATE_ENABLED !== "true") return null;

  const { pathname } = request.nextUrl;

  // Allow login page and auth API through
  if (pathname === "/test-login" || pathname.startsWith("/api/test-auth")) {
    return null;
  }

  const session = request.cookies.get("test_gate_session");
  if (session?.value === process.env.TEST_GATE_SESSION_SECRET) {
    return null; // authenticated
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/test-login";
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export async function middleware(request: NextRequest) {
  const gateResponse = handleTestGate(request);
  if (gateResponse) return gateResponse;

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || !supabaseUrl.startsWith("http")) {
    // Supabase not configured - skip auth checks
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session - this is important to keep the session alive
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Het CMS is alleen voor accounts met de rol 'admin' in user_roles.
  // De RLS-policy user_roles_self_read laat iedereen alleen de eigen rij zien.
  const isAdmin = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();
    return data?.role === "admin";
  };

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
    if (!(await isAdmin(user.id))) {
      // Ingelogd, maar geen beheerder: terug naar het ledenportaal
      const ledenUrl = request.nextUrl.clone();
      ledenUrl.pathname = "/leden";
      ledenUrl.search = "?geen-beheerrechten=1";
      return NextResponse.redirect(ledenUrl);
    }
  }

  // If user is authenticated and visits /admin/login, redirect to /admin
  if (pathname.startsWith("/admin/login") && user) {
    const target = request.nextUrl.clone();
    target.pathname = (await isAdmin(user.id)) ? "/admin" : "/leden";
    return NextResponse.redirect(target);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
