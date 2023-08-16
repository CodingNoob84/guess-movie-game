import { getServerSession } from "next-auth";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NavBar from "@/components/layouts/NavBar";

export default async function UserLayout({ children }) {
  const session = await getServerSession(AuthOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
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
