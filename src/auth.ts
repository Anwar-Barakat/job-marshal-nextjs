import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./utils/prisma";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign-in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }

      // Ensure session has fresh data
      if (session.user.id) {
        const userData = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        });

        if (userData) {
          // Update properties individually to avoid type errors
          if (userData.name) session.user.name = userData.name;
          if (userData.email) session.user.email = userData.email;
          if (userData.image) session.user.image = userData.image;
        }
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      // If the user exists but doesn't have an account with this provider, link the account
      if (account && user) {
        return true; // The adapter should handle account linking automatically
      }
      return true;
    },
  },
  events: {
    createUser: async ({ user }) => {
      console.log("User created:", user);
    },
    linkAccount: async ({ user, account, profile }) => {
      console.log("Account linked:", user.email, account.provider);
    },
  },
});
