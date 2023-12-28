import { gamePlayers } from "@/app/serverStore";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { inputCode, userId } = body;

  if (!inputCode || !userId) {
    return NextResponse.error();
  }
  const Pusher = require("pusher");

  gamePlayers[userId] = inputCode;

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true,
  });

  await pusher.trigger("game", "has-joined-game", {
    // gameCode: `${JSON.stringify(inputCode)}\n\n`,
    gameCode: inputCode,
  });

  //counter
  const counterTime = 5000;
  const startsAt = new Date().getTime() + counterTime;

  await pusher.trigger("game", "game-starts-in", counterTime);

  const interval = setInterval(async () => {
    const remaining = startsAt - new Date().getTime();
    if (remaining > 0) {
      await pusher.trigger("game", "game-starts-in", remaining);
    } else {
      await pusher.trigger("game", "lets-go", 0);
      clearInterval(interval);
    }
  }, 1000);
  //   io.sockets.to(gameCode).emit("game-state", gameState[gameCode]);

  return NextResponse.json("ok");
};
