"use client";

import { BarChart } from "lucide-react";
import React, { useState } from "react";

import { FaBars } from "react-icons/fa";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

import Image from "next/image";

const MobileMenu = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <FaBars size={25} />
        </SheetTrigger>
        <SheetContent className="p-0">
          <nav className="bg-primary w-full h-full">
            <span className="text-primary top-4 left-4 absolute text-white font-bold text-3xl">
              KB&F
            </span>
            {/* For Desktop screens */}
            <ul className="p-4 text-white flex flex-col gap-8 justify-center h-full">
              <li className="!text-left">
                <Link href={"/"} className="text-2xl md:text-3xl">
                  Home
                </Link>
              </li>
              <li className="!text-left">
                <Link href={"/shop"} className="text-2xl md:text-3xl">
                  Shop
                </Link>
              </li>

              <li className="!text-left">
                <Link href={"/contact"} className="text-2xl md:text-3xl">
                  Contact
                </Link>
              </li>
            </ul>
            {/* For Mobile screens */}
            <div className="absolute bottom-2 left-0 right-0">
              <div className="flex items-center justify-center flex-wrap gap-4">
                <a
                  className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#ffffff]"
                  href="https://www.facebook.com"
                >
                  <Image
                    width={33}
                    height={33}
                    className="w-[8.93px] h-[14.39px]"
                    src="/images/facebook.png"
                    alt=""
                  />
                </a>
                <a
                  className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#ffffff]"
                  href="https://www.instagram.com"
                >
                  <Image
                    width={33}
                    height={33}
                    className="w-[13px] h-[13px]"
                    src="/images/instagram.png"
                    alt=""
                  />
                </a>
                <a
                  className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#ffffff]"
                  href="https://www.twitter.com"
                >
                  <Image
                    width={33}
                    height={33}
                    className="w-[14.29px] h-[11.69px]"
                    src="/images/twitter.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
