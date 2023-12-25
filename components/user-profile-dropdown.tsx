"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


import { CiShoppingCart } from "react-icons/ci";

import { MdOutlineStorefront } from "react-icons/md";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { GrFavorite } from "react-icons/gr";
import { Button } from "./ui/button";

export function UserProfileDropdown() {
  // Get the user data from the session upon login
  const { data: session } = useSession();

  // URL Path Parameters
  const pathname = usePathname();

  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {!pathname.includes("/favourites") && (
          <DropdownMenuItem
            onClick={() => router.push("/favourites")}
            className="space-x-1 flex items-center"
            asChild
          >
            <div>
              <GrFavorite size={18} />
              <span>Wishlist</span>
            </div>
          </DropdownMenuItem>
        )}
        {!pathname.includes("/orders") && (
          <>
            <DropdownMenuItem
              onClick={() => router.push("/orders")}
              className="space-x-1 flex items-center"
              asChild
            >
              <div>
                <MdOutlineStorefront size={18} />
                <span>My Orders</span>
              </div>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
