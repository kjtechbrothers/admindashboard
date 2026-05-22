import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export type Tenant = {
  id: string;
  name: string;
  logo: string;
  theme: string;
  stats_color: string; // Match your Supabase column name
};

interface TenantState {
  currentTenant: Tenant | null;
  tenants: Tenant[];
  isLoading: boolean;
  setTenant: (tenantId: string) => void;
  fetchTenants: () => Promise<void>;
}

export const useTenantStore = create<TenantState>((set, get) => ({
  currentTenant: null,
  tenants: [],
  isLoading: true,

  fetchTenants: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .order('name', { ascending: true });

    if (data && !error) {
      set({ 
        tenants: data, 
        currentTenant: data[0], // Default to first company
        isLoading: false 
      });
    }
  },

  setTenant: (tenantId) => {
    const selected = get().tenants.find((t) => t.id === tenantId);
    if (selected) set({ currentTenant: selected });
  },
}));