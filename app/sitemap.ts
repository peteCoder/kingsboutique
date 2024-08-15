import { getProducts } from '@/actions/getProducts';
import { ProductSanitySchemaResult } from '@/types';
import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_URL;

export async function generateSitemaps() {
    const products: ProductSanitySchemaResult[] = await getProducts();
    const productsId = products.map(product => ({_id: product._id}));
  // Fetch the total number of products and calculate the number of sitemaps needed
  return productsId;
}
 
export default function sitemap(): MetadataRoute.Sitemap {

  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/favourites`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/cart`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/orders`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/policy`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/shop`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/product`,
      lastModified: new Date(),
    },
  ]
}


