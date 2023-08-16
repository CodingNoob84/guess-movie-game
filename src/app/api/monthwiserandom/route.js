import { prisma } from "@/utils/prismaclient";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const month = parseInt(request.nextUrl.searchParams.get("month"));
    console.log(month);

    const everyIdInTable = await prisma.movie.findMany({
      where: {
        stage: "updated",
      },
      select: { tmdbid: true },
    });

    console.log(everyIdInTable);

    const idArray = everyIdInTable.map((element) => element.tmdbid);

    const year = new Date().getFullYear(); // Get the current year

    const daysInMonth = new Date(year, month, 0).getDate(); // Calculate days in the specified month

    const response = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const targetDate = new Date(year, month - 1, day, 0, 0, 0, 0);

      const existingMoviesForDate = await prisma.dailyMovies.findMany({
        where: {
          date: {
            gte: targetDate,
            lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000), // Next day
          },
        },
      });

      const existingMovieIds = existingMoviesForDate.map(
        (movie) => movie.movieId
      );

      for (let i = 0; i < 3 - existingMoviesForDate.length; i++) {
        const availableMovies = idArray.filter(
          (movieId) => !existingMovieIds.includes(movieId)
        );

        if (availableMovies.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * availableMovies.length
          );
          const randomMovieId = parseInt(availableMovies[randomIndex]);

          const allartists = await prisma.movieArtistMapping.findMany({
            where: {
              movieId: randomMovieId,
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

          const movie = await prisma.dailyMovies.create({
            data: {
              date: targetDate,
              movieId: randomMovieId,
              artistId1: parseInt(allartists[0].artist.castid),
              artistId2: parseInt(allartists[1].artist.castid),
              artistId3: parseInt(allartists[2].artist.castid),
            },
          });

          response.push({
            gameartists: movie,
            allartists: allartists,
          });

          existingMovieIds.push(randomMovieId);
        }
      }
    }

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
