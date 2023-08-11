import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  console.log("hello");
  //console.log(request.nextUrl.searchParams.get("foo"));
  try {
    const allartists = await prisma.movieArtistMapping.findMany({});
    console.log(allartists);
    return NextResponse.json(allartists);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}

export async function POST(request) {
  const data = await request.json();
  //console.dir(data);

  try {
    let insertedartists = 0,
      skippedartists = 0,
      artistorder = 0;
    const deletedCount = await prisma.movieArtistMapping.deleteMany({
      where: {
        movieId: parseInt(data[0].tmdbId), // Assuming movieId is the movie's tmdbid
      },
    });

    for (const artist of data) {
      const existingartist = await prisma.artist.findFirst({
        where: { castid: artist.castid },
      });

      if (!existingartist) {
        await prisma.artist.create({
          data: {
            castid: artist.castid,
            name: artist.name,
            profileimage: artist.profileimage,
          },
        });
        insertedartists += 1;
      } else {
        skippedartists += 1;
      }
      artistorder += 1;
      await prisma.movieArtistMapping.create({
        data: {
          movieId: artist.tmdbId,
          artistId: artist.castid,
          order: artistorder,
        },
      });
      await prisma.movie.update({
        where: { tmdbid: artist.tmdbId },
        data: { stage: "updated" },
      });
    }

    return NextResponse.json({ insertedartists, skippedartists });
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
