"use client";
import { ProductSanitySchemaResult } from "@/types";
import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Button } from "../ui/button";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GrFavorite } from "react-icons/gr";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { useFavourites } from "@/hooks/useFavourites";

const DetailPageInfo = ({ data }: { data: ProductSanitySchemaResult }) => {
  const [hasMounted, setHasMounted] = useState(false);

  const numberItemsAlreadyInCart = useCart(
    (state) => state.cartItems.find((item) => item._id === data._id)?.qty
  );

  const cart = useCart();

  const favourites = useFavourites();
  const productsInFavourites = favourites.displayFavouritesData();

  const productHasBeenAddedToFavouritesAlready = (productId: string) => {
    const productAlreadyInFavourite = productsInFavourites.filter(
      (product) => product._id === productId
    );
    if (productAlreadyInFavourite.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="space-y-3 px-3 py-4">
      <div className="">
        {data?.qty_available &&
          "Available: " + data?.qty_available + "  in Stock"}
      </div>

      <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl ">
        {data.name}
      </div>
      <div className="flex item-center gap-1 mt-2">
        {Array.from({ length: data?.ratings }).map((rating, i) => (
          <IoStar key={i} color={"#FFD700"} size={14} />
        ))}
      </div>
      {/* <div className="text-[.85rem] text-gray-800">{data?.description}</div> */}

      <div className="flex sm:items-center gap-2 flex-col sm:flex-row my-10">
        {numberItemsAlreadyInCart && (
          <div className="flex items-center bg-gray-400/20 md:max-w-[170px] justify-between w-full rounded-md">
            <button
              className="h-full p-3"
              onClick={() => cart.removeItemFromCart(data._id)}
            >
              <Minus size={15} />
            </button>
            <div className="h-full p-3">{numberItemsAlreadyInCart}</div>
            <button
              className="h-full p-3"
              onClick={() => {
                if (numberItemsAlreadyInCart >= data?.qty_available) {
                  return;
                } else {
                  cart.addItemToCart(data, { sizeId: "", colourId: "" });
                }
              }}
            >
              <Plus size={15} />
            </button>
          </div>
        )}
        {!numberItemsAlreadyInCart ? (
          <Button
            onClick={() => cart.addItemToCart(data, {sizeId: "", colourId: ""})}
            className="uppercase flex gap-1 items-center w-full min-h-[56px] flex-1"
          >
            <HiOutlineShoppingBag size={18} />
            <span>Add to cart</span>
          </Button>
        ) : (
          <Button
            asChild
            className="uppercase flex gap-1 items-center w-full min-h-[56px] flex-1"
          >
            <Link href={"/checkout"}>Checkout</Link>
          </Button>
        )}
      </div>

      <div className="flex-1">
        <Button
          className="text uppercase hover:no-underline flex items-center gap-1"
          variant={"link"}
          onClick={(e) => {
            e.stopPropagation();
            if (!productHasBeenAddedToFavouritesAlready(data._id)) {
              favourites.addItemToFavourites(data);
            } else {
              favourites.removeItemFromFavourites(data._id);
            }
          }}
        >
          {!productHasBeenAddedToFavouritesAlready(data._id) ? (
            <>
              <GrFavorite size={20} /> Add to wishlist
            </>
          ) : (
            <>
              <GrFavorite size={20} /> Remove from wishlist
            </>
          )}
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="uppercase">Description</AccordionTrigger>
          <AccordionContent>{data?.description}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DetailPageInfo;
