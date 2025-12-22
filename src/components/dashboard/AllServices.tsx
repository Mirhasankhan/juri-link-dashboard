"use client";

import { useServicesQuery } from "@/redux/features/service/service.api";
import { SkeletonCard } from "../common/Skeleton";
import {  Pencil } from "lucide-react";
import ViewServiceModal from "./ViewServiceModal";

const AllServices = () => {
  const { data: services, isLoading } = useServicesQuery("");

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
              <div className="gap-2 flex p-1 cursor-pointer rounded-[3px]">
                <Pencil  className="text-bprimary rounded-[6px] p-1 bg-bprimary/20" size={30}></Pencil>
               <ViewServiceModal id="sdfsdfsdf"></ViewServiceModal>
          
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
