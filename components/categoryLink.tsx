"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CategorySanitySchemaResult } from "@/types";
import Link from "next/link";
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
      className="hover:text-white transition-all duration-300 cursor-pointer"
      onClick={goToCategory}
    >
      {category.name}
    </div>
  );
};

export default CategoryLink;

// <Link
//   key={category._id}
//   className="hover:text-white transition-all duration-300"
//   href="/shop"
// >
//   {category.name}
// </Link>
