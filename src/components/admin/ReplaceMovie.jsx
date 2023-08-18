"use client";
import { replaceMovie, searchMovies } from "@/utils/dbservices";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";

function ReplaceMovie({ replaceId, setReplaceId, refetch }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef();
  const { data, isLoading } = useQuery(["searchmovies", query], () =>
    searchMovies(query)
  );
  //console.log(data);
  const handleReplaceMovie = async (id) => {
    const data = {
      id: replaceId,
      movieId: id,
    };
    //console.log(data);
    await replaceMovie(data);
    refetch();
    setReplaceId(null);
  };
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
              className="w-full border border-black dark:border-teal-400"
            >
              <div className="flex flex-row w-full justify-between p-2 cursor-pointer">
                <div
                  className="flex flex-1"
                  onClick={() => handleReplaceMovie(movie.tmdbid)}
                >
                  {movie?.title}-{movie?.year}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReplaceMovie;
