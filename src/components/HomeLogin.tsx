"use client";

import { signIn } from "next-auth/react";

const HomeLogin = () => {
  return (
    <button
      onClick={() => signIn("github")}
      className="w-full flex items-center justify-center gap-2 rounded-3xl bg-orange-500 px-8 py-3 text-center text-sm font-semibold text-white ring-orange-300 hover:bg-orange-600 md:text-base transition-colors"
    >
      Login with Github
    </button>
  );
};

export default HomeLogin;
