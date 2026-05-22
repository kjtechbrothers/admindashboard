"use client";

import { useTenantStore } from "../store/use-tenant-store";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { currentTenant } = useTenantStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. If not mounted, show invisible children to prevent flickering
  if (!mounted) return <div className="invisible">{children}</div>;

  // 2. THE FIX: Use optional chaining (?.) and a fallback empty string
  // This prevents the "possibly null" error during build
  const themeClass = currentTenant?.theme || "";

  return (
    <div className={`${themeClass} min-h-screen transition-colors duration-300`}>
      {children}
    </div>
  );
}