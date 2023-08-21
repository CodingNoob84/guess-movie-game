"use client";
import { replaceMovie, searchMovies } from "@/utils/dbservices";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import UpdatedCastDetails from "./UpdatedCastDetails";

function UpdatedMovies() {
  const [query, setQuery] = useState("");
  const [tmdbId, setTmdbId] = useState("");
  const inputRef = useRef();
  const { data, isLoading } = useQuery(["updatedmovies", query], () =>
    searchMovies(query)
  );

  return (
    <div className="flex flex-col border border-black dark:border-teal-400">
      <div className="flex flex-row justify-center items-center m-2 p-2">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <input
              ref={inputRef}
              type="text"
              className={`px-2 py-1 border border-black rounded-l-md`}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        {!isLoading &&
          data.map((movie, i) => (
            <div
              key={i}
              className="w-full flex flex-col border border-black dark:border-teal-400"
            >
              <div className="flex flex-row w-full justify-between p-2 cursor-pointer">
                <div
                  className="flex flex-1"
                  onClick={() => setTmdbId(movie.tmdbid)}
                >
                  <div>
                    {movie?.title}-{movie?.year}
                  </div>
                </div>
              </div>
              {movie.tmdbid === tmdbId && (
                <div className="my-2">
                  <UpdatedCastDetails tmdbId={tmdbId} />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default UpdatedMovies;
