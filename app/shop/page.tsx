
import ShopPageClient from "./_components/ShopPageClient";

import type { Metadata } from "next";

export const revalidate = 3600; // revalidate the data at most every hour


export const metadata: Metadata = {
  title: "Shop",
  description: "Best Fashion and Accessories store and collections shop",
}

const Shop = () => {
  return (
    <main>
      <ShopPageClient />
    </main>
  );
};

export default Shop;
