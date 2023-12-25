"use client";

import { getCategories } from "@/actions/getCategories";
import { getSizes } from "@/actions/getSizes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sanityClient } from "@/lib/client";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadFilter from "./LoadFilter";
import { Button } from "@material-tailwind/react";
import { cn } from "@/lib/utils";
import { useFilter } from "@/hooks/useFilter";

const FilterSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);

  // Loading states
  const [loadCategories, setLoadCategories] = useState(true);
  const [loadSizes, setLoadSizes] = useState(true);
  const [loadColours, setLoadColours] = useState(true);

  const filteredData = useFilter();

  const categoryId = filteredData?.filteredData?.category?._id;

  const sizeId = filteredData?.filteredData?.size?._id;
  const colourId = filteredData?.filteredData?.colour?._id;

  const selectCategory = (category: { _id: string; name: string }) => {
    console.log("Category is changed");
    console.log(category);
    filteredData.addCategory(category);
  };
  const selectSize = (size: { _id: string; name: string }) => {
    console.log("Size is changed");
    filteredData.addSize(size);
  };
  const selectColour = (colour: { _id: string; name: string }) => {
    console.log("Colour is changed");
    filteredData.addColour(colour);
  };

  useEffect(() => {
    const allCategories = async () => {
      try {
        setLoadCategories(true);
        const response = await axios.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadCategories(false);
      }
    };

    const allSizes = async () => {
      try {
        setLoadSizes(true);
        const response = await axios.get("/api/size");
        setSizes(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadSizes(false);
      }
    };
    const allColours = async () => {
      try {
        setLoadColours(true);
        const response = await axios.get("/api/colour");
        setColours(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadColours(false);
      }
    };

    allCategories();
    allSizes();
    allColours();
  }, []);

  //   console.log("Categories: ", categories);
  //   console.log("Sizes: ", sizes);

  return (
    <div className="py-2 overflow-auto flex flex-col my-5 px-2">
      <div className="">
        {loadCategories || loadSizes || loadColours ? (
          <LoadFilter />
        ) : (
          <Accordion className="space-y-4" type="multiple">
            {categories.length > 0 && (
              <AccordionItem className="hover:no-underline" value="item-1">
                <AccordionTrigger>
                  <h2 className="uppercase text-sm md:text-[16px]">
                    Product Categories
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 capitalize">
                    {categories.map((category: any) => (
                      <li
                        onClick={() =>
                          selectCategory({
                            _id: category._id,
                            name: category.name,
                          })
                        }
                        className={cn(
                          "capitalize cursor-pointer",
                          categoryId === category._id && "text-primary"
                        )}
                        key={category._id}
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
            {/* <>
              {categories.length > 0 && (
                <AccordionItem className="hover:no-underline" value="item-2">
                  <AccordionTrigger>
                    <h2 className="uppercase text-sm md:text-[16px]">
                      Filter by Price
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3">
                      <li>First</li>
                      <li>Second</li>
                      <li>Third</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
            </> */}

            {sizes.length > 0 && (
              <AccordionItem className="hover:no-underline" value="item-3">
                <AccordionTrigger>
                  <h2 className="uppercase text-sm md:text-[16px]">
                    Filter by Size
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex items-center gap-3 flex-wrap">
                    {sizes.map((size: any) => (
                      <Button
                        className={cn(
                          "bg-white text-black hover:text-white px-3 h-9 w-9 flex items-center justify-center hover:bg-primary",
                          size?._id === sizeId && "bg-primary text-white"
                        )}
                        onClick={(e) => {
                          selectSize({
                            _id: size?._id,
                            name: size?.name,
                          });
                        }}
                        key={size?._id}
                      >
                        {size?.code}
                      </Button>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
            {colours.length > 0 && (
              <AccordionItem className="hover:no-underline" value="item-4">
                <AccordionTrigger>
                  <h2 className="uppercase text-sm md:text-[16px]">
                    Filter by Colours
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center gap-3 flex-wrap px-2">
                    {colours.map((colour: any) => (
                      <div
                        style={{
                          backgroundColor: `${colour?.code}`,
                        }}
                        className={cn(
                          "hover:text-white h-8 w-8 rounded-full mt-4 mb-4 flex items-center justify-center hover:opacity-70",
                          colour?._id === colourId &&
                            "outline-black outline outline-5 text-white"
                        )}
                        onClick={(e) => {
                          selectColour({
                            _id: colour?._id,
                            name: colour?.name,
                          });
                        }}
                        key={colour?._id}
                      >
                        {/* {colour?.code} */}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
