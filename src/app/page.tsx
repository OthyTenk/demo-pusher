import { getServerSession } from "next-auth";
import { authOptions } from "../../libs/authOptions";

import { redirect } from "next/navigation";
import HomeLogin from "../components/HomeLogin";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/chat");
  }

  return (
    <div className="max-w-xl mx-auto p-10 mt-32">
      <h1 className="text-4xl font-semibold text-center">Let`s chat!</h1>

      <div className="px-10 mt-8 space-y-6">
        <HomeLogin />

        <div className="w-full">
          <h2 className="text-lg w-full p-2 rounded-3xl flex justify-center font-semibold text-orange-500 bg-slate-100">
            <Link href="/game" className="hover:underline">
              Play game
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}
