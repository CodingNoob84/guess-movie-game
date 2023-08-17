import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import AdminLink from "@/components/UIParts/AdminLink";
import ArtistsList from "@/components/user/ArtistsList";
import ArtistPagination from "@/components/user/ArtistPagination";
import GameRules from "@/components/user/GameRules";
import ScorecardTab from "@/components/user/ScorecardTab";

export default async function Home() {
  const session = await getServerSession(AuthOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex-1 overflow-y-auto">
      {session.user.role === "admin" && <AdminLink />}
      <div className="flex flex-col justify-center items-center gap-2">
        <GameRules />
        <ArtistPagination date={new Date()} userId={session.user.id} />
      </div>
    </div>
  );
}
