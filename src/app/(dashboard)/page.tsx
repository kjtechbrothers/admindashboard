"use client";

import { useEffect, useState } from "react";
import { DollarSign, Users, Package, Activity } from "lucide-react";
import { useTenantStore } from "../../store/use-tenant-store";
import { getDashboardData } from "../../lib/mock-data";
import { StatCard } from "../../components/analytics/stat-card";
import { OverviewChart } from "../../components/analytics/overview-chart";
import { useNotificationStore } from "@/src/store/use-notification-store";
import { motion } from "framer-motion";

interface DashboardData {
  stats: { orders: string; revenue: string; users: string; delivery: string };
  chart: { name: string; value: number }[];
}

export default function DashboardPage() {
  const { currentTenant } = useTenantStore();
  const [data, setData] = useState<DashboardData>(getDashboardData(currentTenant.id));
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification(`New order received from ${currentTenant.name} portal!`, currentTenant.id);
    }, 8000);
    return () => clearTimeout(timer);
  }, [currentTenant, addNotification]);

  useEffect(() => {
    setData(getDashboardData(currentTenant.id));
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          users: (parseInt(prev.stats.users.replace(",", "")) + Math.floor(Math.random() * 5)).toLocaleString(),
        },
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTenant]);

  const stats = [
    { title: "Total Revenue", value: data.stats.revenue, icon: DollarSign, trend: "+12%", description: "from last month" },
    { title: "Active Users",  value: data.stats.users,   icon: Users,      trend: "+4",   description: "joined in last hour" },
    { title: "Total Orders",  value: data.stats.orders,  icon: Package,    trend: "+18%", description: "since yesterday" },
    { title: "Delivery Rate", value: data.stats.delivery,icon: Activity,   trend: "+2%",  description: "speed increase" },
  ];

  return (
    <div className="space-y-8 p-8 min-h-screen bg-[#07070f]">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-white/30 text-xs uppercase tracking-widest font-medium mb-1">Overview</p>
        <h2 className="text-white text-2xl font-bold tracking-tight">Welcome back, Kashif</h2>
        <p className="text-white/40 text-sm mt-1">
          Here's what's happening at{" "}
          <span className="text-indigo-400 font-semibold">{currentTenant.name}</span> today.
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.title} {...s} index={i} />
        ))}
      </div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}>
        <OverviewChart data={data.chart} />
      </motion.div>
    </div>
  );
}