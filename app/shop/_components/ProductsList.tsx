"use client";
import React, { useEffect, useState } from "react";
import LoadProductList from "./LoadProductList";
import axios from "axios";
import ProductCard from "@/components/main/product-card";
import useSWR from "swr";
import qs from "query-string";
import { useFilter } from "@/hooks/useFilter";
import { GrEmptyCircle } from "react-icons/gr";
import { CiFilter } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useSearch, useSearchPlaceholder } from "@/hooks/useSearch";

const ProductsList = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadProducts, setLoadProduct] = useState(true);

  const filteredData = useFilter();
  const searching = useSearch();
  const searchingPlaceholder = useSearchPlaceholder();

  const categoryName = filteredData?.filteredData?.category?.name;
  const categoryId = filteredData?.filteredData?.category?._id;
  const sizeId = filteredData?.filteredData?.size?._id;
  const colourId = filteredData?.filteredData?.colour?._id;
  const searchTerm = searching?.search?.searcTerm;


  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  

  useEffect(() => {
    const getProducts = async () => {
      const url = qs.stringifyUrl({
        url: "/api/product",
        query: {
          categoryId,
          sizeId,
          colourId,
          searchTerm,
        },
      });
      try {
        setLoadProduct(true);
        const response = await axios.get(url);
        const data = response.data;

        setProducts(data);
      } catch (error) {
        console.log(error);
        setLoadProduct(true);
      } finally {
        setLoadProduct(false);
      }
    };

    getProducts();
  }, [categoryId, sizeId, colourId, searchTerm]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  

  if (!hasMounted) {
    return <LoadProductList numberOfRenderedProducts={8} />;
  }



  return (
    <div className="md:px-3 py-5">
      <>
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-xl md:text-2xl p-3 uppercase">
            {categoryName}
          </h2>
          <div
            onClick={() => {
              filteredData.removeAllFilter();
              searching.removeSearchTerm();
              searchingPlaceholder.removeSearchTerm();
            }}
            className="md:text-[16px] md:text-xl text-primary p-3 cursor-pointer flex items-center gap-2"
          >
            {(categoryId || sizeId || colourId || searchTerm) && (
              <Button className="px-2 py-1">
                <FaFilter color="#fff" size={20} className="h-[10px] w-[10px] md:h-[20px] md:w-[20px]" /> clear
              </Button>
            )} 
          </div>
        </div>
        {loadProducts ? (
          <LoadProductList numberOfRenderedProducts={8} />
        ) : (
          <div className="">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 sm:gap-2">
                {products?.map((product: any, i: number) => (
                  <ProductCard key={product._id} index={i} product={product} />
                ))}
              </div>
            ) : (
              <div className="min-w-full min-h-[50vh] flex flex-col items-center justify-center text-gray-500 gap-2">
                <div>
                  <FaRegQuestionCircle className="duration-1000" size={100} />
                </div>
                <div className="text-[19px]">No products found!</div>
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default ProductsList;
