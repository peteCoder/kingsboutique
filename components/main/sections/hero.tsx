import React from "react";
import { CarouselTransition } from "../hero-carousel";
import { getHeroBanners } from "@/actions/getHeroBanner";
import { HeroBannerSchemaResult } from "@/types";

const Hero = async () => {
  const heroBanner: HeroBannerSchemaResult[] = await getHeroBanners();

  // console.log(heroBanner);

  // console.log(JSON.stringify(heroBanner));
  return <CarouselTransition heroBanner={heroBanner} />;
};

export default Hero;
