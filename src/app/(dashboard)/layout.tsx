"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/use-auth-store";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { FloatingAI } from "@/src/components/ai/floating-ai";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

 return (
    <div className="flex h-screen overflow-hidden bg-[#07070f]">
      {/* Sidebar - Hidden on mobile unless toggled */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[#0d0d18] transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar />
        {/* Close button inside sidebar for mobile */}
        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute right-4 top-4 text-white md:hidden">
          <X />
        </button>
      </div>

      <main className="flex-1 overflow-y-auto relative h-full">
        {/* Mobile Header Toggle */}
        <div className="flex items-center justify-between p-4 bg-[#0d0d18] border-b border-white/5 md:hidden">
          <h1 className="text-white font-bold">DigitalSoft</h1>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-white">
            <Menu />
          </button>
        </div>

        <div className="p-4 md:p-8">
          {children}
        </div>
        <FloatingAI /> 
      </main>
      
      {/* Overlay to close mobile menu when clicking outside */}
      {isMobileMenuOpen && (
        <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 z-40 bg-black/60 md:hidden" />
      )}
    </div>
  );
}