"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllLawyersQuery } from "@/redux/features/user/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import NoData from "../common/NoData";
import { FaStar } from "react-icons/fa";
import IntroVideoCell from "./modal/IntroVideoModal";
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Video,
  Star,
  ShoppingBag,
  DollarSign,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const AllLawyers = () => {
  const { data: users, isLoading, isFetching } = useAllLawyersQuery("");

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
            <Briefcase className="h-7 w-7 text-bprimary" />
            All Lawyers
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all registered lawyers in the platform
          </p>
        </div>       
      </div>


      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-shadow hover:shadow-md duration-300">
        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-gray-50/75 border-b border-gray-100">
                <TableHead className="font-semibold text-gray-600 py-4 text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    Lawyer Details
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    Email
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    Phone Number
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    Location
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-gray-400" />
                    Intro Video
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-gray-400" />
                    Reviews
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-center text-xs uppercase tracking-wider">
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-gray-400" />
                    Bookings
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-right text-xs uppercase tracking-wider">
                  <div className="flex items-center justify-end gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    Earnings
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <>
                 <NoData isLoading={isLoading} isFetching={isFetching} title="Providers"/>
                </>
              ) : users?.data?.length > 0 ? (
                <>
                  {users?.data?.map((user: any, index: number) => (
                    <TableRow
                      key={user._id}
                      className="hover:bg-indigo-50/15 active:bg-indigo-50/30 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-11 w-11 border border-gray-100 shadow-sm transition-transform duration-200 hover:scale-105">
                            <AvatarImage
                              src={
                                user?.profileImage ||
                                "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                              }
                              alt={user?.fullName}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-bprimary to-indigo-600 text-white font-semibold text-sm">
                              {user?.fullName?.charAt(0)?.toUpperCase() || "L"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900 leading-tight">
                              {user?.fullName}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Lawyer #{index + 1}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 font-medium">
                          {user?.email}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {user?.phone || (
                            <span className="text-gray-300">—</span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 max-w-[150px] truncate block" title={user?.location}>
                          {user?.location || (
                            <span className="text-gray-300">—</span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <IntroVideoCell videoUrl={user?.introVideo} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                            <FaStar className="text-amber-500 text-xs" />
                            <span className="text-xs font-bold text-amber-800">
                              {user?.avgRating?.toFixed(1) || "0.0"}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 font-medium">
                            ({user?.totalReview || 0})
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            user?.totalBookings > 0 ? "default" : "secondary"
                          }
                          className={`font-semibold rounded-full px-2.5 py-0.5 text-xs transition-all duration-200 border-none ${
                            user?.totalBookings > 0
                              ? "bg-bprimary/10 text-bprimary hover:bg-bprimary/20"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200/80"
                          }`}
                        >
                          {user?.totalBookings || 0}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold text-emerald-600">
                          ${user?.allTimeEarning?.toFixed(2) || "0.00"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-[400px]">
                    <NoData
                      title="Lawyers"
                      isLoading={isLoading}
                      isFetching={isFetching}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllLawyers;
