"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserButtonProps {
    session: {
        user: {
            name: string;
            email: string;
            image?: string;
        };
    } | null;
}

export function UserButton({ session }: UserButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    if (!session?.user) return null;

    const handleLogout = () => {
        setIsOpen(false);
        router.push("/api/auth/signout");
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    {session.user.image ? (
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                            <Image
                                src={session?.user?.image}
                                alt={session?.user?.name || "User"}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <User className="h-4 w-4" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none truncate">
                            {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                            {session.user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center w-full cursor-pointer">
                        <UserCircle className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center w-full cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center cursor-pointer text-destructive"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}