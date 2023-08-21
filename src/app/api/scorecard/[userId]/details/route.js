import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = params;
  try {
    const userDetails = await prisma.user.findFirst({
      where: {
        userId: userId,
      },
    });
    return NextResponse.json(userDetails);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
