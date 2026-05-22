import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Employee } from '../types/employee';
import { toast } from 'sonner';

interface EmployeeState {
  employees: Employee[];
  isLoading: boolean;
  fetchEmployees: (tenantId: string) => Promise<void>;
  addEmployee: (employee: Omit<Employee, 'id' | 'tenant_id' | 'created_at'>, tenantId: string) => Promise<void>;
  updateEmployee: (id: string, updatedEmployee: Partial<Employee>) => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  isLoading: false,

  fetchEmployees: async (tenantId) => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('tenant_id', tenantId) // Correct column name
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to load staff from cloud.");
    } else {
      set({ employees: data as Employee[], isLoading: false });
    }
  },

  addEmployee: async (newEmp:any, tenantId:string) => {
    const { data, error } = await supabase
      .from('employees')
      .insert([{ 
        name: newEmp.name, 
        email: newEmp.email, 
        role: newEmp.role, 
        status: newEmp.status,
        password: newEmp.password,
        tenant_id: tenantId, 
      }])
      .select();

    if (error) {
      toast.error("Cloud synchronization failed: " + error.message);
    } else if (data) {
      set((state) => ({ employees: [data[0] as Employee, ...state.employees] }));
      toast.success("Staff profile created successfully.");
    }
  },

  updateEmployee: async (id, updatedData) => {
    const { error } = await supabase
      .from('employees')
      .update({
        name: updatedData.name,
        email: updatedData.email,
        role: updatedData.role,
        status: updatedData.status
      })
      .eq('id', id);

    if (error) {
      toast.error("Update failed: " + error.message);
    } else {
      set((state) => ({
        employees: state.employees.map((emp) => 
          emp.id === id ? { ...emp, ...updatedData } : emp
        )
      }));
      toast.success("Record updated in neural core.");
    }
  },
}));