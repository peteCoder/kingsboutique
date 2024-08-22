import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/providers/ModalProvider";
import SessionProvider from "@/providers/sessionProvider";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "@/components/ui/toaster"
import SmartsuppScript from "@/components/SmartSuppScriptLiveChat";
 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  title: {
    default: "King's Boutiques Fashion and Accessories",
    template: "%s | King's Boutiques Fashion and Accessories",
  },
  description: "Best Fashion and Accessories store",
  openGraph: {
    title: "King's Boutiques Fashion and Accessories",
    description: "Best Fashion and Accessories store",
    type: "website",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "Kings Boutiques",
  }
};

export const revalidate = 3600; // revalidate the data at most every hour

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            {children}
            <ModalProvider />
            <Toaster />
          </SessionProvider>
        </ThemeProvider>

        <SmartsuppScript />
      </body>
    </html>
  );
}
