import { sanityClient } from "@/lib/client";

export const getSizes = async () => {
  const query = `*[_type == 'size']{
    _id,
    name,
    code,
    _updatedAt,
    _createdAt
  }`;

  const result = await sanityClient.fetch(query);
  return result;
};
