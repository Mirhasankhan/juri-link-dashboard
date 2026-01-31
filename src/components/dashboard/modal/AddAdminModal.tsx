"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateAdminMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { UserPlus, Mail, Lock, UserCog, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateAdminModal() {
  const [open, setOpen] = useState(false);
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const [selectedRole, setSelectedRole] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const response: any = await createAdmin(data);
    if (response.data) {
      toast.success(response.data.message);
      setOpen(false);
      reset();
      setSelectedRole("");
    } else {
      toast.error(response.error?.data?.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Admin
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-blue-600" />
            Create New Admin
          </DialogTitle>
          <DialogDescription>
            Add a new administrator to manage the platform. Fill in all required
            information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-2">
          {/* Admin Name */}
          <div className="space-y-2">
            <Label
              htmlFor="adminName"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <UserCog className="h-4 w-4" />
              Admin Name
            </Label>
            <Input
              id="adminName"
              className="h-11"
              placeholder="Enter admin full name"
              {...register("adminName", { required: true })}
            />
            {errors.adminName && (
              <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <span className="text-red-500">⚠</span> Admin name is required
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              className="h-11"
              placeholder="admin@example.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <span className="text-red-500">⚠</span> Email address is
                required
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Lock className="h-4 w-4" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="h-11"
              placeholder="Create a secure password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <span className="text-red-500">⚠</span> Password is required
              </p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label
              htmlFor="role"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <UserCog className="h-4 w-4" />
              Admin Role
            </Label>
            <Select
              value={selectedRole}
              onValueChange={(value) => {
                setSelectedRole(value);
                setValue("role", value);
              }}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select an admin role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UserAdmin">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="font-medium">User Admin</span>
                  </div>
                </SelectItem>
                <SelectItem value="FinanceAdmin">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-medium">Finance Admin</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register("role", { required: true })}
              value={selectedRole}
            />
            {errors.role && (
              <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <span className="text-red-500">⚠</span> Please select a role
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setOpen(false);
                reset();
                setSelectedRole("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Admin
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
