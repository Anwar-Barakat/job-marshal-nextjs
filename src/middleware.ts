import { auth, auth as middleware } from "@/auth";
import { NextResponse } from "next/server";

export default middleware(async (req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn: boolean = Boolean(req.auth);

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }
});

export const config = {
  matcher: ["/login", "/register", "/profile"],
};
