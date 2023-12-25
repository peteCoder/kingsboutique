"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { HiOutlineUser } from "react-icons/hi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import GoogleButton from "@/app/cart/_components/buttons/GoogleButton";
import GithubButton from "@/app/cart/_components/buttons/GithubButton";
import { UserProfileDropdown } from "../user-profile-dropdown";
import { useParams } from "next/navigation";


const ProfileLoginDialog = () => {
  // Get the user data from the session upon login
  const { data: session } = useSession();

  const params = useParams();

  return (
    <div>
      {session?.user?.email ? (
        <>
          <UserProfileDropdown />
        </>
      ) : (
        <>
          {/* Login functionality here */}
          <Dialog>
            <DialogTrigger asChild>
              <div className="nav-links">
                <HiOutlineUser size={20} />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md px-2">
              <DialogHeader>
                <DialogTitle className="text-2xl">Login</DialogTitle>
                <DialogDescription>
                  Please login with any of these auth providers.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <GoogleButton />
                  <GithubButton />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ProfileLoginDialog;
