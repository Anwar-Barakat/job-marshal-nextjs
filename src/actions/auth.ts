"use server";

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

export async function loginAction(data: LoginFormValues) {
  try {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      return { success: false, message: "Invalid form data" };
    }

    const { email, password } = result.data;

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
    await prisma.user.create({ data: { name, email, password: hashedPassword } });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to register user" };
  }
}
