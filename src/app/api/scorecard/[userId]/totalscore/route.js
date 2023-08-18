import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = params;
  try {
    const userScoreSum = await prisma.scorecard.aggregate({
      where: {
        userId: userId,
      },
      _sum: {
        score: true,
      },
    });
    return NextResponse.json({ totalscore: userScoreSum._sum.score });
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
