import { sanityClient } from "@/lib/client";

export const getColour = async () => {
  const query = `*[_type == 'colour']{
    _id,
    name,
    code,
    _updatedAt,
    _createdAt
  }`;

  const result = await sanityClient.fetch(query);
  return result;
};
