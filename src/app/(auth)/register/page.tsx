import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/forms/register-form";

const RegisterPage = () => {
    return (
        <Card className="max-w-md mx-auto w-full">
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <RegisterForm />
            </CardContent>
        </Card>
    )
};

export default RegisterPage;
