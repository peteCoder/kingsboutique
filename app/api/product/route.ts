import { sanityClient } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

<<<<<<< HEAD
export const revalidate = 0;
=======
export const dynamic = "force-dynamic";
>>>>>>> e182f41ffe1809ee01f337bde10c5f41fbf0643f

export async function GET(req: NextRequest) {
  try {
    // Here we get our URL (req.url) in a readable browser url format like
    // `/api/product?search=foo&country=bar&product_name=foo&orderOfItems=price%20asc`
    const searchURL = new URL(req.url);

    // console.log(searchURL.href);

    const { searchParams } = searchURL;

    // These are the search query parameters gotten from the URL
    // The searchParams.get() method will return an empty string if
    // the user sends nothing.

    const categoryId = searchParams.get("categoryId");
    const sizeId = searchParams.get("sizeId");
    const colourId = searchParams.get("colourId");
    const searchTerm = searchParams.get("searchTerm");

    // console.log("categoryId", typeof categoryId);

    const query = `*[_type == 'product' && category->_id match $categoryId && (name match $searchTerm || description match $searchTerm) && is_featured == true]{
      _id,
      _updatedAt,
      _createdAt,
      name,
      price,
      is_featured,
      is_archived,
      qty_available,
      description,
      ratings,
      sizes[]->{
            _id,
            name,
            code
      },
      colours[]->{
            _id,
            name,
            code
      },
      category->{
            _id,
            name,
            description,
            bannerImage{
                asset->{
                    url
                }
            }
      },
      gallery[]->{
            _id,
            _updatedAt,
            _createdAt,
            imageUrl {
                asset->{url}
            },
            description
      }
    }`;
    const products = await sanityClient.fetch(query, {
      categoryId: `${categoryId}*`,
      searchTerm: `${searchTerm}*`,
    });

    // If sizeId is provided, filter the products by sizeId
    if (sizeId && !colourId) {
      const filteredProducts = products.filter((product: any) =>
        product?.sizes?.some((size: any) => size._id === sizeId)
      );
      console.log("There is only size");
      // console.log("Filtered Products: ", filteredProducts);
      return NextResponse.json(filteredProducts, { status: 200 });
    }

    // If colourId is provided, filter the products by colourId
    if (colourId && !sizeId) {
      const filteredProducts = products.filter((product: any) =>
        product?.colours?.some((colour: any) => colour._id === colourId)
      );
      console.log("There is only color");
      return NextResponse.json(filteredProducts, { status: 200 });
    }

    if (colourId && sizeId) {
      const filteredProducts = products
        .filter((product: any) =>
          product?.sizes?.some((size: any) => size._id === sizeId)
        )
        .filter((product: any) =>
          product?.colours?.some((colour: any) => colour._id === colourId)
        );
      console.log("There is both size and color");
      return NextResponse.json(filteredProducts, { status: 200 });
    }

    // console.log("All Products: ", products);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
