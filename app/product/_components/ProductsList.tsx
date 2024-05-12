"use client";
import React, { useEffect, useState } from "react";
import LoadProductList from "./LoadProductList";
import axios from "axios";
import ProductCard from "@/components/main/product-card";

import qs from "query-string";
import { useFilter } from "@/hooks/useFilter";
import { GrEmptyCircle } from "react-icons/gr";
import { CiFilter } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const ProductsList = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadProducts, setLoadProduct] = useState(true);

  const filteredData = useFilter();

  const categoryName = filteredData?.filteredData?.category?.name;
  const categoryId = filteredData?.filteredData?.category?._id;
  const sizeId = filteredData?.filteredData?.size?._id;
  const colourId = filteredData?.filteredData?.colour?._id;

  useEffect(() => {
    const getProducts = async () => {
      const url = qs.stringifyUrl({
        url: "/api/product",
        query: {
          categoryId,
          sizeId,
          colourId,
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
  }, [categoryId, sizeId, colourId]);

  console.log("Products: ", products);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <LoadProductList />;
  }

  return (
    <div className="px-3 py-5">
      <>
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-2xl p-3 uppercase">
            {categoryName}
          </h2>
          <div
            onClick={() => filteredData.removeAllFilter()}
            className="text-[16px] md:text-xl text-primary p-3 cursor-pointer flex items-center gap-2"
          >
            {(categoryId || sizeId) && (
              <Button>
                <FaFilter color="#fff" size={20} /> clear
              </Button>
            )}
          </div>
        </div>
        {loadProducts ? (
          <LoadProductList />
        ) : (
          <div className="">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-2">
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
