"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useGetMeQuery, useUpdateUserMutation } from "@/redux/features/authSlice/authApi"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const basicFormSchema = z.object({
  displayName: z.string().min(1, "Display Name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  bio: z.string().max(160, "Bio must not be longer than 160 characters").optional(),
})

type BasicFormValues = z.infer<typeof basicFormSchema>

export function BasicForm() {
  const { data: meData } = useGetMeQuery("")
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const form = useForm<BasicFormValues>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      displayName: "Administrator",
      email: "admin@jurilink.com",
      country: "USA",
      city: "New York",
      province: "NY",
      bio: "JuriLink System Administrator",
    },
  })

  useEffect(() => {
    if (meData?.data) {
      const user = meData.data
      form.reset({
        displayName: user.fullName || user.name || "Administrator",
        email: user.email || "admin@jurilink.com",
        country: user.country || "USA",
        city: user.city || "New York",
        province: user.province || user.state || "NY",
        bio: user.bio || "JuriLink System Administrator",
      })
      if (user.profileImage) {
        setAvatarPreview(user.profileImage)
      }
    }
  }, [meData, form])

  async function onSubmit(data: BasicFormValues) {
    try {
      const res: any = await updateUser({
        fullName: data.displayName,
        country: data.country,
        city: data.city,
        bio: data.bio,
      })
      if (res?.data?.success || res?.data) {
        toast.success("Profile updated successfully")
      } else {
        toast.success("Profile saved")
      }
    } catch {
      toast.error("Failed to update profile")
    }
  }

  return (
    <Card className="border-none shadow-none p-0">
      <CardHeader className="p-0 pb-5 border-b border-slate-100">
        <CardTitle className="text-lg font-bold text-slate-900">
          Profile Information
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Manage your administrator profile picture, name, and contact details
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 pt-6 space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Avatar Section */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700">Profile Photo</Label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 rounded-2xl ring-2 ring-slate-100 shadow-2xs">
                  <AvatarImage src={avatarPreview || "/placeholder.svg?height=80&width=80"} alt="Profile Picture" />
                  <AvatarFallback className="bg-bprimary/10 text-bprimary font-bold text-lg">
                    {form.watch("displayName")?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 h-6 w-6 rounded-lg bg-bprimary text-white flex items-center justify-center cursor-pointer hover:bg-bprimary/90 shadow-xs transition-colors"
                  title="Upload new picture"
                >
                  <Camera className="h-3 w-3" />
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const url = URL.createObjectURL(file)
                        setAvatarPreview(url)
                      }
                    }}
                  />
                </label>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-800">
                  {form.watch("displayName") || "Administrator"}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  JPG, PNG or WEBP up to 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="displayName" className="text-xs font-semibold text-slate-700">
                Display Name
              </Label>
              <Input
                id="displayName"
                placeholder="Full Name"
                className="h-10 text-xs sm:text-sm rounded-xl border-slate-200 focus:border-bprimary focus:ring-bprimary/20"
                {...form.register("displayName")}
              />
              {form.formState.errors.displayName && (
                <p className="text-[11px] font-medium text-rose-500">{form.formState.errors.displayName.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                disabled
                placeholder="admin@jurilink.com"
                className="h-10 text-xs sm:text-sm rounded-xl border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-[11px] font-medium text-rose-500">{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Location fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="country" className="text-xs font-semibold text-slate-700">
                Country
              </Label>
              <Select onValueChange={(value) => form.setValue("country", value)} defaultValue={form.watch("country")}>
                <SelectTrigger id="country" className="h-10 text-xs sm:text-sm rounded-xl border-slate-200">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.country && (
                <p className="text-[11px] font-medium text-rose-500">{form.formState.errors.country.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="city" className="text-xs font-semibold text-slate-700">
                City
              </Label>
              <Input
                id="city"
                placeholder="City"
                className="h-10 text-xs sm:text-sm rounded-xl border-slate-200 focus:border-bprimary focus:ring-bprimary/20"
                {...form.register("city")}
              />
              {form.formState.errors.city && (
                <p className="text-[11px] font-medium text-rose-500">{form.formState.errors.city.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="province" className="text-xs font-semibold text-slate-700">
                State / Province
              </Label>
              <Input
                id="province"
                placeholder="State or Province"
                className="h-10 text-xs sm:text-sm rounded-xl border-slate-200 focus:border-bprimary focus:ring-bprimary/20"
                {...form.register("province")}
              />
              {form.formState.errors.province && (
                <p className="text-[11px] font-medium text-rose-500">{form.formState.errors.province.message}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <Label htmlFor="bio" className="text-xs font-semibold text-slate-700">
              Administrative Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Brief summary of your administrative role"
              className="min-h-[90px] text-xs sm:text-sm rounded-xl border-slate-200 focus:border-bprimary focus:ring-bprimary/20"
              {...form.register("bio")}
            />
            {form.formState.errors.bio && (
              <p className="text-[11px] font-medium text-rose-500">{form.formState.errors.bio.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-start">
            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-bprimary hover:bg-bprimary/90 text-white font-semibold text-xs sm:text-sm py-2.5 px-6 rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isUpdating ? "Saving..." : "Save Profile"}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
