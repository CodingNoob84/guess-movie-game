import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  console.dir(data);
  try {
    const allartists = await prisma.movieArtistMapping.findMany({
      where: {
        movieId: parseInt(data.movieId),
      },
      include: {
        artist: {
          select: {
            castid: true,
            name: true,
            profileimage: true,
          },
        },
        movie: {
          select: {
            title: true,
            year: true,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    const result = await prisma.dailyMovies.update({
      where: {
        id: data.id,
      },
      data: {
        //date: existingDailyMovie.date,
        movieId: parseInt(data.movieId),
        artistId1: parseInt(allartists[0].artist.castid),
        artistId2: parseInt(allartists[1].artist.castid),
        artistId3: parseInt(allartists[2].artist.castid),
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
