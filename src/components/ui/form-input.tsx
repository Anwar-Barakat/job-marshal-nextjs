"use client";

import * as React from "react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export function FormInput({
    label,
    error,
    helperText,
    className,
    id,
    ...props
}: FormInputProps) {
    const inputId = id || React.useId();

    return (
        <div className="space-y-2">
            {label && (
                <Label htmlFor={inputId} className="text-sm font-medium">
                    {label}
                </Label>
            )}
            <Input
                id={inputId}
                className={cn(
                    error && "border-destructive focus-visible:ring-destructive",
                    className
                )}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={
                    error ? `${inputId}-error` : helperText ? `${inputId}-description` : undefined
                }
                {...props}
            />
            {error && (
                <p
                    id={`${inputId}-error`}
                    className="text-sm font-medium text-destructive"
                >
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p
                    id={`${inputId}-description`}
                    className="text-sm text-muted-foreground"
                >
                    {helperText}
                </p>
            )}
        </div>
    );
} 