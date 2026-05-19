"use client";

import { useState } from "react";
import { BrainCircuit, Send, X, Loader2, Bot, User, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTenantStore } from "../../store/use-tenant-store";

export function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Neural Core online. How can I assist with your data analysis today?' }
  ]);

  const { currentTenant } = useTenantStore();

  const handleAsk = () => {
    if (!query.trim() || isTyping) return;

    const userMessage = query;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setQuery("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = `Analyzing ${currentTenant.name} data... `;
      const input = userMessage.toLowerCase();
      
      if (input.includes("sales") || input.includes("revenue")) {
        aiResponse += `Current revenue is $${currentTenant.id === 'smart' ? '120,500' : '45,200'}. Logic suggests a 4% variance due to logistics.`;
      } else if (input.includes("employee")) {
        aiResponse += "Directory sync shows 4 active nodes. Efficiency is currently 94%.";
      } else {
        aiResponse += "All sectors stable. Operational throughput is consistent with the baseline.";
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    // Responsive positioning: closer to edge on mobile (bottom-4 right-4), further on desktop (sm:bottom-8 sm:right-8)
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(10px)" }}
            className="mb-4 sm:mb-6"
          >
            {/* Responsive Width: Full width minus padding on mobile, fixed w-80 on desktop */}
            <div className="w-[calc(100vw-2rem)] sm:w-80 h-[450px] max-h-[70vh] bg-[#0d0d18] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
              
              {/* Header */}
              <div className="bg-indigo-600 p-4 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Zap className="h-3.5 w-3.5 text-white fill-current" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/70 leading-none mb-1">Neural Core</p>
                    <p className="text-white text-xs font-bold leading-none">Smart Assistant</p>
                  </div>
                </div>
              </div>
              
              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-[#07070f]/50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm border ${
                      msg.role === 'user' 
                        ? 'bg-white/5 border-white/10 text-white/70 rounded-tr-none' 
                        : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-100 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-indigo-500/5 border border-indigo-500/10 p-2.5 rounded-2xl flex items-center gap-2 shadow-sm">
                      <Loader2 className="h-3 w-3 animate-spin text-indigo-400" />
                      <span className="text-[10px] text-indigo-400/50 font-bold uppercase tracking-widest">Analyzing...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-[#0d0d18] border-t border-white/5 flex gap-2">
                <input 
                  placeholder="Query system..." 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all"
                />
                <button 
                  onClick={handleAsk}
                  disabled={!query.trim() || isTyping}
                  className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-30 text-white p-2 rounded-xl transition-all active:scale-90"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Toggle Button: Slightly smaller on mobile (h-12 w-12) */}
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen 
            ? "bg-indigo-500/20 border border-white/10 text-white rotate-90" 
            : "bg-indigo-600 text-white shadow-indigo-500/40"
        }`}
      >
        {isOpen ? <X size={20} className="sm:size-24" /> : <BrainCircuit className="sm:size-28" size={24} />}
        
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20" />
        )}
      </motion.button>
    </div>
  );
}