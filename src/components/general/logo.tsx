import { Briefcase } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Briefcase className="w-7 h-7 text-primary" />
            <span className="flex items-baseline">
                <span className="text-base md:text-2xl font-bold tracking-tight">Job</span>
                <span className="text-base md:text-2xl font-bold text-primary tracking-tight">Marshal</span>
            </span>
        </Link>
    );
};