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
import { useFavourites } from "@/hooks/useFavourites";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/actions/getProducts";
import { sanityClient } from "@/lib/client";

const FavouriteData = () => {
  const favourites = useFavourites();
  const cart = useCart();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const getNumberItemsAlreadyInCart = (productId: string) => {
    const numberOfItemsInCart = cart.cartItems.find(
      (item) => item._id === productId
    )?.qty;

    return numberOfItemsInCart;
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  console.log("All products: ", products);

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
        {favourites.displayFavouritesData().map((item) => (
          <li key={item._id} className="flex py-6 gap-2 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
              <Image
                fill
                src={
                  item?.gallery ? item?.gallery[0]?.imageUrl?.asset?.url : ""
                }
                alt="image"
                className="object-cover object-center"
              />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div className="absolute z-10 right-0 top-0">
                <IconButton
                  onClick={() => favourites.deleteItemFromFavourites(item._id)}
                  Icon={<Trash2Icon size={15} color={"black"} />}
                />
              </div>
              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div className="flex justify-between">
                  <Link
                    href={`/product/${item?._id}`}
                    className="text-lg md:text-2xl font-semibold text-black hover:text-primary"
                  >
                    {item?.name}
                  </Link>
                </div>
                <div className="mt-1 flex text-sm"></div>
                <span className="font-bold">Price:</span>
                <PriceCurrency value={item?.price} />
              </div>
              <div className="mt-3">
                <div className="flex items-center bg-gray-400/20 md:max-w-[170px] justify-between w-full rounded-md">
                  {!getNumberItemsAlreadyInCart(item._id) ? (
                    <Button
                      onClick={() =>
                        cart.addItemToCart(item, { colourId: "", sizeId: "" })
                      }
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
                      <Link href={"/cart"}>
                        <HiOutlineShoppingBag size={18} />
                        Go to Cart
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row gap-7 justify-between my-10 text-primary uppercase text-sm font-[500]">
        <Link
          href="/shop"
          className="hover:text-gray-900 cursor-pointer flex items-center flex-wrap gap-1"
        >
          <HiOutlineShoppingBag size={20} />
          <span>Continue Shopping</span>{" "}
        </Link>
        <div
          onClick={() => favourites.resetFavourites()}
          className="hover:text-gray-900 cursor-pointer flex items-center flex-wrap gap-1"
        >
          <Trash2Icon size={20} /> <span> Clear Wishlist</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default FavouriteData;
