"use client";

import { urlFor } from "@/lib/client";
import { ProductSanitySchemaResult } from "@/types";
// import { Carousel, ThemeProvider } from "@material-tailwind/react";
import React from "react";

import Autoplay from "embla-carousel-autoplay"
 
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

// const Gallery = ({ product }: { product: ProductSanitySchemaResult }) => {
//   return (
//     <ThemeProvider>
//       <Carousel
//         className="w-full h-[60vh]"
//         navigation={({ setActiveIndex, activeIndex, length }) => {
//           // Remove the navigation by returning null
//           return null;
//         }}
//       >
//         {product?.gallery?.map((product) => (
//           <div
//             key={product._id}
//             style={{
//               backgroundImage: `url(${urlFor(product?.imageUrl)})`,
//             }}
//             className="h-full w-full relative bg-cover bg-center bg-no-repeat"
//           ></div>
//         ))}
//       </Carousel>
//     </ThemeProvider>
//   );
// };
const Gallery = ({ product }: { product: ProductSanitySchemaResult }) => {

  // Continue from carousel

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div className="">
      <Carousel className=""
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="" >
        {product?.gallery?.map((item) => (
            <CarouselItem  key={item._id} >
              <Card className="bg-center bg-transparent border-none">
                  <CardContent className="flex aspect-square items-center justify-center p-0 bg-center">
                    <Image src={`${urlFor(item?.imageUrl)}`} alt="" width={600} height={600} className="w-[80%] mx-auto"/>
                  </CardContent>
                </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2" />
        <CarouselNext className="right-0 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
    
  )
};

export default Gallery;
