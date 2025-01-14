import { Metadata } from "next";
import { getProductDetails } from "@/actions/getProductDetails";
import { getRelatedProductsByCategory } from "@/actions/getRelatedProductsByCategory";
import DetailPageGallery from "@/components/main/detail-gallery";
import DetailPageInfo from "@/components/main/detail-info";
import ProductCard from "@/components/main/product-card";
import Footer from "@/components/main/sections/footer";
import Navbar from "@/components/main/sections/navbar";
import { ProductSanitySchemaResult } from "@/types";
import { notFound } from "next/navigation";


export const revalidate = 0;

// export const metadata: Metadata = {
//   // title: {
//   //   absolute: "Home",
//   // },
//   title: "Home",
//   description: "Best Fashion and Accessories store",
// }

interface Params {
  params: {
    productId: string
  }
}

export async function generateMetadata({params: { productId }}: Params): Promise<Metadata | undefined>{
  const productArray: ProductSanitySchemaResult[] = await getProductDetails(productId);
  const product = productArray[0];

  const productFirstImage = product?.gallery[0]?.imageUrl?.asset?.url;

  if (!product) {
    return notFound();
  }

  return {
    title: `${product.name}`,
    description: `${product.description ? product.description : "We offer the best " + product.name + " for sales."}`,
    openGraph: {
      title: `${product.name}`,
      description: `${product.description ? product.description : "We offer the best " + product.name + " for sales."}`,
      type: "website",
      locale:"en_US",
      url: `${process.env.NEXT_PUBLIC_URL}/product/${product._id}/`,
      siteName: "Kings Boutiques",
      images: [
        {
          url: productFirstImage ? productFirstImage : "",
          width: 700,
          height: 700
        }
      ]
    }
  }
}

const ProductDetails = async ({
  params: { productId },
}: Params) => {
  const productArray = await getProductDetails(productId);
  const product = productArray[0];

  // Related Products are fetched here
  const productsBasedOnCategory: ProductSanitySchemaResult[] =
    await getRelatedProductsByCategory(product?.category?._id);

  const filterOutCurrentProduct = productsBasedOnCategory.filter(
    (productsToFilter) => product._id !== productsToFilter._id
  );

  return (
    <main>
      <Navbar />
      <div className="p-2 md:container mt-5">
        <div className="flex gap flex-col md:flex-row gap-3 mb-10">
          <div className="w-full md:w-1/2">
            <DetailPageGallery product={product} />
          </div>
          <div className="w-full md:w-1/2">
            <DetailPageInfo data={product} />
          </div>
        </div>

        {/* Related Products */}
        {filterOutCurrentProduct.length > 0 && (
          <div className="mt-5">
            <h2 className="text-[1rem] sm:text-xl md:text-2xl mt-4 mb-5 font-extrabold">
              Find Related Products
            </h2>

            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-1">
              {filterOutCurrentProduct?.slice(0, 8)?.map((product, i) => (
                <ProductCard key={product._id} index={i} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default ProductDetails;
