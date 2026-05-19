import { Skeleton } from "@/src/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-8 space-y-10 bg-[#07070f] min-h-screen">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-24 bg-white/5" />
        <Skeleton className="h-10 w-64 bg-white/5" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 rounded-3xl bg-[#0d0d18] border border-white/5" />
        ))}
      </div>

      {/* Chart Skeleton */}
      <Skeleton className="h-[400px] w-full rounded-3xl bg-[#0d0d18] border border-white/5" />
    </div>
  );
}