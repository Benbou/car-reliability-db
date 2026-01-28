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
    if (score >= 95) return "from-appreciation-tres-bon to-green-400"
    if (score >= 93) return "from-appreciation-bon to-green-500"
    if (score >= 90) return "from-yellow-500 to-appreciation-moyen"
    return "from-appreciation-mauvais to-orange-400"
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
            <div className="w-6 text-right">
              <span className="text-xs font-mono text-muted-foreground">
                {index + 1}
              </span>
            </div>

            {/* Brand */}
            <div className="flex items-center gap-2 w-32 shrink-0">
              <BrandLogo brand={brand.marque} size="sm" />
              <span className="text-sm font-medium truncate">{brand.marque}</span>
            </div>

            {/* Bar */}
            <div className="flex-1 h-8 bg-secondary/50 rounded-lg overflow-hidden relative">
              <div
                className={`h-full bg-gradient-to-r ${getBarColor(brand.indiceFiabilite)} rounded-lg transition-all duration-700 ease-out relative overflow-hidden`}
                style={{ width: `${percentage}%` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              {/* Score tooltip on hover */}
              <div className="absolute inset-y-0 right-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-mono text-muted-foreground">
                  {brand.indiceFiabilite.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Score */}
            <div className="w-12 text-right">
              <span className="text-sm font-mono font-semibold text-primary">
                {brand.indiceFiabilite.toFixed(1)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
