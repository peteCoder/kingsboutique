import { sanityClient } from "@/lib/client";
import { SanityClient } from "@sanity/client";

export const getProductDetails = async (productId: string) => {
  const query = `*[_type == 'product' && _id == '${productId}']{
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

  const result = await sanityClient.fetch(query);
  return result;
};
