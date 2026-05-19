"use client";

import { LayoutDashboard, Users, Bell, BrainCircuit, Settings } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { CompanySwitcher } from "./company-switcher";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNotificationStore } from "@/src/store/use-notification-store";

const routes = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Employees", icon: Users, href: "/employees" },
  { label: "Notifications", icon: Bell, href: "/notifications" },
  { label: "AI Assistant", icon: BrainCircuit, href: "/ai-assistant" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { notifications } = useNotificationStore();

  return (
    <div className="flex flex-col h-full w-64 bg-[#07070f] border-r border-white/5 p-4 gap-6">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 pt-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/30 shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-none tracking-tight">DigitalSoft</p>
          <p className="text-white/30 text-[10px] mt-0.5">ERP Cloud</p>
        </div>
      </div>

      <CompanySwitcher />

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {routes.map((route) => {
          const active = pathname === route.href;
          const hasNotif = route.label === "Notifications" && notifications.length > 0;
          return (
            <Link key={route.href} href={route.href}>
              <div className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              )}>
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-indigo-400 to-violet-500 rounded-full" />
                )}
                <route.icon className={cn("h-4 w-4 shrink-0", active ? "text-indigo-400" : "")} />
                {route.label}
                {hasNotif && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#07070f]" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 cursor-pointer transition-all text-sm">
        <Settings className="h-4 w-4" />
        Settings
      </div>
    </div>
  );
}