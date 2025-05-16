import { z } from "zod";

// Schema for the request password reset form (email only)
export const resetPasswordRequestSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

// Schema for the reset password form (new password + confirm)
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(72, { message: "Password cannot exceed 72 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordRequestValues = z.infer<
  typeof resetPasswordRequestSchema
>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
