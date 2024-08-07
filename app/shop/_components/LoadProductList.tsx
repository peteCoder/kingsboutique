import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadProductList = ({
  numberOfRenderedProducts = 8,
}: {
  numberOfRenderedProducts?: number;
}) => {
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-5 gap-2 mt-10 mb-5">
     <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 sm:gap-2 mt-4"> 
      {Array.from({ length: numberOfRenderedProducts }).map((item, index) => (
        <div key={index} className="text-center p-1 sm:p-0">
          <Skeleton className="relative group duration-700 min-h-[300px] md:min-h-[350px] overflow-hidden"></Skeleton>
        </div>
      ))}
    </div>
  );
};

export default LoadProductList;
