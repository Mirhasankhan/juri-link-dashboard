"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { Activity } from "lucide-react";

const data = [
  { day: "Mon", completed: 45, rejected: 12 },
  { day: "Tue", completed: 52, rejected: 15 },
  { day: "Wed", completed: 38, rejected: 18 },
  { day: "Thu", completed: 65, rejected: 14 },
  { day: "Fri", completed: 48, rejected: 16 },
  { day: "Sat", completed: 72, rejected: 11 },
  { day: "Sun", completed: 58, rejected: 19 },
];

const timeRanges = ["Daily", "Weekly", "Monthly", "Yearly"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3 min-w-[120px]">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">{label}</p>
        {payload.map((entry: { name: string; value: number; color: string }, i: number) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
              <span className="text-xs text-gray-500 capitalize">{entry.name}</span>
            </div>
            <span className="text-xs font-bold text-gray-900">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function PerformanceDashboard() {
  const [selectedRange, setSelectedRange] = useState("Weekly");

  const totalCompleted = data.reduce((s, d) => s + d.completed, 0);
  const totalRejected = data.reduce((s, d) => s + d.rejected, 0);
  const successRate = Math.round((totalCompleted / (totalCompleted + totalRejected)) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 rounded-xl p-2.5">
            <Activity className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Performance</h3>
            <p className="text-xs text-gray-400 mt-0.5">Consultation outcomes</p>
          </div>
        </div>

        {/* Time Range Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
                selectedRange === range
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-50">
        <div className="px-6 py-3 text-center">
          <p className="text-lg font-black text-gray-900">{totalCompleted}</p>
          <p className="text-xs text-gray-400 font-medium">Completed</p>
        </div>
        <div className="px-6 py-3 text-center">
          <p className="text-lg font-black text-red-500">{totalRejected}</p>
          <p className="text-xs text-gray-400 font-medium">Rejected</p>
        </div>
        <div className="px-6 py-3 text-center">
          <p className="text-lg font-black text-emerald-500">{successRate}%</p>
          <p className="text-xs text-gray-400 font-medium">Success Rate</p>
        </div>
      </div>

      {/* Chart */}
      <div className="px-4 py-4 flex-1">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="completedGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f0f4f8" strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af", fontWeight: 500 }}
              dy={6}
            />
            <YAxis
              hide={false}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#10B981"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="rejected"
              stroke="#EF4444"
              strokeWidth={2.5}
              dot={false}
              strokeDasharray="5 4"
              activeDot={{ r: 5, fill: "#EF4444", strokeWidth: 2, stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="px-6 pb-5 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-gray-500 font-semibold">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <span className="text-xs text-gray-500 font-semibold">Rejected</span>
        </div>
      </div>
    </div>
  );
}
