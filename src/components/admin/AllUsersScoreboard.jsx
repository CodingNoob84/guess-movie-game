"use client";
import { getAllScores } from "@/utils/dbservices";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function AllUsersScoreboard() {
  const { data, isLoading } = useQuery(["allusersscoreboard"], () =>
    getAllScores()
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
  console.log(data);
  return (
    <div className=" mx-4 flex flex-col border border-black dark:border-teal-500 dark:text-white">
      <div className="h-10 border-b border-black dark:border-teal-500 dark:bg-teal-400 flex justify-center items-center text-xl text-black">
        <span className="text-center">All User ScoreBoard</span>
      </div>
      <div className="p-2">
        {data.map((user) => (
          <div className="flex flex-row justify-between">
            <div>{user.name}</div>
            <div>{user.totalScore}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUsersScoreboard;
