export interface Employee {
  id: string;
  tenant_id: string; // Ensure this is tenant_id (snake_case)
  name: string;
  role: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  password?: string; 
  created_at?: string;
}