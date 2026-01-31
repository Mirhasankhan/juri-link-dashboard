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
import { Skeleton } from "../ui/skeleton";
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
} from "lucide-react";

const AllWithdrawRequests = () => {
  const {
    data: withdraws,
    isLoading,
    isFetching,
  } = useWithdrawRequestsQuery("");

  const [acceptRequest] = useAcceptRequestMutation();

  const handleAcceptRequest = async (id: string) => {
    const result: any = await acceptRequest(id);
    if (result.data) {
      toast.success(result.data.message);
    } else {
      toast.error(result.error.data.message);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
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
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Wallet className="h-7 w-7 text-blue-600" />
            Withdrawal Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage lawyer withdrawal requests and payments
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
                    <Wallet className="h-4 w-4" />
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
                    <DollarSign className="h-4 w-4" />
                    Amount
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Applied At
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Status
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {withdraws?.data?.length > 0 ? (
                <>
                  {withdraws?.data?.map((withdraw: any) => (
                    <TableRow
                      key={withdraw._id}
                      className="hover:bg-blue-50/50 transition-colors border-b border-gray-100"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-11 w-11 border-2 border-gray-200 shadow-sm">
                            <AvatarImage
                              src={
                                withdraw?.lawyerId?.profileImage ||
                                "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                              }
                              alt={withdraw?.lawyerId?.fullName}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                              {withdraw?.lawyerId?.fullName
                                ?.charAt(0)
                                ?.toUpperCase() || "L"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {withdraw?.lawyerId?.fullName}
                            </p>                            
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">
                          {withdraw?.lawyerId?.email}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600 text-base">
                          ${withdraw?.amount?.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">
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
                          className={`font-semibold ${
                            withdraw.status === "Accepted"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
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
                            className="flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2 px-4 rounded-lg transition-colors"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Accept
                          </button>
                          <button
                            disabled={withdraw.status === "Accepted"}
                            className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2 px-4 rounded-lg transition-colors"
                          >
                            <XCircle className="h-4 w-4" />
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
      </div>
    </div>
  );
};

export default AllWithdrawRequests;
