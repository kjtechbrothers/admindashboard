import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Define the Master Admin credentials
const ADMIN_USER = {
  email: "admin@digitalsoft.com",
  password: "admin123", // In a real app, this would be hashed in a DB
  name: "Kashif (Admin)",
};

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  // Update: Login now takes password and returns a boolean/throws error
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 2. Validate against our Master Admin
        if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
          set({ 
            user: { name: ADMIN_USER.name, email, role: "Admin" }, 
            isAuthenticated: true 
          });
        }   else if (email === "viewer@digitalsoft.com" && password === "viewer123") {
         set({ user: { name: "Guest Viewer", email, role: "Viewer" }, isAuthenticated: true });
       }
        else {
          // 3. Throw an error if credentials don't match
          throw new Error("Invalid email or password");
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
        // Clear local storage if needed
      },
    }),
    { name: 'auth-storage' }
  )
);