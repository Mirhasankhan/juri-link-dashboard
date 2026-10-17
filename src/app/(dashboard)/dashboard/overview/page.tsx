"use client";

import { ChartBarDefault } from "@/components/dashboard/ChartBarDefault";
import UserAnalyticsCard from "@/components/dashboard/card/UserAnalyticsCard";
import SellingService from "@/components/dashboard/card/SellingService";
import { useOverviewQuery } from "@/redux/features/overview/overview.api";
import { Users, Briefcase, LayoutList, MessageSquare, TrendingUp } from "lucide-react";

const statCards = [
  {
    key: "totalUsers",
    label: "Total Users",
    icon: Users,
    gradient: "from-[#2e7999] to-[#1a5a75]",
    trend: "+12%",
    trendUp: true,
  },
  {
    key: "totalExpert",
    label: "Total Experts",
    icon: Briefcase,
    gradient: "from-[#7c3aed] to-[#5b21b6]",
    trend: "+8%",
    trendUp: true,
  },
  {
    key: "totalServices",
    label: "Total Services",
    icon: LayoutList,
    gradient: "from-[#0891b2] to-[#0e7490]",
    trend: "+5%",
    trendUp: true,
  },
  {
    key: "totalConsultation",
    label: "Consultations",
    icon: MessageSquare,
    gradient: "from-[#059669] to-[#047857]",
    trend: "+18%",
    trendUp: true,
  },
];

const Dashboard = () => {
  const { data: overview } = useOverviewQuery("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getStatValue = (key: string): string | number => {
    if (!overview?.data) return "—";
    return (overview.data as Record<string, string | number>)[key] ?? "0";
  };

  return (
    <div className="space-y-6 p-1">
      {/* Subtitle */}
      <p className="text-sm text-gray-500 font-medium">
        Here&apos;s what&apos;s happening with your platform today.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map(({ key, label, icon: Icon, gradient, trend, trendUp }) => (
          <div
            key={key}
            className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group cursor-default`}
          >
            {/* Background decoration circles */}
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 group-hover:bg-white/15 transition-colors duration-300" />
            <div className="absolute -bottom-4 -right-2 w-16 h-16 rounded-full bg-white/5" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    trendUp ? "bg-white/20 text-white" : "bg-red-400/30 text-red-100"
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  {trend}
                </span>
              </div>

              <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-1">
                {label}
              </p>
              <p className="text-3xl font-bold text-white leading-tight">
                {getStatValue(key)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid xl:grid-cols-3 grid-cols-1 gap-5">
        <div className="xl:col-span-2 col-span-1">
          <ChartBarDefault />
        </div>
        <div className="xl:col-span-1 col-span-1">
          <UserAnalyticsCard />
        </div>
      </div>

      {/* Bottom Section */}
      <div>
        <SellingService />
      </div>
    </div>
  );
};

export default Dashboard;
