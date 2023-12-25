import { sanityClient } from "@/lib/client";

export const getHeroBanners = async () => {
  const query = `*[_type == 'hero_banner']{
      _id,
      _createdAt,
      _updatedAt,
        title,
        subTitle,
        textColor,
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
        bannerImage{
            asset->{
                url
            }
        },
        
    }`;

  const result = await sanityClient.fetch(query);

  return result;
};
