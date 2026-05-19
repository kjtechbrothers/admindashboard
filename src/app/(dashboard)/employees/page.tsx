"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ShieldCheck, ShieldAlert, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AddEmployeeModal } from "@/src/components/employees/add-employee-modal";
import { EditEmployeeModal } from "@/src/components/employees/edit-employee-modal";
import { useEmployeeStore } from "@/src/store/use-employee-store";
import { useTenantStore } from "@/src/store/use-tenant-store";
import { useAuthStore } from "@/src/store/use-auth-store";
import { Employee } from "@/src/types/employee";

const ITEMS_PER_PAGE = 5; // Change this number to control how many rows per page

const statusStyle: Record<string, string> = {
  Active:     "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "On Leave": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Terminated: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const avatarColors = ["bg-indigo-500/20 text-indigo-400", "bg-emerald-500/20 text-emerald-400", "bg-amber-500/20 text-amber-400"];
const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;
const optStyle = { background: "#13131f", color: "rgba(255,255,255,0.7)" };

export default function EmployeesPage() {
  const { currentTenant } = useTenantStore();
  const { employees } = useEmployeeStore();
  const { user } = useAuthStore();
  const isAdmin = user?.role === "Admin";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Filter logic
  const filtered = employees.filter(emp =>
    emp.tenantId === currentTenant.id &&
    (statusFilter === "All" || emp.status === statusFilter) &&
    (emp.name.toLowerCase().includes(search.toLowerCase()) ||
     emp.email.toLowerCase().includes(search.toLowerCase()))
  );

  // 2. Pagination logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  // 3. Reset to page 1 when search or status changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, currentTenant]);
  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#07070f] space-y-6">

      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">Staff Directory</p>
             <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${isAdmin ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
                <span className="text-[9px] font-black uppercase tracking-tighter">{user?.role} Access</span>
             </div>
          </div>
          <h2 className="text-white text-3xl font-bold tracking-tight">Management</h2>
        </div>
        {isAdmin && <AddEmployeeModal />}
      </motion.div>

      {/* Main Container */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-[#0d0d18] border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col">

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-b border-white/5 bg-white/1">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
            <input
              placeholder="Search directory..."
              className="w-full bg-white/3 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="appearance-none w-full sm:w-40 bg-white/3 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white/60 focus:outline-none"
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

        {/* Table Area */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/2">
                {["Name", "Role", "Email", "Status", isAdmin ? "Actions" : ""].map((h) => (
                  <th key={h} className="text-left px-6 py-4 text-white/25 text-[10px] uppercase tracking-[0.15em] font-bold border-b border-white/5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3">
              {paginatedData.map((emp, i) => (
                <tr key={emp.id} className="group hover:bg-white/1 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-white/90 text-sm font-semibold">{emp.name}</span>
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
                    {isAdmin ? (
                      <button onClick={() => { setSelectedEmployee(emp); setIsEditOpen(true); }}
                        className="text-[11px] font-bold text-white/40 hover:text-white hover:bg-indigo-500 px-4 py-2 rounded-xl border border-white/10 hover:border-indigo-500 transition-all uppercase">
                        Edit
                      </button>
                    ) : (
                      <span className="text-[9px] text-white/10 uppercase tracking-widest italic font-medium">Read Only</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION CONTROLS --- */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/1">
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
            Showing {paginatedData.length} of {filtered.length} staff
          </p>
          
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-xl border border-white/5 text-white/40 hover:text-white hover:bg-white/5 disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all border ${
                    currentPage === idx + 1 
                    ? "bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20" 
                    : "border-white/5 text-white/30 hover:bg-white/5"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-xl border border-white/5 text-white/40 hover:text-white hover:bg-white/5 disabled:opacity-20 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
      {selectedEmployee && (
        <EditEmployeeModal employee={selectedEmployee} open={isEditOpen} setOpen={setIsEditOpen} />
      )}
    </div>
  );
}