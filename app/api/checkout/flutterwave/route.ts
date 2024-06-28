import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/client";
import { ProductSanitySchemaResult } from "@/types";
import { CartItems, OrderUserSchemaResult } from "@/types";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const {
      productIds,
      cartItems,
      amount,
      redirectUrl: redirect_url,
      customer: { email, phoneNumber, address, name, country, city, orderNote },
    } = await req.json();

    // Static variables
    const tx_ref = uuidv4().split("-").join("");
    const customer_id = uuidv4().split("-").join("");
    const nameOfBusiness = "Kings Boutique and Fashion";
    const currency = "NGN";
    const businessLogo =
      "https://res.cloudinary.com/dulduri72/image/upload/b_rgb:333B4C/v1719569900/JUDITHLOGO_iaigcw.png";

    const session = await getServerSession();

    const userEmail = session?.user?.email;

    const activeUser = (
      await sanityClient.fetch(`*[_type == 'account' && email == '${email}']{
      _id
    }`)
    )[0];

    // Get all the products in cart
    const getProductsByIds = async (productIds: Array<string>) => {
      const query = `*[_type == 'product' && _id in $ids]`;
      const params = { ids: productIds };
      const result = await sanityClient.fetch(query, params);
      return result;
    };

    const productsOrdered = await getProductsByIds(productIds);

    if (activeUser && userEmail) {
      const createShipping = await sanityClient.create({
        _type: "shipping",
        email: email,
        customerName: name,
        address: address,
        phone: phoneNumber,
        city: city,
        country: country,
        orderNote: orderNote,
      });

      if (productsOrdered) {
        // Create OrderItems
        const createdOrderItems = await Promise.all(
          cartItems.map(async (item: any) => {
            const document = await sanityClient.create({
              _type: "ordereditem",
              name: item.name,
              orderedProduct: { _type: "reference", _ref: item._id },
              quantity: item.qty,
              unitPrice: item.price,
              subtotal: item.totalPrice,
              size: item.sizeId
                ? { _type: "reference", _ref: item.sizeId }
                : undefined,
              colour: item.colourId
                ? { _type: "reference", _ref: item.colourId }
                : undefined,
            });
            return document;
          })
        );

        const totalAmount = cartItems.reduce(
          (sum: number, item: any) => sum + item.totalPrice,
          0
        );

        // Create Order

        const createOrder = await sanityClient.create({
          _type: "order",
          ordereditems: createdOrderItems.map((item) => ({
            _key: item._id,
            _ref: item._id,
          })),
          customerName: `${name}`,
          user: { _ref: activeUser._id },
          totalAmount,
          orderDate: new Date(),
          shippingDetails: { _ref: createShipping._id },
          paymentStatus: "Pending",
          orderStatus: "Processing",
        });

        if (createOrder) {
          try {
            const response = await axios.post(
              "https://api.flutterwave.com/v3/payments",
              {
                tx_ref,
                amount: amount,
                currency,
                redirect_url,
                meta: {
                  products_order_id: createOrder._id,
                  customer_id: activeUser._id,
                  // Getting all the product ids for items in cart
                  // To be used in the webhook
                  productIds: JSON.stringify(
                    cartItems.map((item: ProductSanitySchemaResult) => item._id)
                  ),
                },
                customer: {
                  email,
                  phonenumber: phoneNumber,
                  // Since we do not have meta data coming in in our webhook
                  // We would need to update the products so how
                  // So we are sending in the cartItems data as a serialized array
                  // in the name parameter
                  name: `${name}`,
                },
                customizations: {
                  // Business's name
                  title: nameOfBusiness,
                  // Business's logo
                  logo: businessLogo,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
                },
              }
            );

            const data = await response.data;

            return NextResponse.json(
              { authorization_url: data.data.link, productIds, status: true },
              { headers: corsHeader }
            );
          } catch (error) {
            console.log(error);
            return NextResponse.json(
              { error: "From flutterwave" },
              { headers: corsHeader, status: 500 }
            );
          }
        }
      } else {
        return NextResponse.json(
          {
            message: "There must be products in user cart.",
          },
          { status: 400, headers: corsHeader }
        );
      }
    } else {
      return NextResponse.json(
        { message: "You must be authenticated." },
        { status: 400, headers: corsHeader }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something wrong happened" },
      { status: 500, headers: corsHeader }
    );
  }

  return NextResponse.json({ message: "Working", headers: corsHeader });
}

export async function GET(req: Request) {
  return NextResponse.json({ message: "Working" });
}
