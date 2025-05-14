"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface OAuthButtonProps {
    provider: string;
    icon: ReactNode;
    className?: string;
    onClick: () => Promise<void>;
}

export function OAuthButton({
    provider,
    icon,
    className,
    onClick,
}: OAuthButtonProps) {
    return (
        <Button
            variant="outline"
            className={className}
            onClick={onClick}
        >
            {icon}
            {`Continue with ${provider}`}
        </Button>
    );
}