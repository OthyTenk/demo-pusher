import { NextResponse } from "next/server";
import prisma from "../../../../libs/prismadb";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { userId } = body;

  if (!userId) {
    console.log("!userId");
    return NextResponse.error();
  }

  const player = await prisma.gamePlayer.findFirst({
    select: {
      gameCode: true,
      id: true,
    },
    where: {
      playerId: userId,
    },
  });

  if (!player) {
    return NextResponse.json("Not found game");
  }

  const Pusher = require("pusher");
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true,
  });

  await pusher.trigger("game", "opponent-disconnected", {
    // gameCode: `${JSON.stringify(inputCode)}\n\n`,
    gameCode: player.gameCode,
  });

  await prisma.gamePlayer.deleteMany({
    where: {
      gameCode: player.gameCode,
    },
  });

  return NextResponse.json("ok");
};
