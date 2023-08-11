import Image from "next/image";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import LogOut from "../UIParts/LogOut";

function NavBar({ session }) {
  return (
    <div className="flex flex-row justify-between items-center h-[50px] px-5">
      <div>Logo</div>
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
      </div>
    </div>
  );
}

export default NavBar;
