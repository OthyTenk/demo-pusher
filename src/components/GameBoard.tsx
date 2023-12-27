"use client";

import useGlobal from "@/app/store/useGlobal";
import { useEffect, useState } from "react";
import pusher from "../../libs/pusher";

const GameBoard = () => {
  const { setGameCode, gameCode } = useGlobal();
  const [counterTime, setCounterTime] = useState(0);

  useEffect(() => {
    const channel = pusher.subscribe("game");
    channel.bind("game-starts-in", (counterTime: number) => {
      setCounterTime(Math.max(Math.ceil(counterTime / 1000), 1));
      // const parsedMessage = JSON.parse(data);
      // console.log(parsedMessage);
      // setMessages((prev) => [...prev, parsedMessage]);
      //   console.log(counterTime);
    });

    channel.bind("lets-go", (counterTime: number) => {
      //   console.log("lets-go");
      setCounterTime(counterTime);
    });

    return () => pusher.unsubscribe("game");
  }, [gameCode, setGameCode]);

  return <div>GameBoard {counterTime > 0 && <span>{counterTime}</span>}</div>;
};

export default GameBoard;
