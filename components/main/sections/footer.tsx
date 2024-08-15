import React from "react";
import Link from "next/link";
import { getCategories } from "@/actions/getCategories";
import { CategorySanitySchemaResult } from "@/types";
import CategoryLink from "@/components/categoryLink";

const Footer = async () => {
  const categories: CategorySanitySchemaResult[] = await getCategories();

  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed py-[60px] md:px-10 px-[16px] w-full min-h-[40vh] bg-muted dark:bg-muted mt-7"
    >
      <div className="max-w-[1145px] mx-auto flex justify-center items-center">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          {/* First Section --- Logo */}
          <div className="">
            <div className="">
              <h2 className="text-black dark:text-white text-[18px] font-[700]">
                About us
              </h2>
              <p className="max-w-[255px] pt-3 font-[300] text-[15px] md:text-[16px]  text-black dark:text-white">
                We offer the best sales in regards to accessories.
              </p>
            </div>
          </div>

          {/* Second Section */}
          <div className="flex gap-[2rem] flex-wrap lg:ml-auto">
            <div className="space-y-8">
              <h2 className="text-black dark:text-white text-[18px] font-bold">
                Categories
              </h2>
              <div className="text-black uppercase dark:text-white text-[15px] md:text-[16px]  bold-[300] flex flex-col space-y-2">
                {categories.slice(0, 6).map((category) => (
                  <CategoryLink key={category._id} category={category} />
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-black dark:text-white text-[18px] font-bold">
                Quick Links
              </h2>
              <div className="text-black dark:text-white text-[15px] md:text-[16px]  bold-[300] flex flex-col space-y-2">
                <Link
                  className="hover:text-black dark:text-white transition-all duration-300"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="hover:text-black dark:text-white transition-all duration-300"
                  href="/shop"
                >
                  Shop
                </Link>
                <Link
                  className="hover:text-black dark:text-white transition-all duration-300"
                  href="/contact"
                >
                  Contact
                </Link>
                <Link
                  className="hover:text-black dark:text-white transition-all duration-300"
                  href="/policy"
                >
                  Pravacy Policy
                </Link>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-black dark:text-white text-[18px] font-bold">
                Connect Us
              </h2>
              <div className="text-black dark:text-white text-[15px] md:text-[16px]  bold-[300] flex flex-col space-y-6">
                
                

                <Link
                  className="hover:text-black dark:text-white transition-all duration-300"
                  href="mailto:kingsboutique1000@gmail.com"
                >
                  kingsboutique1000@gmail.com
                </Link>

                
                <div className="mt-4">
                  <p className="font-bold">Locations: </p>
                  
                  <div 
                    className="hover:text-black dark:text-white transition-all duration-300 flex flex-col mt-2"
                  >
                    <p>Benin</p>
                    <p>Auchi</p>
                    <p>Lagos</p>
                    <p>Abuja</p>
                  </div>
                  
                </div>
                <div className="mt-4">
                  <p
                    className="hover:text-black dark:text-white transition-all duration-300 "
                  >
                    (+234)-8039591896
                  </p>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-[5rem] md:mt-[4rem] text-black dark:text-white font-[300] text-[15px] md:text-[16px] ">
        <p>Copyright 2023 • All rights reserved • KB&F</p>
      </div>
    </div>
  );
};

export default Footer;
