"use client";

import { useNotificationStore } from "@/src/store/use-notification-store";
import { useTenantStore } from "@/src/store/use-tenant-store";
import { Bell, Info, Trash2, BellOff, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cardCls = "group relative flex items-start gap-4 p-5 bg-[#0d0d18] border border-white/5 rounded-2xl transition-all hover:bg-white/[0.02]";

export default function NotificationsPage() {
  const { currentTenant } = useTenantStore();
  const { notifications } = useNotificationStore();
  const list = notifications.filter(n => n.tenantId === currentTenant.id);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 bg-[#07070f] min-h-screen text-white">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-indigo-400 text-[10px] uppercase tracking-widest font-bold mb-1">Activity</p>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        </div>
        <button className="text-[10px] text-white/30 hover:text-rose-400 uppercase tracking-widest transition-colors flex items-center gap-2">
          <Trash2 className="h-3 w-3" /> Clear
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {list.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl">
              <BellOff className="mx-auto h-8 w-8 text-white/10 mb-2" />
              <p className="text-white/20 text-sm">No alerts for {currentTenant.name}</p>
            </div>
          ) : (
            list.map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={cardCls}>
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20 text-indigo-400">
                  {n.message.includes("Welcome") ? <Info size={18} /> : <Bell size={18} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">System</span>
                    <span className="text-[10px] text-white/20 font-mono">{n.time}</span>
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