"use client";


import { useGetCategoriesQuery } from "@/redux/features/category/category.api";
import Image from "next/image";


const AllCategories = () => {
  const { data: categories,isLoading } = useGetCategoriesQuery("");

    if (isLoading) {
    return (
      <div className="grid grid-cols-5 gap-8">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-400 h-60 w-full rounded-xl animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-5 gap-6 my-6">    
      {categories?.result?.map((category:any) => (
        <div className="relative rounded-xl shadow-xl" key={category.id}>
          <Image className="rounded-t-xl h-48 w-full object-cover" height={300} width={400} src={category?.mediaUrl} alt="categoryImage"></Image>
          <div className="p-6">
            <h1 className="text-xl font-medium">{category?.categoryName}</h1>
            <p>{category?.overview}</p>
          </div>
          {/* <p className="absolute right-4 top-4 bg-primary text-white rounded-xl px-3 py-0.5 font-medium">{category?.service?.length} Services</p> */}
        </div>
      ))}
    </div>
  );
};

export default AllCategories;