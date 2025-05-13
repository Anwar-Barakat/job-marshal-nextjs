"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHub, Google } from "@/components/icons";
import { OAuthButton } from "@/components/ui/oauth-button";
import { FormInput } from "@/components/shared/form-input";
import { FormSubmit } from "@/components/shared/form-submit";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
    const { signUp, isLoading, error } = useAuthStore();
    const router = useRouter();
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
            await signUp("credentials", { name, email, password });
        } catch (err) {
            setFormError(err instanceof Error ? err.message : "Registration failed");
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
                />
                <FormInput
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <FormSubmit
                    isLoading={isLoading}
                    error={formError}
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
                <OAuthButton
                    provider="GitHub"
                    icon={<GitHub />}
                    isLoading={isLoading}
                    onClick={() => signUp("github")}
                />
                <OAuthButton
                    provider="Google"
                    icon={<Google />}
                    isLoading={isLoading}
                    onClick={() => signUp("google")}
                />
                {error && !formError && (
                    <p className="text-sm text-destructive">{error}</p>
                )}
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