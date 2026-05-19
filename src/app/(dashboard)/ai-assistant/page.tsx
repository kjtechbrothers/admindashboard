"use client";

import { useState } from "react";
import { Send, Sparkles, Wand2, Loader2, Bot, User, Zap, BrainCircuit } from "lucide-react";
import { useTenantStore } from "@/src/store/use-tenant-store";
import { useAuthStore } from "@/src/store/use-auth-store"; // For user initials
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AIAssistantPage() {
  const { currentTenant } = useTenantStore();
  const { user } = useAuthStore();
  
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Starting with an initial greeting based on the current tenant
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: `Neural Engine online for ${currentTenant.name}. Greetings, ${user?.name || 'Administrator'}. How can I assist with your data analysis today?` 
    }
  ]);

  const suggestions = [
    "Why are sales down this week?",
    "Show me employee performance",
    "Predict next month's revenue",
  ];

  // Logic to process the query
  const handleAnalyze = async (text: string = query) => {
    if (!text.trim() || isLoading) return;

    // 1. Add user message using functional update (Best Practice)
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setQuery("");
    setIsLoading(true);

    // Simulate AI Processing delay
    setTimeout(() => {
      let response = "";
      const input = text.toLowerCase();

      // Context-aware logic based on current tenant
      if (input.includes("sales") || input.includes("revenue")) {
        response = `Intelligence Report [${currentTenant.name}]: Revenue is currently $${currentTenant.id === "smart" ? "120,500" : "45,200"}. 4% variance detected due to supply chain delays. I recommend checking the delivery status.`;
      } else if (input.includes("employee") || input.includes("performance")) {
        response = `Workforce Analysis: ${currentTenant.name} has 4 active staff nodes. System efficiency is at 94%. One member is currently on leave (Bob Smith).`;
      } else {
        response = `Environment Scan for ${currentTenant.name} complete. All sectors operational. Data throughput remains within projected quarterly baseline.`;
      }

      // 2. Add AI response using functional update to prevent overwriting
      setMessages(prev => [...prev, { role: "ai", content: response }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#07070f] p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* --- Header Section --- */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center">
          <div className="flex items-center justify-center gap-2 text-indigo-400 mb-2">
            <Zap className="h-4 w-4 fill-current" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black italic">Neural Intelligence Core</span>
          </div>
          <h2 className="text-white text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            AI Assistant
          </h2>
          <p className="text-white/40 text-sm mt-2">
            Strategic ERP insights for <span className="text-indigo-400 font-bold">{currentTenant.name}</span>
          </p>
        </motion.div>

        {/* --- Interaction Input Area --- */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="relative group">
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          
          <div className="relative bg-[#0d0d18] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="relative flex gap-3">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                <Wand2 className="h-5 w-5 text-indigo-400/50" />
              </div>
              <input 
                className="w-full bg-white/[0.03] border border-white/5 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all shadow-inner"
                placeholder="Ask anything about your business data..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              />
              <button 
                onClick={() => handleAnalyze()} 
                disabled={isLoading || !query.trim()}
                className="bg-indigo-500 hover:bg-indigo-400 text-white px-5 rounded-xl transition-all disabled:opacity-30 active:scale-95 flex items-center justify-center shadow-lg shadow-indigo-500/20"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>

            {/* Suggestions Chips */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleAnalyze(s)}
                  disabled={isLoading}
                  className="text-[10px] uppercase tracking-widest font-bold text-white/30 hover:text-indigo-300 bg-white/[0.02] hover:bg-indigo-500/10 border border-white/5 hover:border-indigo-500/30 transition-all px-4 py-2 rounded-full disabled:opacity-20 active:scale-95"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* --- Chat History Feed --- */}
        <div className="space-y-6 pb-20">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                className={`flex gap-5 p-6 rounded-3xl border transition-all ${
                  msg.role === 'ai' 
                    ? 'bg-indigo-500/[0.03] border-indigo-500/10 shadow-[0_0_50px_-12px_rgba(99,102,241,0.05)]' 
                    : 'bg-white/[0.01] border-white/5 ml-4 sm:ml-12'
                }`}
              >
                {/* Avatar with dynamic initials for user */}
                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner border ${
                  msg.role === 'ai' 
                  ? 'bg-indigo-500 border-indigo-400 text-white' 
                  : 'bg-white/5 border-white/10 text-white/40 font-bold text-xs'
                }`}>
                  {msg.role === 'ai' ? <Bot className="h-5 w-5" /> : (user?.name?.charAt(0) || 'U')}
                </div>

                <div className="space-y-1.5 flex-1 pt-0.5">
                  <p className="text-white/25 text-[10px] uppercase tracking-[0.2em] font-bold">
                    {msg.role === 'ai' ? 'Neural Logic System' : 'Admin Query'}
                  </p>
                  <div className={`leading-relaxed text-sm ${msg.role === 'ai' ? 'text-indigo-100/90 font-medium' : 'text-white/60'}`}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Animated Thinking State */}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex gap-5 p-6 rounded-3xl border border-indigo-500/10 bg-indigo-500/[0.02] ml-4 animate-pulse">
              <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center shrink-0">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-400/50" />
              </div>
              <div className="space-y-3 flex-1 pt-2">
                <div className="h-1.5 w-24 bg-white/5 rounded-full" />
                <div className="h-2 w-full bg-white/5 rounded-full" />
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}