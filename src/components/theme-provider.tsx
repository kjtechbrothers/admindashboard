"use client";

import { useTenantStore } from "../store/use-tenant-store";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { currentTenant } = useTenantStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Return a standard dark background while the app is booting or database is loading
  // This explicitly handles the "null" case so the code below is safe.
  if (!mounted || !currentTenant) {
    return (
      <div className="bg-[#07070f] min-h-screen invisible">
        {children}
      </div>
    );
  }

  // 2. Since we handled the null case above, currentTenant is now 100% guaranteed to exist here
  return (
    <div className={`${currentTenant.theme} min-h-screen transition-colors duration-300`}>
      {children}
    </div>
  );
}