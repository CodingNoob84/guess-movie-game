"use client";
import React, { useState } from "react";
import SearchMoviesByQuery from "./SearchMoviesByQuery";
import SearchMoviesByYear from "./SearchMoviesByYear";

function SearchMovies() {
  const [tab, setTab] = useState("name");
  return (
    <div className="flex justify-center items-center">
      <div className="border flex flex-col w-full h-full rounded-2xl">
        <div className=" h-full flex flex-col">
          <div className="grid grid-cols-2 gap-2 h-[60px]">
            <div
              className={`h-[40px] m-2 p-2 text-center cursor-pointer ${
                tab === "name"
                  ? "bg-white rounded-md shadow-md transition duration-300 ease-in-out"
                  : ""
              }`}
              onClick={() => setTab("name")}
            >
              Search By Name
            </div>
            <div
              className={`h-[40px] m-2 p-2 text-center cursor-pointer ${
                tab === "year"
                  ? "bg-white rounded-md shadow-md transition duration-300 ease-in-out"
                  : ""
              }`}
              onClick={() => setTab("year")}
            >
              Search By Year
            </div>
          </div>
          <div className="flex-1">
            {tab === "name" && <SearchMoviesByQuery />}
            {tab === "year" && <SearchMoviesByYear />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMovies;
