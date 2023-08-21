"use client";
import { InsertScore, MoviesAutoComplete } from "@/utils/dbservices";
import React, { useRef, useState } from "react";

function GuessMovieInput({
  movieId,
  noOfGuesses,
  score,
  userId,
  refetchScore,
  dailymovieId,
}) {
  const [showAC, setShowAC] = useState(false);
  const [guessMovieId, setGuessMovieId] = useState(null);
  const [acData, setAcData] = useState([]);
  const [tries, setTries] = useState(noOfGuesses || 0);
  const [total, setTotal] = useState(score || 0);
  const inputRef = useRef();
  const handleAutoComplete = async () => {
    const query = inputRef.current.value;
    //console.log(query);
    if (query.length > 2) {
      //console.log(query);
      const result = await MoviesAutoComplete(query);
      //console.log(result);
      setAcData(result);
      setShowAC(true);
    } else {
      setAcData([]);
      setShowAC(false);
    }
  };
  const handleSelection = (moviename, id) => {
    inputRef.current.value = moviename;
    setGuessMovieId(id);
    setShowAC(false);
  };

  const handleInputGuess = async () => {
    inputRef.current.value = "";

    if (tries < 3) {
      const isCorrectGuess = parseInt(movieId) === parseInt(guessMovieId);

      if (isCorrectGuess) {
        const data = {
          date: new Date(),
          dailymovieId: dailymovieId,
          isGuessed: true,
          noOfGuesses: parseInt(tries) + 1,
          score:
            parseInt(tries) + 1 === 1 ? 10 : parseInt(tries) + 1 === 2 ? 8 : 6,
          userId: userId,
        };
        //console.log(data);
        await InsertScore(data);
        refetchScore();
      } else {
        const data = {
          date: new Date(),
          dailymovieId: dailymovieId,
          isGuessed: false,
          noOfGuesses: parseInt(tries) + 1,
          score: 0,
          userId: userId,
        };
        //console.log(data);
        await InsertScore(data);
        refetchScore();
      }
      setTries(tries + 1);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center m-2 p-2">
      <div className="flex flex-row">
        <div className="flex flex-col relative">
          <input
            ref={inputRef}
            type="text"
            className={`px-2 py-1 border h-[35px] border-black rounded-l-md "ring-4 ring-red-500"
            `}
            onChange={() => handleAutoComplete()}
          />
          {showAC && (
            <div className=" absolute mt-[35px] w-full flex flex-col h-20 z-30 bg-white dark:bg-gray-800 overflow-y-scroll">
              {acData.map((data, i) => (
                <span
                  key={i}
                  className="cursor-pointer"
                  onClick={() =>
                    handleSelection(`${data.title}-(${data.year})`, data.tmdbid)
                  }
                >
                  {data.title}-({data.year})
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          className={`px-1 py-1 h-[35px] border bg-blue-500 text-white rounded-r-md "ring-4 ring-red-500"
            `}
          onClick={() => handleInputGuess()}
        >
          Guess
        </button>
      </div>
    </div>
  );
}

export default GuessMovieInput;
