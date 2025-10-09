import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  runtime: "nodejs",
  // matcher: ["/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)"],
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.well-known|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp|.*\\.gif).*)",
  ],
};

function isTokenExpired(token: string): boolean {
  try {
    const payload = jwt.decode(token) as { exp?: number } | null;
    if (!payload || !payload.exp) return true;
    const now = Date.now() / 1000;
    return payload.exp < now;
  } catch (_) {
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const { cookies, url, nextUrl } = request;
  const token = cookies.get("token")?.value;

  const loginUrl = new URL("/login", url);
  const rootUrl = new URL("/", nextUrl);

  // prevent logged-in users from visiting /login
  if (token && nextUrl.pathname === "/login") {
    return NextResponse.redirect(rootUrl);
  }

  // no token → redirect to /login if not already there
  if (!token && nextUrl.pathname !== "/login") {
    return NextResponse.redirect(loginUrl);
  }

  // token expired → clear cookie and redirect to login
  if (token && isTokenExpired(token)) {
    const resp = NextResponse.redirect(loginUrl);
    resp.cookies.set("token", "", { maxAge: 0 });
    return resp;
  }

  return NextResponse.next();
}
