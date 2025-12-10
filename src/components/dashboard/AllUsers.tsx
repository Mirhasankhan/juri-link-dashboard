"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllUsersQuery } from "@/redux/features/user/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import NoData from "../common/NoData";

const AllUsers = () => {
  const { data: users, isLoading, isFetching } = useAllUsersQuery("");

  return (
    <div>
      <div className="p-5 mb-6 bg-white rounded-xl">
        <Table className="rounded-lg min-w-[900px]">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[250px] whitespace-nowrap">
                User Details
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Total Bookings</TableHead>
              <TableHead>Total Spending</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users?.data?.length > 0 ? (
              <>
                {users?.data?.map((user: any) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              user?.profileImage ||
                              "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                            }
                            alt={user?.fullName}
                          />
                          <AvatarFallback>{user?.fullName}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">
                          {user?.fullName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{user?.email}</TableCell>

                  <TableCell>{user?.phone || "—"}</TableCell>
                    <TableCell>{user?.location || "—"}</TableCell>
                    <TableCell>{user?.totalBookings}</TableCell>
                    <TableCell>${user?.totalSpending}</TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <NoData
                title="Users"
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

export default AllUsers;
