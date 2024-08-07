import { sanityClient } from "@/lib/client";
import { CartItems, ProductSanitySchemaResult } from "@/types";
import { cache } from 'react'

export const getCartData = cache(async (cartItems: CartItems[]) => {
  const cartItemIds = cartItems.map((cartData) => cartData._id);
  const query = `*[_type == 'product' && _id in '${cartItemIds}']{
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

  const result: ProductSanitySchemaResult[] = await sanityClient.fetch(query);

  const dataToRenderForCart = result.map((productData) => ({
    // Continue here
      name: productData?.name,
      imageUrl: productData?.gallery[0]?.imageUrl,
      price: productData?.price,
      description: productData?.description,
      ratings: productData?.ratings,
  }));

  return dataToRenderForCart;
});
