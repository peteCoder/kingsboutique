"use client";

import { urlFor } from "@/lib/client";
import { ProductSanitySchemaResult } from "@/types";
import { Carousel, ThemeProvider } from "@material-tailwind/react";
import React from "react";

const Gallery = ({ product }: { product: ProductSanitySchemaResult }) => {
  return (
    <ThemeProvider>
      <Carousel
        className="w-full h-[60vh]"
        navigation={({ setActiveIndex, activeIndex, length }) => {
          // Remove the navigation by returning null
          return null;
        }}
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
    </ThemeProvider>
  );
};

export default Gallery;
