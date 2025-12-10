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
import { useCreateAdminMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";

export default function CreateAdminModal() {
  const [open, setOpen] = useState(false);
  const [createAdmin, {isLoading}] = useCreateAdminMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const response: any = await createAdmin(data);
    if (response.data) {
      toast.success(response.data.message);
      setOpen(false);
      reset();
    } else {
      toast.error(response.error?.data?.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-bprimary text-white rounded-[6px] font-medium px-4 py-2 cursor-pointer">
          Add New Admin
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Admin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Admin Name */}
          <div className="flex flex-col gap-1">
            <label className="block pb-1 text-gray-500 font-medium">
              Admin Name
            </label>
            <input
              className="input-design"
              placeholder="Enter admin name"
              {...register("adminName", { required: true })}
            />
            {errors.adminName && (
              <p className="text-red-500 text-sm">Admin name is required.</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="block pb-1 text-gray-500 font-medium">
              Email
            </label>
            <input
              type="email"
              className="input-design"
              placeholder="Enter email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required.</p>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="block pb-1 text-gray-500 font-medium">
              Password
            </label>
            <input
              type="password"
              className="input-design"
              placeholder="Enter password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required.</p>
            )}
          </div>

          {/* Role - Normal Select */}
          <div className="flex flex-col gap-1">
            <label className="block pb-1 text-gray-500 font-medium">Role</label>
            <select
              className="input-design"
              {...register("role", { required: true })}
            >
              <option value="">Select role</option>
              <option value="UserAdmin">UserAdmin</option>
              <option value="FinanceAdmin">FinanceAdmin</option>
            </select>

            {errors.role && (
              <p className="text-red-500 text-sm">Role is required.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-bprimary cursor-pointer text-white py-2 rounded-[5px] font-medium"
          >
            {
                isLoading ? "Creating" :"Submit"
            }
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
