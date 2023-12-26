"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center justify-center rounded-3xl bg-gray-200 px-6 py-3 text-sm font-semibold hover:text-white ring-gray-400 transition-colors hover:bg-gray-400 md:text-base"
    >
      Logout
    </button>
  );
};

export default Logout;
