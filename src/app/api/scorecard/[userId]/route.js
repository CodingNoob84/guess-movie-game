import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = params;
  const targetDate = new Date(request.nextUrl.searchParams.get("datequery")); // Replace with your desired date
  targetDate.setUTCHours(0, 0, 0, 0);
  try {
    const movies = await prisma.scorecard.findMany({
      where: {
        date: {
          gte: targetDate,
          lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000), // Next day
        },
        userId: userId,
      },
    });

    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
