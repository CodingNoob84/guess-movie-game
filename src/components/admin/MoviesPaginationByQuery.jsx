"use client";
import React, { useEffect, useState } from "react";

import MoviesList from "./MoviesListByYear";
import { insertMovies } from "@/utils/dbservices";
import MoviesListByQuery from "./MoviesListByQuery";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

function MoviesPaginationByQuery({ movieQuery }) {
  const [movies, setMovies] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [loading, setLoading] = useState(false);
  //console.log(currPage);

  const handleSubmit = async () => {
    setLoading(true);
    //console.log(movies);
    const result = await insertMovies(movies);
    //console.log(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col mx-5">
      <div className="flex justify-center items-center">
        <div className="flex flex-row w-full md:w-1/2 m-5">
          <button
            className="flex border border-black p-2 w-10 h-10 justify-center items-center rounded-md"
            onClick={() => setCurrPage(parseInt(currPage) - 1)}
            disabled={currPage <= 1}
          >
            <FaLessThan />
          </button>
          <div className="flex-grow text-center">{`${currPage} / ${totalPages}`}</div>
          <button
            className="flex border border-black p-2 w-10 h-10 justify-center items-center rounded-md ml-auto"
            onClick={() => setCurrPage(parseInt(currPage) + 1)}
            disabled={currPage >= totalPages}
          >
            <FaGreaterThan />
          </button>
        </div>
      </div>
      <MoviesListByQuery
        movieQuery={movieQuery}
        movies={movies}
        setMovies={setMovies}
        currPage={currPage}
        setTotalPages={setTotalPages}
      />
      <div className="flex justify-center items-center">
        <div className="flex flex-row w-full md:w-1/2 m-5">
          <button
            className="flex border border-black p-2 w-10 h-10 justify-center items-center rounded-md"
            onClick={() => setCurrPage(parseInt(currPage) - 1)}
            disabled={currPage <= 1}
          >
            <FaLessThan />
          </button>
          <div className="flex flex-grow justify-center items-center text-center">{`${currPage} / ${totalPages}`}</div>
          <button
            className="flex border border-black p-2 w-10 h-10 justify-center items-center rounded-md ml-auto"
            onClick={() => setCurrPage(parseInt(currPage) + 1)}
            disabled={currPage >= totalPages}
          >
            <FaGreaterThan />
          </button>
        </div>
      </div>
      <div className="flex flex-row my-5 justify-center items-center">
        <button
          className="border px-4 py-1 bg-green-300 font-bold flex justify-center items-center text-center hover:scale-110 "
          onClick={() => handleSubmit()}
          disabled={loading}
        >
          <span>{loading ? `Loading` : `Submit (${movies.length})`} </span>
        </button>
      </div>
    </div>
  );
}

export default MoviesPaginationByQuery;
