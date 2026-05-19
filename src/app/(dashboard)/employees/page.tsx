"use client";

import { useState } from "react";
import { Search, Filter, Users, UserX } from "lucide-react"; // Added UserX for empty state
import { motion, AnimatePresence } from "framer-motion";
import { AddEmployeeModal } from "@/src/components/employees/add-employee-modal";
import { EditEmployeeModal } from "@/src/components/employees/edit-employee-modal";
import { useEmployeeStore } from "@/src/store/use-employee-store";
import { useTenantStore } from "@/src/store/use-tenant-store";
import { Employee } from "@/src/types/employee";

const statusStyle: Record<string, string> = {
  Active:     "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "On Leave": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Terminated: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

// Variety of colors for avatars to make the UI pop
const avatarColors = [
  "bg-indigo-500/20 text-indigo-400",
  "bg-emerald-500/20 text-emerald-400",
  "bg-amber-500/20 text-amber-400",
  "bg-rose-500/20 text-rose-400",
  "bg-purple-500/20 text-purple-400",
  "bg-sky-500/20 text-sky-400",
];

const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;
const optStyle = { background: "#13131f", color: "rgba(255,255,255,0.7)" };

export default function EmployeesPage() {
  const { currentTenant } = useTenantStore();
  const { employees } = useEmployeeStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const filtered = employees.filter(emp =>
    emp.tenantId === currentTenant.id &&
    (statusFilter === "All" || emp.status === statusFilter) &&
    (emp.name.toLowerCase().includes(search.toLowerCase()) ||
     emp.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#07070f] space-y-6">

      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">Human Resources</p>
          <h2 className="text-white text-3xl font-bold tracking-tight">Staff Management</h2>
          <p className="text-white/40 text-sm mt-1">
            Managing directory for <span className="text-indigo-400 font-semibold">{currentTenant.name}</span>
          </p>
        </div>
        <AddEmployeeModal />
      </motion.div>

      {/* Main Table Container */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-[#0d0d18] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">

        {/* Filters Area: Responsive Stack on Mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-b border-white/5 bg-white/[0.01]">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
            <input
              placeholder="Search by name or email..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-white/20 hidden sm:block" />
            <select
              className="appearance-none w-full sm:w-[160px] bg-white/[0.03] border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white/60 focus:outline-none focus:border-indigo-500/50 transition-all"
              style={{ backgroundImage: chevron, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All" style={optStyle}>All Statuses</option>
              <option value="Active" style={optStyle}>Active</option>
              <option value="On Leave" style={optStyle}>On Leave</option>
              <option value="Terminated" style={optStyle}>Terminated</option>
            </select>
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-white/[0.02]">
                {["Name", "Role", "Email", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-6 py-4 text-white/25 text-[10px] uppercase tracking-[0.15em] font-bold border-b border-white/5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              <AnimatePresence>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-24 text-center">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-white/5 rounded-full">
                          <UserX className="h-8 w-8 text-white/10" />
                        </div>
                        <p className="text-white/20 text-sm font-medium">No team members found</p>
                        <p className="text-white/10 text-xs">Try adjusting your filters or search terms</p>
                      </motion.div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((emp, i) => (
                    <motion.tr key={emp.id} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                      className="group hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {/* Dynamic Colored Avatar */}
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-transform group-hover:scale-105 ${avatarColors[i % avatarColors.length]}`}>
                            {emp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <span className="text-white/90 text-sm font-semibold tracking-tight">{emp.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white/50 text-sm">{emp.role}</td>
                      <td className="px-6 py-4 text-white/30 text-sm font-mono">{emp.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-[9px] uppercase tracking-wider font-bold border ${statusStyle[emp.status] ?? ""}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => { setSelectedEmployee(emp); setIsEditOpen(true); }}
                          className="text-[11px] font-bold text-white/40 hover:text-white hover:bg-indigo-500 px-4 py-2 rounded-xl border border-white/10 hover:border-indigo-500 transition-all uppercase tracking-tighter">
                          Edit
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Edit Modal Portal */}
      {selectedEmployee && (
        <EditEmployeeModal employee={selectedEmployee} open={isEditOpen} setOpen={setIsEditOpen} />
      )}
    </div>
  );
}