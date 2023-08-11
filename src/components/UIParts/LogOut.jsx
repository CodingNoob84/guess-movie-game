"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";

function LogOut() {
  return (
    <div
      className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-white"
      onClick={() => signOut()}
    >
      <AiOutlineLogout className="scale-75 hover:scale-100" />
    </div>
  );
}

export default LogOut;
