"use server";

import { signOut } from "@/utils/auth";

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}
