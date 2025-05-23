"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle, UserButton, Logo } from "@/components/general";
import { Container } from "@/components/ui/container";
import { useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "About", href: "/about" },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <Container>
                <div className="flex h-14 sm:h-16 items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-6">
                        <Logo />
                        <nav className="hidden sm:flex items-center space-x-4 md:space-x-8 text-sm font-medium">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="relative transition-colors hover:text-foreground text-foreground/60 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <nav className="flex items-center space-x-2 sm:space-x-3">
                            <ThemeToggle />
                            {isLoading ? (
                                <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
                            ) : session?.user ? (
                                <UserButton session={{
                                    user: {
                                        name: session.user.name || "",
                                        email: session.user.email || "",
                                        image: session.user.image || undefined
                                    }
                                }} />
                            ) : (
                                <Link
                                    href="/login"
                                    className="inline-flex h-9 sm:h-10 items-center justify-center rounded-md bg-primary px-3 sm:px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Sign in
                                </Link>
                            )}
                        </nav>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-foreground/60 hover:text-foreground hover:bg-accent/50 transition-colors sm:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {!isMobileMenuOpen ? (
                                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                            ) : (
                                <X className="h-5 w-5 sm:h-6 sm:w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </Container>
            <div
                className={cn(
                    "sm:hidden border-t",
                    isMobileMenuOpen ? "block" : "hidden"
                )}
            >
                <Container>
                    <div className="space-y-1 py-2 sm:py-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-foreground/60 hover:bg-accent/50 hover:text-foreground transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </Container>
            </div>
        </nav>
    );
}