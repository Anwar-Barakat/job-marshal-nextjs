import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./utils/prisma";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/components/forms/login-form/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Github,
    Google,
    Credentials({
      async authorize(credentials) {
        try {
          const result = loginSchema.safeParse(credentials);
          if (!result.success) {
            throw new Error("Invalid credentials format");
          }

          const { email, password } = result.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return user;
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
