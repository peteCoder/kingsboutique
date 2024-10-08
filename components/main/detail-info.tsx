"use client";
import { ProductSanitySchemaResult } from "@/types";
import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Button } from "../ui/button";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GrFavorite } from "react-icons/gr";

import { useToast } from "@/components/ui/use-toast";


// Select Component
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { useFavourites } from "@/hooks/useFavourites";
import { formatCurrency } from "@/lib/utils";

const DetailPageInfo = ({ data }: { data: ProductSanitySchemaResult }) => {
  const [hasMounted, setHasMounted] = useState(false);

  const numberItemsAlreadyInCart = useCart(
    (state) => state.cartItems.find((item) => item._id === data._id)?.qty
  );

  const cart = useCart();

  const { toast } = useToast();

  const favourites = useFavourites();

  const [activeSize, setActiveSize] = useState<string>("");
  const [activeColour, setActiveColour] = useState<string>("");


  const onChangeSize = (value: string) => {
    console.log(value);
    setActiveSize(value);
    cart.addSizeAndColour(data, {
      sizeId: value,
      colourId: activeColour,
    });
  };
  const onChangeColour = (value: string) => {
    console.log(value);
    setActiveColour(value);
    cart.addSizeAndColour(data, {
      sizeId: activeSize,
      colourId: value,
    });
  };
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

  const productIsOutOfStock = data?.qty_available < 1;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }


  return (
    <div className="space-y-3 px-3 py-4">
      <div className="text-primary text-2xl font-bold">
          {formatCurrency(data?.price)}
        </div>
      <div className="">
        {data?.qty_available > 0 &&
          "Available: " + data?.qty_available + "  in Stock"}
      </div>

      <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
        {data.name}
      </div>
      <div className="flex item-center gap-1 mt-2">
        {Array.from({ length: data?.ratings }).map((rating, i) => (
          <IoStar key={i} color={"#FFD700"} size={14} />
        ))}
      </div>

      <div className="flex sm:items-center gap-2 flex-col sm:flex-row my-10">
        {numberItemsAlreadyInCart && (
          <div className="flex items-center bg-gray-400/20 md:max-w-[170px] justify-between w-full rounded-md">
            <button
              className="h-full p-3"
              onClick={() => {
                cart.removeItemFromCart(data._id);
                toast({
                  title: "Product was removed from cart.",
                })
              }}
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
                  cart.addItemToCart(data, {
                    sizeId: activeSize,
                    colourId: activeColour,
                  });
                  toast({
                    title: "Increased the number of item in cart.",
                  });
                }
              }}
            >
              <Plus size={15} />
            </button>
          </div>
        )}
        {!numberItemsAlreadyInCart ? (
          <Button
            onClick={() => {
                cart.addItemToCart(data, {
                  sizeId: activeSize,
                  colourId: activeColour,
                });
                toast({
                  title: "Product added to cart",
                })
              
              }
            }
            className="uppercase flex gap-1 items-center w-full min-h-[56px] flex-1"
            disabled={productIsOutOfStock}
          >
            
            {data?.qty_available > 0 ? (
              <>
                <HiOutlineShoppingBag size={18} />
                <span>Add to cart</span>
              </>
            ) : (
              <>
                <span>Out of stock</span>
              </>
            )}
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

      <div className="flex gap-3 flex-col sm:flex-row">
        {/* Sizes */}
        <div className="sm:w-[50%] w-full">
          {data?.sizes?.length > 0 && (
            <>
              <div className="text-gray-500 text-sm mb-2">Sizes</div>
              <Select onValueChange={onChangeSize} defaultValue="" disabled={productIsOutOfStock}>
                <SelectTrigger className="md:w-[180px] w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent className=" z-[1000000]">
                  <SelectGroup>
                    <SelectLabel>Sizes</SelectLabel>
                    {data?.sizes.map((size) => (
                      <div key={size._id} className="">
                        <SelectItem value={size._id}>{size.name}</SelectItem>
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          )}
        </div>
        {/* Colours */}
        <div className="">
          {data?.colours?.length > 0 && (
            <>
              <div className="text-gray-500 text-sm mb-2">Colours</div>
              <Select onValueChange={onChangeColour} defaultValue="">
                <SelectTrigger className="md:w-[180px] w-full">
                  <SelectValue placeholder="Select a colour" />
                </SelectTrigger>
                <SelectContent className=" z-[1000000]">
                  <SelectGroup>
                    <SelectLabel>Colours</SelectLabel>
                    {data?.colours.map((colour) => (
                      <div key={colour._id} className="">
                        <SelectItem value={colour._id}>
                          {colour.name}
                        </SelectItem>
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      </div>

      <div className="flex-1">
        <Button
          className="text uppercase hover:no-underline flex items-center gap-1 border"
          variant={"link"}
          onClick={(e) => {
            e.stopPropagation();
            if (!productHasBeenAddedToFavouritesAlready(data._id)) {
              favourites.addItemToFavourites(data);
            } else {
              favourites.removeItemFromFavourites(data._id);
            }
          }}
          disabled={productIsOutOfStock}
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

      {data?.description && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="uppercase">Description</AccordionTrigger>
            <AccordionContent>{data?.description}</AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      
    </div>
  );
};

export default DetailPageInfo;
