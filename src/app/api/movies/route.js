import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  //console.log("hello");
  //console.log(request.nextUrl.searchParams.get("foo"));
  try {
    const newmovies = await prisma.movie.findMany({ where: { stage: "new" } });
    const updatedmovies = await prisma.movie.findMany({
      where: { stage: "updated" },
    });
    //console.log(allmovies);
    return NextResponse.json({ newmovies, updatedmovies });
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}

export async function POST(request) {
  const data = await request.json();
  //console.dir(data);
  try {
    let insertedmovies = 0,
      skippedmovies = 0;
    for (const movie of data) {
      const existingMovie = await prisma.movie.findFirst({
        where: { tmdbid: movie.tmdbid },
      });
      if (!existingMovie) {
        await prisma.movie.create({
          data: movie,
        });
        insertedmovies += 1;
        console.log(`Inserted movie: ${movie.title}`);
      } else {
        skippedmovies += 1;
        console.log(`Skipped movie (already exists): ${movie.title}`);
      }
    }

    return NextResponse.json({ insertedmovies, skippedmovies });
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
