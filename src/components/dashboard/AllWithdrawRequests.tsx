"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import NoData from "../common/NoData";
import {
  useAcceptRequestMutation,
  useWithdrawRequestsQuery,
} from "@/redux/features/withdraw/withdraw.api";
import { toast } from "sonner";
import {
  Wallet,
  Mail,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import Pagination from "../common/Pagination";

const AllWithdrawRequests = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const {
    data: withdraws,
    isLoading,
    isFetching,
  } = useWithdrawRequestsQuery({ status, page });

  const totalPage = withdraws?.data?.totalPages || 1;

  const [acceptRequest] = useAcceptRequestMutation();

  const handleAcceptRequest = async (id: string) => {
    const result: any = await acceptRequest(id);
    if (result.data) {
      toast.success(result.data.message);
    } else {
      toast.error(result.error.data.message);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Withdraw Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all registered withdraw requests in the platform
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-shadow hover:shadow-md duration-300">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-gray-900">
            All Withdraw Requests
          </h1>
          <div className="relative inline-block">
            <select
              className="appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-9 text-sm font-medium text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors cursor-pointer"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Accepted">Accepted</option>
              <option value="Pending">Pending</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-gray-50/75 border-b border-gray-100">
                <TableHead className="font-semibold text-gray-600 py-4 text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-gray-400" />
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
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    Amount
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    Applied At
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    Status
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-center text-xs uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <>
                  <NoData
                    isLoading={isLoading}
                    isFetching={isFetching}
                    title="Withdraw Requests"
                  />
                </>
              ) : withdraws?.data?.data?.length > 0 ? (
                <>
                  {withdraws?.data?.data?.map((withdraw: any) => (
                    <TableRow
                      key={withdraw._id}
                      className="hover:bg-indigo-50/15 active:bg-indigo-50/30 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-11 w-11 border border-gray-100 shadow-sm transition-transform duration-200 hover:scale-105">
                            <AvatarImage
                              src={
                                withdraw?.lawyerId?.profileImage ||
                                "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                              }
                              alt={withdraw?.lawyerId?.fullName}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-bprimary to-indigo-600 text-white font-semibold text-sm">
                              {withdraw?.lawyerId?.fullName
                                ?.charAt(0)
                                ?.toUpperCase() || "L"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900 leading-tight">
                              {withdraw?.lawyerId?.fullName}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 font-medium">
                          {withdraw?.lawyerId?.email}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-emerald-600 text-base">
                          ${withdraw?.amount?.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {formatDateTime(withdraw?.createdAt)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            withdraw.status === "Accepted"
                              ? "default"
                              : "secondary"
                          }
                          className={`font-semibold rounded-full px-2.5 py-0.5 text-xs transition-all duration-200 border-none ${
                            withdraw.status === "Accepted"
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80"
                              : "bg-amber-50 text-amber-700 hover:bg-amber-100/80"
                          }`}
                        >
                          {withdraw.status === "Accepted" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <Clock className="h-3 w-3 mr-1" />
                          )}
                          {withdraw?.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-center">
                          <button
                            disabled={withdraw.status === "Accepted"}
                            onClick={() => handleAcceptRequest(withdraw?._id)}
                            className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-1.5 px-3 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                            Accept
                          </button>
                          <button
                            disabled={withdraw.status === "Accepted"}
                            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-1.5 px-3 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            Reject
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-[400px]">
                    <NoData
                      title="Withdraw Request"
                      isLoading={isLoading}
                      isFetching={isFetching}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {withdraws?.data?.data?.length > 0 && (
          <Pagination totalPage={totalPage} page={page} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export default AllWithdrawRequests;
