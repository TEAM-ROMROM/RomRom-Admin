"use client"

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
import { Home, Inbox, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/(with-layout)/_shared/services/logout-api";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  }
]

export default function AppSidebar() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onClickLogout = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  }

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
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuItem key="로그아웃">
            <SidebarMenuButton asChild>
              <Button
                  className="hover:cursor-pointer"
                  onClick={onClickLogout}
                  disabled={loading}
              >
                {loading ? "로그아웃 중..." : "로그아웃"}
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>
  );
};