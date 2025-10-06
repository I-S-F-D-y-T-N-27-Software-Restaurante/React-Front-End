import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  runtime: "nodejs",
  matcher: [
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
    const loginUrl = new URL("/login", url);
    return NextResponse.redirect(loginUrl);
  }

  if (isTokenExpired(token)) {
    const loginUrl = new URL("/login", url);
    const resp = NextResponse.redirect(loginUrl);
    resp.cookies.set("token", "", { maxAge: 0 });
    return resp;
  }

  return NextResponse.next();
}
