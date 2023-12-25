import { sanityClient } from "@/lib/client";

export const getCategories = async () => {
  const query = `*[_type == 'category']{
    _id,
    _updatedAt,
    _createdAt,
    name,
    description,
    bannerImage{
        asset->{
            url
        }
    },

  }`;

  const result = await sanityClient.fetch(query);
  return result;
};
