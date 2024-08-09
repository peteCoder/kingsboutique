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

export default async function sitemap({
    _id,
  }: {
    _id: string
  }): Promise<MetadataRoute.Sitemap> {
    
    const products: ProductSanitySchemaResult[] = await getProducts();

    return products.map((product) => ({
      url: `${BASE_URL}/product/${_id}`,
      lastModified: product._createdAt,
    }))
  }
