"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

import { useState } from "react";
import {
  useGetCategoriesQuery,
  useGetServicesQuery,
} from "@/redux/features/category/category.api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AllServices = () => {
  const { data: categories } = useGetCategoriesQuery("");

  const [categoryId, setCategoryId] = useState("");
  const { data: services, isLoading } = useGetServicesQuery(categoryId);


  return (
    <div>
      <div className="p-5 my-6 rounded-[8px] bg-white">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold pb-4">Services</h1>
          <select
            onChange={(e) => setCategoryId(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">All Categories</option>
            {categories?.result?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <Table className="rounded-lg min-w-[900px]">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[250px] whitespace-nowrap">
                Service Details
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Service Name</TableHead>

              <TableHead>Overview</TableHead>
              <TableHead>Average Rating</TableHead>
              <TableHead>Total Reivews</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4 text-gray-500"
                >
                  <Loader2
                    size={50}
                    className="animate-spin mx-auto  text-bprimary"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {services?.result?.map((service: any) => (
                <TableRow key={service.id}>
                   <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={service.mediaUrl || "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"}
                          alt={service.subCatName}
                        />
                        <AvatarFallback>
                          {service.subCatName}
                           
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">
                        {service.subCatName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {service?.subCatName}
                    </div>
                  </TableCell>
                  <TableCell>{service?.category?.categoryName}</TableCell>

                  <TableCell>{service?.overview}</TableCell>
                  <TableCell>{service?.avgRating || "N/A"}</TableCell>
                  <TableCell>{service?.totalReview}</TableCell>
                  {/* <TableCell>
                    <div className="flex items-center gap-2">
                      <button className="bg-green-200 text-green-800 rounded-lg py-1 px-3 font-semibold">
                        Edit
                      </button>
                    </div>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default AllServices;
