import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        // 1. FIRST: Check the PROFILES table (For Master Admins)
        const { data: adminData } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', email)
          .single();

        if (adminData && adminData.password === password) {
          set({ 
            user: { name: adminData.name, email: adminData.email, role: adminData.role }, 
            isAuthenticated: true 
          });
          return; // Login successful, stop here
        }

        // 2. SECOND: Check the EMPLOYEES table (For Staff Members)
        const { data: staffData } = await supabase
          .from('employees')
          .select('*')
          .eq('email', email)
          .single();

        if (staffData && staffData.password === password) {
          set({ 
            user: { name: staffData.name, email: staffData.email, role: 'Viewer' }, 
            isAuthenticated: true 
          });
          return; // Login successful, stop here
        }

        // 3. IF NEITHER MATCH: Throw error
        throw new Error("Access Denied: Invalid credentials.");
      },

      // FIXED: logout must set isAuthenticated to false
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);