import { CartClient } from "./_components/CartClient";

import type { Metadata } from "next";

export const revalidate = 3600; // revalidate the data at most every hour


export const metadata: Metadata = {
  title: "Cart",
  description: "Best Fashion and Accessories store and collections",
}


const CartPage = () => {
  return (
    <>
      <CartClient />
    </>
  )
};

export default CartPage;
