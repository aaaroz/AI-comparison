"use client"

import Link from "next/link"

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
} from "@/components/ui/sidebar"

import {
  ChartBarIcon,
  ArrowsLeftRightIcon,
  GearIcon,
  SparkleIcon,
} from "@phosphor-icons/react"

const items = [
  {
    title: "Dashboard",
    icon: ChartBarIcon,
    url: "/dashboard",
  },
  {
    title: "Compare",
    icon: ArrowsLeftRightIcon,
    url: "/compare",
  },
  {
    title: "Benchmarks",
    icon: SparkleIcon,
    url: "/benchmarks",
  },
  {
    title: "Settings",
    icon: GearIcon,
    url: "/settings",
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-group-[collapsible=icon]:justify-center"
            >
              <SparkleIcon size={20} />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">AI Compare</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link href={item.url}>
                      <item.icon size={20} />
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
        <div className="px-2 py-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          Gemini vs Alibaba
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
