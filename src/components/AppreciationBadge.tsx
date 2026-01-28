import type { Appreciation } from "@/types/car"
import { cn } from "@/lib/utils"

interface AppreciationBadgeProps {
  appreciation: Appreciation
  className?: string
}

const appreciationStyles: Record<Appreciation, string> = {
  "Très bon": "bg-green-600 text-white",
  "Bon": "bg-green-500 text-white",
  "Moyen": "bg-yellow-500 text-black",
  "Médiocre": "bg-orange-500 text-white",
  "Mauvais": "bg-red-500 text-white",
}

export function AppreciationBadge({
  appreciation,
  className,
}: AppreciationBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        appreciationStyles[appreciation],
        className
      )}
    >
      {appreciation}
    </span>
  )
}
