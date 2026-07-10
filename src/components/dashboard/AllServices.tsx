"use client";

import { useServicesQuery } from "@/redux/features/service/service.api";
import { Skeleton } from "../ui/skeleton";
import { Briefcase, Eye } from "lucide-react";
import ViewServiceModal from "./ViewServiceModal";
import { Badge } from "../ui/badge";
import Image from "next/image";

const AllServices = () => {
  const { data: services, isLoading, isFetching } = useServicesQuery("");
  const showSkeleton = isLoading || isFetching;

  return (
    <div className="space-y-6 mt-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Service Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all registered services in the platform
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {showSkeleton ? (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100/80 shadow-sm overflow-hidden"
              >
                {/* Image skeleton with badge placeholder, mirrors the real card */}
                <div className="relative h-48 w-full bg-gray-100">
                  <Skeleton className="h-full w-full rounded-none bg-gray-150" />
                  <div className="absolute top-3 right-3">
                    <Skeleton className="h-6 w-20 rounded-full bg-gray-200/80" />
                  </div>
                </div>

                {/* Content skeleton */}
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4 rounded-md bg-gray-150" />
                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-full rounded bg-gray-150" />
                    <Skeleton className="h-3.5 w-full rounded bg-gray-150" />
                    <Skeleton className="h-3.5 w-2/3 rounded bg-gray-150" />
                  </div>
                  <div className="pt-2">
                    <Skeleton className="h-10 w-full rounded-lg bg-gray-150" />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : services?.data?.length > 0 ? (
          services.data.map((service: any) => (
            <div
              key={service._id}
              className="bg-white rounded-xl border border-gray-100/80 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Service Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={service.serviceMedia}
                  alt={service.serviceName}
                  height={200}
                  width={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm border-none shadow-sm font-semibold">
                    {service.totalBooked || 0} Bookings
                  </Badge>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1 leading-snug">
                    {service.serviceName}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Action Button */}
                <div className="pt-2">
                  <ViewServiceModal service={service}>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-bprimary text-white rounded-lg font-semibold text-sm transition-colors hover:bg-bprimary/90 cursor-pointer shadow-sm">
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>
                  </ViewServiceModal>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Services Found
            </h3>
            <p className="text-sm text-gray-500">
              There are currently no services available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;