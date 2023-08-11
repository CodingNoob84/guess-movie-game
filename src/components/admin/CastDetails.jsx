"use client";
import { getCastByTmdbId, insertArtists } from "@/utils/dbservices";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";

function CastDetails({ tmdbId, refetch, setShowOnlineArtists }) {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useQuery(["cast", tmdbId], () =>
    getCastByTmdbId(tmdbId)
  );
  if (isLoading) return <div>Loading..</div>;
  //console.log(data);
  const handleCast = (castid, name, profileimage) => {
    const castExits = artists.some((artist) => artist.castid === castid);
    if (!castExits) {
      const artist = {
        tmdbId,
        castid,
        name,
        profileimage,
      };
      setArtists((prevCast) => [...prevCast, artist]);
    } else {
      const updatedCast = artists.filter((artist) => artist.castid !== castid);
      console.log(updatedCast);
      setArtists(updatedCast);
    }
  };
  //console.log(artists);

  const handleArtistSubmit = async () => {
    setLoading(true);
    const result = await insertArtists(artists);
    refetch();
    setArtists([]);
    if (setShowOnlineArtists) {
      setShowOnlineArtists(false);
    }

    //console.log(result);
    setLoading(false);
  };
  return (
    <div>
      <div className="flex flex-row flex-wrap gap-4 justify-evenly">
        {data.map((cast) => {
          if (!cast.profile_path) return null;
          return (
            <div
              key={cast.id}
              className={`flex flex-col w-[60px] mx-2 ${
                artists.some((_artist) => _artist.castid === cast.id) &&
                "ring-2 ring-green-600"
              }`}
              onClick={() =>
                handleCast(
                  cast.id,
                  cast.name,
                  `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                )
              }
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={cast.name}
                width={60}
                height={50}
              />
              <div className="text-sm break-words">{cast.name}</div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row my-5 justify-center items-center">
        <button
          className="border px-4 py-1 bg-green-300 font-bold flex justify-center items-center text-center hover:scale-110 "
          onClick={() => handleArtistSubmit()}
          disabled={loading}
        >
          <span>{loading ? `Loading` : `Submit (${artists.length})`} </span>
        </button>
      </div>
    </div>
  );
}

export default CastDetails;
