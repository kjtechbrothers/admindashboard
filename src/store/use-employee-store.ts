import { create } from 'zustand';
import { MOCK_EMPLOYEES } from '../lib/mock-data';
import { Employee } from '../types/employee';

interface EmployeeState {
  employees: Employee[];
  // Update: addEmployee now takes tenantId
  addEmployee: (employee: Omit<Employee, 'id' | 'tenantId'>, tenantId: string) => void;
  updateEmployee: (id: string, updatedEmployee: Partial<Employee>) => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: MOCK_EMPLOYEES as Employee[],
  
  addEmployee: (newEmp, tenantId) => set((state) => ({
    employees: [
      { 
        ...newEmp, 
        id: Math.random().toString(36).substr(2, 9), 
        tenantId // Tag the employee with the current company ID
      } as Employee,
      ...state.employees
    ]
  })),

  updateEmployee: (id, updatedData) => set((state) => ({
    employees: state.employees.map((emp) => 
      emp.id === id ? { ...emp, ...updatedData } : emp
    )
  })),
}));