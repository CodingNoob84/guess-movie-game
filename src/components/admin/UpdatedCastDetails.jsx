"use client";
import { getUpdatedArtistsById } from "@/utils/dbservices";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { handleClientScriptLoad } from "next/script";
import React, { useState } from "react";
import CastDetails from "./CastDetails";

function UpdatedCastDetails({ tmdbId }) {
  //console.log(tmdbId);
  const [artists, setArtists] = useState([]);
  const [showOnlineArtists, setShowOnlineArtists] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data, isLoading, refetch } = useQuery(["updatedcast", tmdbId], () =>
    getUpdatedArtistsById(tmdbId)
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

  // const handleArtistSubmit = () => {};
  return (
    <div>
      <div className="flex flex-row flex-wrap gap-4 justify-evenly">
        {data.map((cast) => {
          if (!cast.artist.profileimage) return null;
          return (
            <div
              key={cast.artistId}
              className={`flex flex-col w-[60px] h-[140px] mx-2 ${
                artists.some((_artist) => _artist.castid === cast.artistId) &&
                "ring-2 ring-green-600"
              }`}
              onClick={() =>
                handleCast(
                  cast.artistId,
                  cast.artist.name,
                  cast.artist.profileimage
                )
              }
            >
              {/* <Image
                src={cast.artist.profileimage}
                alt={cast.artist.name}
                width={60}
                height={50}
              /> */}
              <img
                src={cast.artist.profileimage}
                alt={cast.artist.name}
                className="w-[60px] h-[90px]"
              />
              <div className="text-sm break-words">{cast.artist.name}</div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row my-5 justify-center items-center">
        <button
          className="border px-4 py-1 bg-green-300 font-bold flex justify-center items-center text-center hover:scale-110 "
          onClick={() => setShowOnlineArtists(!showOnlineArtists)}
        >
          <span>Get Artists from online </span>
        </button>
      </div>
      {showOnlineArtists && (
        <CastDetails
          tmdbId={tmdbId}
          refetch={refetch}
          setShowOnlineArtists={setShowOnlineArtists}
        />
      )}
    </div>
  );
}

export default UpdatedCastDetails;
