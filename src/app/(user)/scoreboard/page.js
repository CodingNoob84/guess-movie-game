import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import UserScoreboard from "@/components/user/UserScoreboard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ScoreBoard() {
  const session = await getServerSession(AuthOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex-1 overflow-y-auto">
      <UserScoreboard userId={session?.user?.id} />
    </div>
  );
}
