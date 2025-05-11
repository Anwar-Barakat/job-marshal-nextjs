"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface OAuthButtonProps {
    provider: string;
    icon: ReactNode;
    isLoading?: boolean;
    className?: string;
    onClick: () => Promise<void>;
}

export function OAuthButton({
    provider,
    icon,
    isLoading = false,
    className,
    onClick,
}: OAuthButtonProps) {
    return (
        <Button
            variant="outline"
            className={className}
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                icon
            )}
            {isLoading ? "Loading..." : `Continue with ${provider}`}
        </Button>
    );
} 