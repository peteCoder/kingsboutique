import { getCategories } from "@/actions/getCategories";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const sizes = await getCategories();
    return NextResponse.json(sizes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Bad Request" }, { status: 500 });
  }
}
