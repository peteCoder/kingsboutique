"use client";

import { CategorySanitySchemaResult, ProductSanitySchemaResult } from "@/types";
import ProductCard from "./product-card";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadProductList from "@/app/shop/_components/LoadProductList";

import ScrollAnimation from "react-animate-on-scroll";
// import "animate.css/animate.compat.css";
// import AOS from "aos";
// import "aos/dist/aos.css";

const AllProductsBasedOnCategory = ({ categoryId }: { categoryId: string }) => {
  const [products, setProducts] = useState<ProductSanitySchemaResult[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllProductsBasedOnCategory = async () => {
      if (!hasMounted) return; // Avoid running on server side prerendering
      try {
        setIsLoading(true);
        const response = await fetch(`/api/category/${categoryId}`, {
          next: {revalidate : 0}, cache: "no-cache"
        });
        const categoryProducts = await response.json();

        // console.log("categoryProducts: ", categoryProducts);
        setProducts(categoryProducts);
      } catch (error) {
        console.log("Error loading products for this category", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProductsBasedOnCategory();
  }, [categoryId, hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <LoadProductList numberOfRenderedProducts={5} />;
  }

  return (
    <>
      {isLoading ? (
        <LoadProductList numberOfRenderedProducts={5} />
      ) : (
        <>
          {/* Display in smaller screen */}
          <div className="xl:hidden grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 sm:gap-2">
            {products?.slice(0, 6)?.map((product, i) => (
              <ProductCard key={product?._id} index={i} product={product} />
            ))}
          </div>

          {/* Display in larger screen */}
          <div className="hidden xl:grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 sm:gap-2">
            {products?.slice(0, 8)?.map((product, i) => (
              <ProductCard key={product?._id} index={i} product={product} />
            ))}
          </div>

        </>
      )}
    </>
  );
};

export default AllProductsBasedOnCategory;
