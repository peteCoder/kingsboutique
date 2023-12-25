import { getOrders } from "@/actions/getOrders";
import Navbar from "@/components/main/sections/navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import OrderData from "./_components/OrderData";
import Footer from "@/components/main/sections/footer";

const OrdersPage = async () => {
  const orders = await getOrders();

  const session = await getServerSession();

  if (!session?.user) {
    return redirect("/cart");
  }

  return (
    <main>
      <Navbar />
      <h2 className="uppercase text-xl md:text-2xl lg:text-4xl text-center mb-4 mt-5"></h2>

      <div className="mb-8 pt-4 px-2 md:container">
        <h2 className="uppercase text-xl md:text-2xl lg:text-4xl text-center mb-4">
          Your Orders
        </h2>
        <div className="flex gap-3 flex-col lg:flex-row mt-20">
          <div className="basis-[100%]">
            <OrderData orders={orders} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default OrdersPage;
