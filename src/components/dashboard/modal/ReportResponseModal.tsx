"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useResponseReportMutation } from "@/redux/features/report/report.api";

type TFormData = {
  reply: string;
  status: "False_Claim" | "Got_Refund" | "Lawyer_Punished";
};

export default function RespondToReportModal({
  reportId,
  type
}: {
  reportId: string;
  type:string
}) {
  const [open, setOpen] = useState(false);
  const [respondToReport, { isLoading }] = useResponseReportMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const onSubmit = async (datas: TFormData) => {
    const data = {
      reportId,
      adminReply: datas.reply,
      status: datas.status
    };

    const res: any = await respondToReport(data);

    console.log(res);

    if (res?.data) {
      toast.success(res.data.message || "Report updated successfully");
      setOpen(false);
      reset();
    } else {
      toast.error(res?.error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-bprimary cursor-pointer text-white rounded-[6px] font-medium px-4 py-2">
          Respond to Report
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Respond to Report ({type})</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Reply */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-medium">Admin Reply</label>
            <textarea
              rows={4}
              className="input-design resize-none"
              placeholder="Write your response..."
              {...register("reply", { required: true })}
            />
            {errors.reply && (
              <p className="text-red-500 text-sm">Reply is required.</p>
            )}
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-medium">Report Status</label>
            <select
              className="input-design"
              {...register("status", { required: true })}
            >
              <option value="">Select status</option>
              <option value="False_Claim">False Claim</option>
              <option value="Got_Refund">Got Refund</option>
              <option value="Lawyer_Punished">Lawyer Punished</option>
            </select>

            {errors.status && (
              <p className="text-red-500 text-sm">Status is required.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-bprimary text-white py-2 rounded-[5px] font-medium disabled:opacity-60"
          >
            {isLoading ? "Submitting..." : "Submit Response"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
