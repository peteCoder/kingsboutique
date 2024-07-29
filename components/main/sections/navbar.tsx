"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import MobileMenu from "../mobile-menu";
import CartDropdown from "../cart-dropdown";

import { useSession } from "next-auth/react";
import ProfileLoginDialog from "../profile-login-dialog";
import { GrFavorite } from "react-icons/gr";
import { usePathname, useRouter } from "next/navigation";
import CartDropdownForDesktop from "../cart-dropdown-desktop";
import { ThemeModeToggle } from "@/components/theme-dropdown";
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
    label: "Contact Us",
    href: "/contact"
  },

]

const Navbar = () => {
  // Get the user data from the session upon login
  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();


  return (
    <header className="">
      {/* #0COA09 */}
      {/* For Desktop screens */}
      <div className="border-b top-0 left-0 fixed right-0 bg-white dark:bg-[#0C0A09] z-[20]">
        <div className="md:container mx-auto">
          <div className="md:flex md:items-center py-4 px-4">
            {/* Logo */}
            <div className="w-[127.34px] hidden md:block">
              <span className="text-primary font-bold text-3xl mt-5">KB&F</span>
            </div>
            {/* Nav Items */}
            <nav className="flex-1">
              {/* For Desktop screens */}
              <ul className="hidden md:flex items-center md:space-x-4">
                {navLinks.map((link) => (
                  <li>
                  <Link href={link.href} className={cn("nav-links", pathname === link.href && "text-primary")}>
                    {link.label}
                  </Link>
                </li>
                ))}
              </ul>
              {/* For Mobile screens */}
            </nav>

            {/* Nav Icons */}
            <div className="flex items-center text-[14px] justify-between md:gap-2">
              <div className="block md:hidden nav-links">
                {/* Here is the mobile menu trigger */}
                <MobileMenu />
              </div>
              {/* Add search later */}
              {!session?.user?.email && (
                <Button
                  variant={"link"}
                  onClick={() => router.push("/favourites")}
                >
                  <GrFavorite size={18} />
                </Button>
              )}
              <ProfileLoginDialog />
              {/* This should be hidden for smaller screen device */}
              <ThemeModeToggle />
              <div className="hidden md:block">
                <CartDropdown />
              </div>
              <div className="block md:hidden">
                <CartDropdownForDesktop />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[70px]"></div>
      <div className="w-full h-10 mt-4 flex justify-center items-center  md:hidden">
        <span className="text-primary font-bold text-3xl mt-5">KB&F</span>
      </div>
    </header>
  );
};

export default Navbar;
