import { getServerSession } from "next-auth";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function UserLayout({ children }) {
  const session = await getServerSession(AuthOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="h-screen w-screen">
      <div className="w-full h-full flex flex-col">
        <div className="h-[50px]">Nav Bar</div>
        {children}
        <div className="h-[50px]">Footer</div>
      </div>
    </main>
  );
}
