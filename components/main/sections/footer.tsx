import React from "react";
import Link from "next/link";
import { getCategories } from "@/actions/getCategories";
import { redirect } from "next/navigation";
import { CategorySanitySchemaResult } from "@/types";
import Image from "next/image";
import CategoryLink from "@/components/categoryLink";

const Footer = async () => {
  const categories: CategorySanitySchemaResult[] = await getCategories();

  return (
    <div
      style={
        {
          // backgroundImage: `url('/j-logo-bg-removed-2.png')`,
          // backgroundBlendMode: "multiply",
        }
      }
      className="bg-cover bg-center bg-no-repeat bg-fixed py-[60px] md:px-10 px-[16px] w-full min-h-[40vh] bg-muted dark:bg-muted mt-7"
    >
      <div className="max-w-[1145px] mx-auto flex justify-center items-center">
        <div className="w-full flex flex-col lg:flex-row gap-8">
          {/* First Section --- Logo */}
          <div className="">
            {/* <Image width={500} height={400} className="h-[30px]" src="/images/logo.png" alt="" /> */}
            <div className="">
              <h2 className="text-black dark:text-white text-[18px] font-[700]">
                About us
              </h2>
              <p className="max-w-[255px] pt-3 font-[300] text-[16px] text-black dark:text-white">
                We offer the best sales in regards to accessories.
              </p>
            </div>
          </div>

          {/* Second Section */}
          <div className="flex gap-[5rem] flex-wrap lg:ml-auto">
            <div className="space-y-8">
              <h2 className="text-black dark:text-white text-[18px] font-[700]">
                Categories
              </h2>
              <div className="text-black dark:text-white text-[16px] bold-[300] flex flex-col space-y-2">
                {categories.slice(0, 6).map((category) => (
                  <CategoryLink key={category._id} category={category} />
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-black dark:text-white text-[18px] font-[500]">
                Quick Links
              </h2>
              <div className="text-black dark:text-white text-[16px] bold-[300] flex flex-col space-y-2">
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
              <h2 className="text-black dark:text-white text-[18px] font-[500]">
                Connect Us
              </h2>
              <div className="text-black dark:text-white text-[16px] bold-[300] flex flex-col space-y-2">
                <Link
                  className="hover:text-black dark:text-white transition-all duration-300"
                  href="/"
                >
                  {/* support@kingsboutique.store */}
                  Kingboutique1000@gmail.com
                </Link>
                <Link
                  className="hover:text-black dark:text-white transition-all duration-300"
                  href="/"
                >
                  +2348039591896
                </Link>
                <Link
                  className="hover:text-black dark:text-white transition-all duration-300"
                  href="/"
                >
                  Benin, Lagos, Abuja
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-[5rem] md:mt-[4rem] text-black dark:text-white font-[300] text-[16px]">
        <p>Copyright 2023 • All rights reserved • KB&F</p>
      </div>
    </div>
  );
};

export default Footer;
