"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2Icon } from "lucide-react";
import Image from "next/image";
import IconButton from "@/components/IconButton";
import PriceCurrency from "@/components/PriceCurrency";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi";
import BeatLoader from "react-spinners/BeatLoader";

const CartData = () => {
  const cart = useCart();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    // Here add A skeletal loading
    return (
      <div className="w-full min-h-[50vh] flex justify-center items-center">
        <BeatLoader color="#2563eb" />
      </div>
    );
  }

  return (
    <div>
      <Separator />

      <ul className="w-full space-y-6">
        {cart.displayCartData().map((item) => (
          <li key={item._id} className="flex py-6 gap-2 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
              <Image
                fill
                src={item?.imageUrl?.asset?.url}
                alt="image"
                className="object-cover object-center"
              />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div className="absolute z-10 right-0 top-0">
                <IconButton
                  onClick={() => cart.deleteItemFromCart(item._id)}
                  Icon={
                    <Trash2Icon
                      size={15}
                      className="text-black dark:group-hover:text-white"
                    />
                  }
                />
              </div>
              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div className="flex justify-between">
                  <Link
                    href={`/product/${item?._id}`}
                    className="text-lg md:text-2xl font-semibold text-black dark:text-white hover:text-primary"
                  >
                    {item?.name}
                  </Link>
                </div>
                <div className="mt-1 flex text-sm">
                  <p className="text-gray-500">{item.qty}</p>
                  <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
                    <PriceCurrency value={item?.price} />
                  </p>
                </div>
                <span className="font-bold">Total:</span>
                <PriceCurrency value={item?.totalPrice} />
              </div>
              <div className="mt-3">
                <div className="flex items-center bg-gray-400/20 md:max-w-[170px] justify-between w-full rounded-md">
                  <button
                    className="h-full p-3"
                    onClick={() => {
                      cart.removeItemFromCart(item?._id);
                    }}
                  >
                    <Minus size={15} />
                  </button>
                  <div className="h-full p-3">{item.qty}</div>
                  <button
                    className="h-full p-3"
                    onClick={() => {
                      if (item?.qty >= item?.qty_available) {
                        return;
                      }
                      cart.incrementProductInCart(item?._id);
                    }}
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row gap-7 justify-between my-10 text-primary uppercase text-sm font-[500]">
        <Link
          href="/shop"
          className="hover:text-gray-900 dark:hover:text-primary dark:hover:underline cursor-pointer flex items-center flex-wrap gap-1"
        >
          <HiOutlineShoppingBag size={20} />
          <span>Continue Shopping</span>{" "}
        </Link>
        <div
          onClick={() => cart.resetCart()}
          className="hover:text-gray-900 dark:hover:text-primary dark:hover:underline cursor-pointer flex items-center flex-wrap gap-1"
        >
          <Trash2Icon size={20} /> <span> Clear Shopping Cart</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default CartData;
