"use client";
import { getMovieByDate } from "@/utils/dbservices";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

function ArtistsList({ artistdata }) {
  return (
    <>
      <div className="flex flex-col justify-evenly gap-2 my-2">
        <div className="flex flex-col border border-black p-2 m-auto">
          <div className="flex items-center justify-center">
            <Image
              src={artistdata?.artist1?.profileimage}
              alt={artistdata?.artist1?.name}
              width={100}
              height={70}
              className=""
            />
          </div>

          <div className="text-center">{artistdata.artist1.name}</div>
        </div>
        <div className="flex flex-col border border-black p-2 m-auto">
          <div className="flex items-center justify-center">
            <Image
              src={artistdata.artist2.profileimage}
              alt="Siva"
              width={120}
              height={70}
              className=""
            />
          </div>

          <div className="text-center">{artistdata.artist2.name}</div>
        </div>
        <div className="flex flex-col border border-black p-2 m-auto">
          <div className="flex items-center justify-center">
            <Image
              src={artistdata?.artist3.profileimage}
              alt="Siva"
              width={100}
              height={70}
              className=""
            />
          </div>

          <div className="text-center">{artistdata.artist3.name}</div>
        </div>
      </div>
    </>
  );
}

export default ArtistsList;
