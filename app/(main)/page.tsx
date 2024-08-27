
import Footer from "@/components/main/sections/footer";
import Hero from "@/components/main/sections/hero";
import Navbar from "@/components/main/sections/navbar";
import Trending from "@/components/main/sections/trending";
import type { Metadata } from "next";

export const revalidate = 3600; // revalidate the data at most every hour


export const metadata: Metadata = {
  title: "Home",
  description: "Best Fashion and Accessories store and collections",
}


export default async function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Trending />
      <Footer />
    </main>
  );
}
