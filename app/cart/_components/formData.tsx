"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import GoogleButton from "./buttons/GoogleButton";
import GithubButton from "./buttons/GithubButton";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import BeatLoader from "react-spinners/BeatLoader";
import { useCart } from "@/hooks/useCart";

const CartFormData = () => {
  const { data: session } = useSession();
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const cart = useCart();
  const searchParams = useSearchParams();

  const router = useRouter();

  const goToCheckout = () => {
    setLoadingCheckout(true);
    if (session?.user?.name) {
      setTimeout(() => {
        router.push("/checkout");
      }, 4000);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (
      searchParams.get("success") === "true" ||
      searchParams.get("status") === "completed"
    ) {
      cart.resetCart();
    }
  }, [cart, searchParams]);

  return (
    <div className="sm:px-2 md:px-4 py-2 sm:mx-3 rounded-md">
      {session?.user?.email ? (
        <>
          <div className="space-y-4">
            <div className="text-2xl capitalize">
              Hi {session.user.name}! 👋🏻
            </div>
            <div className="">Meeting you is indeed a pleasure.</div>
            <Button
              onClick={goToCheckout}
              className="w-full h-16 text-lg md:text-xl"
            >
              {loadingCheckout ? (
                <>
                  <BeatLoader size={12} color="#ffffff" />
                </>
              ) : (
                <span className="space-x-1">
                  <span>Proceed to</span>
                  <span>checkout</span>
                </span>
              )}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-5">
            <div className="text-3xl">Hi there! 👋🏻</div>
            <div className="">
              In order fully process your order, we need to have the pleasure of
              meeting you.
            </div>

            <div className="flex flex-col mt-5 mb-5 space-y-3">
              <GoogleButton />
              {/* <GithubButton /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartFormData;
