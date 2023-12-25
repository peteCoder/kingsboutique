import { getCategories } from "@/actions/getCategories";
import { getProductsBasedOnCategory } from "@/actions/getProductsBasedOnCategory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { categoryId } }: { params: { categoryId: string } }
) {
  try {
    const products = await getProductsBasedOnCategory(categoryId);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Bad Request" }, { status: 500 });
  }
}
