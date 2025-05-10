import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    size?: "default" | "sm" | "lg" | "fluid";
}

const sizeClasses = {
    default: "max-w-7xl",
    sm: "max-w-3xl",
    lg: "max-w-[1400px]",
    fluid: "max-w-full",
};

export function Container({
    children,
    size = "default",
    className,
    ...props
}: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full px-4 sm:px-6 lg:px-8",
                sizeClasses[size],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
} 