import { OrderUserSchemaResult } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { sanityClient } from "@/lib/client";



export const dynamic = "force-dynamic";


export async function POST(req: NextRequest) {
  const data: OrderUserSchemaResult = await req.json();
  const session = await getServerSession();
  const userEmail = session?.user?.email;

  const { shippingData, userData } = data;
  // Query user account and check if user has shipping data

  const userAccountSanity = (
    await sanityClient.fetch(
      `*[_type == 'account' && email == '${userEmail}']{
        _id,
        shippingDetails->{
          _id,
          customerName,
          phone,
          address,
          orderNote
        },
        
      }`
    )
  )[0];
  if (!userAccountSanity) {
    return NextResponse.json({ message: "User does not exist." });
  }

  if (!userAccountSanity.shippingDetails) {
    //   If user exist but do not have shippingDetails, create it!
    const createShipping = await sanityClient.create({
      _type: "shipping",
      email: userData.email,
      customerName: userData.name,
      address: shippingData.address,
      phone: shippingData.phone,
      city: shippingData.city,
      country: shippingData.country,
      orderNote: shippingData.orderNote,
    });

    // Update the active user with the new shipping details
    await sanityClient
      .patch(userAccountSanity._id)
      .set({
        shippingDetails: { _ref: createShipping._id },
      })
      .commit();

    return NextResponse.json(
      { message: "Created Shipping details" },
      { status: 200 }
    );
  } else {
    // Get the user shipping id from the user
    let userShippingId = userAccountSanity.shippingDetails._id;
    // If there is a different shipping address provided then we need to create a new one and link it to the account
    // Check if there are any changes in the shipping data

    const userShippingDetails = (
      await sanityClient.fetch(
        `*[_type == 'shipping' && _id == '${userShippingId}']`
      )
    )[0];

    await sanityClient
      .patch(userShippingId)
      .set({
        email: userData.email,
        customerName: userData.name,
        address: shippingData.address,
        phone: shippingData.phone,
        city: shippingData.city,
        country: shippingData.country,
        orderNote: shippingData.orderNote,
      })
      .commit();
    return NextResponse.json(
      { message: "Edited Shipping details" },
      { status: 200 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Get the user
  const session = await getServerSession();
  const userEmail = session?.user?.email;

  try {
    const userAccountSanity = (
      await sanityClient.fetch(
        `*[_type == 'account' && email == '${userEmail}']`
      )
    )[0];
    if (userAccountSanity) {
      return NextResponse.json(userAccountSanity, { status: 200 });
    } else {
      return NextResponse.json({}, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}
