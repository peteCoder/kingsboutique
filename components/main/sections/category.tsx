import React from "react";
import CategoryCard from "../category-card";
import { getCategories } from "@/actions/getCategories";
import { CategorySanitySchemaResult } from "@/types";

const Feature = async () => {
  const categories: CategorySanitySchemaResult[] = await getCategories();

  // console.log(JSON.stringify(categories));
  return (
    <section className="w-full my-10 px-3 lg:container">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-3">
        {categories.slice(0, 6).map((category, i) => (
          <CategoryCard
            key={category._id}
            name={category.name}
            featuredCategory={category}
            index={i}
          />
        ))}
        <div className=""></div>
      </div>
    </section>
  );
};

export default Feature;
