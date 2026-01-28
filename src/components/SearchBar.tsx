import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getUniqueMarques, getModelesByMarque } from "@/data/cars"
import { BrandLogo } from "@/components/BrandLogo"

interface SearchBarProps {
  initialMarque?: string
  initialModele?: string
  variant?: "default" | "compact"
  onSearch?: (marque: string, modele: string) => void
}

export function SearchBar({
  initialMarque = "",
  initialModele = "",
  variant = "default",
  onSearch,
}: SearchBarProps) {
  const [marque, setMarque] = useState(initialMarque)
  const [modele, setModele] = useState(initialModele)
  const [modeles, setModeles] = useState<string[]>([])

  const marques = getUniqueMarques()

  useEffect(() => {
    if (marque) {
      setModeles(getModelesByMarque(marque))
    } else {
      setModeles([])
      setModele("")
    }
  }, [marque])

  useEffect(() => {
    setMarque(initialMarque)
  }, [initialMarque])

  useEffect(() => {
    setModele(initialModele)
  }, [initialModele])

  const handleSearch = () => {
    onSearch?.(marque, modele)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const isCompact = variant === "compact"

  return (
    <div
      className={`flex ${isCompact ? "flex-row gap-2" : "flex-col gap-4 sm:flex-row"}`}
      onKeyDown={handleKeyDown}
    >
      <Select value={marque} onValueChange={setMarque}>
        <SelectTrigger className={isCompact ? "w-[160px]" : "w-full sm:w-[220px]"}>
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

      {marque && marque !== "all" ? (
        <Select value={modele} onValueChange={setModele}>
          <SelectTrigger className={isCompact ? "w-[140px]" : "w-full sm:w-[200px]"}>
            <SelectValue placeholder="Modèle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les modèles</SelectItem>
            {modeles.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          placeholder="Rechercher un modèle..."
          value={modele}
          onChange={(e) => setModele(e.target.value)}
          className={isCompact ? "w-[140px]" : "w-full sm:w-[200px]"}
        />
      )}

      <Button onClick={handleSearch} className={isCompact ? "px-3" : ""}>
        <Search className="h-4 w-4" />
        {!isCompact && <span className="ml-2">Rechercher</span>}
      </Button>
    </div>
  )
}
