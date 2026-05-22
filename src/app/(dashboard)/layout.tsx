"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/use-auth-store";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { FloatingAI } from "@/src/components/ai/floating-ai";
import { Menu, X, Loader2 } from "lucide-react";
import { useTenantStore } from "@/src/store/use-tenant-store";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const fetchTenants = useTenantStore((s) => s.fetchTenants);
  const isLoadingTenants = useTenantStore((s) => s.isLoading);
  const router = useRouter();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Wait for Zustand to load from LocalStorage (Fixes the Refresh bug)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 2. Only redirect if we are 100% sure the user is not logged in
  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/login");
    } else if (isHydrated && isAuthenticated) {
      fetchTenants();
    }
  }, [isHydrated, isAuthenticated, router, fetchTenants]);

  // 3. Prevent the "Flash" - Show dark background during hydration
  if (!isHydrated) return <div className="h-screen w-full bg-[#07070f]" />;

  // 4. Stay on dark screen while router is moving to /login
  if (!isAuthenticated) return <div className="h-screen w-full bg-[#07070f]" />;

  if (isLoadingTenants) {
    return (
      <div className="h-screen w-full bg-[#07070f] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
        <p className="text-white/20 font-mono text-[10px] tracking-[0.3em] uppercase italic">Initializing Cloud...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#07070f]">
      {/* Desktop Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[#0d0d18] transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar />
        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute right-4 top-4 text-white md:hidden">
          <X size={20} />
        </button>
      </div>

      <main className="flex-1 overflow-y-auto relative h-full">
        {/* Mobile Navbar */}
        <div className="flex items-center justify-between p-4 bg-[#0d0d18] border-b border-white/5 md:hidden">
          <h1 className="text-white font-bold">DigitalSoft</h1>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-white">
            <Menu size={20} />
          </button>
        </div>

        <div className="relative">
          {children}
        </div>
        <FloatingAI /> 
      </main>
      
      {isMobileMenuOpen && (
        <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 z-40 bg-black/60 md:hidden" />
      )}
    </div>
  );
}