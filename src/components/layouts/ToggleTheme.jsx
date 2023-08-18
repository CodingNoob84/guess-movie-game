"use client";
import React from "react";
import { useTheme } from "next-themes";
import { FaRegMoon, FaSun } from "react-icons/fa";
import { BsSun } from "react-icons/bs";

function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  console.log("theme");
  return (
    <div>
      <button
        className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-white ring-2 ring-cyan-200 dark:bg-gray-500 dark:text-white"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <BsSun /> : <FaRegMoon />}
      </button>
    </div>
  );
}

export default ToggleTheme;
