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
  Trash,
  Shield,
  Mail,
  UserCog,
  Calendar,
  AlertCircle,
} from "lucide-react";
import {
  useAllAdminsQuery,
  useDeleteAdminMutation,
} from "@/redux/features/user/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import NoData from "../common/NoData";
import { toast } from "sonner";
import CreateAdminModal from "./modal/AddAdminModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
            <Shield className="h-7 w-7 text-bprimary" />
            Admin Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and monitor system administrators and credentials
          </p>
        </div>
        <CreateAdminModal />
      </div>
    

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-shadow hover:shadow-md duration-300">
        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-gray-50/75 border-b border-gray-100">
                <TableHead className="font-semibold text-gray-600 py-4 text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gray-400" />
                    Admin Details
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
                    <UserCog className="h-4 w-4 text-gray-400" />
                    Assigned Role
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    Active From
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
                 <NoData isLoading={isLoading} isFetching={isFetching} title="Admins"/>
                </>
              ) : admins?.data?.length > 0 ? (
                <>
                  {admins?.data?.map((admin: any, index: number) => (
                    <TableRow
                      key={admin._id}
                      className="hover:bg-indigo-50/15 active:bg-indigo-50/30 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-11 w-11 border border-gray-100 shadow-sm transition-transform duration-200 hover:scale-105">
                            <AvatarImage
                              src={
                                admin?.profileImage ||
                                "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                              }
                              alt={admin?.adminName}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-bprimary to-indigo-600 text-white font-semibold text-sm">
                              {admin?.adminName?.charAt(0)?.toUpperCase() ||
                                "A"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900 leading-tight">
                              {admin?.adminName}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Admin #{index + 1}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 font-medium">
                          {admin?.email}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            admin?.role === "UserAdmin"
                              ? "default"
                              : "secondary"
                          }
                          className={`font-semibold rounded-full px-2.5 py-0.5 text-xs transition-all duration-200 border-none ${
                            admin?.role === "UserAdmin"
                              ? "bg-bprimary/10 text-bprimary hover:bg-bprimary/20"
                              : "bg-amber-50 text-amber-700 hover:bg-amber-100/80"
                          }`}
                        >
                          {admin?.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {formatDate(admin?.createdAt)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                              <Trash className="h-4 w-4" />
                              <span className="text-xs font-semibold uppercase tracking-wider">
                                Delete
                              </span>
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                                Are you sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the admin account for{" "}
                                <span className="font-semibold">
                                  {admin?.adminName}
                                </span>
                                .
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteAdmin(admin?._id)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                Delete Admin
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-[400px]">
                    <NoData
                      title="Admins"
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

export default AllAdmins;
