import { sanityClient } from "@/lib/client";
import { cache } from "react";

export const getColour = cache(async () => {
  const query = `*[_type == 'colour']{
    _id,
    name,
    code,
    _updatedAt,
    _createdAt
  }`;

  const result = await sanityClient.fetch(query);
  return result;
});
