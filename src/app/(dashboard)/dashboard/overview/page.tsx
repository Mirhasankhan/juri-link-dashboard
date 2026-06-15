"use client";

// import  { ChartBarDefault } from "@/components/dashboard/ChartBarDefault";
import { ChartBarDefault } from "@/components/dashboard/ChartBarDefault";
import UserAnalyticsCard from "@/components/dashboard/card/UserAnalyticsCard";
import SellingService from "@/components/dashboard/card/SellingService";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ExternalLink, CardSim, CircleDollarSign, Users } from "lucide-react";
import type { RecipeCard } from "./scrapper";
import { useOverviewQuery } from "@/redux/features/overview/overview.api";

const Dashboard = () => {
  const { data: overview } = useOverviewQuery("");
  const [recipes, setRecipes] = useState<RecipeCard[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
  const [recipeError, setRecipeError] = useState("");

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setIsLoadingRecipes(true);
        setRecipeError("");

        const response = await fetch("/api/recipes");

        if (!response.ok) {
          throw new Error("Failed to fetch scraped recipes");
        }

        const result = await response.json();

        setRecipes(result.data ?? []);
      } catch {
        setRecipeError("Could not load scraped recipe cards.");
      } finally {
        setIsLoadingRecipes(false);
      }
    };

    loadRecipes();
  }, []);

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`text-sm font-medium mb-2`}>Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {overview?.data?.totalUsers}
                </p>
              </div>
              <div className={` p-3 rounded-full`}>
                <Users></Users>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`text-sm font-medium mb-2`}>Total Experts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {overview?.data?.totalExpert}
                </p>
              </div>
              <div className={` p-3 rounded-full`}>
                <Users></Users>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`text-sm font-medium mb-2`}>Total Services</p>
                <p className="text-2xl font-bold text-gray-900">
                  {overview?.data?.totalServices}
                </p>
              </div>
              <div className={` p-3 rounded-full`}>
                <CardSim></CardSim>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`text-sm font-medium mb-2`}>Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {overview?.data?.totalConsultation}
                </p>
              </div>
              <div className={` p-3 rounded-full`}>
                <CircleDollarSign></CircleDollarSign>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* order insights */}
      <div className="mt-6 grid xl:grid-cols-3 grid-cols-2 gap-4 ">
        <div className="col-span-2">
          <ChartBarDefault />
        </div>
        <div className="xl:col-span-1 col-span-2">
          <UserAnalyticsCard />
        </div>
      </div>
      <div className="mt-6">
        <SellingService />
      </div>
      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
              Scraped Recipes
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-gray-900">
              Tomatoes With Lemon cards
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            {isLoadingRecipes
              ? "Loading cards..."
              : `${recipes.length} recipes found`}
          </p>
        </div>

        {recipeError ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {recipeError}
          </div>
        ) : isLoadingRecipes ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
              >
                <div className="aspect-[4/3] animate-pulse bg-gray-200" />
                <div className="space-y-3 p-4">
                  <div className="h-3 w-20 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-5 w-full animate-pulse rounded-full bg-gray-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : recipes.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {recipes.map((recipe) => (
              <a
                key={recipe.link}
                href={recipe.link}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      {recipe.category || "Recipe"}
                    </span>
                    <ExternalLink className="h-4 w-4 text-gray-400 transition group-hover:text-emerald-700" />
                  </div>
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    {recipe.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
            No recipe cards were returned from the scraper.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
