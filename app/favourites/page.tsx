
import FavouritesClient from "./_components/FavouritesClient";

import type { Metadata } from "next";

export const revalidate = 3600; // revalidate the data at most every hour


export const metadata: Metadata = {
  title: "Checkout",
  description: "Best Fashion and Accessories store and collections",
}


const FavouritesPage = () => {
  return (
    <>
      <FavouritesClient />
    </>
  )
};

export default FavouritesPage;
