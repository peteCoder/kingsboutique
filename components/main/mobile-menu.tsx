"use client";

import { BarChart } from "lucide-react";
import React, { useState } from "react";




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
          <BarChart size={20} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <div className="block">
                {/* <Image
                  className="w-[123.34px] h-[76.98px]"
                  src={"/j-logo-bg-removed.png"}
                  alt="logo"
                  width={1085}
                  height={230}
                /> */}

                <span className="text-primary font-bold text-3xl mt-5">
                  KB&F
                </span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <nav className="h-[100vh] mt-[5rem]">
            {/* For Desktop screens */}
            <ul className="flex flex-col gap-10">
              <li className="!text-left">
                <Link href={"/"} className="nav-links inline-block text-5xl">
                  Home
                </Link>
              </li>
              <li className="!text-left">
                <Link
                  href={"/shop"}
                  className="nav-links inline-block text-5xl text-left"
                >
                  Shop
                </Link>
              </li>
              <li className="!text-left">
                <Link
                  href={"/contact"}
                  className="nav-links inline-block text-left"
                >
                  Contact
                </Link>
              </li>
            </ul>
            {/* For Mobile screens */}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
