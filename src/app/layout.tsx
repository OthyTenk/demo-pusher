import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import Image from "next/image";
import { authOptions } from "../../libs/authOptions";
import Login from "../components/Login";
import Logout from "../components/Logout";
import NextAuthProvider from "../components/NextAuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next with pusher demo",
  description: "Next with pusher demo",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <nav className="flex px-6 py-5 justify-between fixed top-0 left-0 w-full bg-white">
            <h1 className="text-black text-3xl font-bold">Demo Pusher</h1>

            {session ? (
              <div className="flex items-center gap-4">
                <Image
                  src={session.user?.image as string}
                  alt="user profile photo"
                  className="w-12 h-12 rounded-full"
                  width={50}
                  height={50}
                />
                <Logout />
              </div>
            ) : (
              <Login />
            )}
          </nav>
          <main>{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
