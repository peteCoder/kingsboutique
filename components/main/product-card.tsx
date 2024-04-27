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
import { toast } from "react-hot-toast";

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
      className="text-center p-2 sm:p-0"
      onClick={() =>
        product.qty_available > 0 && router.push(`/product/${product?._id}`)
      }
    >
      <div className="relative group duration-700 min-h-[300px] md:min-h-[350px] bg-[#f1f5f9] overflow-hidden">
        <div className="absolute top-0 right-0 flex flex-col space-y-2 z-10 group-hover:opacity-100 opacity-0 translate-x-[100%] group-hover:translate-x-0 duration-700 mr-3 mt-2">
          <div
            className="bg-white hover:bg-primary hover:text-white cursor-pointer duration-700 text-black w-10 h-10 rounded-full m-1 flex items-center justify-center"
            id="quickView"
            onClick={showPopupModalForProduct}
          >
            <IoEyeOutline size={18} />
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              if (!productHasBeenAddedToFavouritesAlready(product?._id)) {
                favourites.addItemToFavourites(product);
              } else {
                favourites.removeItemFromFavourites(product?._id);
              }
            }}
            className={cn(
              `bg-white hover:bg-primary hover:text-white cursor-pointer duration-700 text-black w-10 h-10 rounded-full m-1 flex items-center justify-center`,
              productHasBeenAddedToFavouritesAlready(product?._id) &&
                "bg-primary text-white"
            )}
            id="favourite"
          >
            <GrFavorite size={18} />
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
          // #2563EB
        )}
      </div>
      {/* Details to transform onhover */}
      <div className="relative">
        {/* Continue from here */}
        <div className="bg-white  text-center flex flex-col items-center gap-4 py-5 group hover:-translate-y-20 duration-700">
          {/* w-[250px] md:w-[280px] mx-auto */}
          {/* Add Ratings here */}
          {product?.ratings && (
            <div className="ratings flex items-center gap-1">
              <>
                {Array.from({ length: product?.ratings }).map((_, i) => (
                  <IoStar color={"#FFD700"} key={i} size={15} />
                ))}
              </>
            </div>
          )}
          <div className="space-y-1">
            <div className="text-[18px] text-[#191919] font-bold">
              {product?.name}
            </div>
            <div className="text-[19px] text-[#191919]">
              {formatCurrency(product?.price)}
            </div>
          </div>

          {/* Smaller Images */}
          <div className="flex items-center gap-3">
            {product?.gallery?.slice(0, 2)?.map((product) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setactiveImageUrl(urlFor(product?.imageUrl)?.url());
                }}
                key={product._id}
                className={cn(
                  "h-10 w-auto rounded-xl overflow-hidden  md:h-[50px] md:w-auto bg-[#f1f5f9]",
                  urlFor(product?.imageUrl)?.url() === activeImageUrl &&
                    "border-2 border-primary"
                )}
              >
                <Image
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                  src={urlFor(product?.imageUrl)?.url()}
                  alt="product-image"
                />
              </div>
            ))}
          </div>
          {/* Sizes */}
          <div className="flex items-center gap-1">
            {product?.sizes?.length > 0 && (
              <>
                {product?.sizes?.map((size) => (
                  <Button
                    className={cn(
                      "bg-gray-500/20 text-black hover:text-white px-3 py-4 h-0",
                      size?._id === activeSize && "bg-primary text-white"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSize(size?._id);
                    }}
                    key={size?._id}
                  >
                    {size?.code}
                  </Button>
                ))}
              </>
            )}
          </div>
          {/* Faric Texture */}
          {product?.colours?.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {product?.colours?.map((colour) => (
                <div
                  key={colour?._id}
                  style={{ backgroundColor: `${colour?.code}` }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveColour(colour?._id);
                  }}
                  className={cn(
                    "h-8 w-8 rounded-full",
                    colour?._id === activeColour &&
                      "outline-4 outline outline-black"
                  )}
                ></div>
              ))}
            </div>
          )}

          {/* Button to add to cart */}
          <>
            {product.qty_available <= 0 ? (
              <div className="flex justify-center items-center opacity-0 group-hover:opacity-100 duration-700 ">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="uppercase flex gap-1 items-center opacity-20"
                >
                  <HiOutlineShoppingBag size={18} />
                  <span>Sold out</span>
                </Button>
              </div>
            ) : (
              <div className="flex justify-center items-center opacity-0 group-hover:opacity-100 duration-700 ">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();

                    if (numberItemsAlreadyInCart >= data?.qty_available) {
                      toast.success(
                        "Number of item is more than the available quantity"
                      );
                      return;
                    } else {
                      cart.addItemToCart(data, {
                        sizeId: activeSize,
                        colourId: activeColour,
                      });
                    }
                  }}
                  className={cn(
                    `uppercase flex gap-1 items-center`,
                    numberItemsAlreadyInCart >= data?.qty_available &&
                      "opacity-50"
                  )}
                >
                  <HiOutlineShoppingBag size={18} />
                  <span>Add to cart</span>
                </Button>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
