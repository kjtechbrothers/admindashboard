"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/src/store/use-notification-store";
import { useTenantStore } from "@/src/store/use-tenant-store";
import { Bell, Info, Trash2, BellOff, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationsPage() {
  const { currentTenant } = useTenantStore();
  const { notifications, fetchNotifications, isLoading } = useNotificationStore();

  // 1. Fetch on load and on tenant switch
  useEffect(() => {
    if (currentTenant?.id) {
      fetchNotifications(currentTenant.id);
    }
  }, [currentTenant?.id, fetchNotifications]);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
        <p className="text-white/20 font-mono text-[10px] tracking-widest uppercase">Fetching logs...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 bg-[#07070f] min-h-screen text-white">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-indigo-400 text-[10px] uppercase tracking-widest font-bold mb-1 italic">Log History</p>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {notifications.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl">
              <BellOff className="mx-auto h-8 w-8 text-white/10 mb-2" />
              <p className="text-white/20 text-sm">No activity logs for {currentTenant?.name}</p>
            </div>
          ) : (
            notifications.map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} 
                className="group relative flex items-start gap-4 p-5 bg-[#0d0d18] border border-white/5 rounded-2xl transition-all hover:bg-white/2">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20 text-indigo-400">
                  <Bell size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">System Alert</span>
                    <span className="text-[10px] text-white/20 font-mono">
                       {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">{n.message}</p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}