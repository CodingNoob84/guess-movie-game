import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import Login from "@/components/layouts/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(AuthOptions);
  console.log(session);
  if (session) {
    redirect("/");
  }
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Login />
    </main>
  );
}
