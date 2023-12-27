"use client";

import Pusher from "pusher-js";
import { FC, useEffect, useRef, useState } from "react";
import MessageBubble, { IMessageProps } from "./MessageBubble";

interface IChatProps {
  data: IMessageProps[];
}

const Chat: FC<IChatProps> = ({ data }) => {
  const [messages, setMessages] = useState(data);
  const messageEndRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    });

    const channel = pusher.subscribe("chat");
    channel.bind("new-message", (data: IMessageProps) => {
      const parsedMessage = JSON.parse(data.message);

      setMessages((prev) => [...prev, parsedMessage]);
    });

    return () => pusher.unsubscribe("chat");
  }, []);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-grow max-h-screen overflow-y-auto px-6 py-28 bg-gray-100">
      <div className="flex flex-col gap-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            User={message.User}
            message={message.message}
          />
        ))}
      </div>
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default Chat;
