"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useAllBookingsQuery } from "@/redux/features/user/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AllBookings = () => {
  const { data: bookings, isLoading } = useAllBookingsQuery("");


  return (
    <div>
      <h1 className="text-xl font-medium pb-5">Earnings Overview</h1>
      <div className="p-5 mb-6 bg-white rounded-xl">
        <Table className="rounded-lg min-w-[900px]">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[250px] whitespace-nowrap">
                Provider Details
              </TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Total Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>App amount</TableHead>
              <TableHead>Providers amount</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4 text-gray-500"
                >
                  <Loader2
                    size={50}
                    className="animate-spin mx-auto  text-bprimary"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {bookings?.result?.map((service: any) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={
                            service?.provider?.profileImage ||
                            "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                          }
                          alt={service?.provider?.userName}
                        />
                        <AvatarFallback>
                          {service?.provider?.userName}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">
                        {service?.provider?.userName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{service?.subCategory?.subCatName}</TableCell>

                  <TableCell>{service?.fee}</TableCell>
                  <TableCell>{service?.status}</TableCell>
                  <TableCell>{(service?.fee * 0.9).toFixed(2)}</TableCell>
                  <TableCell>{(service?.fee * 0.1).toFixed(2)}</TableCell>
                  {/* <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={
                          service?.status === "ACTIVE" ||
                          service?.status === "CANCELLED" ||
                          service?.isPaymentShared
                        }
                        className={`text-white rounded-[4px] py-1 px-3 font-semibold
    ${
      service?.status === "ACTIVE" ||
      service?.status === "CANCELLED" ||
      service?.isPaymentShared
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-purple-400 cursor-pointer hover:bg-purple-500"
    }
  `}
                      >
                        {service?.isPaymentShared ? "Transferred" : "Transfer"}
                      </button>
                    </div>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default AllBookings;
