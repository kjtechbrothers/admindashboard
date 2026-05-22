"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { UserPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEmployeeStore } from "@/src/store/use-employee-store";
import { useTenantStore } from "@/src/store/use-tenant-store";

// Design Constants
const inputCls = "w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-indigo-500/40 transition-colors appearance-none";
const labelCls = "text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold";
const optStyle = { background: "#13131f", color: "rgba(255,255,255,0.7)" };
const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

export function AddEmployeeModal() {
  const addEmployee = useEmployeeStore((s) => s.addEmployee);
  const { currentTenant } = useTenantStore();
  
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Unified State inside the component
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    role: "", 
    status: "Active" as "Active" | "On Leave" | "Terminated",
    password: "" 
  });

  // 2. Helper function to update fields
  const updateField = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTenant) return;
    
    setIsLoading(true);
    
    try {
      await addEmployee(formData, currentTenant.id);
      toast.success(`Staff profile created for ${currentTenant.name}`);
      
      // 3. Reset form and close modal
      setFormData({ name: "", email: "", role: "", status: "Active", password: "" });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to sync with cloud.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white text-[11px] uppercase tracking-wider font-bold px-5 py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
          <UserPlus className="h-4 w-4" /> Add Employee
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#0d0d18] border border-white/10 text-white rounded-2xl sm:max-w-md shadow-2xl shadow-black/50">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-bold tracking-tight text-left">Create Staff Profile</DialogTitle>
          <p className="text-white/30 text-xs mt-1 text-left">
            Registering to <span className="text-indigo-400 font-medium">{currentTenant?.name}</span>
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div className="space-y-2">
            <label className={labelCls}>Full Name</label>
            <input className={inputCls} placeholder="John Doe" required value={formData.name} onChange={e => updateField("name", e.target.value)} />
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Email Address</label>
            <input className={inputCls} type="email" placeholder="john@company.com" required value={formData.email} onChange={e => updateField("email", e.target.value)} />
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Designation / Role</label>
            <input className={inputCls} placeholder="Frontend Developer" required value={formData.role} onChange={e => updateField("role", e.target.value)} />
          </div>

          {/* PASSWORD FIELD ADDED HERE */}
          <div className="space-y-2">
            <label className={labelCls}>Access Password</label>
            <input 
              type="password"
              className={inputCls} 
              placeholder="Set login password" 
              required 
              value={formData.password} 
              onChange={e => updateField("password", e.target.value)} 
            />
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Employment Status</label>
            <select 
              className={inputCls} 
              value={formData.status} 
              onChange={e => updateField("status", e.target.value)}
              style={{ 
                backgroundImage: chevron, 
                backgroundRepeat: "no-repeat", 
                backgroundPosition: "right 15px center" 
              }}
            >
              <option value="Active" style={optStyle}>Active</option>
              <option value="On Leave" style={optStyle}>On Leave</option>
              <option value="Terminated" style={optStyle}>Terminated</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl transition-all mt-4 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 active:scale-[0.98]"
          >
            {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Synchronizing...</> : "Add to Directory"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}