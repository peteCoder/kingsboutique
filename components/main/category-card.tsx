"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { CategorySanitySchemaResult } from "@/types";
import { urlFor } from "@/lib/client";
import { useFilter } from "@/hooks/useFilter";
import { useRouter } from "next/navigation";

interface CategoryProps {
  name: string;
  index: number;
  featuredCategory: CategorySanitySchemaResult;
}

const CategoryCard: React.FC<CategoryProps> = ({
  name,
  featuredCategory,
  index,
}) => {
  const router = useRouter();
  const filteredData = useFilter();

  const goToCategory = (category: { _id: string; name: string }) => {
    filteredData.addCategory(category);
    if (category._id && category.name) {
      router.push(`/shop`);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${urlFor(featuredCategory?.bannerImage).url()})`,
      }}
      className={cn(
        "min-h-[340px] bg-center bg-no-repeat bg-cover rounded-2xl flex items-center justify-center bg-[#f1f5f9]",
        index === 1 && "md:row-span-2 bg-top",
        index === 3 && "bg-left",
        index === 5 && "md:col-span-2"
      )}
    >
      <Button
        onClick={() =>
          goToCategory({
            _id: featuredCategory._id,
            name: featuredCategory.name,
          })
        }
        className="bg-white/60 text-black hover:text-white min-w-[120px] min-h-[50px] uppercase text-lg"
      >
        {name}
      </Button>
    </div>
  );
};

export default CategoryCard;
