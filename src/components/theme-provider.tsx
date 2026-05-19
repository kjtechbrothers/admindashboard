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

  if (!mounted) return <div className="invisible">{children}</div>;

  return (
    <div className={`${currentTenant.theme} min-h-screen transition-colors duration-300`}>
      {children}
    </div>
  );
}