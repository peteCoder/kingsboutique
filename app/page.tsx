import Feature from "@/components/main/sections/category";
import Footer from "@/components/main/sections/footer";
import Hero from "@/components/main/sections/hero";
import Navbar from "@/components/main/sections/navbar";
import Specials from "@/components/main/sections/specials";
import Trending from "@/components/main/sections/trending";


export const revalidate = 1000 // revalidate the data at most every hour

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Feature />
      <Trending />
      {/* <Specials /> */}
      <Footer />
    </main>
  );
}
