import { getProductDetails } from "@/actions/getProductDetails";
import { getRelatedProductsByCategory } from "@/actions/getRelatedProductsByCategory";
import DetailPageGallery from "@/components/main/detail-gallery";
import DetailPageInfo from "@/components/main/detail-info";
import ProductCard from "@/components/main/product-card";
import Footer from "@/components/main/sections/footer";
import Navbar from "@/components/main/sections/navbar";
import { ProductSanitySchemaResult } from "@/types";

const ProductDetails = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const productArray = await getProductDetails(productId);
  const product = productArray[0];

  // Related Products are fetched here
  const productsBasedOnCategory: ProductSanitySchemaResult[] =
    await getRelatedProductsByCategory(product?.category?._id);

  const filterOutCurrentProduct = productsBasedOnCategory.filter(
    (productsToFilter) => product._id !== productsToFilter._id
  );

  // console.log(filterOutCurrentProduct);

  return (
    <main>
      <Navbar />
      <div className="p-4">
        <div className="flex gap flex-col md:flex-row gap-3">
          <div className="w-full md:w-1/2 lg:w-2/3">
            <DetailPageGallery product={product} />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <DetailPageInfo data={product} />
          </div>
        </div>

        {/* Related Products */}
        {filterOutCurrentProduct.length > 0 && (
          <div className="mt-5">
            <h2 className="text-2xl md:text-3xl lg:text-4xl">
              Related Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 3xl:grid-cols-5 gap-2">
              {filterOutCurrentProduct?.map((product, i) => (
                <ProductCard key={product._id} index={i} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

    </main>
  );
};

export default ProductDetails;
