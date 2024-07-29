"use client";
import Navbar from "@/components/main/sections/navbar";
import React, { useCallback, useEffect, useState } from "react";
import FilterSidebar from "./_components/FilterSidebar";
import ProductsList from "./_components/ProductsList";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { TbFilters } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useSearch, useSearchPlaceholder } from "@/hooks/useSearch";
import debounce from "lodash/debounce";



const SearchBarComponent = ({
  setFilterSideOpen
}: {
  setFilterSideOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  const searching = useSearch();
  const searchingPlaceholder = useSearchPlaceholder();

  const searchTerm = searching.search.searcTerm;
  const searchPlaceholderTerm = searchingPlaceholder.search.searcTerm;

  const debouncedSearch = useCallback(
    debounce((value) => {
      searching.setSearchTerm(value);
    }, 4000),
    []
  );

  const handleShopGlobalSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    searchingPlaceholder.setSearchTerm(value);
    debouncedSearch(value);
  };
  return (
    <>
      <div className="flex md:items-center gap-3 flex-col md:flex-row justify-center  mx-auto">
        <div className="flex item-center md:flex-row-reverse flex-row w-full">
          <div className="relative w-full">
            {searchPlaceholderTerm && (
              <X onClick={() => {
                searching.removeSearchTerm();
                searchingPlaceholder.removeSearchTerm();
              }} className="h-5 w-5 text-black dark:text-white absolute right-1 md:right-2 top-1/2 -translate-y-1/2 " />
            )}
            <Input onChange={handleShopGlobalSearch} value={searchPlaceholderTerm} placeholder="Search..." className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none focus-within:outline-none focus:outline-none w-full" />
          </div>
          <Button
            variant={"link"}
            onClick={() => setFilterSideOpen((prev) => !prev)}
            className="flex items-center lg:hidden bg-border border  min-w-10 sm:min-w-16 rounded-r-2xl rounded-none px-7 text-primary text-[18px] !p-0"
          >
            <TbFilters size={28} className="" />
            
          </Button>
        </div>
        

      </div>
    </>
  )
}

const Shop = () => {
  const [filterSideOpen, setFilterSideOpen] = useState(false);

  useEffect(() => {
    if (filterSideOpen) {
      window.document.body.classList.add("no_scroll");
    } else {
      window.document.body.classList.remove("no_scroll");
    }

  }, [filterSideOpen])

  return (
    <main>
      <Navbar />
      <div className="xl:container !px-1">
        <div className="grid grid-cols-4">
          <div className="hidden lg:block relative ">
            <div className="top-0 left-0 right-0 bottom-0 sticky pt-1 border-r">
                <div className=" h-screen overflow-y-auto pt-4">
                  <div className="pr-2 mt-6 pt-10 pb-4">
                    <SearchBarComponent setFilterSideOpen={setFilterSideOpen} />
                  </div>
                  
                  <FilterSidebar />
                </div>
            </div>
          </div>
          {/* Nav filter */}
          <div
            onClick={() => setFilterSideOpen(false)}
            className={cn(
              "overlay lg:hidden z-[3000] bg-white dark:bg-muted w-full min-h-screen  fixed top-0 left-0 opacity-50 backdrop-blur-md duration-300",
              filterSideOpen ? "visible" : "invisible"
            )}
          ></div>
          <div
            className={cn(
              "fixed top-0 left-0 w-[85%] sm:w-[300px] block lg:hidden bg-white dark:bg-muted z-[4000] shadow-md -translate-x-[100%] duration-700",
              filterSideOpen ? "translate-x-0" : "-translate-x-[100%]"
            )}
          >
            <div
              onClick={() => setFilterSideOpen(false)}
              className="top-0 left-0 right-0 sticky border-b py-4  md:px-2 flex items-center justify-between text-gray-800 dark:text-white px-3 font-bold"
            >
              <span></span>
              <X className="h-6 w-6 text-black dark:text-white" />
            </div>
            <div className="overflow-y-auto h-screen pt-2 pb-6">
              <FilterSidebar />
            </div>
          </div>
          <div className="col-span-4 lg:col-span-3 pt-10">
            <div className="flex md:items-center gap-3 flex-col md:flex-row justify-center container  mx-auto lg:hidden">
              <SearchBarComponent setFilterSideOpen={setFilterSideOpen} />
            </div>
            <ProductsList />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;
