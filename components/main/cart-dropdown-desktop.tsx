"use client";

import { useCart } from "@/hooks/useCart";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars, FaBinoculars } from "react-icons/fa";
import { ShoppingCart, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { MenubarSeparator } from "../ui/menubar";
import { urlFor } from "@/lib/client";
import { HiOutlineShoppingBag } from "react-icons/hi";

const CartDropdownForDesktop = () => {
  const [pageHasMounted, setPageHasMounted] = useState(false);

  const cart = useCart();

  useEffect(() => {
    setPageHasMounted(true);
  }, []);

  if (!pageHasMounted) {
    return null;
  }
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <div className="nav-links relative">
            <ShoppingCart size={20} />
            <div className="absolute text-[9px] text-white -top-3 -right-4 text-sm bg-primary rounded-full h-6 w-6 flex justify-center items-center">
              {cart.numberOfItemsInCart()}
            </div>
          </div>
        </SheetTrigger>
        <SheetContent className="p-0 w-full">
          <h2 className="text-2xl mt-3 mb-3 font-extrabold mx-2">Cart</h2>
          <div className="mt-10">
            {!(cart.cartItems.length > 0) ? (
              <div className="h-full w-full flex justify-center items-center">
                <div className="flex items-center justify-center flex-col-reverse text-gray-400 h-full w-full gap-3">
                  <div className="text-">No products in the Cart</div>
                  {/* <BaggageClaim size={40} className="text-gray-400" /> */}
                  <HiOutlineShoppingBag size={40} />
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-y-scroll p-2 space-y-3">
                  {cart.cartItems.slice(0, 3).map((item) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-3 gap-5 md:gap-7 justify-around items-center mb-3"
                    >
                      <div className="">
                        <div
                          style={{
                            backgroundImage: `url(${urlFor(item?.imageUrl)})`,
                          }}
                          className="bg-center bg-no-repeat bg-cover h-20 w-20 rounded-2xl"
                        ></div>
                        <div className="text-[10px] text-gray-700 block sm:hidden">
                          {item?.name}
                        </div>
                      </div>

                      <div className="">
                        <div className="text-sm hidden sm:block">
                          {item?.name}
                        </div>
                        <div className="text-sm text-gray-700">
                          {item?.qty} <span>&#215;</span>{" "}
                          {formatCurrency(item?.price)}
                        </div>
                      </div>

                      <div
                        onClick={() => cart.deleteItemFromCart(item?._id)}
                        className="cursor-pointer flex justify-center"
                      >
                        <Trash2Icon
                          size={17}
                          className="hover:text-red-500 text-[13px]"
                        />
                      </div>
                    </div>
                  ))}
                  <MenubarSeparator />
                  {cart.cartItems.length > 0 && (
                    <div className="px-4 py-2 mb-2">
                      <div className="flex justify-between uppercase mb-4">
                        <span>subtotal:</span>
                        <span>{formatCurrency(cart.absoluteTotal())}</span>
                      </div>
                      <Button asChild className="w-full py-3">
                        <Link href={"/checkout"} className="text-[17px]">
                          Proceed to checkout
                        </Link>
                      </Button>
                      <Button
                        variant={"link"}
                        asChild
                        className="w-full text-[17px]"
                      >
                        <Link href={"/cart"} className="">
                          View Cart
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartDropdownForDesktop;
