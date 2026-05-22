"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEmployeeStore } from "@/src/store/use-employee-store";
import { Employee } from "@/src/types/employee";
import { toast } from "sonner";


const inputCls = "w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-indigo-500/40 transition-all appearance-none";
const labelCls = "text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold";
const optStyle = { background: "#13131f", color: "rgba(255,255,255,0.7)" };
const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

export function EditEmployeeModal({ employee, open, setOpen }: { employee: Employee; open: boolean; setOpen: (o: boolean) => void }) {
  const updateEmployee = useEmployeeStore((s) => s.updateEmployee);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(employee);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => { 
    setFormData(employee); 
  }, [employee]);

  const set = (k: string, v: string) => setFormData(p => ({ ...p, [k]: v }));

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      updateEmployee(employee.id, formData);
      setIsLoading(false);
      setOpen(false);
      toast.success(`${formData.name} updated successfully!`);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#0d0d18] border border-white/10 text-white rounded-2xl w-[92vw] max-w-[425px] sm:w-full shadow-2xl shadow-black/50 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-bold tracking-tight text-left">Update Staff Profile</DialogTitle>
          <p className="text-white/30 text-xs mt-1 text-left">Modifying record for ID: <span className="text-indigo-400 font-mono">{employee.id.slice(0, 8)}</span></p>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-5 pt-4">
          <div className="space-y-2">
            <label className={labelCls}>Full Name</label>
            <input className={inputCls} value={formData.name} onChange={e => set("name", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className={labelCls}>Email Address</label>
            <input className={inputCls} type="email" value={formData.email} onChange={e => set("email", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className={labelCls}>Role / Designation</label>
            <input className={inputCls} value={formData.role} onChange={e => set("role", e.target.value)} required />
          </div>
            <div className="space-y-2">
            <label className={labelCls}>Access Password</label>
            <div className="relative">
              <input 
                type={showPass ? "text" : "password"}
                className={inputCls + " pr-10"} 
                value={formData.password || ""} 
                onChange={e => setFormData({...formData, password: e.target.value})} 
                required 
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50"
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className={labelCls}>Employment Status</label>
            <select 
              className={inputCls} 
              value={formData.status} 
              onChange={e => set("status", e.target.value)}
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

          {/* Flexible Button Layout: Stacks on very small screens if needed, but flex gap works for most */}
          <div className="flex flex-row gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => setOpen(false)}
              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 text-[11px] uppercase tracking-widest font-bold py-3.5 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-[11px] uppercase tracking-widest font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 active:scale-95"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}