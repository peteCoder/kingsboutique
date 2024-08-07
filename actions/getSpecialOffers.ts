import { sanityClient } from "@/lib/client";
import { cache } from "react";

export const getSpecialOffers = cache(async () => {
  const query = `*[_type == 'special_offer']{
        _id,
        _createdAt,
        title,
        subTitle,
        firstBannerImage{
            asset->{
                url
            }
        },
        secondBannerImage{
            asset->{
                url
            }
        },
        
    }`;

  const result = await sanityClient.fetch(query);
  return result;
});
