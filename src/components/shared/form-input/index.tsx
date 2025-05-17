"use client";

import * as React from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

// Base FormInput component (for direct use)
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

// Form controlled version that works with React Hook Form
interface ControlledFormInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormInputProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref'> {
    control: Control<TFieldValues>;
    name: TName;
}

export function ControlledFormInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    control,
    name,
    ...props
}: ControlledFormInputProps<TFieldValues, TName>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormInput
                    {...props}
                    {...field}
                    error={fieldState.error?.message || props.error}
                />
            )}
        />
    );
} 