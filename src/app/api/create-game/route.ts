import { randomInt } from "crypto";
import { NextResponse } from "next/server";
import { gamePlayers } from "@/app/serverStore";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { userId } = body;

  const gameCodeInit = randomInt(1000, 9999);
  const gameCode = `${gameCodeInit}`;

  gamePlayers[userId] = gameCode;

  return NextResponse.json({ gameCode });
};
