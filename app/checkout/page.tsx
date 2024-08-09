import Navbar from "@/components/main/sections/navbar";
import React from "react";
import FormData from "./_components/formData";
import OrderSummary from "./_components/orderSummary";
import { getServerSession } from "next-auth";
import { sanityClient } from "@/lib/client";
import { UserShippingDataForCheckoutForm } from "@/types";
import { redirect } from "next/navigation";
import Footer from "@/components/main/sections/footer";

import type { Metadata } from "next";

export const revalidate = 3600; // revalidate the data at most every hour


export const metadata: Metadata = {
  title: "Checkout",
  description: "Best Fashion and Accessories store and collections",
}

const CheckoutPage = async () => {
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  // const userEmail = undefined;

  const userShippingDataSanity = (
    await sanityClient.fetch(`*[_type == 'account' && email == '${userEmail}']{
      shippingDetails->{
        _id,
        email,
        customerName,
        phone, city, country,address, orderNote
      }
    }`)
  )[0];

  const shippingDetails: UserShippingDataForCheckoutForm =
    userShippingDataSanity?.shippingDetails;

  if (!session?.user) {
    return redirect("/cart");
  }

  return (
    <main>
      <Navbar />
      <div className="pt-4 px-2 md:container mb-10">
        <h2 className="uppercase text-xl md:text-2xl lg:text-4xl text-center my-4">
          CHECKOUT
        </h2>
        <div className="flex gap-3 flex-col-reverse lg:flex-row mt-20">
          <div className="basis-[100%] lg:basis-1/2">
            <FormData shippingDetails={shippingDetails} />
          </div>
          <div className="basis-[100%] lg:basis-1/2">
            <OrderSummary />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CheckoutPage;
