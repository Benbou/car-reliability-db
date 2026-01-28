import { useMemo } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import type { Car } from "@/types/car"
import { carsData } from "@/data/cars"
import { BrandLogo } from "./BrandLogo"
import { AppreciationBadge } from "./AppreciationBadge"
import { FiabilityScore } from "./FiabilityScore"

interface SimilarCarsProps {
  currentCar: Car
  limit?: number
}

export function SimilarCars({ currentCar, limit = 4 }: SimilarCarsProps) {
  const similarCars = useMemo(() => {
    return carsData
      .filter((car) => {
        if (car.id === currentCar.id) return false
        const sameType = car.type === currentCar.type
        const sameBrand = car.marque === currentCar.marque
        const similarScore = Math.abs(car.indiceFiabilite - currentCar.indiceFiabilite) <= 5
        return (sameType || sameBrand) && similarScore
      })
      .sort((a, b) => {
        const aTypeMatch = a.type === currentCar.type ? 1 : 0
        const bTypeMatch = b.type === currentCar.type ? 1 : 0
        if (aTypeMatch !== bTypeMatch) return bTypeMatch - aTypeMatch
        return (
          Math.abs(a.indiceFiabilite - currentCar.indiceFiabilite) -
          Math.abs(b.indiceFiabilite - currentCar.indiceFiabilite)
        )
      })
      .slice(0, limit)
  }, [currentCar, limit])

  if (similarCars.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Aucun véhicule similaire trouvé.
      </p>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {similarCars.map((car) => (
        <Link
          key={car.id}
          to={`/car/${car.id}`}
          className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
        >
          <BrandLogo brand={car.marque} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate">{car.marque}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <AppreciationBadge appreciation={car.appreciationQueChoisir} />
              <span className="text-xs text-muted-foreground">{car.type}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FiabilityScore score={car.indiceFiabilite} />
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      ))}
    </div>
  )
}
