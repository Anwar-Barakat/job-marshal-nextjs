import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/forms/login-form";

const LoginPage = () => {
    return <Card className="w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
            <LoginForm />
        </CardContent>
    </Card>;
};

export default LoginPage;