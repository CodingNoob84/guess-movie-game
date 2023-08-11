import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { movieId } = params;
  //console.log(movieId);
  //console.log(request.nextUrl.searchParams.get("foo"));
  try {
    const allartists = await prisma.movieArtistMapping.findMany({
      where: {
        movieId: parseInt(movieId),
      },
      include: {
        artist: {
          select: {
            castid: true,
            name: true,
            profileimage: true,
          },
        },
      },
      orderBy: {
        order: "asc", // Assuming you want to order artists by 'order' field in ascending order
      },
    });

    //console.log(allartists);
    return NextResponse.json(allartists);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
