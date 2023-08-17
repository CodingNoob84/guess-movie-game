"use client";
import React, { useState } from "react";
import ArtistsList from "./ArtistsList";
import { useQuery } from "@tanstack/react-query";
import { getMovieByDate, getUserScoreByDate } from "@/utils/dbservices";
import GuessMovieInput from "./GuessMovieInput";
import DisplayGuesses from "./DisplayGuesses";
import { FaGreaterThan, FaLessThan, FaRegClock } from "react-icons/fa";

function ArtistPagination({ date, userId }) {
  const [currPage, setCurrPage] = useState(1);
  const [movieId, setMovieId] = useState(null);

  const { data, isLoading } = useQuery(["movies", date], () =>
    getMovieByDate(date)
  );

  const {
    data: scorecard,
    isLoading: isLoadingScorecard,
    refetch: refetchScore,
  } = useQuery(["scorecard", userId, date], () =>
    getUserScoreByDate(userId, date)
  );
  console.log(scorecard);
  console.log(data);
  if (isLoading)
    return (
      <div className="m-4">
        <div className="flex flex-col justify-center items-center w-[300px] h-[300px] border border-black dark:border-teal-400 dark:text-white m-auto shadow-2xl">
          <div className="flex flex-row justify-center items-center gap-5">
            {" "}
            <FaRegClock className=" animate-spin dark:text-white" />
            <span className="text-center">Loading...</span>
          </div>
        </div>
      </div>
    );
  return (
    <div className=" flex flex-col justify-center items-center w-full mx-2">
      <div className="flex flex-row w-4/5 md:w-1/2 m-5">
        <button
          className="flex border border-black dark:border-teal-400 p-2 w-10 h-10 justify-center items-center rounded-md"
          onClick={() => setCurrPage(parseInt(currPage) - 1)}
          disabled={currPage <= 1}
        >
          <FaLessThan />
        </button>
        <div className="flex flex-grow text-center items-center justify-center">
          <span className="text-center">{`${currPage} / 3`}</span>
        </div>
        <button
          className="flex border border-black dark:border-teal-400 p-2 w-10 h-10 justify-center items-center rounded-md ml-auto"
          onClick={() => setCurrPage(parseInt(currPage) + 1)}
          disabled={currPage >= 3}
        >
          <FaGreaterThan />
        </button>
      </div>
      {!isLoading &&
        !isLoadingScorecard &&
        data.map((movie, i) => {
          if (currPage === i + 1) {
            const newMovieId = movie.movieId; // New movieId
            if (newMovieId !== movieId) {
              // Only update state if it's different
              setMovieId(newMovieId);
            }
            const currentScorecard = scorecard.find(
              (card) => card.dailymovieId === movie.id
            );
            console.log("scorecard", currentScorecard);
            return (
              <div key={i} className="flex flex-col gap-4">
                {currentScorecard &&
                  (currentScorecard.isGuessed ? (
                    <div className="flex flex-row border border-green-500 ring-2 ring-green-300 p-2">
                      Right answer!!!!!!! score :{" "}
                      <span className="font-bold">
                        {currentScorecard.score}
                      </span>
                    </div>
                  ) : currentScorecard.noOfGuesses > 2 ? (
                    <div className="flex flex-row border border-red-500 ring-2 ring-red-300 p-2">
                      Wrong answer!!!!!!! score :{" "}
                      <span className="font-bold">
                        {currentScorecard.score}
                      </span>
                    </div>
                  ) : null)}

                <DisplayGuesses
                  noOfGuesses={currentScorecard?.noOfGuesses || 0}
                  isGuessed={currentScorecard?.isGuessed || false}
                />
                {currentScorecard ? (
                  !currentScorecard.isGuessed &&
                  currentScorecard.noOfGuesses < 3 ? (
                    <GuessMovieInput
                      movieId={movie.movieId}
                      noOfGuesses={currentScorecard?.noOfGuesses || 0}
                      isGuessed={currentScorecard?.isGuessed || false}
                      score={currentScorecard?.score || 0}
                      userId={userId}
                      refetchScore={refetchScore}
                      dailymovieId={movie.id}
                    />
                  ) : null
                ) : (
                  <GuessMovieInput
                    movieId={movie.movieId}
                    noOfGuesses={currentScorecard?.noOfGuesses || 0}
                    isGuessed={currentScorecard?.isGuessed || false}
                    score={currentScorecard?.score || 0}
                    userId={userId}
                    refetchScore={refetchScore}
                    dailymovieId={movie.id}
                  />
                )}

                <ArtistsList artistdata={movie} />
              </div>
            );
          }
        })}
    </div>
  );
}

export default ArtistPagination;
