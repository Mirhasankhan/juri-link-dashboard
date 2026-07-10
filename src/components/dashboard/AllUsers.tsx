"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAllUsersQuery,
  useBlockUnblockUserMutation,
} from "@/redux/features/user/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import NoData from "../common/NoData";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  DollarSign,
  Ban,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import Pagination from "../common/Pagination";
import { toast } from "sonner"; // remove this import if you don't use sonner

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [blockUnblock] = useBlockUnblockUserMutation();
  const {
    data: users,
    isLoading,
    isFetching,
  } = useAllUsersQuery({ search, page });

  const blockUnblockUser = async (id: string) => {
    setLoadingUserId(id);
    try {
      const result = await blockUnblock(id).unwrap();
      console.log("blockUnblock result", result);
    } catch (error) {
      console.error("blockUnblock error", error);
      toast?.error?.("Failed to update user status. Please try again.");
    } finally {
      setLoadingUserId(null);
    }
  };

  const totalPage = users?.data?.totalPages || 1;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all registered users in the platform
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-shadow hover:shadow-md duration-300">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-gray-900">All Users</h1>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bprimary focus:border-bprimary"
            placeholder="Search users..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-gray-50/75 border-b border-gray-100">
                <TableHead className="font-semibold text-gray-600 py-4 text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    User Details
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
                    Address
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
                    Spending
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-right text-xs uppercase tracking-wider">
                  <div className="flex items-center justify-end gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    Action
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <>
                  <NoData
                    isLoading={isLoading}
                    isFetching={isFetching}
                    title="Users"
                  />
                </>
              ) : users?.data?.data?.length > 0 ? (
                <>
                  {users?.data?.data?.map((user: any, index: number) => {
                    const isRowLoading = loadingUserId === user._id;
                    const isAnyLoading = loadingUserId !== null;
                    const isActive = user.status === "Active";

                    return (
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
                                {user?.fullName?.charAt(0)?.toUpperCase() ||
                                  "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-gray-900 leading-tight">
                                {user?.fullName}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                User #{index + 1}
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
                          <span
                            className="text-sm text-gray-600 max-w-[200px] truncate block"
                            title={user?.location}
                          >
                            {user?.location || (
                              <span className="text-gray-300">—</span>
                            )}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={
                              user?.totalBookings > 0 ? "default" : "secondary"
                            }
                            className={`font-semibold rounded-full px-2.5 py-0.5 text-xs transition-all duration-200 ${
                              user?.totalBookings > 0
                                ? "bg-bprimary/10 text-bprimary hover:bg-bprimary/20 border-none"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200/80 border-none"
                            }`}
                          >
                            {user?.totalBookings || 0}
                          </Badge>
                        </TableCell>                     
                        <TableCell className="text-right">
                          <span className="font-semibold text-emerald-600">
                            ${user?.totalSpending?.toFixed(2) || "0.00"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() => blockUnblockUser(user._id)}
                            disabled={isAnyLoading}
                            className={`inline-flex items-center gap-1.5 min-w-[92px] justify-center px-3 py-1.5 rounded-md text-xs font-semibold border transition-all duration-200 ${
                              isActive
                                ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300"
                            } ${
                              isAnyLoading
                                ? "opacity-50 cursor-not-allowed hover:bg-inherit"
                                : "cursor-pointer"
                            }`}
                          >
                            {isRowLoading ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                {isActive ? "Blocking..." : "Activating..."}
                              </>
                            ) : (
                              <>
                                {isActive ? (
                                  <Ban className="h-3.5 w-3.5" />
                                ) : (
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                )}
                                {isActive ? "Block" : "Activate"}
                              </>
                            )}
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-[400px]">
                    <NoData
                      title="Users"
                      isLoading={isLoading}
                      isFetching={isFetching}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {users?.data?.data?.length > 0 && (
          <Pagination totalPage={totalPage} page={page} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export default AllUsers;