"use client";

import useGlobal from "@/app/store/useGlobal";
import { FC, useEffect } from "react";
import pusher from "../../libs/pusher";
import CreateGame from "./CreateGame";
import GameBoard from "./GameBoard";
import axios from "axios";

interface GameModeProps {
  userName: string;
}

const GameMode: FC<GameModeProps> = ({ userName }) => {
  const {
    setUserInfo,
    currentUserId,
    currentUser,
    setGameCode,
    gameCode,
    reset,
  } = useGlobal();

  useEffect(() => {
    if (currentUser && currentUser?.length > 0 && currentUserId.length > 0)
      return;

    setUserInfo(userName, `${userName.replace(" ", "-")}-${Date.now()}`);
  }, [userName, setUserInfo, currentUser, currentUserId]);

  useEffect(() => {
    const channel = pusher.subscribe("game");
    channel.bind("has-joined-game", (data: { gameCode: string }) => {
      setGameCode(data.gameCode);
      // const parsedMessage = JSON.parse(data);
      // console.log(parsedMessage);
      // setMessages((prev) => [...prev, parsedMessage]);
    });

    channel.bind("opponent-disconnected", (data: { gameCode: string }) => {
      if (gameCode === data.gameCode) {
        reset();
      }
    });

    return () => pusher.unsubscribe("game");
  }, [gameCode, setGameCode, reset]);

  const onLeaveGame = async () => {
    await axios.post("/api/leave-game", {
      userId: currentUserId,
      gameCode: gameCode,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-3">
      <div className="flex">
        <p className="p-2">
          User name: <span className="font-semibold">{currentUser}</span> (
          {currentUserId})
        </p>
        {gameCode.length > 0 && (
          <button onClick={onLeaveGame}>Logout game</button>
        )}
      </div>
      {gameCode.length > 0 ? <GameBoard /> : <CreateGame />}
    </div>
  );
};

export default GameMode;
