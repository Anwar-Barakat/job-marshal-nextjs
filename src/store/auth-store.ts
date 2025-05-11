import { create } from "zustand";
import { signIn, signOut } from "@/utils/auth";

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
  signIn: (provider: "github" | "google") => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  signIn: async (provider) => {
    try {
      set({ isLoading: true, error: null });
      await signIn(provider, {
        redirectTo: "/",
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Authentication failed",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      await signOut();
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
