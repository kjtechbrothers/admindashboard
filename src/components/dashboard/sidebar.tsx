"use client";

import { LayoutDashboard, Users, Bell, BrainCircuit, Settings, LogOut } from "lucide-react"; // Added LogOut
import { cn } from "@/src/lib/utils";
import { CompanySwitcher } from "./company-switcher";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/use-auth-store"; // Import Auth

const routes = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Employees", icon: Users, href: "/employees" },
  { label: "Notifications", icon: Bell, href: "/notifications" },
  { label: "AI Assistant", icon: BrainCircuit, href: "/ai-assistant" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuthStore(); // Use logout function

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d18] border-r border-white/5 w-64 p-4 gap-6">
      <div className="flex flex-col gap-1 px-2">
        <h1 className="text-lg font-bold text-white tracking-tighter">DigitalSoft ERP</h1>
        <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Smart Cloud</p>
      </div>

      <CompanySwitcher />

      <nav className="flex flex-col gap-1.5 flex-1 pt-4">
        {routes.map((route) => (
          <Link key={route.href} href={route.href}>
            <div className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group",
              pathname === route.href 
                ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                : "text-white/40 hover:bg-white/5 hover:text-white"
            )}>
              <route.icon size={18} />
              {route.label}
            </div>
          </Link>
        ))}
      </nav>

      {/* FOOTER AREA - User Info and Logout */}
      <div className="pt-6 border-t border-white/5 flex flex-col gap-2">
        <div className="px-4 py-3 bg-white/2 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
            {user?.name?.charAt(0)}
          </div>
          <div className="min-w-0">
             <p className="text-white text-xs font-semibold truncate">{user?.name}</p>
             <p className="text-white/20 text-[9px] uppercase tracking-widest">{user?.role}</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-500/60 hover:text-rose-400 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}