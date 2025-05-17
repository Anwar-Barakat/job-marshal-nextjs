import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

const useAuth = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return { session };
};

export default useAuth;
