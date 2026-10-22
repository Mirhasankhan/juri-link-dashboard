import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp?: number;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  let isValid = false;

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        isValid = false;
      } else {
        isValid = true;
      }
    } catch {
      isValid = false;
    }
  }

  // Handle root route
  if (pathname === "/" || pathname === "/dashboard") {
    if (isValid) {
      return NextResponse.redirect(new URL("/dashboard/overview", req.url));
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect /dashboard and all subroutes
  if (pathname.startsWith("/dashboard")) {
    if (!isValid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // Auth pages (login, forgot-password, reset-password)
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  if (isAuthPage && isValid) {
    return NextResponse.redirect(new URL("/dashboard/overview", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/login",
    "/forgot-password",
    "/reset-password",
  ],
};
