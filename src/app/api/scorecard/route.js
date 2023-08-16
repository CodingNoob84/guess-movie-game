import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  console.dir(data);
  try {
    const existed = await prisma.scorecard.findFirst({
      where: {
        userId: data.userId,
        dailymovieId: data.dailymovieId,
      },
    });
    console.log(existed);
    if (existed) {
      const result = await prisma.scorecard.update({
        where: {
          id: existed.id,
        },
        data: {
          isGuessed: data.isGuessed,
          noOfGuesses: data.noOfGuesses,
          score: data.score,
        },
      });
      return NextResponse.json(result);
    } else {
      const result = await prisma.scorecard.create({
        data,
      });
      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
