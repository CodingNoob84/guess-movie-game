"use client";
import { InsertGameTable, MoviesAutoComplete } from "@/utils/dbservices";
import { format } from "date-fns";
import React, { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import GTMovies from "./GTMovies";

function SetMovies() {
  const [selected, setSelected] = useState(new Date());
  const [showAC, setShowAC] = useState(false);
  const [acData, setAcData] = useState([]);
  const [dailyMovieIds, setDailyMovieIds] = useState({
    movieId1: null,
    movieId2: null,
    movieId3: null,
  });
  const inputRef = useRef();
  console.log(selected);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }

  const handleAutoComplete = async () => {
    const query = inputRef.current.value;
    console.log(query);
    if (query.length > 2) {
      console.log(query);
      const result = await MoviesAutoComplete(query);
      console.log(result);
      setAcData(result);
      setShowAC(true);
    } else {
      setAcData([]);
      setShowAC(false);
    }
  };

  const handleSelection = async (name, id) => {
    inputRef.current.value = name;
    setDailyMovieIds(dailyMovieIds.movieId1);
  };
  return (
    <div className="flex flex-col md:flex-row justify-center m-2">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={footer}
      />
      <div className="flex flex-col">
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
              <div className=" absolute mt-[35px] w-full flex flex-col h-20 z-30 bg-white">
                {acData.map((data, i) => (
                  <span
                    key={i}
                    className="cursor-pointer"
                    onClick={() =>
                      handleSelection(
                        `${data.title}-(${data.year})`,
                        data.tmdbid
                      )
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
            onClick={() => handleInputQuery()}
          >
            Search
          </button>
        </div>
        <div>
          <GTMovies id={id} />
          <div>Movie1</div>
          <div>Movie1</div>
          <div>Movie1</div>
        </div>
      </div>
    </div>
  );
}

export default SetMovies;
