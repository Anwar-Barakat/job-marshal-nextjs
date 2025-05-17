"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHub, Google } from "@/components/icons";
import { OAuthButtons } from "@/components/ui/oauth-buttons";
import { FormInput, ControlledFormInput } from "@/components/shared/form-input";
import { FormSubmit } from "@/components/shared/form-submit";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { type LoginFormValues, loginSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginAction } from "@/actions/auth";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const LoginForm = () => {
    const { isLoading, isDisabled, error: authError, setIsLoading, setIsDisabled } = useAuthStore();
    const router = useRouter();
    const { update: updateSession } = useSession();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
        mode: "onChange"
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            setIsDisabled(true);
            setIsLoading(true);
            const result = await loginAction(data);
            result.success ?
                toast.success(result.message) :
                toast.error(result.message);

            if (result.success) {
                // Update session client-side
                await updateSession();

                // Redirect if provided
                if (result.redirect) {
                    router.push(result.redirect);
                    router.refresh();
                }
            }

            setIsLoading(false);
            setIsDisabled(false);
        } catch (error: unknown) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "An error occurred");
            setIsDisabled(false);
            setIsLoading(false);
        }
    };

    const rootErrorMessage = errors.root?.message || authError || undefined;

    return (
        <div className="grid grid-cols-1 gap-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <ControlledFormInput
                    name="email"
                    control={control}
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    disabled={isDisabled}
                    required
                />

                <ControlledFormInput
                    name="password"
                    control={control}
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    disabled={isDisabled}
                />

                <FormSubmit
                    isLoading={isLoading}
                    error={rootErrorMessage}
                    disabled={isDisabled}
                >
                    Login with Email
                </FormSubmit>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <OAuthButtons />
            </div>

            <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary font-semibold hover:underline">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;