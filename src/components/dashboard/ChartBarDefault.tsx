"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";
import { useAdminEarningsQuery } from "@/redux/features/user/user.api";

export const description = "A bar chart";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">{label}</p>
        <p className="text-lg font-bold text-[#2e7999]">
          ${payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function ChartBarDefault() {
  const { data } = useAdminEarningsQuery("");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Card Header */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="bg-[#2e7999]/10 rounded-xl p-2.5">
            <DollarSign className="w-5 h-5 text-[#2e7999]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Earning Report</h3>
            <p className="text-xs text-gray-400 mt-0.5">Monthly revenue overview</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
          <TrendingUp className="w-3.5 h-3.5" />
          This year
        </span>
      </div>

      {/* Chart */}
      <div className="px-4 py-6">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data?.result} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="earningGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2e7999" stopOpacity={1} />
                <stop offset="100%" stopColor="#7172cc" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f0f4f8" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af", fontWeight: 500 }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(46,121,153,0.05)", radius: 8 }} />
            <Bar dataKey="earning" fill="url(#earningGradient)" radius={[8, 8, 3, 3]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
