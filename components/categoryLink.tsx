"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CategorySanitySchemaResult } from "@/types";
import { useFilter } from "@/hooks/useFilter";

const CategoryLink = ({
  category,
}: {
  category: CategorySanitySchemaResult;
}) => {
  const router = useRouter();

  const filteredData = useFilter();

  const goToCategory = () => {
    // Here set the categoryID
    const _id = category._id;
    // filter by the selected category
    filteredData.addCategory(category);
    // Here navigate the web pag
    router.push("/shop");
  };
  return (
    <div
      key={category._id}
      className="hover:text-primary transition-all duration-300 cursor-pointer"
      onClick={goToCategory}
    >
      {category.name}
    </div>
  );
};

export default CategoryLink;
