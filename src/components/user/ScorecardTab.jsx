"use client";
import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

function ScorecardTab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timer;
    if (show) {
      timer = setTimeout(() => {
        setShow(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [show]);
  return (
    <div className="relative my-5">
      {!show && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="bg-slate-200 dark:bg-gray-600 p-2 rounded-md shadow-md w-32 border transition duration-300 ease-in-out border-transparent hover:border-teal-500"
            onClick={() => setShow(!show)}
          >
            <p className="text-gray-600 dark:text-white text-center">
              Scorecard
            </p>
          </div>
        </div>
      )}
      {show && (
        <div className="relative w-64 h-32">
          <div className="border border-gray-900 dark:border-teal-500 w-full h-full rounded-md relative transition duration-300 ease-in-out">
            <div className="mt-6 mb-2 mx-2 text-sm font-semibold">
              <Typewriter
                words={["Hi Welcome everyone!!!"]}
                cursor
                cursorStyle="_"
                typeSpeed={50}
                delaySpeed={1000}
              />
            </div>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              className="bg-slate-200 dark:bg-gray-600 p-2 rounded-md shadow-md w-32 border transition duration-300 ease-in-out border-transparent hover:border-teal-500"
              onClick={() => setShow(!show)}
            >
              <p className="text-gray-600 dark:text-white text-center">
                Scorecard
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScorecardTab;
