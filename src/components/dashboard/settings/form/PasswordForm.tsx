"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useChangePasswordMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";

const passwordFormSchema = z
  .object({
    oldPassword: z.string().min(1, "Old Password is required"),
    newPassword: z
      .string()
      .min(8, "New Password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "New Password must contain letters")
      .regex(/[0-9]/, "New Password must contain numbers"),
    confirmNewPassword: z.string().min(1, "Confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export function PasswordForm() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(data: PasswordFormValues) {
    const newData = {
      newPassword: data.newPassword,
      oldPassword: data.oldPassword,
    };
    try {
      const response: any = await changePassword(newData);
      if (response?.data?.success || response?.data) {
        toast.success(response?.data?.message || "Password updated successfully");
        form.reset();
      } else {
        toast.error(response?.error?.data?.message || "Failed to update password");
      }
    } catch {
      toast.error("An error occurred while updating password");
    }
  }

  return (
    <Card className="border-none shadow-none p-0">
      <CardHeader className="p-0 pb-5 border-b border-slate-100">
        <CardTitle className="text-lg font-bold text-slate-900">
          Password & Security
        </CardTitle>
        <p className="text-xs text-slate-500 mt-0.5">
          Update your administrator credentials to keep your dashboard account secure
        </p>
      </CardHeader>
      <CardContent className="p-0 pt-6 space-y-5">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
          <div className="space-y-1.5">
            <Label htmlFor="oldPassword" className="text-xs font-semibold text-slate-700">
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="h-10 pr-10 text-xs sm:text-sm rounded-xl border-slate-200 focus:border-bprimary focus:ring-bprimary/20"
                {...form.register("oldPassword")}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showOldPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showOldPassword ? "Hide password" : "Show password"}
                </span>
              </button>
            </div>
            {form.formState.errors.oldPassword && (
              <p className="text-[11px] font-medium text-rose-500">
                {form.formState.errors.oldPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="newPassword" className="text-xs font-semibold text-slate-700">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password (min. 8 characters)"
                className="h-10 pr-10 text-xs sm:text-sm rounded-xl border-slate-200 focus:border-bprimary focus:ring-bprimary/20"
                {...form.register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showNewPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showNewPassword ? "Hide password" : "Show password"}
                </span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Minimum 8 characters with letters and numbers
            </p>
            {form.formState.errors.newPassword && (
              <p className="text-[11px] font-medium text-rose-500">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmNewPassword" className="text-xs font-semibold text-slate-700">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmNewPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                className="h-10 pr-10 text-xs sm:text-sm rounded-xl border-slate-200 focus:border-bprimary focus:ring-bprimary/20"
                {...form.register("confirmNewPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </button>
            </div>
            {form.formState.errors.confirmNewPassword && (
              <p className="text-[11px] font-medium text-rose-500">
                {form.formState.errors.confirmNewPassword.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-bprimary hover:bg-bprimary/90 text-white font-semibold text-xs sm:text-sm py-2.5 px-6 rounded-xl shadow-xs transition-all"
            >
              {isLoading ? "Updating Password..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
