import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import {routes} from './lib/routes';
import {Roles} from './lib/types';

export const config = {
  runtime: "nodejs",
  // matcher: ["/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)"],
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.well-known|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp|.*\\.gif).*)",
  ],
};

export type TokenPayload = {
  sub: string;
  user_id: string;
  roles: string[];
  exp: number;
};

export async function middleware(request: NextRequest) {
  const { cookies, url, nextUrl } = request;
  const path = nextUrl.pathname;

  const tokenCookieKey = "RESTOApiToken";
  const token = cookies.get(tokenCookieKey)?.value;

  const loginUrl = new URL("/login", url);
  const redirectToLogin = () => NextResponse.redirect(loginUrl);

  const rootUrl = new URL("/", nextUrl);
  const redirectToRoot = () => NextResponse.redirect(rootUrl);

  // no token → redirect to /login if not already there
  if (!token && path !== "/login") {
    return redirectToLogin();
  }

  if (token) {
    const secret = process.env.NEXT_PUBLIC_API_VALIDATION_KEY!;
    const verifiedToken = await verifyToken(token, secret);

    // Skip Next.js internals, static files, or API routes
    if (path.startsWith("/_next") || path.startsWith("/api")) {
      return NextResponse.next();
    }

    if (path.startsWith("/login")) {
      return redirectToRoot();
    }

    // Find matching route config
    const route = routes.find((r) => r.href === path);

    if (!route) return NextResponse.next(); // if route not defined, allow

    // invalid token or expired
    if (!verifiedToken.valid || !verifiedToken.payload) redirectToLogin();

    const validToken = verifiedToken.payload as TokenPayload;

    // prevent logged-in users from visiting /login
    if (path === "/login") {
      return redirectToRoot();
    }

    const roles = validToken.roles || [];

    const hasAccess =
      roles.includes(Roles.ADMIN) ||
      !route.rolesAllowed ||
      route.rolesAllowed.some((role) => roles.includes(role));

    if (!hasAccess) {
      return redirectToRoot();
    }

    return NextResponse.next();
  }

  // TODO -> check middleware logic
  // return NextResponse.next();
}

async function verifyToken(token: string, secret: string) {
  try {
    const publicKeyPem = `${process.env.NEXT_PUBLIC_API_VALIDATION_KEY}`;
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      {
        algorithms: ["HS256"],
      }
    );

    return { valid: true, payload: payload as TokenPayload };
  } catch (err: any) {
    const expired = err?.message?.includes("JWT expired") || false;
    return { valid: false, payload: null, expired };
  }
}
