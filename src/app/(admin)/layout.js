import NavBar from "@/components/layouts/NavBar";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(AuthOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
  } else if (session?.user?.role === "user") {
    redirect("/");
  }
  return (
    <main className="h-screen w-screen">
      <div className="w-full h-full flex flex-col">
        <NavBar session={session} />
        {children}
        <div className="h-[50px]">Footer</div>
      </div>
    </main>
  );
}
