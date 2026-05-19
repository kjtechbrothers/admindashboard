"use client";

import { useTenantStore } from "../../store/use-tenant-store";
import { useAuthStore } from "@/src/store/use-auth-store"; // 1. IMPORT AUTH STORE
import { getDashboardData } from "../../lib/mock-data";
import { StatCard } from "../../components/analytics/stat-card";
import { OverviewChart } from "../../components/analytics/overview-chart";
import { DollarSign, Users, Package, Activity, Zap, Crown, Eye } from "lucide-react"; // Added Icons
import { useEffect, useState } from "react";
import { useNotificationStore } from "@/src/store/use-notification-store";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { currentTenant } = useTenantStore();
  const { user } = useAuthStore(); // 2. GET USER DATA
  const [data, setData] = useState(getDashboardData(currentTenant.id));
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    setData(getDashboardData(currentTenant.id));
    const timer = setTimeout(() => {
      addNotification(`Market sync complete for ${currentTenant.name}`, currentTenant.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentTenant, addNotification]);

  return (
    <div className="p-8 min-h-screen bg-[#07070f] space-y-10">
      
      {/* --- DYNAMIC HEADER SECTION --- */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <div className="flex items-center gap-2 text-indigo-400 mb-1">
          <Zap className="h-3 w-3 fill-current" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-black">Live Intelligence</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
          {/* 3. DYNAMIC NAME IN GREETING */}
          <h2 className="text-white text-3xl font-bold tracking-tight">
            Welcome back, {user?.name || "User"}
          </h2>
          
          {/* 4. ROLE BADGE */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border mb-1 w-fit ${
            user?.role === 'Admin' 
            ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' 
            : 'bg-white/5 border-white/10 text-white/40'
          }`}>
            {user?.role === 'Admin' ? <Crown size={12} /> : <Eye size={12} />}
            <span className="text-[10px] font-black uppercase tracking-widest">{user?.role} Session</span>
          </div>
        </div>

        <p className="text-white/40 text-sm mt-1 uppercase tracking-widest text-[10px]">
          Workspace: <span className="text-indigo-400 font-bold">{currentTenant.name}</span>
        </p>
      </motion.div>

      {/* --- STAT CARDS --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Revenue" value={data.stats.revenue} icon={DollarSign} trend="+12%" description="vs last month" />
        <StatCard title="Active Users" value={data.stats.users} icon={Users} trend="+4" description="live now" />
        <StatCard title="Orders" value={data.stats.orders} icon={Package} trend="+18%" description="today" />
        <StatCard title="Delivery" value={data.stats.delivery} icon={Activity} trend="+2%" description="efficiency" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <OverviewChart data={data.chart} />
      </motion.div>
    </div>
  );
}