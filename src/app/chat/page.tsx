import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../libs/authOptions";
import Chat from "../../components/Chat";
import Form from "../../components/Form";

import { getMessages } from "../actions/getMessages";
import { IMessageProps } from "../../components/MessageBubble";

// Add
export const dynamic = "force-dynamic";

const page = async () => {
  const session = await getServerSession(authOptions);
  const data = await getMessages();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="h-screen flex flex-col">
      <Chat data={data as IMessageProps[]} />
      <Form />
    </div>
  );
};

export default page;
