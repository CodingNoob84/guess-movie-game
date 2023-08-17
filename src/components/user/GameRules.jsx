"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";

function GameRules() {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col w-full md:w-1/2">
      <div className="">
        <div className="flex flex-row mx-5 justify-between">
          <div
            className="border p-2 bg-slate-100 dark:bg-gray-800 shadow-2xl  border-black dark:border-teal-500 dark:text-white  rounded-md cursor-pointer"
            onClick={() => setShow(!show)}
          >
            Game Rules
          </div>
          <Link
            href={"/scoreboard"}
            className="border p-2 bg-slate-100 dark:bg-gray-800 shadow-2xl  border-black dark:border-teal-500 dark:text-white  rounded-md cursor-pointer"
          >
            ScoreCard
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center my-5">
        {show && (
          <div className="relative w-64 h-32">
            <div className="border border-gray-900 dark:border-teal-500 w-full h-full rounded-md relative transition duration-300 ease-in-out">
              <div className="mt-6 mb-2 mx-2 text-sm font-semibold flex justify-center items-center">
                <Typewriter
                  words={[
                    "You have to guess Tamil Movie Name which has below artists.",
                    "You have three chances.!!!",
                    "If you guessed at first chance, You will awarded with 10Points",
                    "If you guessed at second chance, 8Points. The third chance, 6Points",
                    "If you didnt guessed, you will get Zero Points",
                    "Good Luck!!!!!!!!!!!!!!",
                  ]}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                  className="text-center"
                />
              </div>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className="bg-slate-200 dark:bg-gray-600 p-2 rounded-md shadow-md w-32 border transition duration-300 ease-in-out border-transparent hover:border-teal-500"
                onClick={() => setShow(!show)}
              >
                <p className="text-gray-600 dark:text-white text-center">
                  Game Rules
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameRules;
