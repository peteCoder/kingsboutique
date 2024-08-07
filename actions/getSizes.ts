import { sanityClient } from "@/lib/client";
import { cache } from "react";

export const getSizes = cache(async () => {
  const query = `*[_type == 'size']{
    _id,
    name,
    code,
    _updatedAt,
    _createdAt
  }`;

  const result = await sanityClient.fetch(query);
  return result;
});
