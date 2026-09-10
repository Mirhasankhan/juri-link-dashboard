"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimationWrapper from "../common/AnimationWrapper";
import { useLoginMutation } from "@/redux/features/authSlice/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice/authSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import mainLogo from "@/assets/logo/logo3.avif";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

interface DecodedToken {
  email: string;
  role: string;
  id: string;
}

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const emailId = useId();
  const passwordId = useId();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await loginUser(data).unwrap();

      if (response?.success) {
        const accessToken = response?.data?.accessToken;
        if (accessToken) {
          const decodeToken = jwtDecode<DecodedToken>(accessToken);
          dispatch(
            setUser({
              accessToken,
              user: {
                email: decodeToken.email,
                role: decodeToken.role,
                id: decodeToken.id.toString(),
              },
            }),
          );
        }
        Cookies.set("token", accessToken, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          path: "/",
        });
        localStorage.setItem("accessToken", accessToken);
        toast.success("Login successful!");
        router.push("/dashboard/overview");
        reset();
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      const message =
        error?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <AnimationWrapper
      animation="fade-right"
      delay={0.1}
      className="w-full max-w-[460px]"
    >
      <div className="flex flex-col w-full">
        {/* Mobile logo — hidden on large screens (shown in AuthWrapper on large) */}
        <div className="flex lg:hidden items-center gap-2 mb-8">
          <Image
            src={mainLogo}
            width={36}
            height={36}
            className="object-contain"
            alt="Juri Link logo"
          />
          <span className="text-[#1a4a62] font-bold text-lg tracking-wide">
            Juri Link
          </span>
        </div>

        {/* Header */}
        <div className="mb-8 space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-[#2e7999]/10 text-[#2e7999] text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2e7999] animate-pulse" />
            Secure Login Portal
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome back 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to your Juri Link dashboard to continue.
          </p>
        </div>

        {/* Demo credentials card */}
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
            Demo Credentials
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-amber-800">
            <span className="font-medium">Email:</span>
            <span className="font-mono">admin@gmail.com</span>
            <span className="font-medium">Password:</span>
            <span className="font-mono">123456</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          {/* Email field */}
          <div className="space-y-1.5">
            <label
              htmlFor={emailId}
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <div
              className={`relative flex items-center transition-all duration-200 rounded-2xl border-2 bg-white shadow-sm
                ${focusedField === "email" ? "border-[#2e7999] shadow-[0_0_0_3px_rgba(46,121,153,0.12)]" : "border-gray-200"}
                ${errors.email ? "border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.15)]" : ""}
              `}
            >
              <Mail
                className={`absolute left-4 w-4 h-4 transition-colors duration-200 ${focusedField === "email" ? "text-[#2e7999]" : "text-gray-400"}`}
              />
              <Input
                id={emailId}
                type="email"
                placeholder="you@example.com"
                className="pl-11 pr-4 py-3 h-12 border-0 bg-transparent ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none rounded-2xl text-gray-800 placeholder:text-gray-400 font-medium text-sm"
                {...register("email")}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 flex items-center gap-1 ml-1">
                <span>⚠</span> {errors.email.message}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor={passwordId}
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              {/* Uncomment if you restore forgot password */}
              {/* <Link href="/forgot-password" className="text-xs text-[#2e7999] hover:underline font-medium">
                Forgot password?
              </Link> */}
            </div>
            <div
              className={`relative flex items-center transition-all duration-200 rounded-2xl border-2 bg-white shadow-sm
                ${focusedField === "password" ? "border-[#2e7999] shadow-[0_0_0_3px_rgba(46,121,153,0.12)]" : "border-gray-200"}
                ${errors.password ? "border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.15)]" : ""}
              `}
            >
              <Lock
                className={`absolute left-4 w-4 h-4 transition-colors duration-200 ${focusedField === "password" ? "text-[#2e7999]" : "text-gray-400"}`}
              />
              <Input
                id={passwordId}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-11 pr-12 py-3 h-12 border-0 bg-transparent ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none rounded-2xl text-gray-800 placeholder:text-gray-400 font-medium text-sm"
                {...register("password")}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
              <button
                type="button"
                className="absolute right-4 text-gray-400 hover:text-[#2e7999] transition-colors duration-150 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 flex items-center gap-1 ml-1">
                <span>⚠</span> {errors.password.message}
              </p>
            )}
          </div>

          {/* Sign in button */}
          <Button
            type="submit"
            id="login-submit-btn"
            disabled={isLoading}
            className="w-full h-12 rounded-2xl font-semibold text-sm tracking-wide text-white
              bg-gradient-to-r from-[#2e7999] to-[#1a5f7a]
              hover:from-[#1a5f7a] hover:to-[#134e66]
              disabled:opacity-60 disabled:cursor-not-allowed
              shadow-md hover:shadow-lg transition-all duration-200
              flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In…
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </>
            )}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} Juri Link. All rights reserved.
        </p>
      </div>
    </AnimationWrapper>
  );
}
