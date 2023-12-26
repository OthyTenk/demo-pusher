import { getServerSession } from "next-auth";
import { authOptions } from "../../libs/authOptions";

import { redirect } from "next/navigation";
import HomeLogin from "./components/HomeLogin";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/chat");
  }

  return (
    <div className="max-w-xl mx-auto p-10 mt-32">
      <h1 className="text-4xl font-semibold text-center">Let`s chat!</h1>

      <div className="mt-8 px-10">
        <HomeLogin />
      </div>
    </div>
  );
}
