"use client";

import { Button } from "@/components/ui/button";
import { GitHub, Google } from "@/components/icons";
import { oAuthActions } from "@/actions/auth";
import { toast } from "sonner";
import { GITHUB_PROVIDER, GOOGLE_PROVIDER } from "@/constants/auth.constants";

export function OAuthButtons() {
    const handleGoogleLogin = async () => {
        try {
            await oAuthActions(GOOGLE_PROVIDER);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to login with Google";
            toast.error(errorMessage);
        }
    };

    const handleGithubLogin = async () => {
        try {
            await oAuthActions(GITHUB_PROVIDER);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to login with GitHub";
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                className="w-full cursor-pointer"
                onClick={handleGoogleLogin}
            >
                <Google className="mr-2 h-4 w-4" />
                Continue with Google
            </Button>
            <Button
                variant="outline"
                className="w-full cursor-pointer"
                onClick={handleGithubLogin}
            >
                <GitHub className="mr-2 h-4 w-4" />
                Continue with GitHub
            </Button>
        </>
    );
}