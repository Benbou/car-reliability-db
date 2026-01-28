import { X, Calendar, Tag } from "lucide-react"
import type { Car } from "@/types/car"
import { Button } from "@/components/ui/button"
import { AppreciationBadge } from "./AppreciationBadge"
import { FiabilityScore } from "./FiabilityScore"
import { BrandLogo } from "./BrandLogo"

interface CompareModalProps {
  cars: Car[]
  onClose: () => void
  onRemove: (carId: number) => void
}

export function CompareModal({ cars, onClose, onRemove }: CompareModalProps) {
  if (cars.length === 0) return null

  const bestScore = Math.max(...cars.map((c) => c.indiceFiabilite))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-lg border bg-background shadow-lg">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">Comparaison</h2>
            <p className="text-sm text-muted-foreground">
              {cars.length} véhicule{cars.length > 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(cars.length, 3)}, 1fr)` }}>
            {cars.map((car) => (
              <div key={car.id} className="relative rounded-lg border p-4">
                {car.indiceFiabilite === bestScore && cars.length > 1 && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                    Meilleur
                  </div>
                )}

                <button
                  onClick={() => onRemove(car.id)}
                  className="absolute top-2 right-2 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-3 mb-4 pr-6">
                  <BrandLogo brand={car.marque} size="lg" />
                  <div className="min-w-0">
                    <h3 className="font-medium truncate">{car.marque}</h3>
                    <p className="text-sm text-muted-foreground truncate">{car.modele}</p>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">
                    <FiabilityScore score={car.indiceFiabilite} />
                  </div>
                  <p className="text-xs text-muted-foreground">sur 100</p>
                </div>

                <div className="flex justify-center mb-4">
                  <AppreciationBadge appreciation={car.appreciationQueChoisir} />
                </div>

                <div className="space-y-2 text-sm border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Tag className="h-3.5 w-3.5" /> Type
                    </span>
                    <span>{car.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" /> Période
                    </span>
                    <span className="text-xs">{car.dateCommercialisation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cars.length > 1 && (
            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <h4 className="text-sm font-medium mb-1">Analyse</h4>
              <p className="text-sm text-muted-foreground">
                {(() => {
                  const best = cars.reduce((a, b) => a.indiceFiabilite > b.indiceFiabilite ? a : b)
                  const worst = cars.reduce((a, b) => a.indiceFiabilite < b.indiceFiabilite ? a : b)
                  const diff = best.indiceFiabilite - worst.indiceFiabilite
                  return `Le ${best.marque} ${best.modele} obtient le meilleur score (${best.indiceFiabilite}/100), ${diff.toFixed(1)} points de plus que le ${worst.marque} ${worst.modele}.`
                })()}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t bg-background px-6 py-4">
          <Button onClick={onClose} className="w-full">
            Fermer
          </Button>
        </div>
      </div>
    </div>
  )
}
