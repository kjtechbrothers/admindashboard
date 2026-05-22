export interface Employee {
  id: string;
  tenant_id: string; // Use underscore to match Supabase
  name: string;
  role: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  password?: string;
  created_at?: string;
}