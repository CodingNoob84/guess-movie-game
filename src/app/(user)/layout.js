import { getServerSession } from "next-auth";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NavBar from "@/components/layouts/NavBar";
import Footer from "@/components/layouts/Footer";

export default async function UserLayout({ children }) {
  const session = await getServerSession(AuthOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="h-screen w-screen">
      <div className="w-full h-full flex flex-col dark:bg-gray-900 dark:text-white">
        <NavBar session={session} />
        {children}
        <Footer />
      </div>
    </main>
  );
}
