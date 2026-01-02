import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/" ];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get JWT token
  const token = await getToken({ req: request });

  //check valid token
  function validToken() {
    if (token && token?.error)
      return false
    else
      return true
  }

  // If route is protected and user not logged in 
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token && validToken()) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

// If logged in, redirect based on role
  if (token) {
    if ((token.role === "admin" || token.role === "user") && pathname === "/") {
      return NextResponse.redirect(new URL("/session/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|auth|_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};
