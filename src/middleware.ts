import { auth, auth as middleware } from "@/auth";
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/profile"];
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
