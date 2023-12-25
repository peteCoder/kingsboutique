"use client";
import React, { useEffect, useState } from "react";
import Heading from "./heading";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import BeatLoader from "react-spinners/BeatLoader";
import { formatCurrency } from "@/lib/utils";

const OrderSummary = () => {
  const cart = useCart();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="min-h-[40vh] w-full flex justify-center items-center">
        {/* Manually change the color */}
        <BeatLoader color="#2563eb" />
      </div>
    );
  }

  return (
    <div className="border min-h-[40vh] p-2 sm:p-4 md:p-7">
      <div className="">
        <Heading text="Order" />
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between text-sm mt-7 mb-2">
          <h2>Products</h2>
          <h2>Total</h2>
        </div>
        <Separator />
        <div className="mt-2">
          {cart.cartItems.map((item) => (
            <div
              className="flex items-center justify-between text-sm mt-2"
              key={item._id}
            >
              <div className="flex items-center gap-2">
                <span className="">{item.name}</span>{" "}
                <span className="text-gray-4a font-medium">x{item.qty}</span>
              </div>

              <div className="text-gray-4a font-medium">
                {formatCurrency(item.totalPrice)}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Separator />
          <div className="flex items-center justify-between mt-2">
            <span>Total: </span>
            <span>{formatCurrency(cart.absoluteTotal())}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
