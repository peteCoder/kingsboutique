"use client";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { HeroBannerSchemaResult } from "@/types";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { useFilter } from "@/hooks/useFilter";

export function CarouselTransition({
  heroBanner,
}: {
  heroBanner: HeroBannerSchemaResult[];
}) {
  const filteredData = useFilter();
  const router = useRouter();

  const goToCategory = (category: { _id: string; name: string }) => {
    filteredData.addCategory(category);
    router.push("/shop");
  };

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const renderCarouselItem = (backgroundImage: string) => (
    <CarouselItem>
      <Card className="bg-center bg-transparent border-none h-full w-full">
        <CardContent
          className="flex aspect-square items-center w-full justify-center p-0 bg-no-repeat bg-cover h-full"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-black md:text-center max-w-[40rem] flex flex-col gap-3 z-10">
            <div className="text-xl md:text-2xl lg:text-3xl">Ready to</div>
            <div className="">
              <div className="text-2xl md:text-5xl lg:text-7xl md:text-center">
                Experience the Perfect Fit
              </div>
              <div className="text-lg font-light">
                We deliver the best of varieties
              </div>
            </div>
            <div className="">
              <Button onClick={() => router.push("/shop")} className="md:min-w-[10rem] md:min-h-[3rem]">
                Shop Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );

  return (
    <div className="w-full" data-aos="fade-up" data-aos-once={true}>
      {heroBanner.length > 0 ? (
        <Carousel
          className=""
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-[40vh] md:h-[50vh] lg:h-[70vh]">
            {renderCarouselItem('/home-slide-01.jpeg')}
            {renderCarouselItem('/home-slide-02.jpeg')}
          </CarouselContent>
          <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="right-0 top-1/2 -translate-y-1/2" />
        </Carousel>
      ) : (
        <Carousel>
          <CarouselContent className="h-[40vh] md:h-[50vh] lg:h-[70vh]">
            
          </CarouselContent>
          <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="right-0 top-1/2 -translate-y-1/2" />
        </Carousel>
      )}
    </div>
  );
}
