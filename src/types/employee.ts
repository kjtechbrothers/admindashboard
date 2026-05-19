export interface Employee {
  id: string;
  tenantId: string;
  name: string;
  role: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Terminated';
}