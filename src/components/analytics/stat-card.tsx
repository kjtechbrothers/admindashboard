"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
  trend: string;
  index?: number;
}

export function StatCard({ title, value, icon: Icon, description, trend, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="relative bg-[#0d0d18] border border-white/8 rounded-2xl p-5 overflow-hidden group hover:border-white/15 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/40 text-xs font-medium uppercase tracking-widest">{title}</p>
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Icon className="h-4 w-4 text-indigo-400" />
          </div>
        </div>
        <p className="text-white text-2xl font-bold tracking-tight">{value}</p>
        <p className="text-white/30 text-xs mt-1.5">
          <span className="text-emerald-400 font-semibold">{trend}</span> {description}
        </p>
      </div>
    </motion.div>
  );
}