import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton rounded-md", className)}
      aria-hidden="true"
    />
  )
}

export function SkeletonText({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-4 w-full", className)} />
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  )
}

export function SkeletonTableRow() {
  return (
    <tr className="border-b border-border">
      <td className="p-4"><Skeleton className="h-5 w-24" /></td>
      <td className="p-4"><Skeleton className="h-5 w-32" /></td>
      <td className="p-4 hidden md:table-cell"><Skeleton className="h-5 w-20" /></td>
      <td className="p-4 hidden lg:table-cell"><Skeleton className="h-5 w-24" /></td>
      <td className="p-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
      <td className="p-4"><Skeleton className="h-5 w-12" /></td>
    </tr>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="p-4 text-left"><Skeleton className="h-4 w-16" /></th>
            <th className="p-4 text-left"><Skeleton className="h-4 w-16" /></th>
            <th className="p-4 text-left hidden md:table-cell"><Skeleton className="h-4 w-12" /></th>
            <th className="p-4 text-left hidden lg:table-cell"><Skeleton className="h-4 w-12" /></th>
            <th className="p-4 text-left"><Skeleton className="h-4 w-20" /></th>
            <th className="p-4 text-left"><Skeleton className="h-4 w-16" /></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonTableRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
