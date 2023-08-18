import { prisma } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const scoreData = await prisma.scorecard.findMany({
      include: {
        User: {
          select: {
            name: true,
          },
        },
      },
    });
    //console.log(scoreData);
    // const userScoresByDate = {};

    // scoreData.forEach((scoreEntry) => {
    //   const userName = scoreEntry.User.name;
    //   const scoreDate = scoreEntry.date;

    //   if (!userScoresByDate[userName]) {
    //     userScoresByDate[userName] = [];
    //   }

    //   const scoreInfo = {
    //     id: scoreEntry.dailymovieId,
    //     score: scoreEntry.score,
    //   };

    //   const existingDateEntry = userScoresByDate[userName].find(
    //     (entry) => entry.date === scoreDate
    //   );

    //   if (existingDateEntry) {
    //     existingDateEntry.movies.push(scoreInfo);
    //   } else {
    //     userScoresByDate[userName].push({
    //       date: scoreDate,
    //       movies: [scoreInfo],
    //     });
    //   }
    // });

    // console.log(userScoresByDate);

    const userScores = [];

    scoreData.forEach((scoreEntry) => {
      const userName = scoreEntry.User.name;
      const score = scoreEntry.score;
      const existingUser = userScores.find((user) => user.name === userName);

      if (!existingUser) {
        userScores.push({
          name: userName,
          totalScore: score,
        });
      } else {
        existingUser.totalScore += score;
      }
    });

    //console.log(userScores);

    return NextResponse.json(userScores);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}

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
