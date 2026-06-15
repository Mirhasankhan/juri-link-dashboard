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
import NoData from "../common/NoData";
import { useReportsQuery } from "@/redux/features/report/report.api";
import Image from "next/image";
import RespondToReportModal from "./modal/ReportResponseModal";
import { AlertTriangle } from "lucide-react";


const AllReports = () => {
  const { data: reports, isLoading, isFetching } = useReportsQuery("");
 
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
            <AlertTriangle className="h-7 w-7 text-red-500" />
            Report Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and resolve complaints and disputes submitted by users
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
                  User Details
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  Expert Details
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  Service Type
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  Claim
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  File
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  Report Type
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <>
                 <NoData isLoading={isLoading} isFetching={isFetching} title="Reports"/>
                </>
              ) : reports?.data?.length > 0 ? (
                <>
                  {reports?.data?.map((report: any) => (
                    <TableRow
                      key={report._id}
                      className="hover:bg-indigo-50/15 active:bg-indigo-50/30 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10 border border-gray-100 shadow-sm transition-transform duration-200 hover:scale-105">
                            <AvatarImage
                              src={
                                report?.bookingId?.userId?.profileImage ||
                                "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                              }
                              alt={report?.bookingId?.userId?.fullName}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-bprimary to-indigo-600 text-white font-semibold text-xs">
                              {report?.bookingId?.userId?.fullName?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-gray-950">
                            {report?.bookingId?.userId?.fullName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10 border border-gray-100 shadow-sm transition-transform duration-200 hover:scale-105">
                            <AvatarImage
                              src={
                                report?.bookingId?.lawyerId?.profileImage ||
                                "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                              }
                              alt={report?.bookingId?.lawyerId?.fullName}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-semibold text-xs">
                              {report?.bookingId?.lawyerId?.fullName?.charAt(0)?.toUpperCase() || "E"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-gray-950">
                            {report?.bookingId?.lawyerId?.fullName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium text-gray-600">
                          {report?.bookingId?.serviceType}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 max-w-[200px] truncate block" title={report?.comment}>
                          {report?.comment}
                        </span>
                      </TableCell>
                      <TableCell>
                        {report.media ? (
                          <div className="relative h-12 w-12 rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:scale-105 transition-transform duration-200">
                            <Image
                              fill
                              sizes="48px"
                              className="object-cover"
                              alt="Report Media"
                              src={report?.media}
                            />
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 font-medium italic">No media</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {report?.reportType}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold border-none transition-all duration-200 ${
                          report?.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}>
                          {report?.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {report?.status === "Pending" ? (
                          <RespondToReportModal type={report.reportType} reportId={report._id} />
                        ) : (
                          <span className="text-sm text-gray-600 font-medium max-w-[150px] truncate block" title={report.adminReply}>
                            {report.adminReply}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-[400px]">
                    <NoData
                      title="Reports"
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

export default AllReports;
