import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

export default function Loading() {
  return (
    <section>
      <Skeleton className="w-full h-[70px] rounded-none" />
      <div className="container mt-5">
        <Skeleton className="w-full h-[50vh] mb-4" />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 6 }).map((item, index) => (
            <Skeleton
              key={index}
              className={cn(
                "min-h-[340px] rounded-2xl flex items-center justify-center",
                index === 1 && "md:row-span-2 bg-top",
                index === 3 && "bg-left",
                index === 5 && "md:col-span-2"
              )}
            />
          ))}
        </div>

        <div className="my-6 flex justify-center items-center">
          <Skeleton className=" h-10 w-36" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 3xl:grid-cols-5 gap-2 mt-10">
          {Array.from({ length: 10 }).map((item, index) => (
            <div key={index} className="text-center p-2 sm:p-0">
              <Skeleton className="relative group duration-700 min-h-[300px] md:min-h-[350px] overflow-hidden"></Skeleton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
