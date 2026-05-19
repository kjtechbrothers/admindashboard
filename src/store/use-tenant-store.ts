import { create } from 'zustand';

export type Tenant = {
  id: string;
  name: string;
  logo: string;
  theme: string; // This will correspond to a CSS class
  statsColor: string;
};

export const COMPANIES: Tenant[] = [
  {
    id: 'alpha',
    name: 'Alpha Traders',
    logo: '🚀',
    theme: 'theme-alpha',
    statsColor: '#3b82f6', // Blue
  },
  {
    id: 'smart',
    name: 'Smart Mart',
    logo: '🛒',
    theme: 'theme-smart',
    statsColor: '#10b981', // Emerald
  },
  {
    id: 'city',
    name: 'City Pharmacy',
    logo: '💊',
    theme: 'theme-city',
    statsColor: '#f43f5e', // Rose
  },
];

interface TenantState {
  currentTenant: Tenant;
  setTenant: (tenantId: string) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  currentTenant: COMPANIES[0],
  setTenant: (tenantId) => {
    const selected = COMPANIES.find((c) => c.id === tenantId);
    if (selected) set({ currentTenant: selected });
  },
}));