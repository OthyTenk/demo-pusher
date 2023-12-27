"use client";

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <button
      onClick={() => signIn("github")}
      className="flex items-center justify-center rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white ring-orange-300 hover:bg-orange-600 md:text-base transition-colors"
    >
      Login
    </button>
  );
};

export default Login;
