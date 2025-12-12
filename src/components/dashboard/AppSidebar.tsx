"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import logo from "@/assets/logo/logo2.png";
import { LayoutDashboard, Users, UserCheck, LogOut, Settings, ListMinus, CircleDollarSign, UserCog } from "lucide-react"
import { FaWallet } from "react-icons/fa";

// Menu items
const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard/overview" },
  { title: "User Management", icon: Users, href: "/dashboard/users" },
  { title: "Service Management", icon: ListMinus, href: "/dashboard/services" },
  { title: "Provider Management", icon: UserCheck, href: "/dashboard/providers" },
  { title: "Admin & Role", icon: UserCog, href: "/dashboard/admin-management" },
    { title: "Withdraws", icon: FaWallet, href: "/dashboard/withdraws" },
  { title: "Earning Overview", icon: CircleDollarSign, href: "/dashboard/transfer" },
  // { title: "Help Center", icon: HelpCircle, href: "/dashboard/help" },
  // { title: "Message", icon: MessageCircle, href: "/dashboard/messages" },
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    console.log("clicked");
    try {
      // Clear localStorage and cookies
      localStorage.removeItem("accessToken")
      Cookies.remove("token")
      localStorage.removeItem("persist:auth")
      // Optional: Clear sessionStorage if needed
      sessionStorage.clear()
      router.push("/login")
      console.log("came here"); // Redirect to the home page
      // window.location.reload()
 
      toast.success("Logout successful")
    } catch (err) {
      console.error("Logout Error:", err)
      toast.error("There was an error logging out.")
    }
  }

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
           <Link href="/">
            <Image
              src={logo}
              alt="Quick Online Deals"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
         <SidebarMenu className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const IconComponent = item.icon

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      w-full h-12 rounded-lg transition-all duration-200 text-white 
                      ${
                        isActive
                          ? "bg-bprimary hover:bg-bprimary/80"
                          : "text-gray-600 "
                      }
                    `}
                  >
                    <Link href={item.href} className="flex items-center gap-3 px-3">
                      <IconComponent className="h-8 w-8 flex-shrink-0" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <button onClick={handleLogout}  className="w-full bg-bprimary/10  text-bprimary cursor-pointer justify-start gap-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}