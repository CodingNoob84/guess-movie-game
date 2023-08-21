import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  //console.log("hello");
  const query = request.nextUrl.searchParams.get("query");
  console.log(query);
  try {
    if (query) {
      const suggestedMovies = await prisma.movie.findMany({
        where: {
          title: {
            contains: query.toLowerCase(),
            mode: "insensitive",
          },
          stage: "new",
        },
        select: {
          title: true,
          year: true,
          tmdbid: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 10,
      });
      return NextResponse.json(suggestedMovies);
    } else {
      const latestmovies = await prisma.movie.findMany({
        where: {
          stage: "new",
        },
        select: {
          title: true,
          year: true,
          tmdbid: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 10,
      });

      return NextResponse.json(latestmovies);
    }
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
