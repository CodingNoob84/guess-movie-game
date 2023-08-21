"use client";
import { getSelectedMovies } from "@/utils/dbservices";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CastDetails from "./CastDetails";
import UpdatedCastDetails from "./UpdatedCastDetails";
import UpdatedMovie from "./UpdatedMovies";
import UpdatedMovies from "./UpdatedMovies";
import NewMovies from "./NewMovies";

function SelectedMovies() {
  const [tab, setTab] = useState("new");
  const [tmdbId, setTmdbId] = useState("");
  return (
    <div className="flex justify-center items-center">
      <div className="border flex flex-col w-full h-full rounded-2xl">
        <div className=" h-full flex flex-col">
          <div className="grid grid-cols-2 gap-2 h-[60px]">
            <div
              className={`h-[40px] m-2 p-2 text-center cursor-pointer ${
                tab === "new"
                  ? "bg-white dark:bg-gray-600 dark:text-white rounded-md shadow-md transition duration-300 ease-in-out"
                  : ""
              }`}
              onClick={() => setTab("new")}
            >
              New Movies
            </div>
            <div
              className={`h-[40px] m-2 p-2 text-center cursor-pointer ${
                tab === "updated"
                  ? "bg-white dark:bg-gray-600 dark:text-white rounded-md shadow-md transition duration-300 ease-in-out"
                  : ""
              }`}
              onClick={() => setTab("updated")}
            >
              Updated Movies
            </div>
          </div>
          <div className="flex-1">
            {tab === "new" && (
              <NewMovies />
              // <div className="flex flex-col gap-2">
              //   {!isLoading &&
              //     data.newmovies.map((movie) => (
              //       <div
              //         key={movie.tmdbid}
              //         className="flex flex-col items-center border border-black cursor-pointer p-2"
              //         onClick={() => setTmdbId(movie.tmdbid)}
              //       >
              //         <div className="flex font-bold ">{movie.title}</div>
              //         {movie.tmdbid === tmdbId && (
              //           <div className="my-2">
              //             <CastDetails tmdbId={tmdbId} refetch={refetch} />
              //           </div>
              //         )}
              //       </div>
              //     ))}
              // </div>
            )}
            {tab === "updated" && (
              <UpdatedMovies />
              // <div className="flex flex-col gap-2">
              //   {!isLoading &&
              //     data.updatedmovies.map((movie) => (
              //       <div
              //         key={movie.tmdbid}
              //         className="flex flex-col items-center border border-black cursor-pointer p-2"
              //         onClick={() => setTmdbId(movie.tmdbid)}
              //       >
              //         <div className="flex font-bold ">{movie.title}</div>
              //         {movie.tmdbid === tmdbId && (
              //           <div className="my-2">
              //             <UpdatedCastDetails tmdbId={tmdbId} />
              //           </div>
              //         )}
              //       </div>
              //     ))}
              // </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedMovies;
