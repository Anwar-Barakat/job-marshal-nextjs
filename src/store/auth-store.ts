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
  isDisabled: boolean;
  error: string | null;
}

type AuthActions = {
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsDisabled: (isDisabled: boolean) => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isDisabled: false,
  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsDisabled: (isDisabled) => set({ isDisabled }),
}));
