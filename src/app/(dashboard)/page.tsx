"use client";

import { useTenantStore } from "../../store/use-tenant-store";
import { useAuthStore } from "@/src/store/use-auth-store";
import { useAnalyticsStore } from "@/src/store/use-analytics-store"; // 1. Import new store
import { useNotificationStore } from "@/src/store/use-notification-store";
import { getDashboardData } from "../../lib/mock-data";
import { StatCard } from "../../components/analytics/stat-card";
import { OverviewChart } from "../../components/analytics/overview-chart";
import { DollarSign, Users, Package, Activity, Zap, Crown, Eye, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { currentTenant } = useTenantStore();
  const { user } = useAuthStore();
  const { stats, fetchStats, isLoading: statsLoading } = useAnalyticsStore(); // 2. Use analytics hook
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    if (currentTenant) {
      // 3. Fetch real numbers from Supabase
      fetchStats(currentTenant.id);
      
      const timer = setTimeout(() => {
        addNotification(`Neural sync complete for ${currentTenant.name}`, currentTenant.id);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [currentTenant, addNotification, fetchStats]);

  // Loading Guard
  if (!currentTenant || statsLoading || !stats) {
    return (
      <div className="h-[80vh] w-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
        <p className="text-white/20 font-mono text-[10px] tracking-widest uppercase">Fetching Neural Analytics...</p>
      </div>
    );
  }

  // Chart data still uses mock for now (you can make this dynamic later)
 // Use optional chaining or the ! operator
const chartData = currentTenant ? getDashboardData(currentTenant.id).chart : [];

  return (
    <div className="p-8 min-h-screen bg-[#07070f] space-y-10">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <div className="flex items-center gap-2 text-indigo-400 mb-1">
          <Zap className="h-3 w-3 fill-current" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-black">Business Intelligence</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
          <h2 className="text-white text-3xl font-bold tracking-tight">
            Welcome back, {user?.name || "Admin"}
          </h2>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border mb-1 w-fit ${user?.role === 'Admin' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
            {user?.role === 'Admin' ? <Crown size={12} /> : <Eye size={12} />}
            <span className="text-[10px] font-black uppercase tracking-widest">{user?.role} Session</span>
          </div>
        </div>
        <p className="text-white/40 text-sm mt-1 uppercase tracking-widest text-[10px]">
          Workspace: <span className="text-indigo-400 font-bold">{currentTenant.name}</span>
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* 4. Display the REAL Database Stats */}
        <StatCard title="Revenue" value={stats.revenue} icon={DollarSign} trend="+12%" description="Real-time data" />
        <StatCard title="Active Users" value={stats.active_users} icon={Users} trend="+4" description="Real-time data" />
        <StatCard title="Orders" value={stats.orders} icon={Package} trend="+18%" description="Real-time data" />
        <StatCard title="Delivery" value={stats.delivery_rate} icon={Activity} trend="+2%" description="Real-time data" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <OverviewChart data={chartData} />
      </motion.div>
    </div>
  );
}