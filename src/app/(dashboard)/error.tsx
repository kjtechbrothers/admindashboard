"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-[#07070f] p-6 min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0d0d18] border border-white/5 p-12 rounded-[32px] text-center max-w-md shadow-2xl"
      >
        <div className="mx-auto w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center mb-6">
          <AlertTriangle className="text-rose-500 h-8 w-8" />
        </div>
        
        <p className="text-rose-500 text-[10px] uppercase tracking-[0.3em] font-black mb-2 italic">
          Neural Core Error
        </p>
        <h2 className="text-white text-2xl font-bold mb-3 tracking-tight">Access Interrupted</h2>
        <p className="text-white/30 text-sm mb-8 leading-relaxed">
          An unexpected anomaly occurred in the data stream. Re-initialization is required.
        </p>

        <button 
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[11px] uppercase tracking-[0.2em] py-4 rounded-2xl transition-all active:scale-95"
        >
          <RotateCcw size={14} className="text-indigo-400" />
          Re-initialize System
        </button>
      </motion.div>
    </div>
  );
}