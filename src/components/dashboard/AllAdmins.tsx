"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import {
  useAllAdminsQuery,
  useDeleteAdminMutation,
} from "@/redux/features/user/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import NoData from "../common/NoData";
import { toast } from "sonner";

const AllAdmins = () => {
  const { data: admins, isLoading, isFetching } = useAllAdminsQuery("");
  const [deleteAdmin] = useDeleteAdminMutation();

  const handleDeleteAdmin = async (adminId: string) => {
    const response: any = await deleteAdmin(adminId);
    if (response.data) {
      toast.success(response?.data?.message);
    } else {
      toast.error(response.error.data.message);
    }
  };

  return (
    <div>     
      <div className="p-5 mb-6 bg-white rounded-xl">
        <Table className="rounded-lg min-w-[900px]">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[250px] whitespace-nowrap">
                Admin Details
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Assigned Role</TableHead>
              <TableHead>Active From</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {admins?.data?.length > 0 ? (
              <>
                {admins?.data?.map((admin: any) => (
                  <TableRow key={admin._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              admin?.profileImage ||
                              "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                            }
                            alt={admin?.adminName}
                          />
                          <AvatarFallback>{admin?.adminName}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">
                          {admin?.adminName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{admin?.email}</TableCell>

                    <TableCell>{admin?.role}</TableCell>
                    <TableCell>{admin?.createdAt}</TableCell>
                    <TableCell>
                      <Trash
                        onClick={() => handleDeleteAdmin(admin?._id)}
                        className="text-red-600 cursor-pointer"
                      ></Trash>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <NoData
                title="Admins"
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

export default AllAdmins;
