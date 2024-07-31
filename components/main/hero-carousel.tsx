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
import { urlFor } from "@/lib/client";

export function CarouselTransition({
  heroBanner,
}: {
  heroBanner: HeroBannerSchemaResult[];
}) {
  const filteredData = useFilter();
  const router = useRouter();

  const goToCategory = (category?: { _id: string; name: string}, isDummy?: boolean) => {
    if (!isDummy && category) {
      filteredData.addCategory(category);
    }
    router.push("/shop");
  };

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const RenderCarouselItem = ({
    backgroundImage, 
    description, 
    heading,
    subHeading,
    color="black",
    categoryId,
    categoryName,
    isDummy
  }:{
    backgroundImage: string;
    subHeading: string;
    heading: string;
    description: string;
    color?: string;
    categoryName: string;
    categoryId: string;
    isDummy: boolean

  }) => (
    <CarouselItem>
      <Card style={{color}} className=" bg-transparent border-none h-full w-full">
        <CardContent
          className="flex aspect-square items-center w-full justify-center p-2 bg-center bg-no-repeat bg-cover h-full relative"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute top-1/2 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2  md:text-center max-w-[40rem] flex flex-col gap-3 z-10">
            <div className="text-xl md:text-2xl lg:text-3xl">{subHeading}</div>
            <div className="">
              <div className="text-2xl md:text-5xl lg:text-7xl md:text-center">
                {heading}
              </div>
              <div className="text-lg font-light">
                {description}
              </div>
            </div>
            <div className="">
              <Button onClick={() => goToCategory({_id: categoryId, name: categoryName}, isDummy )} className="md:min-w-[10rem] md:min-h-[3rem]">
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
      {!(heroBanner.length > 0) ? (
        <Carousel
          className=""
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-[40vh] md:h-[50vh] lg:h-[70vh]">
            <RenderCarouselItem 
              backgroundImage='/home-slide-01.jpeg' 
              description="We deliver the best of varieties" 
              heading="Experience the Perfect Fit" 
              subHeading="Ready to" 
              color={"white"}
              categoryId=""
              categoryName=""
              isDummy={true}
            />
            <RenderCarouselItem 
              backgroundImage='/home-slide-02.jpeg' 
              description="We deliver the best of varieties" 
              heading="Experience the Perfect Fit"
              subHeading="Ready to" 
              color={"black"}
              categoryId=""
              categoryName=""
              isDummy={true}
            />
          </CarouselContent>
          <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="right-0 top-1/2 -translate-y-1/2" />
        </Carousel>
      ) : (
        <Carousel>
          <CarouselContent className="h-[40vh] md:h-[50vh] lg:h-[70vh]">
          {heroBanner.map((banner) => (
            <RenderCarouselItem 
              backgroundImage={`${urlFor(banner?.bannerImage)?.url()}`}
              color={banner.textColor}
              description=""
              heading={banner?.title}
              subHeading={banner?.subTitle}
              categoryId={banner?.category._id}
              categoryName={banner?.category.name}
              isDummy={false}

            />
          ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="right-0 top-1/2 -translate-y-1/2" />
        </Carousel>
      )}
    </div>
  );
}
