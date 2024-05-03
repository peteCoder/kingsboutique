"use client";

import { urlFor } from "@/lib/client";
import { ProductSanitySchemaResult } from "@/types";
import { Carousel, IconButton, ThemeProvider } from "@material-tailwind/react";
import React, { useState } from "react";

/// ... (imports)

const DetailPageGallery = ({
  product,
}: {
  product: ProductSanitySchemaResult;
}) => {
  const [customIndex, setCustomIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setCustomIndex(index);
  };

  console.log(product);

  return (
    <ThemeProvider>
      <div className="flex gap-2 relative justify-center items-center">
        {/* <div className="h-[550px] hidden sm:block sm:basis-1/4"></div> */}
        <Carousel
          className="h-[550px] text-[#9d9d9d] rounded-2xl relative"
          navigation={({ setActiveIndex, activeIndex, length }) => {
            // return (
            //   <div className="flex gap-2 absolute left-0 z-[10]">
            //     {product?.gallery?.map((product, i) => (
            //       <div
            //         key={product._id}
            //         onClick={() => {
            //           setCustomIndex(i);
            //           setActiveIndex(i);
            //         }}
            //         style={{
            //           backgroundImage: `url(${urlFor(product?.imageUrl)})`,
            //         }}
            //         className={`h-20 w-20 bg-cover bg-center bg-no-repeat cursor-pointer ${
            //           i === activeIndex ? "border-2 border-blue-500" : ""
            //         }`}
            //       ></div>
            //     ))}
            //   </div>
            // );
          }}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={() => {
                handlePrev();
                setCustomIndex(
                  (prevIndex) =>
                    (prevIndex - 1 + product?.gallery?.length) %
                    product?.gallery?.length
                );
              }}
              className="!absolute top-2/4 left-4 -translate-y-2/4"
            >
              {/* ... ( arrow SVG Icon) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#9d9d9d"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={() => {
                handleNext();
                setCustomIndex(
                  (prevIndex) => (prevIndex + 1) % product?.gallery?.length
                );
              }}
              className="!absolute top-2/4 !right-4 -translate-y-2/4"
            >
              {/* ... ( arrow SVG Icon) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#9d9d9d"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          )}
        >
          {product?.gallery?.map((product) => (
            <div
              key={product._id}
              style={{
                backgroundImage: `url(${urlFor(product?.imageUrl)})`,
              }}
              className="h-full w-full relative bg-cover bg-center bg-no-repeat"
            ></div>
          ))}
        </Carousel>
      </div>
    </ThemeProvider>
  );
};

export default DetailPageGallery;
