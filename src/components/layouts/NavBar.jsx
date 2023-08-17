import Image from "next/image";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import LogOut from "../UIParts/LogOut";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";

function NavBar({ session }) {
  return (
    <div className="flex flex-row justify-between items-center h-[50px] px-5 dark:bg-gray-900 dark:text-white">
      <Link href={"/"}>Logo</Link>
      <div className="flex flex-row justify-center items-center gap-2">
        <div>{session.user.name}</div>
        <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-white ring-2 ring-cyan-200">
          <Image
            src={session?.user?.image}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <LogOut />
        <ToggleTheme />
      </div>
    </div>
  );
}

export default NavBar;
