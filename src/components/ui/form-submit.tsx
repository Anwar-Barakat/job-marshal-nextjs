"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

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
                        <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
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