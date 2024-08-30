"use client";

import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import React, { MouseEventHandler, useEffect, useState } from "react";

// Icons
import { IoEyeOutline, IoStar } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GrFavorite } from "react-icons/gr";

import { Button } from "@/components/ui/button";
import { ProductSanitySchemaResult } from "@/types";
import { urlFor } from "@/lib/client";
import usePreviewModal from "@/hooks/usePreviewModal";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useFavourites } from "@/hooks/useFavourites";
import { useToast } from "../ui/use-toast";

// Type
interface ProductProps {
  index: number;
  product: ProductSanitySchemaResult;
}

// Components
const ProductCard: React.FC<ProductProps> = ({ index, product }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const previewProduct = usePreviewModal();
  const [activeSize, setActiveSize] = useState("");
  // Change this when sanity is connected
  const [activeImageUrl, setactiveImageUrl] = useState("");

  const router = useRouter();

  const [activeColour, setActiveColour] = useState("");

  const cart = useCart();

  const { toast } = useToast();

  const favourites = useFavourites();
  const productsInFavourites = favourites.displayFavouritesData();

  const data = product;

  const numberItemsAlreadyInCart = useCart(
    (state) => state.cartItems.find((item) => item._id === data._id)?.qty ?? 0
  );

  const showPopupModalForProduct: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    previewProduct.onOpen(data);
    console.log(previewProduct.isOpen);
  };

  const productHasBeenAddedToFavouritesAlready = (productId: string) => {
    const productAlreadyInFavourite = productsInFavourites.filter(
      (product) => product?._id === productId
    );
    if (productAlreadyInFavourite.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // console.log(cart.getAllOrderItems());

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      className="text-center p-1 sm:p-0"
      onClick={() =>
        product.qty_available > 0 && router.push(`/product/${product?._id}`)
      }
    >
      <div className="relative group duration-700 min-h-[250px] md:min-h-[350px] bg-muted rounded-t-md overflow-hidden">
        <div className="absolute top-0 right-0 flex flex-col md:space-y-2 z-10 group-hover:opacity-100 opacity-0 translate-x-[100%] group-hover:translate-x-0 duration-700 md:mr-3 mt-2">
          {/* Removed Preview Icon */}
          {/* <div
            className="bg-white hover:bg-primary hover:text-white cursor-pointer duration-700 text-black w-7 h-7 md:w-10 md:h-10 rounded-full m-1 flex items-center justify-center"
            id="quickView"
            onClick={showPopupModalForProduct}
          >
            <IoEyeOutline className="w-[13px] h-[13px] md:w-[18px] md:h-[18px]" />
          </div> */}

          <div
            onClick={(e) => {
              e.stopPropagation();
              if (!productHasBeenAddedToFavouritesAlready(product?._id)) {
                favourites.addItemToFavourites(product);
                toast({
                  title: "Added to Favourites",
                  description: "Product was added to Favourites"
                });
              } else {
                favourites.removeItemFromFavourites(product?._id);
                toast({
                  title: "Removed to Favourites",
                  description: "Product was removed from Favourites"
                });
              }
            }}
            className={cn(
              `bg-white hover:bg-primary hover:text-white cursor-pointer duration-700 text-black w-7 h-7 md:w-10 md:h-10 rounded-full m-1 flex items-center justify-center`,
              productHasBeenAddedToFavouritesAlready(product?._id) &&
                "bg-primary text-white"
            )}
            id="favourite"
          >
            <GrFavorite className="w-[13px] h-[13px] md:w-[18px] md:h-[18px]"  />
          </div>
        </div>
        <div
          className={cn(
            "opacity-100 duration-700 absolute top-0 bottom-0 right-0 left-0",
            product?.gallery?.length > 1 && "group-hover:opacity-0"
          )}
        >
          <Image
            className="object-cover w-full h-full "
            width={819}
            height={1024}
            // Here we can change the image to a thumbnail image
            // if the image link is not given
            src={
              activeImageUrl
                ? activeImageUrl
                : product?.gallery?.length > 0
                ? product?.gallery[0]?.imageUrl?.asset?.url
                : ""
            }
            alt="image"
          />
        </div>
        {product?.gallery?.length > 1 && (
          <div
            className={cn(
              "opacity-0 duration-700 absolute top-0 bottom-0 right-0 left-0",
              product?.gallery?.length > 1 && "group-hover:opacity-100"
            )}
          >
            <Image
              className="object-cover w-full h-full"
              width={819}
              height={1024}
              src={product?.gallery[1]?.imageUrl?.asset?.url}
              alt="image"
            />
          </div>
        )}
      </div>
      {/* Details to transform onhover */}
      <div className="relative">
        {/* Continue from here */}
        <div className="bg-white dark:bg-muted bg-opacity-100 rounded-b-md text-left border flex flex-col p-1 md:p-2 py-3 md:py-5 gap-2 md:gap-4 group duration-700">
          {/* w-[250px] md:w-[280px] mx-auto */}
          {/* Add Ratings here */}
          {/* Ratings stars */}
          {product?.ratings ? (
            <div className="rating flex items-center gap-1">
              <>
                {Array.from({ length: product?.ratings > 5 ? 5 : product?.ratings }).map((_, i) => (
                  <IoStar className="text-[.7rem]" color={"#FFD700"} key={i} />
                ))}
              </>
            </div>
          ) : (
            <div className="rating flex items-center gap-1">
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <IoStar className="text-[.7rem]" color={"#FFD700"} key={i} />
                ))}
              </>
            </div>
          )}
          
          <div className="space-y-1">
            {/* Price */}
            <div className="text-[15px] md:text-[19px] text-[#424141] dark:text-white font-bold">
              {formatCurrency(product?.price)}
            </div>
            {/* Product Name */}
            <div className="text-[15px] md:text-[15px] font-bold text-primary uppercase">
              {product?.name.slice(0, 10)}
              {product?.name.length > 10 && "..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
