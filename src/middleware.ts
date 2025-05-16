import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/profile"];

const { auth: middleware } = NextAuth({
  ...authConfig,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

export default middleware(async (req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn: boolean = Boolean(req.auth);

  if (authRoutes.includes(pathname)) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }

  if (protectedRoutes.includes(pathname)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
});

export const config = {
  matcher: ["/login", "/register", "/profile"],
};
