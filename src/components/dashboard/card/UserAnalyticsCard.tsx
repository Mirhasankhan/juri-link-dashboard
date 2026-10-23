"use client";

import { useUserrsByTimeQuery } from "@/redux/features/authSlice/authApi";
import Image from "next/image";
import { useState } from "react";
import { Users } from "lucide-react";

const filters = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

export default function UserAnalyticsCard() {
  const [current, setCurrent] = useState("daily");
  const { data: users } = useUserrsByTimeQuery(current);

  const totalUsers = users?.result?.totalUsers ?? 0;
  const profileImages: string[] = users?.result?.profileImages ?? [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#7c3aed]/10 rounded-xl p-2.5">
            <Users className="w-5 h-5 text-[#7c3aed]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">New Users</h3>
            <p className="text-xs text-gray-400 mt-0.5 capitalize">{current} overview</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 pt-4">
        <div className="flex gap-1.5 bg-gray-100 p-1 rounded-xl w-fit">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setCurrent(value)}
              className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all duration-200 ${current === value
                  ? "bg-[#2e7999] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="px-6 pt-6 pb-2 flex-1">
        <div className="flex items-end gap-3 mb-1">
          <span className="text-5xl font-black text-gray-900 leading-none">{totalUsers}</span>
          <span className="text-sm text-emerald-500 font-semibold pb-1">users joined</span>
        </div>
        <p className="text-xs text-gray-400 capitalize mt-1">This {current} period</p>
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-dashed border-gray-100 my-2" />

      {/* Avatar List */}
      <div className="px-6 pb-6 pt-3">
        <p className="text-xs font-semibold text-gray-400  tracking-widest mb-3">
          Recent Joiners
        </p>
        {profileImages.length > 0 ? (
          <div className="flex -space-x-3">
            {profileImages.slice(0, 6).map((image, idx) => (
              <div
                key={idx}
                className="relative w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden"
              >
                <Image
                  src={image}
                  fill
                  sizes="40px"
                  className="object-cover"
                  alt="User avatar"
                />
              </div>
            ))}
            {profileImages.length > 6 && (
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-gray-500">
                  +{profileImages.length - 6}
                </span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">No recent joiners</p>
        )}
      </div>
    </div>
  );
}
