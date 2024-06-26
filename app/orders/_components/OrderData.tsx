"use client";

import IconButton from "@/components/IconButton";
import PriceCurrency from "@/components/PriceCurrency";
import { Any } from "@sanity/client";
import { Minus, Plus, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrderData = ({ orders }: { orders: any }) => {
  const formattedDate = (selectedDate: any) => {
    let date = new Date(selectedDate);
    return date.toDateString();
  };
  console.log(orders);
  return (
    <div>
      {orders.map((order: any) => (
        <div key={order._id}>
          <h2 className="my-5 font-bold text-xl md:text-2xl lg:text-3xl">
            {formattedDate(order._createdAt)}
          </h2>
          <div className="">
            <ul className="w-full space-y-6">
              {order.ordereditems.map((item: any) => (
                <li key={item._id}>
                  <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                    <Image
                      fill
                      src={
                        item?.orderedProduct?.gallery[0]?.imageUrl?.asset
                          ?.url || ""
                      }
                      alt="image"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="absolute z-10 right-0 top-0"></div>
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div className="flex justify-between">
                        <Link
                          href={`/product/${item?.orderedProduct?._id}`}
                          className="text-lg md:text-2xl font-semibold text-black hover:text-primary dark:text-white"
                        >
                          {item?.name}
                        </Link>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{item?.quantity}</p>
                        <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
                          <PriceCurrency value={item?.unitPrice} />
                        </p>
                      </div>
                      <span className="font-bold">Total:</span>
                      <PriceCurrency value={item?.subtotal} />
                    </div>

                    <div className="mt-3 w-full space-y-2">
                      <div className="flex items-center bg-gray-400/20  justify-between w-full rounded-md h-16 p-4">
                        <span className="font-bold">Payment status:</span>{" "}
                        <span>{order?.paymentStatus}</span>
                      </div>
                      <div className="flex items-center bg-gray-400/20  justify-between w-full rounded-md h-16 p-4">
                        <span className="font-bold">Order status:</span>{" "}
                        <span>{order?.orderStatus}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderData;
