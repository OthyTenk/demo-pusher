import { gamePlayers } from "@/app/serverStore";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { userId } = body;

  if (!userId) {
    console.log("!userId");
    return NextResponse.error();
  }

  if (!gamePlayers.hasOwnProperty(userId)) {
    console.log("!hasOwnProperty");
    return NextResponse.error();
  }

  const gameCode = gamePlayers[userId];

  if (!gameCode) {
    console.log("!gameCode");
    return NextResponse.error();
  }

  delete gamePlayers[userId];

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
    gameCode: gameCode,
  });

  return NextResponse.json("ok");
};
