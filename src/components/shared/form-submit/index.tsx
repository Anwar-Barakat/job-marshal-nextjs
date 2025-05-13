"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface FormSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
    error?: string;
}

export function FormSubmit({
    children,
    isLoading,
    loadingText = "Loading...",
    error,
    className,
    disabled,
    ...props
}: FormSubmitProps) {
    return (
        <div className="space-y-2">
            <button
                type="submit"
                disabled={isLoading || disabled}
                className={cn(
                    "inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50",
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {loadingText}
                    </>
                ) : (
                    children
                )}
            </button>
            {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
            )}
        </div>
    );
}