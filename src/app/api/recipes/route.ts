import { NextResponse } from "next/server";

import { scrapeRecipes } from "@/app/(dashboard)/dashboard/overview/scrapper";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const recipes = await scrapeRecipes();

    return NextResponse.json({
      data: recipes,
      total: recipes.length,
    });
  } catch (error) {
    console.error("Failed to scrape recipes:", error);

    return NextResponse.json(
      { message: "Failed to scrape recipes" },
      { status: 500 },
    );
  }
}
