"use client";

import { Carousel, IconButton, ThemeProvider } from "@material-tailwind/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroBannerSchemaResult } from "@/types";
import { urlFor } from "@/lib/client";
import Link from "next/link";
import { useFilter } from "@/hooks/useFilter";
import { useRouter } from "next/navigation";

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

  return (
    <ThemeProvider>
      {/* First */}
      {heroBanner.length <= 0 ? (
        <Carousel
          className="w-full h-[90vh] rounded-xl"
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-3/4 left-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
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
              onClick={handleNext}
              className="!absolute top-2/4 !right-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
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
          <div
            style={{
              backgroundImage: `url(/home-slide-01.jpeg)`,
            }}
            className="h-full w-full relative bg-cover bg-left md:bg-center bg-no-repeat"
          >
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white text-center max-w-[40rem] flex flex-col gap-3">
              <div className="text-xl md:text-3xl lg:text-4xl text-shadow">
                Ready to
              </div>
              <div className="">
                <div className="text-3xl md:text-6xl lg:text-8xl text-center">
                  Experience the Perfect Fit
                </div>
                <div className="text-lg font-light">
                  We deliver the best of varieties
                </div>
              </div>

              <div className="">
                <Button className="md:min-w-[10rem] md:min-h-[3rem]">
                  Shop Now!
                </Button>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundImage: `url(/home-slide-02.jpeg)`,
            }}
            className="h-full w-full relative bg-cover bg-left md:bg-center bg-no-repeat"
          >
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white text-center max-w-[40rem] flex flex-col gap-3">
              <div className="text-xl md:text-3xl lg:text-4xl">Ready to</div>
              <div className="">
                <div className="text-3xl md:text-6xl lg:text-8xl text-center">
                  Experience the Perfect Fit
                </div>
                <div className="text-lg font-light">
                  We deliver the best of varieties
                </div>
              </div>

              <div className="">
                <Button className="md:min-w-[10rem] md:min-h-[3rem]">
                  Shop Now!
                </Button>
              </div>
            </div>
          </div>
        </Carousel>
      ) : (
        <Carousel
          className="w-full h-[40vh] md:h-[50vh] lg:h-[70vh] rounded-xl"
          prevArrow={({ handlePrev }) => {
            if (heroBanner.length === 1) {
              return null;
            }
            return (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="!absolute bottom-12 md:bottom-10  left-[35%] md:left-[42%] md:bg-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke={heroBanner[0]?.textColor}
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </IconButton>
            );
          }}
          nextArrow={({ handleNext }) => {
            if (heroBanner.length === 1) {
              return null;
            }
            return (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="!absolute bottom-12 md:bottom-10  flex left-[55%] md:left-[55%] justify-center md:bg-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke={heroBanner[0]?.textColor}
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </IconButton>
            );
          }}
        >
          {heroBanner.map((banner) => (
            <div
              key={banner._id}
              style={{
                backgroundImage: `url(${urlFor(banner.bannerImage)?.url()})`,
                color: banner?.textColor,
              }}
              className="h-full w-full relative bg-cover bg-top md:bg-center bg-no-repeat"
            >
              <div className="absolute top-1/2 md:left-1/2 -translate-y-1/2 md:-translate-x-1/2 md:text-center px-3 md:max-w-[40rem] flex flex-col gap-6">
                {/* <div className="text-xl md:text-3xl lg:text-4xl">Ready to</div> */}
                <div className="-mt-5 md:mt-0">
                  <div className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl md:text-center">
                    {banner?.title}
                  </div>
                  <div className="text-lg font-light">{banner?.subTitle}</div>
                </div>

                {banner?.category && (
                  <div className="">
                    {/* This link directs user to a page with similar products */}
                    <Button
                      onClick={() =>
                        goToCategory({
                          name: banner.category?.name,
                          _id: banner.category?._id,
                        })
                      }
                      className="md:min-w-[10rem] md:min-h-[3rem]"
                    >
                      Shop Now!
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </ThemeProvider>
  );
}
