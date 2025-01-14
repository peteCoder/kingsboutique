"use client";
import React, { SyntheticEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { useUserDetails } from "@/hooks/useUserData";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { useParams } from "next/navigation";

const FlutterwaveButton = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const cart = useCart();
  const userData = useUserDetails();
  const cartItems = cart.cartItems;

  const totalPrice = cart.absoluteTotal();

  console.log(params);

  const onCheckout = async (e: SyntheticEvent<HTMLButtonElement>) => {
    // Send all the required data for the various
    // field for flutterwave payment integration

    e.preventDefault();

    const data = {
      productIds: cartItems.map((item) => item._id),
      cartItems: cartItems,
      amount: totalPrice,
      redirectUrl: `${process.env.NEXT_PUBLIC_URL}/cart`,
      customer: {
        email: userData.details.email,
        phoneNumber: userData.details.phone,
        address: userData.details.address,
        name: `${userData.details.firstName} ${userData.details.lastName}`,
        country: userData.details.country,
        orderNote: userData.details.orderNote,
      },
    };

    try {
      setIsLoading(true);
      const response = await axios.post(`/api/checkout/flutterwave`, data);

      // Here we retrieve a JSON object that has the success attribute
      // We then check if or not the status is true or false
      // If true we should redirect the user to the payment gateway URL
      const retrievedData = response.data;

      // console.log("RETRIEVED DATA", retrievedData);

      // Check if the response was successful or not
      if (retrievedData.status === true) {
        location.href = retrievedData.authorization_url;
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        disabled={isLoading}
        className="w-full h-16 text-lg flex items-center justify-center"
        variant={"outline"}
        onClick={onCheckout}
      >
        {isLoading ? (
          <>
            <div className="dark:hidden block">
              <BeatLoader size={12} color="#000" />
            </div>
            <div className="hidden dark:block">
              <BeatLoader size={12} color="#fff" />
            </div>
          </>
        ) : (
          <Image
            className="h-12 md:h-16 w-auto"
            width={3852}
            height={679}
            src={"/payments/flutterwave.svg"}
            alt="flutterwave"
          />
        )}
      </Button>
    </>
  );
};

export default FlutterwaveButton;
