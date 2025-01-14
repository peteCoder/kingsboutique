import { sanityClient } from "@/lib/client";
import { ProductSanitySchemaResult } from "@/types";
import { CartItems, OrderUserSchemaResult } from "@/types";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const {
    productIds,
    cartItems,
    amount,
    redirectUrl,
    customer: { email, phoneNumber, address, name, country, city, orderNote },
  } = await req.json();

  const session = await getServerSession();

  const userEmail = session?.user?.email;

  const activeUser = (
    await sanityClient.fetch(`*[_type == 'account' && email == '${email}']{
      _id
    }`)
  )[0];
  // console.log(cartItems);

  // Get all the products in cart
  async function getProductsByIds(productIds: Array<string>) {
    const query = `*[_type == 'product' && _id in $ids]`;
    const params = { ids: productIds };
    const result = await sanityClient.fetch(query, params);
    return result;
  }

  const productsOrdered = await getProductsByIds(productIds);

  // console.log(productsOrdered);
  // console.log("userEmail: ", userEmail);

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
      // console.log(cartItems);
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

      // CONTINUE HERE

      

      

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
        // Process Payment gate way
        // console.log("It is done");

        const axiosApi = axios.create({
          baseURL: "https://api.paystack.co",
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        });

        const PaystackMetaData = {
          orderedProductsId: createOrder._id,
          cartItems: cartItems,
        };

        const paystackData = {
          email,
          // You would have to change the value to real value eventually
          amount: 100 * 100,
          metadata: PaystackMetaData,
        };

        const response = await axiosApi.post(
          "/transaction/initialize",
          paystackData
        );

        const derivedData = response.data;
        // Log out the the data from paystack
        console.log(derivedData);

        return NextResponse.json(derivedData, { status: 200 });
      }
    } else {
      return NextResponse.json(
        {
          message: "There must be products in user cart.",
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "You must be authenticated." },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Working" });
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Working" });
}






