import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const targetDate = new Date(request.nextUrl.searchParams.get("datequery")); // Replace with your desired date
  targetDate.setUTCHours(0, 0, 0, 0);
  try {
    const movies = await prisma.dailyMovies.findMany({
      where: {
        date: {
          gte: targetDate,
          lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000), // Next day
        },
      },
      include: {
        artist1: {
          select: {
            castid: true,
            name: true,
            profileimage: true,
          },
        },
        artist2: {
          select: {
            castid: true,
            name: true,
            profileimage: true,
          },
        },
        artist3: {
          select: {
            castid: true,
            name: true,
            profileimage: true,
          },
        },
      },
    });

    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}

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
    console.log(allartists);
    const targetDate = new Date(data.date).setUTCHours(0, 0, 0, 0);
    console.log(targetDate);
    const existingDailyMovie = await prisma.dailyMovies.findFirst({
      where: {
        date: {
          gte: new Date(targetDate),
          lt: new Date(targetDate + 24 * 60 * 60 * 1000), // Next day
        },
        movieId: parseInt(data.movieId),
      },
    });
    console.log(existingDailyMovie);

    if (!existingDailyMovie) {
      const movie = await prisma.dailyMovies.create({
        data: {
          date: new Date(targetDate),
          movieId: parseInt(data.movieId),
          artistId1: parseInt(allartists[0].artist.castid),
          artistId2: parseInt(allartists[1].artist.castid),
          artistId3: parseInt(allartists[2].artist.castid),
        },
      });
      return NextResponse.json({
        gameartists: movie,
        allartists: allartists,
      });
    } else {
      return NextResponse.json({
        gameartists: existingDailyMovie,
        allartists: allartists,
      });
    }
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
