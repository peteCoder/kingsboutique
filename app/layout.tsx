import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/providers/ModalProvider";
import SessionProvider from "../providers/sessionProvider";
import { getServerSession } from "next-auth";
import ToastProvider from "@/providers/ToastProvider";

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 1000; // revalidate the data at most every hour

export const metadata: Metadata = {
  title: "King's Boutique Fashion and Accessories",
  description: "Best Fashion and Accessories store",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
          <ModalProvider />
          <ToastProvider />
        </SessionProvider>
      </body>
    </html>
  );
}
