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

const AllReports = () => {
  const { data: reports, isLoading, isFetching } = useReportsQuery("");
  console.log(reports?.data);

  return (
    <div>
      <div className="p-5 mb-6 bg-white rounded-xl">
        <Table className="rounded-lg min-w-[900px]">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[250px] whitespace-nowrap">
                User Details
              </TableHead>
              <TableHead>Expert Details</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Claim</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Report Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reports?.data?.length > 0 ? (
              <>
                {reports?.data?.map((report: any) => (
                  <TableRow key={report._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              report?.bookingId?.userId?.profileImage ||
                              "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                            }
                            alt={report?.bookingId?.userId?.fullName}
                          />
                          <AvatarFallback>
                            {report?.bookingId?.userId?.fullName}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">
                          {report?.bookingId?.userId?.fullName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              report?.bookingId?.lawyerId?.profileImage ||
                              "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                            }
                            alt={report?.bookingId?.lawyerId?.fullName}
                          />
                          <AvatarFallback>
                            {report?.bookingId?.lawyerId?.fullName}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">
                          {report?.bookingId?.lawyerId?.fullName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{report?.bookingId?.serviceType}</TableCell>

                    <TableCell>{report?.comment}</TableCell>
                    <TableCell>
                      {report.media ? (
                        <Image
                          width={30}
                          height={30}
                          className="h-12 w-12 rounded-[8px] object-cover"
                          alt=""
                          src={report?.media}
                        ></Image>
                      ) : (
                        "No media provided"
                      )}
                    </TableCell>
                    <TableCell>{report?.reportType}</TableCell>

                    <TableCell>{report?.status}</TableCell>
                    <TableCell>
                      {report?.status == "Pending" ? (
                       <RespondToReportModal type={report.reportType} reportId={report._id}></RespondToReportModal>
                      ) : (
                        <h1>{report.adminReply}</h1>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <NoData
                title="Reports"
                isLoading={isLoading}
                isFetching={isFetching}
              ></NoData>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllReports;
