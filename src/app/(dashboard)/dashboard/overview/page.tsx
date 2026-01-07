"use client";

// import  { ChartBarDefault } from "@/components/dashboard/ChartBarDefault";
import { ChartBarDefault } from "@/components/dashboard/ChartBarDefault";
import UserAnalyticsCard from "@/components/dashboard/card/UserAnalyticsCard";
import SellingService from "@/components/dashboard/card/SellingService";

import { CardSim, CircleDollarSign, Users } from "lucide-react";
import { useOverviewQuery } from "@/redux/features/overview/overview.api";

const Dashboard = () => {
  const { data: overview } = useOverviewQuery("");

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
    </div>
  );
};

export default Dashboard;
