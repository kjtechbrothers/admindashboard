import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface Notification {
  id: string;
  tenant_id: string;
  message: string;
  created_at: string;
}

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  fetchNotifications: (tenantId: string) => Promise<void>;
  addNotification: (message: string, tenantId: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  isLoading: false,

  // 1. Fetch history from Database
  fetchNotifications: async (tenantId) => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (!error) set({ notifications: data || [], isLoading: false });
  },

  // 2. Add new notification to Database
  addNotification: async (message, tenantId) => {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{ message, tenant_id: tenantId }])
      .select();

    if (!error && data) {
      set((state) => ({ notifications: [data[0], ...state.notifications] }));
      toast.success(message);
    }
  },
}));