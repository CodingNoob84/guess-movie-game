import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  //console.log("hello");
  const query = request.nextUrl.searchParams.get("query");
  console.log(query);
  try {
    const suggestedMovies = await prisma.movie.findMany({
      where: {
        title: {
          contains: query.toLowerCase(),
          mode: "insensitive",
        },
      },
      select: {
        title: true,
        year: true,
        tmdbid: true,
      },
    });

    //const suggestedTitles = suggestedMovies.map((movie) => movie.title);

    return NextResponse.json(suggestedMovies);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
