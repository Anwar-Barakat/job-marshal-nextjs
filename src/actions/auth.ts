"use server";

import {
  type LoginFormValues,
  loginSchema,
} from "@/components/forms/login-form/schema";
import {
  type RegisterFormValues,
  registerSchema,
} from "@/components/forms/register-form/schema";

export async function loginAction(data: LoginFormValues) {
  try {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      return { error: "Invalid form data" };
    }

    const { email, password } = result.data;

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Invalid credentials" };
  }
}

export async function registerAction(data: RegisterFormValues) {
  try {
    const result = registerSchema.safeParse(data);
    if (!result.success) {
      return { error: "Invalid form data" };
    }

    const { name, email, password } = result.data;
    
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to register user" };
  }
}
