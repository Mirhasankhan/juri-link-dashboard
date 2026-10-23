"use client"

import { BasicForm } from "./form/BasicForm"
import { NotificationForm } from "./form/NotificationForm"
import { PasswordForm } from "./form/PasswordForm"


interface SettingsContentProps {
  activeSection: "basic" | "account" | "notifications"
}

export function SettingsContent({ activeSection }: SettingsContentProps) {
  return (
    <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
      {activeSection === "basic" && <BasicForm />}
      {activeSection === "account" && <PasswordForm />}
      {activeSection === "notifications" && <NotificationForm />}
    </div>
  )
}
