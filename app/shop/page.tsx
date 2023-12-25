"use client";
import Navbar from "@/components/main/sections/navbar";
import React, { useState } from "react";
import FilterSidebar from "./_components/FilterSidebar";
import ProductsList from "./_components/ProductsList";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { TbFilters } from "react-icons/tb";
import Footer from "@/components/main/sections/footer";

const Shop = () => {
  const [filterSideOpen, setFilterSideOpen] = useState(false);

  return (
    <main>
      <Navbar />

      <div className="lg:container">
        <div className="grid grid-cols-4">
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>
          {/* Nav filter */}
          <div
            className={cn(
              "fixed top-0 left-0 w-[85%] sm:w-[300px] block lg:hidden bg-white h-screen z-[4000] shadow-md -translate-x-[100%] duration-700",
              filterSideOpen ? "translate-x-0" : "-translate-x-[100%]"
            )}
          >
            <div
              onClick={() => setFilterSideOpen(false)}
              className="border-b py-4  md:px-2 flex items-center justify-between text-gray-800"
            >
              <span>Close</span>
              <span className="text-xl cursor-pointer">x</span>
            </div>
            <FilterSidebar />
          </div>
          <div className="col-span-4 lg:col-span-3">
            <Button
              variant={"link"}
              onClick={() => setFilterSideOpen((prev) => !prev)}
              className="flex items-center lg:hidden text-primary text-[18px] !p-0"
            >
              <TbFilters size={30} className="" />
              Filter
            </Button>
            <ProductsList />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;
