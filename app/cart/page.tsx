"use client";
import Navbar from "@/components/main/sections/navbar";
import React, { useEffect, useState } from "react";
import CartData from "./_components/cartData";
import CartFormData from "./_components/formData";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import BeatLoader from "react-spinners/BeatLoader";
import Footer from "@/components/main/sections/footer";

const CartPage = () => {
  const cartItems = useCart((state) => state.displayCartData());
  const [hasMounted, setHasMounted] = useState(false);

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

      {!(cartItems.length > 0) ? (
        <div className="min-h-[60vh] mb-8 flex flex-col items-center justify-center text-center">
          <HiOutlineShoppingBag
            className="text-5xl text-gray-400 mb-4"
            size={70}
          />
          <h2 className="uppercase text-2xl md:text-3xl lg:text-4xl">
            Shopping Cart is empty
          </h2>
          <p className="text-gray-500 mb-7 text-sm ">
            You have no items in your shopping cart.
          </p>
          <Button asChild className="uppercase">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mb-8 pt-4 px-2 md:container">
          <h2 className="uppercase text-xl md:text-2xl lg:text-4xl text-center mb-4">
            Shopping Cart
          </h2>
          <div className="flex gap-3 flex-col lg:flex-row mt-20">
            <div className="basis-[100%] lg:basis-2/3">
              <CartData />
            </div>
            <div className="basis-[100%] lg:basis-1/3">
              <CartFormData />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
