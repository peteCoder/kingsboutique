"use client";

import { formatCurrency } from "@/lib/utils";
import { ProductSanitySchemaResult } from "@/types";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { IoStar } from "react-icons/io5";
import { Button } from "../ui/button";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

const ProductInfo = ({ data }: { data: ProductSanitySchemaResult }) => {
  const numberItemsAlreadyInCart =
    useCart(
      (state) => state.cartItems.find((item) => item._id === data._id)?.qty
    ) ?? 0;

  const cart = useCart();

  return (
    <div className="space-y-4">
      <div className="">Available: {data?.qty_available}</div>
      <div className="font-bold text-2xl space-y-2">
        <div className="">{data?.name}</div>
        <div className="text-primary text-2xl">
          {formatCurrency(data?.price)}
        </div>
        {data?.ratings > 0 && (
          <div className="flex items-center gap-2 my-5">
            {Array.from({ length: data.ratings }).map((_, i) => (
              <IoStar color={"#FFD700"} key={i} size={14} />
            ))}
          </div>
        )}
      </div>

      <div className="text-sm">{data?.description?.slice(0, 300)}...</div>

      {data?.sizes?.length > 0 && (
        <div className="">
          {data?.sizes.map((size) => (
            <div key={size._id} className=""></div>
          ))}
        </div>
      )}

      <div className="flex sm:items-center gap-2 flex-col sm:flex-row my-8">
        {numberItemsAlreadyInCart && (
          <div className="flex items-center bg-gray-400/20 md:max-w-[170px] justify-between w-full rounded-md">
            <button
              className="h-full p-3"
              onClick={() => cart.removeItemFromCart(data._id)}
            >
              <Minus size={15} />
            </button>
            <div className="h-full p-3">
              {numberItemsAlreadyInCart}
            </div>
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
            onClick={() =>
              cart.addItemToCart(data, { sizeId: "", colourId: "" })
            }
            className="uppercase flex gap-1 items-center w-full min-h-[56px] flex-1 disabled:opacity-40"
            disabled={numberItemsAlreadyInCart >= data?.qty_available}
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
    </div>
  );
};

export default ProductInfo;
