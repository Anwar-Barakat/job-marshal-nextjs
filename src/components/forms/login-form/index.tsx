"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHub, Google } from "@/components/icons";
import { OAuthButton } from "@/components/ui/oauth-button";
import { useAuthStore } from "@/store/auth-store";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

const LoginForm = async () => {
    const { signIn, isLoading, error } = useAuthStore();
    const session = await auth();

    if (session?.user) {
        redirect("/");
    }

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <OAuthButton
                            provider="GitHub"
                            icon={<GitHub />}
                            isLoading={isLoading}
                            onClick={() => signIn("github")}
                        />
                        <OAuthButton
                            provider="Google"
                            icon={<Google />}
                            isLoading={isLoading}
                            onClick={() => signIn("google")}
                        />
                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginForm;
