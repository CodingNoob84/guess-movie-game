import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import AdminLink from "@/components/UIParts/AdminLink";

export default async function Home() {
  const session = await getServerSession(AuthOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex-1 overflow-y-auto">
      {session.user.role === "admin" && <AdminLink />}
      <div className="flex flex-row justify-center items-center p-2 gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs border-black">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-white"
            >
              <path d="M20 6L9 17L4 12" />
            </svg>
          </span>
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs border-black">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-white"
            >
              <line x1="12" y1="3" x2="3" y2="12" />
              <line x1="3" y1="3" x2="12" y2="12" />
            </svg>
          </span>
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs border-black">
          <span className="flex h-6 w-6 items-center justify-center rounded-full"></span>
        </button>
      </div>
      <div className="flex flex-row justify-center items-center m-2 p-2">
        <input
          type="text"
          className="px-2 py-1 border border-black rounded-md"
        />
        <button className="px-1 py-1 border bg-blue-500 text-white">
          Guess it
        </button>
      </div>
      <div className="flex flex-col justify-evenly gap-2">
        <div className="flex flex-col border border-black p-2 m-auto">
          <div className="flex items-center justify-center">
            <Image
              src="https://image.tmdb.org/t/p/w500//9CWvjeawj9rYRFasyrNjVsqhR48.jpg"
              alt="Siva"
              width={100}
              height={70}
              className=""
            />
          </div>

          <div className="text-center">Siva karthikeyan</div>
        </div>
        <div className="flex flex-col border border-black p-2 m-auto">
          <div className="flex items-center justify-center">
            <Image
              src="https://image.tmdb.org/t/p/w500//9CWvjeawj9rYRFasyrNjVsqhR48.jpg"
              alt="Siva"
              width={100}
              height={70}
              className=""
            />
          </div>

          <div className="text-center">Siva karthikeyan</div>
        </div>
        <div className="flex flex-col border border-black p-2 m-auto">
          <div className="flex items-center justify-center">
            <Image
              src="https://image.tmdb.org/t/p/w500//9CWvjeawj9rYRFasyrNjVsqhR48.jpg"
              alt="Siva"
              width={100}
              height={70}
              className=""
            />
          </div>

          <div className="text-center">Siva karthikeyan</div>
        </div>
      </div>
    </div>
  );
}
