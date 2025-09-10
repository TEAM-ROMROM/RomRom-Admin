import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { Home, Inbox, Settings, User } from "lucide-react";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "홈",
    url: "/",
    icon: Home,
  },
  {
    title: "물품관리",
    url: "/item",
    icon: Inbox,
  },
  {
    title: "회원관리",
    url: "/member",
    icon: User,
  },
  {
    title: "로그아웃",
    url: "/logout",
    icon: Settings
  }
]

export default function AppSidebar() {
  return (
      <Sidebar>
        <SidebarHeader>
          <div className="flex flex-row items-center gap-5">
            <Image src="icons/logo.svg" alt="logo" width="50" height="50" />
            <div className="text-2xl font-bold">RomRom</div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>RomRom</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
  )
};