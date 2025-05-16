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
    async jwt({ token, user, account, profile }) {
      // Initial sign-in
      if (account && user) {
        console.log("JWT callback - Account:", account?.provider);
        token.id = user.id;
        token.provider = account.provider;
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
      if (account && profile) {
        console.log("Sign-in with provider:", account.provider);

        // Make sure we have an email
        if (!user.email) {
          console.error("No email found from provider");
          return false;
        }
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
    signIn: async ({ user, account }) => {
      console.log(
        "User signed in:",
        user.email,
        account?.provider || "credentials"
      );
    },
  },
});
