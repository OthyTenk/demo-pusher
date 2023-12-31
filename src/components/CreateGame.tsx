"use client";

import useGlobal from "@/app/store/useGlobal";
import axios from "axios";
import { useState } from "react";
import WaitingBoard from "./WaitingBoard";

const CreateGame = () => {
  const isSocketConnected = true;
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [gameCreateCode, setGameCreateCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const { currentUser, currentUserId } = useGlobal();

  const onCreateGame = async () => {
    setCodeLoading(true);
    await axios
      .post("/api/create-game", {
        userId: currentUserId,
      })
      .then((res) => {
        setGameCreateCode(res.data.gameCode);
      })
      .finally(() => {
        setCodeLoading(false);
      });
  };

  const onJoinGame = async () => {
    await axios
      .post("/api/join-game", {
        userId: currentUserId,
        inputCode,
      })
      .then((res) => {
        setGameCreateCode("");
      })
      .finally(() => {
        setCodeLoading(false);
      });
  };

  return (
    <div>
      {gameCreateCode.length > 0 ? (
        <WaitingBoard gameCode={gameCreateCode} userName={currentUser || ""} />
      ) : (
        <div
          className={`flex flex-col w-full md:flex-row items-center justify-between gap-2 ${
            !isSocketConnected ? "opacity-75" : ""
          }`}
        >
          <div className="border flex flex-1 flex-col w-full space-y-2 border-orange-100 p-4 rounded-xl">
            <h2 className="text-xl font-semibold">Create</h2>

            <div className="flex gap-2">
              <h3 className="">Qoute Length:</h3>
              <div className="">
                <button
                  onClick={() => {
                    // setQuoteLength("short");
                  }}
                >
                  short
                </button>
              </div>
            </div>

            <button
              className="py-2 px-4 h-[41px] text-white bg-amber-600/50 rounded-lg hover:shadow-lg"
              disabled={codeLoading}
              onClick={onCreateGame}
            >
              Create Game
            </button>
          </div>
          <div className="text-center m-2">or</div>
          <div className="border border-orange-100 flex flex-1 flex-col w-full px-4 py-5 rounded-xl">
            <h2 className="text-xl font-semibold">Join</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // onJoinGame();
              }}
            >
              <div className="py-4 flex flex-row gap-2 items-center">
                <input
                  value={inputCode}
                  className="p-2 bg-neutral-700 rounded-lg outline-amber-600"
                  onChange={(e) => {
                    if (e.target.value.length > 4) return;

                    setInputCode(e.target.value.toUpperCase());
                    // setCodeError(false);
                  }}
                  placeholder="Enter code..."
                />
                <span className="">{inputCode.length}/4</span>
                {!codeLoading && (
                  <button
                    className="py-2 px-4 h-[41px] text-white bg-amber-600/50 rounded-lg hover:shadow-lg"
                    onClick={onJoinGame}
                    disabled={!isSocketConnected || inputCode.length !== 4}
                  >
                    Join Game
                  </button>
                )}
              </div>
              {codeError && <span className="">Invalid code</span>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGame;
