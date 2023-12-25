import { sanityClient } from "@/lib/client";
import axios from "axios";
import crypto from "crypto";
import { NextResponse } from "next/server";

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

export async function POST(req: Request) {
  const body = await req.json();

  // Validate event
  const secret = process.env.PAYSTACK_SECRET_KEY as string;

  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(body))
    .digest("hex");

  if (hash == req.headers.get("x-paystack-signature")) {
    // Retrieve the request's body
    const payload = body;

    // Destructure all the data gotten from payload
    // Do something with payload data
    const {
      event,
      data: { status, reference, amount, gateway_response },
    } = payload;
    // Here knock yourself out 😊.
    // If Charge was indeed successful.
    if (
      status === "success" &&
      event === "charge.success" &&
      reference &&
      amount > 0 &&
      gateway_response === "Successful"
    ) {
      console.log("Yehh I have a success");
      console.log("Got an Event webhook");

      // Verify payment after recieiving the webhook from paystack
      const axiosApi = axios.create({
        baseURL: "https://api.paystack.co",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      });
      const response = await axiosApi.get(`/transaction/verify/${reference}`);

      const verifyData = response.data;
      if (
        verifyData.status === true &&
        verifyData.data.status === "success" &&
        verifyData.data.reference === reference
      ) {
        // Update payment status Here

        console.log(verifyData);

        const { orderedProductsId, cartItems } = verifyData?.data?.metadata;

        if (orderedProductsId) {
          try {
            await sanityClient
              .patch(orderedProductsId)
              .set({
                paymentStatus: "Paid",
              })
              .commit();
          } catch (error) {
            console.log(error);
          }
        }

        const getIndividualProduct = async (id: string) => {
          const product = (
            await sanityClient.fetch(`*[_type == 'product' && _id == '${id}']`)
          )[0];
          if (product) {
            return product;
          } else {
            return {};
          }
        };

        if (cartItems.length > 0) {
          // Change the product quantity_availability
          const changeProductAvailability = await Promise.all(
            cartItems.map(async (item: any) => {
              // Get the particular product
              const product = await getIndividualProduct(item._id);
              // Reduce the available quantity by the quantity of this item in the product
              let newQuantityAvailable = product.qty_available - item.qty;
              // If there is not enough stock to cover the order, do not modify the stock
              if (newQuantityAvailable >= 0) {
                await sanityClient
                  .patch(item._id)
                  .set({
                    qty_available: newQuantityAvailable,
                  })
                  .commit();

                if (newQuantityAvailable === 0) {
                  await sanityClient
                    .patch(item._id)
                    .set({
                      is_featured: false,
                    })
                    .commit();
                }
              }
            })
          );
        }

        console.log("------------ VerifyData Working... ----------");
      }
    }

    return NextResponse.json(
      { message: "It worked" },
      { status: 200, headers: corsHeader }
    );
  }
  // Do nothing here if the event hook was not a success.

  return NextResponse.json(
    { message: "Not Successfully" },
    { status: 400, headers: corsHeader }
  );
}

export async function GET(req: Request) {
  return NextResponse.json(
    { message: "Endpoint is working as expected for Paystack." },
    { status: 200 }
  );
}
