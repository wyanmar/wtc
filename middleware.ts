import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie =
    request.cookies.get("admin_session");

  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");

  const isLoginPage = pathname === "/admin/login";

  if (isAdminRoute && !sessionCookie && !isLoginPage) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  if (isLoginPage && sessionCookie) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );
  }

  if (sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie.value);

      // SUPER ADMIN ONLY
      if (
        pathname.startsWith("/admin/user") &&
        session.role !== "SUPER_ADMIN"
      ) {
        return NextResponse.redirect(
          new URL("/admin/dashboard", request.url)
        );
      }

      // ADMIN PUSAT + SUPER ADMIN
      if (
        pathname.startsWith("/admin/cabang") &&
        session.role === "ADMIN_CABANG"
      ) {
        return NextResponse.redirect(
          new URL("/admin/dashboard", request.url)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};