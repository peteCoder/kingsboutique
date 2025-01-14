"use client";

import { BarChart } from "lucide-react";
import React, { useState } from "react";

import { FaBars } from "react-icons/fa";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Shop",
    href: "/shop"
  },
  {
    label: "Contact",
    href: "/contact"
  },

]

const MobileMenu = () => {

  const pathname = usePathname();


  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <FaBars size={22} />
        </SheetTrigger>
        <SheetContent className="p-0">
          <nav className="bg-primary w-full h-full">
            <span className="text-primary top-4 left-4 absolute text-white font-bold text-3xl">
              KB&F
            </span>
            {/* For Desktop screens */}
            <ul className="p-4 text-white flex flex-col gap-8 justify-center h-full">

              {navLinks.map((link) => (
                <li className="!text-left" key={link.label}>
                  <Link href={link.href} className={cn("text-2xl md:text-3xl", pathname === link.href && "text-white underline")}>
                    {link.label}
                  </Link>
                </li>
              ))}
              
            </ul>
            {/* For Mobile screens */}
            <div className="absolute bottom-2 left-0 right-0">
              <div className="flex items-center justify-center flex-wrap gap-4">
                <a
                  className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#ffffff]"
                  href="https://www.facebook.com/profile.php?id=100035665735925"
                >
                  <Image
                    width={33}
                    height={33}
                    // className="w-[13.93px] h-[19.39px]"
                    className="w-[28px] h-[28px]"
                    src="/images/facebook.svg"
                    alt=""
                  />
                </a>
                <a
                  className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#ffffff]"
                  href="https://wa.me/c/2348039591896"
                >
                  <Image
                    width={33}
                    height={33}
                    className="w-[30px] h-[30px]"
                    src="/images/whatsapp.svg"
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
