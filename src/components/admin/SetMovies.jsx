"use client";
import React, { useRef, useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Image from "next/image";
import {
  UpdateDMArtists,
  getMovieByDate,
  getUpdatedArtistsById,
} from "@/utils/dbservices";

function Artist({ artist, movieArtistId }) {
  if (movieArtistId === null) {
    return (
      <div className="flex flex-col justify-evenly w-[70px]">
        <Image
          src={artist.artist.profileimage}
          alt={artist.artist.name}
          width={60}
          height={50}
        />
        <div className="text-sm break-words">{artist.artist.name}</div>
      </div>
    );
  }
  if (artist.artistId === movieArtistId) {
    return (
      <div className="flex flex-col justify-evenly w-[70px]">
        <Image
          src={artist.artist.profileimage}
          alt={artist.artist.name}
          width={60}
          height={50}
        />
        <div className="text-sm break-words">{artist.artist.name}</div>
      </div>
    );
  }
  return null;
}

function SetMovies() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selected, setSelected] = useState(new Date());
  const [artistIds, setArtistIds] = useState([]);
  const inputRef = useRef();

  const { data, isLoading, refetch } = useQuery(["movies", selected], () =>
    getMovieByDate(selected)
  );
  const { data: artists, isLoading: isLoadingArtists } = useQuery(
    ["cast", selectedMovieId],
    () => getUpdatedArtistsById(selectedMovieId),
    {
      enabled: !!selectedMovieId,
    }
  );

  if (isLoading) return <div>Loading</div>;

  const footer = <p>{`You picked ${format(selected, "PP")}.`}</p>;

  const handleSelectDM = (id) => {
    console.log(id);

    if (artistIds.length <= 3) {
      console.log(artistIds.length);
      if (artistIds.includes(id)) {
        setArtistIds((prev) => prev.filter((artistId) => artistId !== id));
      } else {
        setArtistIds((prev) => [...prev, id]);
      }
    }
    console.log(artistIds);
  };

  const handleDMSubmit = async () => {
    if (artistIds.length <= 3) {
      const matchedMovie = data.find(
        (movie) => movie.movieId === selectedMovieId
      );
      const result = {
        id: matchedMovie.id,
        movieId: selectedMovieId,
        artistId1: artistIds[0],
        artistId2: artistIds[1],
        artistId3: artistIds[2],
      };
      await UpdateDMArtists(result);

      setArtistIds([]);
      refetch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center m-2">
      <div className="flex justify-center items-center">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          footer={footer}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-2 w-full">
        {!isLoading &&
          data?.map((movie) => (
            <div
              key={movie.id}
              className="w-full border border-black dark:border-teal-400"
            >
              <div className="flex flex-row w-full justify-between p-2 cursor-pointer">
                <div
                  className="flex flex-1"
                  onClick={() => setSelectedMovieId(movie.movieId)}
                >
                  {movie?.movie?.title}
                </div>
                <div>Edit</div>
              </div>
              {selectedMovieId === movie.movieId && !isLoadingArtists && (
                <div className="flex flex-col gap-2 m-2">
                  <div className="flex flex-row justify-evenly border-b py-2 border-black dark:border-teal-500">
                    {artists.map((artist) => {
                      if (artist.artistId === movie.artistId1) {
                        return (
                          <div
                            key={artist.artistId}
                            className={`flex flex-col justify-evenly w-[70px] ${
                              artistIds.includes(artist.artistId) &&
                              "ring-2 ring-green-600"
                            }`}
                            onClick={() => handleSelectDM(artist.artistId)}
                          >
                            <Image
                              src={artist.artist.profileimage}
                              alt={artist.artist.name}
                              width={60}
                              height={50}
                            />
                            <div className="text-sm break-words">
                              {artist.artist.name}
                            </div>
                          </div>
                        );
                      }
                      if (artist.artistId === movie.artistId2) {
                        return (
                          <div
                            key={artist.artistId}
                            className={`flex flex-col justify-evenly w-[70px] ${
                              artistIds.includes(artist.artistId) &&
                              "ring-2 ring-green-600"
                            }`}
                            onClick={() => handleSelectDM(artist.artistId)}
                          >
                            <Image
                              src={artist.artist.profileimage}
                              alt={artist.artist.name}
                              width={60}
                              height={50}
                            />
                            <div className="text-sm break-words">
                              {artist.artist.name}
                            </div>
                          </div>
                        );
                      }
                      if (artist.artistId === movie.artistId3) {
                        return (
                          <div
                            key={artist.artistId}
                            className={`flex flex-col justify-evenly w-[70px] ${
                              artistIds.includes(artist.artistId) &&
                              "ring-2 ring-green-600"
                            }`}
                            onClick={() => handleSelectDM(artist.artistId)}
                          >
                            <Image
                              src={artist.artist.profileimage}
                              alt={artist.artist.name}
                              width={60}
                              height={50}
                            />
                            <div className="text-sm break-words">
                              {artist.artist.name}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div className="flex flex-row flex-wrap justify-evenly w-full">
                    {artists.map((artist) => {
                      if (
                        artist.artistId === movie.artistId1 ||
                        artist.artistId === movie.artistId2 ||
                        artist.artistId === movie.artistId3
                      ) {
                        return null;
                      }

                      return (
                        <div
                          key={artist.artistId}
                          className={`flex flex-col justify-evenly w-[70px] ${
                            artistIds.includes(artist.artistId) &&
                            "ring-2 ring-green-600"
                          }`}
                          onClick={() => handleSelectDM(artist.artistId)}
                        >
                          <Image
                            src={artist.artist.profileimage}
                            alt={artist.artist.name}
                            width={60}
                            height={50}
                          />
                          <div className="text-sm break-words">
                            {artist.artist.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    <button
                      className="border border-black dark:border-teal-400 rounded-md p-2"
                      onClick={() => handleDMSubmit()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default SetMovies;
