import React from "react";
import Heading from "@/components/main/heading";
import ProductCard from "@/components/main/product-card";
import { getProducts } from "@/actions/getProducts";
import { CategorySanitySchemaResult, ProductSanitySchemaResult } from "@/types";
import { getCategories } from "@/actions/getCategories";
import { getProductsBasedOnCategory } from "@/actions/getProductsBasedOnCategory";
import AllProductsBasedOnCategory from "../all-products-based-on-category";

const Trending = async () => {
  const categories: CategorySanitySchemaResult[] = await getCategories();

  return (
    <section className="px-2 sm:container">
      <div className="">
        <Heading title={"trending"} subTitle={"top view in this week"} />
      </div>
      {categories.slice(0, 3).map((category) => (
        <div key={category?._id}>
          <h2 className="text-xl font-bold my-6 text-[#3b3b3b] dark:text-white">
            {category?.name}
          </h2>
          <AllProductsBasedOnCategory categoryId={category?._id} />
        </div>
      ))}
    </section>
  );
};

export default Trending;
