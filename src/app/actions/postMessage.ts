"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../libs/authOptions";
import prisma from "../../../libs/prismadb";

const postMessage = async (formData: FormData) => {
  const Pusher = require("pusher");

  const session = await getServerSession(authOptions);
  const message = formData.get("message");

  const newMessage = await prisma.message.create({
    data: {
      message: message as string,
      email: session?.user?.email,
    },
    include: {
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true,
  });

  await pusher.trigger("chat", "new-message", {
    message: `${JSON.stringify(newMessage)}\n\n`,
  });

  return newMessage ? true : false;
};

export default postMessage;
