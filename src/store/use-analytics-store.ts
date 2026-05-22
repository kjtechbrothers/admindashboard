import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Stats {
  revenue: string;
  orders: string;
  active_users: string;
  delivery_rate: string;
}

interface AnalyticsState {
  stats: Stats | null;
  isLoading: boolean;
  fetchStats: (tenantId: string) => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  stats: null,
  isLoading: false,

  fetchStats: async (tenantId) => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .eq('tenant_id', tenantId)
      .single();

    if (!error && data) {
      set({
        stats: {
          revenue: `$${data.revenue.toLocaleString()}`,
          orders: data.orders.toLocaleString(),
          active_users: data.active_users.toLocaleString(),
          delivery_rate: `${data.delivery_rate}%`,
        },
        isLoading: false
      });
    } else {
      set({ isLoading: false });
    }
  },
}));