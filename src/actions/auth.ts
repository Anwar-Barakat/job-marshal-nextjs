"use server";

import { auth, signIn, signOut } from "@/auth";
import {
  type LoginFormValues,
  loginSchema,
} from "@/components/forms/login-form/schema";
import {
  type RegisterFormValues,
  registerSchema,
} from "@/components/forms/register-form/schema";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginFormValues) {
  try {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      return { success: false, message: "Invalid form data" };
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (!user.password) {
      return { success: false, message: "Invalid credentials" };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { success: false, message: "Invalid credentials" };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Invalid credentials" };
  }
}

export async function registerAction(data: RegisterFormValues) {
  try {
    const result = registerSchema.safeParse(data);
    if (!result.success) {
      return { success: false, message: "Invalid form data" };
    }

    const { name, email, password } = result.data;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      return { success: false, message: "User already exists" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Auto login after registration
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to register user" };
  }
}

export async function logoutAction() {
  // Clear the session without redirecting
  await signOut({ redirect: false });
  // Then perform the redirect separately
  redirect("/login");
}

export async function oAuthLoginAction(provider: "github" | "google") {
  try {
    await signIn(provider, { redirect: false });
    return { success: true, message: `Logged in with ${provider}` };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      message: `Failed to login with ${provider}: ${errorMessage}`,
    };
  }
}

export async function oAuthRegisterAction(provider: "github" | "google") {
  try {
    await signIn(provider, { redirect: false });
    return { success: true, message: `Logged in with ${provider}` };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      message: `Failed to login with ${provider}: ${errorMessage}`,
    };
  }
}
