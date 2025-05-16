"use client";

import { useState } from "react";
import { GitHub, Google } from "@/components/icons";
import { OAuthButtons } from "@/components/ui/oauth-buttons";
import { FormInput } from "@/components/shared/form-input";
import { FormSubmit } from "@/components/shared/form-submit";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerAction } from "@/actions/auth";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";

const RegisterForm = () => {
    const router = useRouter();
    const { isLoading, isDisabled, setIsDisabled, setIsLoading } = useAuthStore();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");

    const handleEmailRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");

        if (!name || !email || !password) {
            setFormError("All fields are required");
            return;
        }

        try {
            setIsDisabled(true);
            setIsLoading(true);
            const result = await registerAction({ name, email, password });

            if (result.success) {
                toast.success(result.message);
                router.push("/");
            } else {
                setFormError(result.message);
                toast.error(result.message);
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Registration failed";
            setFormError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsDisabled(false);
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 gap-6">
            <form onSubmit={handleEmailRegister} className="space-y-4">
                <FormInput
                    label="Name"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isDisabled}
                />
                <FormInput
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isDisabled}
                />
                <FormInput
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isDisabled}
                />
                <FormSubmit
                    isLoading={isLoading}
                    error={formError}
                    disabled={isDisabled}
                >
                    Register with Email
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
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;