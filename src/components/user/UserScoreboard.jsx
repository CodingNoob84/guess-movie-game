"use client";
import { getUserScoreBoard } from "@/utils/dbservices";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function UserScoreboard({ userId }) {
  console.log(userId);
  const { data, isLoading } = useQuery(["usertotalscore"], () =>
    getUserScoreBoard(userId)
  );
  if (isLoading) {
    return (
      <div className="w-full m-2 border border-black dark:border-teal-500 dark:text-white">
        <div className="flex justify-center items-center">
          <span className="text-center">Loading..</span>
        </div>
      </div>
    );
  }
  return (
    <div className="m-auto w-[300px] md:w-1/4 flex flex-col border border-black dark:border-teal-400 dark:text-white ">
      <div className="flex justify-center items-center border-b border-black dark:border-teal-400">
        UserScoreboard
      </div>
      <div className="flex justify-center items-center">{data?.totalscore}</div>
    </div>
  );
}

export default UserScoreboard;
