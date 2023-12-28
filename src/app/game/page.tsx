import GameMode from "@/components/GameMode";
import React from "react";

const prefix = [
  "dragon",
  "cow",
  "cat",
  "dog",
  "tiger",
  "leon",
  "sheep",
  "black",
  "yellow",
  "fat",
  "red",
  "devil",
  "bad",
];
const names = [
  "dorj",
  "bat",
  "tsoomoo",
  "gonchig",
  "gotov",
  "sambuu",
  "damdin",
  "tsetseg",
  "gochoo",
  "tugjil",
];

const page = () => {
  const randomPrefix = Math.floor(Math.random() * prefix.length);
  const randomName = Math.floor(Math.random() * names.length);
  const generateCurrentUser = `${prefix[randomPrefix]} ${names[randomName]}`;

  return (
    <div className="mt-32">
      <GameMode userName={generateCurrentUser} />
    </div>
  );
};

export default page;
