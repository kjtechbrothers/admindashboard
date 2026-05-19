"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/use-auth-store";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) return toast.warning("Enter your email first.");
    toast.info(`Reset link sent to ${email}`);
  };

  return (
    <div className="h-screen w-full flex overflow-hidden">

      {/* LEFT — branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] bg-[#060612] p-12 relative overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-[-80px] left-[-80px] w-[420px] h-[420px] bg-indigo-700/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[360px] h-[360px] bg-violet-700/25 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-blue-600/10 rounded-full blur-[80px]" />

        {/* Dot grid */}
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span className="text-white font-semibold tracking-tight">DigitalSoft ERP</span>
        </div>

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          <div className="w-10 h-[2px] bg-indigo-500 mb-6" />
          <h2 className="text-4xl font-bold text-white leading-tight tracking-tight mb-4">
            Everything your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              business needs.
            </span>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Multi-tenant cloud ERP with real-time analytics, AI insights, and role-based access — all in one place.
          </p>

          <div className="flex gap-3 mt-10">
            {[["3", "Companies"], ["Real-time", "Analytics"], ["AI", "Powered"]].map(([val, label]) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                <p className="text-white font-semibold text-sm">{val}</p>
                <p className="text-white/40 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="relative z-10 text-white/20 text-xs">© 2025 DigitalSoft Cloud</p>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex items-center justify-center px-8 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 60% 20%, #1a0533 0%, #0d0d1a 40%, #060612 100%)" }}>

        {/* Layered orbs */}
        <div className="absolute top-[-60px] right-[-60px] w-[350px] h-[350px] bg-violet-600/20 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-40px] w-[300px] h-[300px] bg-indigo-700/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-fuchsia-700/10 rounded-full blur-[60px] pointer-events-none" />

        {/* Subtle line grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Glowing border on left edge separating panels */}
        <div className="absolute left-0 top-[20%] h-[60%] w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[360px] relative z-10"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">Sign in</h1>
            <p className="text-white/40 text-sm mt-1">Access your admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-white/50 text-xs uppercase tracking-widest font-medium">Email</Label>
              <Input
                type="email"
                placeholder="admin@digitalsoft.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-xl focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-white/50 text-xs uppercase tracking-widest font-medium">Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-xl focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/50"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl mt-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 text-white font-medium border-0 shadow-xl shadow-indigo-500/20 transition-all"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue →"}
            </Button>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="w-full text-center text-xs text-white/25 hover:text-white/50 transition-colors pt-1"
            >
              Forgot password?
            </button>
          </form>

          <div className="mt-8 p-4 rounded-2xl border border-amber-400/15 bg-amber-400/5">
            <p className="text-amber-400/50 text-[10px] uppercase tracking-widest font-medium mb-1">Test credentials</p>
            <p className="text-amber-300/70 text-xs font-mono">admin@digitalsoft.com</p>
            <p className="text-amber-300/70 text-xs font-mono">admin123</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}