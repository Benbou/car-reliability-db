import { useMemo } from "react"
import type { Brand } from "@/types/car"
import { BrandLogo } from "./BrandLogo"

interface ReliabilityChartProps {
  brands: Brand[]
  limit?: number
}

export function ReliabilityChart({ brands, limit = 10 }: ReliabilityChartProps) {
  const topBrands = useMemo(() => {
    return [...brands]
      .sort((a, b) => b.indiceFiabilite - a.indiceFiabilite)
      .slice(0, limit)
  }, [brands, limit])

  const maxScore = Math.max(...topBrands.map((b) => b.indiceFiabilite))
  const minScore = Math.min(...topBrands.map((b) => b.indiceFiabilite))
  const range = maxScore - minScore

  const getBarColor = (score: number) => {
    if (score >= 95) return "bg-green-600"
    if (score >= 93) return "bg-green-500"
    if (score >= 90) return "bg-yellow-500"
    return "bg-orange-500"
  }

  return (
    <div className="space-y-3">
      {topBrands.map((brand, index) => {
        const percentage = range > 0
          ? ((brand.indiceFiabilite - minScore) / range) * 40 + 60
          : 100

        return (
          <div
            key={brand.marque}
            className="group flex items-center gap-3 opacity-0 animate-slide-in-right"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
          >
            {/* Rank */}
            <div className="w-5 text-right">
              <span className="text-xs text-muted-foreground tabular-nums">
                {index + 1}
              </span>
            </div>

            {/* Brand */}
            <div className="flex items-center gap-2 w-28 shrink-0">
              <BrandLogo brand={brand.marque} size="sm" />
              <span className="text-sm font-medium truncate">{brand.marque}</span>
            </div>

            {/* Bar */}
            <div className="flex-1 h-6 bg-muted rounded overflow-hidden relative">
              <div
                className={`h-full ${getBarColor(brand.indiceFiabilite)} rounded transition-all duration-500 ease-out`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Score */}
            <div className="w-10 text-right">
              <span className="text-sm font-semibold tabular-nums">
                {brand.indiceFiabilite.toFixed(1)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
