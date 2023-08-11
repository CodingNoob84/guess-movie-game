import Image from "next/image";
import React, { useEffect } from "react";
//import { movieslistbyyear } from "../../../dummyData/movieslist";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMoviesByYear } from "@/utils/dbservices";

function MoviesList({ movieYear, movies, setMovies, currPage, setTotalPages }) {
  const {
    data: movieslistbyyear,
    isLoading,
    isFetched,
  } = useQuery(["movies", movieYear, currPage], () =>
    getMoviesByYear(movieYear, currPage)
  );
  //console.log(movieslistbyyear);
  useEffect(() => {
    if (isFetched) {
      setTotalPages(movieslistbyyear.total_pages);
    }
  }, [movieslistbyyear, isFetched, setTotalPages]);

  if (isLoading)
    return <div className="flex justify-center items-center">Loading....</div>;

  const handleAddMovieIds = (tmdbid, title, year, poster) => {
    const movieExists = movies.some((movie) => movie.id === tmdbid);
    if (!movieExists) {
      const movie = {
        tmdbid,
        title,
        year,
        poster,
      };
      setMovies((prevMovies) => [...prevMovies, movie]);
    } else {
      const updatedMovies = movies.filter((movie) => movie.id !== tmdbid);
      setMovies(updatedMovies);
    }
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-7 gap-10 m-auto">
      {movieslistbyyear?.results?.map((movie, i) => {
        if (!movie.poster_path) {
          return null;
        }

        return (
          <div
            key={i}
            className={`w-[150px] h-[300px] flex flex-col justify-between border items-center border-black ${
              movies.some((_movie) => _movie.tmdbid === movie.id) &&
              "ring-4 ring-green-500"
            } `}
            onClick={() =>
              handleAddMovieIds(
                movie.id,
                movie.title,
                movie.release_date.split("-")[0],
                `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              )
            }
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={150}
              height={70}
              className=""
            />
            <div className="text-md text-center">{movie.title}</div>
          </div>
        );
      })}
    </div>
  );
}

export default MoviesList;
