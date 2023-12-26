"use client";

import Image from "next/image";
import { FC } from "react";

export interface IMessageProps {
  User: {
    image: string | null;
    name: string | null;
  };
  message: string;
}

const MessageBubble: FC<IMessageProps> = ({ User, message }) => {
  return (
    <div className="flex items-center">
      <div className="min-w-10 mr-4">
        <Image
          src={User.image as string}
          alt="Profile image of user"
          className="w-10 h-10 object-cover rounded-full"
          width={40}
          height={40}
        />
        <p className="text-xs text-center text-gray-600">{User.name}</p>
      </div>
      <div className="rounded-2xl bg-white py-1.5 px-3">{message}</div>
    </div>
  );
};

export default MessageBubble;
