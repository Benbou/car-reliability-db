import { Scale, X } from "lucide-react"
import type { Car } from "@/types/car"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "./BrandLogo"

interface CompareBarProps {
  selectedCars: Car[]
  onRemove: (carId: number) => void
  onCompare: () => void
  onClear: () => void
}

export function CompareBar({
  selectedCars,
  onRemove,
  onCompare,
  onClear,
}: CompareBarProps) {
  if (selectedCars.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
              <Scale className="h-4 w-4" />
              <span className="hidden sm:inline">Comparer:</span>
              <span className="font-medium text-foreground">{selectedCars.length}</span>
            </div>
            <div className="flex items-center gap-2">
              {selectedCars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center gap-2 rounded-md border bg-muted/50 px-2 py-1 text-sm"
                >
                  <BrandLogo brand={car.marque} size="sm" />
                  <span className="hidden sm:inline max-w-20 truncate">{car.marque}</span>
                  <button
                    onClick={() => onRemove(car.id)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={`Retirer ${car.marque}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={onClear}>
              Effacer
            </Button>
            <Button size="sm" onClick={onCompare} disabled={selectedCars.length < 2}>
              Comparer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
