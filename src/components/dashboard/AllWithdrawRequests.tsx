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
import {
  useAcceptRequestMutation,
  useWithdrawRequestsQuery,
} from "@/redux/features/terminal/withdraw.api";
import { toast } from "sonner";

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
              <TableHead>Amount</TableHead>
              <TableHead>Applied At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {withdraws?.data?.length > 0 ? (
              <>
                {withdraws?.data?.map((withdraw: any) => (
                  <TableRow key={withdraw._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              withdraw?.lawyerId?.profileImage ||
                              "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                            }
                            alt={withdraw?.lawyerId?.fullName}
                          />
                          <AvatarFallback>
                            {withdraw?.lawyerId?.fullName}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">
                          {withdraw?.lawyerId?.fullName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{withdraw?.lawyerId?.email}</TableCell>

                    <TableCell>${withdraw?.amount}</TableCell>
                    <TableCell>
                      <h1>
                        {new Date(withdraw?.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </h1>
                    </TableCell>
                    <TableCell
                      className={`${
                        withdraw.status == "Accepted"
                          ? "text-green-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {withdraw?.status}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button
                          disabled={withdraw.status == "Accepted"}
                          onClick={() => handleAcceptRequest(withdraw?._id)}
                          className="bg-bprimary/5 cursor-pointer text-bprimary disabled:cursor-not-allowed font-medium py-1 px-4 rounded-[6px]"
                        >
                          Accept
                        </button>
                        <button
                          disabled={withdraw.status == "Accepted"}
                          className="bg-red-50  disabled:cursor-not-allowed text-red-500 font-medium py-1 px-4 rounded-[6px]"
                        >
                          Reject
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <NoData
                title="Withdraw Request"
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

export default AllWithdrawRequests;
