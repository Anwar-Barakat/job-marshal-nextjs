import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Verify Email",
    description: "Verify your email address",
};

export default function VerifyEmailPage() {
    return (
        <Card className="max-w-md mx-auto w-full">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-center mb-2">
                    <Mail className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-center">Check Your Email</CardTitle>
                <CardDescription className="text-center">
                    We've sent you a verification link
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                    Please check your email inbox and click on the provided link to verify your account.
                    If you don't see the email, check your spam folder.
                </p>
                <p className="text-sm text-muted-foreground">
                    The verification link will expire after 24 hours.
                </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Button asChild className="w-full">
                    <Link href="/login">Return to Login</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                    <Link href="/">Return to Home</Link>
                </Button>
            </CardFooter>
        </Card>
    );
} 