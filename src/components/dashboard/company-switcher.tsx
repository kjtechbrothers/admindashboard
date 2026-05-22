"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useTenantStore } from "../../store/use-tenant-store";

export function CompanySwitcher() {
  const { currentTenant, setTenant, tenants } = useTenantStore();

  if (!currentTenant) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/8 transition-all group">
          <span className="text-lg leading-none">{currentTenant.logo}</span>
          <div className="flex-1 text-left min-w-0">
            <p className="text-white text-xs font-semibold truncate">{currentTenant.name}</p>
            <p className="text-white/30 text-[10px]">Active workspace</p>
          </div>
          <ChevronsUpDown className="h-3.5 w-3.5 text-white/30 group-hover:text-white/50 transition-colors shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-[#111118] border-white/10 rounded-xl p-1.5 shadow-2xl shadow-black/50"
        align="start"
      >
        <p className="text-white/30 text-[10px] uppercase tracking-widest px-2 py-1.5 font-medium">Switch workspace</p>
        {tenants.map((company) => {
          const active = currentTenant.id === company.id;
          return (
            <DropdownMenuItem
              key={company.id}
              onSelect={() => setTenant(company.id)}
              className="flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer data-highlighted:bg-white data-highlighted:text-indigo-400 text-white/60 transition-colors"
            >
              <span className="text-base leading-none">{company.logo}</span>
              <span className={`flex-1 text-sm ${active ? "text-white font-semibold" : ""}`}>
                {company.name}
              </span>
              {active && <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}