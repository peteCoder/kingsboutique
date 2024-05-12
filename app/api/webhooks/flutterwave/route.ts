import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/client";
import CategoryCard from "@/components/main/category-card";

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

export async function POST(req: Request) {
  // Validate event
  const secret = process.env.FLUTTERWAVE_SECRET_KEY as string;

  const signature = req.headers.get("verif-hash");

  if (!signature || signature !== secret) {
    // This request isn't from Flutterwave; discard
    console.log("Something wrong happened");
    return NextResponse.json(
      { message: "Not Successfull" },
      { status: 401, headers: corsHeader }
    );
  }

  console.log("SECRET: ", secret);
  console.log("SIGNATURE: ", signature);

  const payload = await req.json();
  // Checking the events comming in to know what action to take
  console.log("PAYLOAD: ", payload);

  const getProduct = async (id: string) => {
    const product = await sanityClient.fetch(
      `*[_type == 'product' && _id == '${id}']`
    );

    return product[0];
  };

  if (payload?.event === "charge.completed") {
    if (payload?.data?.id) {
      // Verify if the payment was successful
      // If the the payment was successful, mark the sanity order to be paid

      const metaData = payload?.meta_data;

      // Retrieve the order id from the name of the customer
      if (metaData) {
        const orderId = metaData?.products_order_id;

        const customerId = metaData?.customer_id;
        const cartProductIDsSerialized = metaData?.productIds;

        // Transforms string serialized array to real array
        const productsIDs = JSON.parse(cartProductIDsSerialized);

        const cartItems = await Promise.all(
          productsIDs.map(async (_id: string) => await getProduct(_id))
        );

        // Update the paymentStatus of the order to Paid
        if (orderId) {
          try {
            await sanityClient
              .patch(orderId)
              .set({
                paymentStatus: "Paid",
              })
              .commit();
          } catch (error) {
            console.log(error);
          }
        }

        if (cartItems.length > 0) {
          // Change the product quantity available
          const changeProductAvailability = await Promise.all(
            cartItems.map(async (item: any) => {
              // Get the particular product
              const product = await getProduct(item._id);
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
      }
    }

    // Send the request to verify payment
    console.log("PAYMENT OR TRANSACTION EXISTS");
  } else {
    // Else, do not modify the order payment status -- Do nothing
    console.log(
      "PAYMENT OR TRANSACTION DOES NOT EXIST -- PAYLOAD NOT COMING IN"
    );
  }

  return NextResponse.json(
    { message: "It worked", payload },
    { status: 200, headers: corsHeader }
  );
}

export async function GET(req: Request) {
  return NextResponse.json(
    { message: "Endpoint is working as expected for Flutterwave" },
    { status: 200, headers: corsHeader }
  );
}
