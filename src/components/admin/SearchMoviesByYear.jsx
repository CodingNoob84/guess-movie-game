"use client";
import React, { useRef, useState } from "react";
import MoviesPagination from "./MoviesPagination";

function SearchMoviesByYear() {
  const [movieYear, setMovieYear] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef();
  const handleInputYear = () => {
    const parsedYear = parseInt(inputRef.current.value);
    if (parsedYear >= 2000 && parsedYear <= 2022) {
      setMovieYear(parsedYear);
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <>
      <div className="flex flex-row justify-center items-center m-2 p-2">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <input
              ref={inputRef}
              type="text"
              className={`px-2 py-1 border border-black rounded-l-md ${
                error && "ring-4 ring-red-500"
              }`}
            />
            <button
              className={`px-1 py-1 border bg-blue-500 text-white rounded-r-md ${
                error && "ring-4 ring-red-500"
              }`}
              onClick={() => handleInputYear()}
            >
              Search
            </button>
          </div>

          {error && (
            <span className="text-sm text-red-600 mt-3 text-center">
              Year must be between 2000 and 2022
            </span>
          )}
        </div>
      </div>
      {movieYear != "" && <MoviesPagination movieYear={movieYear} />}
    </>
  );
}

export default SearchMoviesByYear;
