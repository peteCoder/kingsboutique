import { sanityClient } from "@/lib/client";
import { SanityClient } from "@sanity/client";

export const getSpecialOffers = async () => {
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
};
