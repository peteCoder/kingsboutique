"use client";

import { CategorySanitySchemaResult, ProductSanitySchemaResult } from "@/types";
import ProductCard from "./product-card";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadProductList from "@/app/shop/_components/LoadProductList";

const AllProductsBasedOnCategory = ({ categoryId }: { categoryId: string }) => {
  const [products, setProducts] = useState<ProductSanitySchemaResult[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlProductsBasedOnCategory = async () => {
      if (!hasMounted) return; // Avoid running on server side prerendering
      try {
        setIsLoading(true);
        // const response = await axios.get(`/api/category/${categoryId}`);
        // const categoryProducts = response.data;

        const response = await fetch(`/api/category/${categoryId}`, { cache: "no-store" });
        const categoryProducts = await response.json()

        console.log("categoryProducts: ", categoryProducts);
        setProducts(categoryProducts);
      } catch (error) {
        console.log("Error loading products for this category", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlProductsBasedOnCategory();
  }, [categoryId, hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <LoadProductList numberOfRenderedProducts={4} />;
  }

  return (
    <>
      {isLoading ? (
        <LoadProductList numberOfRenderedProducts={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 3xl:grid-cols-5 gap-2">
          {products?.slice(0, 4)?.map((product, i) => (
            <ProductCard key={product?._id} index={i} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default AllProductsBasedOnCategory;
