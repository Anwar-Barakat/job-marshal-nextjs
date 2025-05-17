import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/forms/login-form";

const LoginPage = () => {
    return (
        <Card className="max-w-md mx-auto w-full">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <LoginForm />
            </CardContent>
        </Card>
    )

};

export default LoginPage;