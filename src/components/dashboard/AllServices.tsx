"use client";

import { useServicesQuery } from "@/redux/features/service/service.api";
import { SkeletonCard } from "../common/Skeleton";
import { Pencil } from "lucide-react";

const AllServices = () => {
  const { data: services, isLoading } = useServicesQuery("");
  console.log(services?.data);
  return (
    <div>
      <h1 className="text-3xl font-medium mt-8 pb-3">Available Services</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : services?.data?.length > 0 ? (
          services.data.map((service: any) => (
            <div
              className="border p-4 flex justify-between items-center font-medium bg-white rounded-[8px]"
              key={service._id}
            >
              <h1>{service.serviceName}</h1>
              <div className="bg-bprimary/10 text-bprimary p-1 rounded-[3px]">
                <Pencil size={20}></Pencil>
              </div>
            </div>
          ))
        ) : (
          <p>No Services Found</p>
        )}
      </div>
    </div>
  );
};

export default AllServices;
