import { create } from "zustand";
import { signIn, signOut } from "next-auth/react";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (
    provider: "github" | "google" | "credentials",
    credentials?: { email: string; password: string }
  ) => Promise<void>;
  signUp: (
    provider: "github" | "google" | "credentials",
    credentials?: { name: string; email: string; password: string }
  ) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  signIn: async (provider, credentials) => {
    try {
      set({ isLoading: true, error: null });
      if (provider === "credentials" && credentials) {
        await signIn("credentials", {
          email: credentials.email,
          password: credentials.password,
          callbackUrl: "/",
        });
      } else {
        await signIn(provider, {
          callbackUrl: "/",
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Authentication failed",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  signUp: async (provider, credentials) => {
    try {
      set({ isLoading: true, error: null });
      if (provider === "credentials" && credentials) {
        // In a real app, you would make an API call to register the user
        // For this example, we'll just simulate registration and sign in immediately
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Registration failed");
        }

        // Sign in after successful registration
        await signIn("credentials", {
          email: credentials.email,
          password: credentials.password,
          callbackUrl: "/",
        });
      } else {
        // For OAuth providers, just use sign in as it handles new users
        await signIn(provider, {
          callbackUrl: "/",
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Registration failed",
      });
      throw error; // Re-throw to handle in the component
    } finally {
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      await signOut({ callbackUrl: "/login" });
      set({ user: null });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Sign out failed",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
}));
