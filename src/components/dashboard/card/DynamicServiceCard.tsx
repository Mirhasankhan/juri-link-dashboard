
import Image from "next/image";
import { Trophy } from "lucide-react";

export type Service = {
  name: string;
  category: string;
  times: number;
  revenue: number;
  image: string;
};

type DynamicServiceCardProps = {
  services: Service[];
};

const rankColors = [
  "bg-amber-100 text-amber-700 border-amber-200",
  "bg-gray-100 text-gray-600 border-gray-200",
  "bg-orange-100 text-orange-600 border-orange-200",
];

const DynamicServiceCard = ({ services }: DynamicServiceCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-50 rounded-xl p-2.5">
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Top Appointed Legal Services</h3>
            <p className="text-xs text-gray-400 mt-0.5">Ranked by total bookings</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 pb-6">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 pt-4 pb-2 border-b border-gray-50">
          <span className="col-span-1 text-xs font-semibold text-gray-400 uppercase tracking-widest">#</span>
          <span className="col-span-5 text-xs font-semibold text-gray-400 uppercase tracking-widest">Service</span>
          <span className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">Category</span>
          <span className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-widest text-center">Times</span>
          <span className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-widest text-right">Revenue</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-50">
          {services.map((service, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 py-4 items-center group hover:bg-gray-50/60 transition-colors duration-150 rounded-xl px-1">
              {/* Rank */}
              <div className="col-span-1">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold border ${rankColors[index] ?? "bg-gray-50 text-gray-400 border-gray-100"}`}>
                  {index + 1}
                </span>
              </div>

              {/* Name */}
              <div className="col-span-5 flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                  <Image src={service.image} fill sizes="36px" className="object-cover" alt={service.name} />
                </div>
                <span className="text-sm font-semibold text-gray-800 truncate">{service.name}</span>
              </div>

              {/* Category */}
              <div className="col-span-2">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg font-medium truncate block">
                  {service.category}
                </span>
              </div>

              {/* Times */}
              <div className="col-span-2 text-center">
                <span className="text-sm font-bold text-gray-700">{service.times}x</span>
              </div>

              {/* Revenue */}
              <div className="col-span-2 text-right">
                <span className="text-sm font-bold text-[#059669]">
                  ${service.revenue.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicServiceCard;