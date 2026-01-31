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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-3 w-[300px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Briefcase className="h-7 w-7 text-blue-600" />
            All Lawyers
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all registered lawyers
          </p>
        </div>       
      </div>

 
      {/* Table Section */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 border-b-2 border-gray-200">
                <TableHead className="font-semibold text-gray-700 py-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Lawyer Details
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Intro Video
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Reviews
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Bookings
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <DollarSign className="h-4 w-4" />
                    Earnings
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users?.data?.length > 0 ? (
                <>
                  {users?.data?.map((user: any, index: number) => (
                    <TableRow
                      key={user._id}
                      className="hover:bg-blue-50/50 transition-colors border-b border-gray-100"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-11 w-11 border-2 border-gray-200 shadow-sm">
                            <AvatarImage
                              src={
                                user?.profileImage ||
                                "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                              }
                              alt={user?.fullName}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                              {user?.fullName?.charAt(0)?.toUpperCase() || "L"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {user?.fullName}
                            </p>
                            <p className="text-xs text-gray-500">
                              Lawyer #{index + 1}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">
                          {user?.email}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">
                          {user?.phone || (
                            <span className="text-gray-400">—</span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700 max-w-[150px] truncate block">
                          {user?.location || (
                            <span className="text-gray-400">—</span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <IntroVideoCell videoUrl={user?.introVideo} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                            <FaStar className="text-yellow-500 text-sm" />
                            <span className="font-semibold text-gray-900">
                              {user?.avgRating || "0.0"}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            ({user?.totalReview || 0})
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            user?.totalBookings > 0 ? "default" : "secondary"
                          }
                          className="font-semibold"
                        >
                          {user?.totalBookings || 0}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold text-green-600">
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
