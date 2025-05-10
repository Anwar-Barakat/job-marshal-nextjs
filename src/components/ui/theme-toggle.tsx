"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
}