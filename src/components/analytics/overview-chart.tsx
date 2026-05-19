"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface OverviewProps {
  data: { name: string; value: number }[];
}

export function OverviewChart({ data }: OverviewProps) {
  return (
    <div className="bg-[#0d0d18] border border-white/8 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-white font-semibold text-sm">Revenue Overview</p>
          <p className="text-white/30 text-xs mt-0.5">Weekly performance</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          <span className="text-white/30 text-xs">Revenue</span>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={32}>
            <XAxis
              dataKey="name"
              stroke="rgba(255,255,255,0.15)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "rgba(255,255,255,0.3)" }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.15)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "rgba(255,255,255,0.3)" }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              contentStyle={{
                background: "#13131f",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              labelStyle={{ color: "rgba(255,255,255,0.5)", marginBottom: 4 }}
            />
            <Bar dataKey="value" fill="url(#barGradient)" radius={[6, 6, 0, 0]}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}