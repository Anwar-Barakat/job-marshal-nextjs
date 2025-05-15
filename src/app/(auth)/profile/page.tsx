import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user) {
        return redirect("/login");
    }

    
    
    return <div>
        <h1>Welcome {session.user.name}</h1>
    </div>;
}