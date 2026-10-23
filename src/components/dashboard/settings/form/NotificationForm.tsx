"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const notificationFormSchema = z.object({
  productUpdates: z.boolean().default(true),
  comments: z.boolean().default(false),
  checkoutProduct: z.boolean().default(true),
}).partial()

type NotificationFormValues = z.infer<typeof notificationFormSchema>

export function NotificationForm() {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      productUpdates: true,
      comments: false,
      checkoutProduct: true,
    },
  })

  function onSubmit(data: NotificationFormValues) {
    console.log("Notification form submitted:", data)
    toast.success("Notification preferences saved")
  }

  return (
    <Card className="border-none shadow-none p-0">
      <CardHeader className="p-0 pb-5 border-b border-slate-100">
        <CardTitle className="text-lg font-bold text-slate-900">
          System Notifications
        </CardTitle>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure which administrative and security alerts you wish to receive
        </p>
      </CardHeader>
      <CardContent className="p-0 pt-6 space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 max-w-xl">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70">
            <div>
              <Label htmlFor="productUpdates" className="text-xs font-semibold text-slate-800 cursor-pointer">
                Platform & Product Updates
              </Label>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Receive notifications when new platform features or maintenance windows are scheduled
              </p>
            </div>
            <Switch
              id="productUpdates"
              checked={form.watch("productUpdates")}
              onCheckedChange={(value) => form.setValue("productUpdates", value)}
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70">
            <div>
              <Label htmlFor="comments" className="text-xs font-semibold text-slate-800 cursor-pointer">
                User Feedback & Reports
              </Label>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Get alerted whenever a client or attorney submits an issue report
              </p>
            </div>
            <Switch
              id="comments"
              checked={form.watch("comments")}
              onCheckedChange={(value) => form.setValue("comments", value)}
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70">
            <div>
              <Label htmlFor="checkoutProduct" className="text-xs font-semibold text-slate-800 cursor-pointer">
                Payout & Withdrawal Requests
              </Label>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Instant alerts when a lawyer requests a bank transfer payout
              </p>
            </div>
            <Switch
              id="checkoutProduct"
              checked={form.watch("checkoutProduct")}
              onCheckedChange={(value) => form.setValue("checkoutProduct", value)}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="bg-bprimary hover:bg-bprimary/90 text-white font-semibold text-xs sm:text-sm py-2.5 px-6 rounded-xl shadow-xs transition-all"
            >
              Save Preferences
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
