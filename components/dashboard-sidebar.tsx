"use client"

import { CardFooter } from "@/components/ui/card"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
  FileText,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  MapPin,
  Globe,
  AlertTriangle,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [username, setUsername] = useState("John Doe")
  const [role, setRole] = useState("Admin")
  const [notificationCount, setNotificationCount] = useState(3)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  // Set initial theme based on system preference
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }

    // Demo: Check URL for role parameter
    const url = new URL(window.location.href)
    const roleParam = url.searchParams.get("role")
    if (roleParam === "client") {
      setUsername("Sarah Johnson")
      setRole("Client")
    } else if (roleParam === "employee") {
      setUsername("Mike Williams")
      setRole("Employee")
    }
  }, [])

  const handleShowNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
    if (notificationCount > 0) {
      setNotificationCount(0)
    }
  }

  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex flex-col items-center justify-center py-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-2"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">CargoFlow</span>
            </motion.div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div variants={variants}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                      <Link href="/dashboard">
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>

                <motion.div variants={variants}>
                  <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <Package className="h-5 w-5" />
                          <span>Cargo</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={pathname === "/dashboard/cargo/all"}>
                              <Link href="/dashboard/cargo/all">All Cargo</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={pathname === "/dashboard/cargo/add"}>
                              <Link href="/dashboard/cargo/add">Add New</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={pathname === "/dashboard/cargo/tracking"}>
                              <Link href="/dashboard/cargo/tracking">Tracking</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </motion.div>

                <motion.div variants={variants}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/shipments"}>
                      <Link href="/dashboard/shipments">
                        <Truck className="h-5 w-5" />
                        <span>Shipments</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>24</SidebarMenuBadge>
                  </SidebarMenuItem>
                </motion.div>

                <motion.div variants={variants}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/location"}>
                      <Link href="/dashboard/location">
                        <MapPin className="h-5 w-5" />
                        <span>Live Tracking</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>

                <motion.div variants={variants}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/users"}>
                      <Link href="/dashboard/users">
                        <Users className="h-5 w-5" />
                        <span>Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>

                <motion.div variants={variants}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/invoices"}>
                      <Link href="/dashboard/invoices">
                        <FileText className="h-5 w-5" />
                        <span>Invoices</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>

                <motion.div variants={variants}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/reports"}>
                      <Link href="/dashboard/reports">
                        <BarChart3 className="h-5 w-5" />
                        <span>Reports</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>

                <motion.div variants={variants}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
                      <Link href="/dashboard/settings">
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              </motion.div>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>
                    {username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{username}</span>
                  <span className="text-xs text-muted-foreground">{role}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b flex items-center justify-between px-6 bg-background sticky top-0 z-10">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-semibold"
              >
                Dashboard
              </motion.h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button variant="outline" size="icon" onClick={handleShowNotifications}>
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs"
                    >
                      {notificationCount}
                    </motion.span>
                  )}
                </Button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 z-50"
                    >
                      <Card className="border shadow-lg">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="max-h-96 overflow-auto p-0">
                          <div className="divide-y">
                            {[
                              {
                                title: "Shipment Delayed",
                                desc: "CT-7832 is delayed at Chicago warehouse",
                                time: "10 min ago",
                                icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
                                isNew: true,
                              },
                              {
                                title: "New Shipment Added",
                                desc: "CT-7840 has been added to your account",
                                time: "25 min ago",
                                icon: <Package className="h-4 w-4 text-blue-500" />,
                                isNew: true,
                              },
                              {
                                title: "Shipment Delivered",
                                desc: "CT-7825 has been delivered successfully",
                                time: "1 hour ago",
                                icon: <Truck className="h-4 w-4 text-green-500" />,
                                isNew: true,
                              },
                              {
                                title: "System Update",
                                desc: "CargoFlow will be updated on June 15",
                                time: "5 hours ago",
                                icon: <Globe className="h-4 w-4 text-gray-500" />,
                                isNew: false,
                              },
                            ].map((notification, i) => (
                              <div
                                key={i}
                                className={`p-3 flex gap-3 hover:bg-muted/50 cursor-pointer ${notification.isNew ? "bg-primary/5" : ""}`}
                              >
                                <div className="mt-0.5">{notification.icon}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between">
                                    <p className="font-medium text-sm">{notification.title}</p>
                                    {notification.isNew && (
                                      <Badge variant="outline" className="ml-2 bg-primary/10 text-primary text-xs">
                                        New
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground truncate">{notification.desc}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button variant="link" size="sm" className="mx-auto">
                            View all notifications
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <span>{username}</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Help & Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      toast({
                        title: "Logged out",
                        description: "You have been logged out successfully",
                      })
                      setTimeout(() => {
                        window.location.href = "/login"
                      }, 1000)
                    }}
                    className="text-red-500 focus:text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

