import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Here you would typically check the credentials against your database
        // This is a simplified example - replace with actual implementation
        if (
          credentials.email === "user@example.com" &&
          credentials.password === "password"
        ) {
          return {
            id: "1",
            name: "Demo User",
            email: credentials.email,
            image: "https://avatars.githubusercontent.com/u/1?v=4",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
