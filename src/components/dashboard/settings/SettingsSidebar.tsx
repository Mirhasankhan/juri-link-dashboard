"use client"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, User, Lock, Bell } from "lucide-react"

interface SettingsSidebarProps {
  activeSection: "basic" | "account" | "notifications"
  setActiveSection: (section: "basic" | "account" | "notifications") => void
}

export function SettingsSidebar({ activeSection, setActiveSection }: SettingsSidebarProps) {
  const navItems = [
    { id: "basic" as const, label: "Profile Information", icon: User },
    { id: "account" as const, label: "Password & Security", icon: Lock },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
  ]

  return (
    <div className="w-full md:w-64 shrink-0">
      <nav className="flex flex-row md:flex-col gap-1.5 p-1.5 bg-slate-100/70 md:bg-transparent rounded-2xl md:rounded-none overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all select-none cursor-pointer whitespace-nowrap",
                isActive
                  ? "bg-bprimary text-white shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white md:hover:bg-slate-100/80"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-slate-500")} />
                <span>{item.label}</span>
              </div>
              <ChevronRightIcon className={cn("hidden md:block h-4 w-4 shrink-0", isActive ? "text-white" : "text-slate-400")} />
            </button>
          )
        })}
      </nav>
    </div>
  )
}
