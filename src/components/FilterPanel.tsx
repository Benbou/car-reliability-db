import type { Appreciation } from "@/types/car"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { BrandLogo } from "@/components/BrandLogo"

interface FilterPanelProps {
  marques: string[]
  types: string[]
  selectedMarque: string
  selectedType: string
  selectedAppreciation: string
  onMarqueChange: (value: string) => void
  onTypeChange: (value: string) => void
  onAppreciationChange: (value: string) => void
  onClearFilters: () => void
}

const appreciationLevels: Appreciation[] = [
  "Très bon",
  "Bon",
  "Moyen",
  "Médiocre",
  "Mauvais",
]

export function FilterPanel({
  marques,
  types,
  selectedMarque,
  selectedType,
  selectedAppreciation,
  onMarqueChange,
  onTypeChange,
  onAppreciationChange,
  onClearFilters,
}: FilterPanelProps) {
  const hasFilters = selectedMarque || selectedType || selectedAppreciation

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">Filtres:</span>

      <Select value={selectedMarque} onValueChange={onMarqueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Marque" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les marques</SelectItem>
          {marques.map((m) => (
            <SelectItem key={m} value={m}>
              <div className="flex items-center gap-2">
                <BrandLogo brand={m} size="sm" />
                <span>{m}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          {types.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedAppreciation} onValueChange={onAppreciationChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Appréciation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes</SelectItem>
          {appreciationLevels.map((a) => (
            <SelectItem key={a} value={a}>
              {a}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground"
        >
          <X className="mr-1 h-4 w-4" />
          Effacer
        </Button>
      )}
    </div>
  )
}
