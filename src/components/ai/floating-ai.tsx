"use client";

import { useState } from "react";
import { Send, X, Loader2, Zap, BrainCircuit, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTenantStore } from "../../store/use-tenant-store";
import { useAuthStore } from "../../store/use-auth-store"; // Import Auth

export function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { currentTenant } = useTenantStore();
  const { user } = useAuthStore(); // Get User Role

  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Neural Core online. How can I assist with your data analysis today?' }
  ]);

  const handleAsk = async () => {
    if (!query.trim() || isTyping || !currentTenant) return;

    const userMessage = query;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setQuery("");
    setIsTyping(true);

    try {
      // CALL THE FULL-STACK API (Same as the AI Page)
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMessage,
          tenantId: currentTenant.id,
          role: user?.role
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Connection to Neural Core interrupted." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(10px)" }}
            className="mb-4 sm:mb-6"
          >
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
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#07070f]/50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed border ${
                      msg.role === 'user' 
                        ? 'bg-white/5 border-white/10 text-white/70 rounded-tr-none' 
                        : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-100 rounded-tl-none shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-indigo-500/5 border border-indigo-500/10 p-2.5 rounded-2xl flex items-center gap-2">
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
                  className="flex-1 bg-white/3 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50"
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

      {/* Toggle Button */}
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
        {isOpen ? <X size={20} /> : <BrainCircuit size={28} />}
        {!isOpen && <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20" />}
      </motion.button>
    </div>
  );
}