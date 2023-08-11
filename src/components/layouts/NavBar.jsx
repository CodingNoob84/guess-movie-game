import Image from "next/image";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";

function NavBar({ session }) {
  return (
    <div className="flex flex-row justify-between items-center h-[50px] px-5">
      <div>Logo</div>
      <div className="flex flex-row justify-center items-center gap-2">
        <div>{session.user.name}</div>
        <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-white ring-2 ring-cyan-200">
          <Image
            src={`${
              session?.user?.image != "" ? session?.user.image : "/Avatar.jpg"
            } `}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-white">
          <AiOutlineLogout className="scale-75 hover:scale-100" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
