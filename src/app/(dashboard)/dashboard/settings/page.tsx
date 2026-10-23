"use client"

import { SettingsContent } from "@/components/dashboard/settings/SettingsContent"
import { SettingsSidebar } from "@/components/dashboard/settings/SettingsSidebar"
import { useState } from "react"
// import { SettingsSidebar } from "@/components/settings-sidebar"
// import { SettingsContent } from "@/components/settings-content"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<"basic" | "account" | "notifications">("basic")

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 md:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
          Admin Settings & Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your administrator profile details, security credentials, and alert preferences
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <SettingsSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <SettingsContent activeSection={activeSection} />
      </div>
    </div>
  )
}
