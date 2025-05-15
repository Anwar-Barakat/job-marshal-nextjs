"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle, UserButton, Logo } from "@/components/general";
import { Container } from "@/components/ui/container";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "About", href: "/about" },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionData = await getSession();
                setSession(sessionData);
            } catch (error) {
                console.error("Failed to fetch session:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSession();
    }, []);

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
                                <UserButton session={session as Session & { user: { name: string; email: string; image?: string } }} />
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    className="h-5 w-5 sm:h-6 sm:w-6"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    className="h-5 w-5 sm:h-6 sm:w-6"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
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