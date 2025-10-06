import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  runtime: "nodejs",
  matcher: [
    /*
      match all protected routes. skip login, static assets, api/auth maybe
      adjust paths as needed
    */
    "/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)",
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
  const { cookies, url } = request;
  const token = cookies.get("token")?.value;

  if (!token) {
    // no token → redirect to login
    const loginUrl = new URL("/login", url);
    return NextResponse.redirect(loginUrl);
  }

  if (isTokenExpired(token)) {
    // expired token → clear cookie maybe and redirect
    const loginUrl = new URL("/login", url);
    // optional: delete cookie
    const resp = NextResponse.redirect(loginUrl);
    resp.cookies.set("token", "", { maxAge: 0 });
    return resp;
  }

  // token present and valid → proceed
  return NextResponse.next();
}
