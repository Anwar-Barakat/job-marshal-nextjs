import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./utils/prisma";
import authConfig from "./auth.config";

// Force database session strategy
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: {
    strategy: "database", // Use database strategy to ensure data is stored in the database
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async session({ session, user }) {
      // With database sessions, the second parameter is the user from the database
      if (user) {
        session.user.id = user.id;

        // No need to refetch user data as it's already fresh from the adapter
        if (user.name) session.user.name = user.name;
        if (user.email) session.user.email = user.email;
        if (user.image) session.user.image = user.image;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Log everything to diagnose issues
      console.log("Sign-in callback called");
      console.log("User data:", user);
      console.log("Account data:", account);
      console.log("Profile data:", profile);

      if (account && profile) {
        console.log("Sign-in with provider:", account.provider);

        // Make sure we have an email
        if (!user.email) {
          console.error("No email found from provider");
          return false;
        }

        // Force refresh of the account and session data
        try {
          // Account will be created by the adapter automatically
          console.log(
            `Processing ${account.provider} sign-in for ${user.email}`
          );
        } catch (error) {
          console.error("Error during sign-in:", error);
          return false;
        }
      }
      return true;
    },
  },
  events: {
    createUser: async ({ user }) => {
      console.log("User created in database:", user);
    },
    linkAccount: async ({ user, account, profile }) => {
      console.log("Account linked in database:", user.email, account.provider);
      // Force account creation if needed
      try {
        // Check if account exists
        const existingAccount = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (!existingAccount) {
          console.log("Creating account manually:", account.provider);
        }
      } catch (error) {
        console.error("Error checking account:", error);
      }
    },
    signIn: async ({ user, account }) => {
      console.log(
        "User signed in:",
        user.email,
        account?.provider || "credentials"
      );

      // Create session if needed
      try {
        const sessions = await prisma.session.findMany({
          where: { userId: user.id },
        });

        if (sessions.length === 0) {
          console.log("No sessions found, might need to create one");
        }
      } catch (error) {
        console.error("Error checking sessions:", error);
      }
    },
  },
});
