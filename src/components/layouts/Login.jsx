"use client";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="bg-slate-200 flex flex-col justify-center items-center group">
      <button
        className="w-48 h-12 flex justify-center items-center text-center group-hover:text-slate-600 "
        onClick={() => signIn("google")}
      >
        <FaGoogle className="mr-2 h-4 w-4 group-hover:scale-110" />
        Login with Google
      </button>
    </div>
  );
}

export default Login;
