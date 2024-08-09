"use client";

import Navbar from "@/components/main/sections/navbar";
import { Button } from "@/components/ui/button";
import { useFavourites } from "@/hooks/useFavourites";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import BeatLoader from "react-spinners/BeatLoader";
import FavouriteData from "./FavouriteData";
import Footer from "@/components/main/sections/footer";

const FavouritesClient = () => {
 
    const [hasMounted, setHasMounted] = useState(false);
  const favouriteItems = useFavourites((state) =>
    state.displayFavouritesData()
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <main>
        <Navbar />
        <div className="min-h-[100vh] w-full h-full flex justify-center items-center">
          <BeatLoader color="#2563eb" />
        </div>
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      {!(favouriteItems.length > 0) ? (
        <div className="min-h-[60vh] mb-8 flex flex-col items-center justify-center text-center">
          <HiOutlineShoppingBag
            className="text-5xl text-gray-400 mb-4"
            size={70}
          />
          <h2 className="uppercase text-2xl md:text-3xl lg:text-4xl">
            Your Wishlist is empty
          </h2>
          <p className="text-gray-500 mb-7 text-sm ">
            You have no items in your wishlist.
          </p>
          <Button asChild className="uppercase">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mb-8 pt-4 px-2 md:container">
          <h2 className="uppercase text-xl md:text-2xl lg:text-4xl text-center mb-4">
            Your Wishlist
          </h2>
          <div className="flex gap-3 flex-col lg:flex-row mt-20">
            <div className="basis-[100%] lg:basis-2/3">
              <FavouriteData />
            </div>
            <div className="basis-[100%] lg:basis-1/3">{/*  */}</div>
          </div>
        </div>
      )}
    </main>
  );
  
}

export default FavouritesClient