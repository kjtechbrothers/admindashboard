import { create } from 'zustand';
import { toast } from 'sonner';

// 1. Update the Interface
interface Notification {
  id: string;
  tenantId: string; // Add this line
  message: string;
  time: string;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (message: string, tenantId: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  // 2. Add tenantId to your initial mock notification
  notifications: [
    { id: '1', tenantId: 'alpha', message: 'Welcome to Alpha Traders Dashboard', time: 'Just now' }
  ],
  addNotification: (message, tenantId) => {
    const newNoti = { 
      id: Date.now().toString(), 
      tenantId, // Store the company ID
      message, 
      time: 'Just now' 
    };
    set((state) => ({ notifications: [newNoti, ...state.notifications] }));
    toast.success(message);
  },
}));