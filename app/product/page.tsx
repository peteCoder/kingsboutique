import { redirect } from "next/navigation";


import type { Metadata } from "next";

export const revalidate = 3600; // revalidate the data at most every hour

export const metadata: Metadata = {
  title: "Products",
  description: "Best Fashion and Accessories store and collections",
}


const Products = () => {
  return redirect("/shop");
};

export default Products;



