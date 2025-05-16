import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/components/forms/login-form/schema";
import bcrypt from "bcryptjs";
import { prisma } from "./utils/prisma";
import Github from 'next-auth/providers/github';

export default {
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
} satisfies NextAuthConfig;
