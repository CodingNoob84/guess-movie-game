import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = params;
  try {
    const userScorecardHistory = await prisma.scorecard.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
    });
    return NextResponse.json(userScorecardHistory);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
