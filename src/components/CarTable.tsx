import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react"
import type { Car, Appreciation } from "@/types/car"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { AppreciationBadge } from "@/components/AppreciationBadge"
import { FiabilityScore } from "@/components/FiabilityScore"
import { BrandLogo } from "@/components/BrandLogo"

interface CarTableProps {
  cars: Car[]
}

type SortField = "marque" | "modele" | "type" | "dateCommercialisation" | "appreciationQueChoisir" | "indiceFiabilite"
type SortDirection = "asc" | "desc"

const appreciationOrder: Record<Appreciation, number> = {
  "Très bon": 5,
  "Bon": 4,
  "Moyen": 3,
  "Médiocre": 2,
  "Mauvais": 1,
}

export function CarTable({ cars }: CarTableProps) {
  const navigate = useNavigate()
  const [sortField, setSortField] = useState<SortField>("indiceFiabilite")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const sortedCars = useMemo(() => {
    return [...cars].sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case "marque":
        case "modele":
        case "type":
        case "dateCommercialisation":
          comparison = a[sortField].localeCompare(b[sortField])
          break
        case "appreciationQueChoisir":
          comparison =
            appreciationOrder[a.appreciationQueChoisir] -
            appreciationOrder[b.appreciationQueChoisir]
          break
        case "indiceFiabilite":
          comparison = a.indiceFiabilite - b.indiceFiabilite
          break
      }

      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [cars, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection(field === "indiceFiabilite" ? "desc" : "asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    )
  }

  const handleRowClick = (car: Car) => {
    navigate(`/car/${car.id}`)
  }

  if (cars.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Aucun véhicule trouvé
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8"
              onClick={() => handleSort("marque")}
            >
              Marque
              {getSortIcon("marque")}
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8"
              onClick={() => handleSort("modele")}
            >
              Modèle
              {getSortIcon("modele")}
            </Button>
          </TableHead>
          <TableHead className="hidden md:table-cell">
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8"
              onClick={() => handleSort("type")}
            >
              Type
              {getSortIcon("type")}
            </Button>
          </TableHead>
          <TableHead className="hidden lg:table-cell">
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8"
              onClick={() => handleSort("dateCommercialisation")}
            >
              Date
              {getSortIcon("dateCommercialisation")}
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8"
              onClick={() => handleSort("appreciationQueChoisir")}
            >
              Appréciation
              {getSortIcon("appreciationQueChoisir")}
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8"
              onClick={() => handleSort("indiceFiabilite")}
            >
              Fiabilité
              {getSortIcon("indiceFiabilite")}
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedCars.map((car) => (
          <TableRow
            key={car.id}
            className="cursor-pointer"
            onClick={() => handleRowClick(car)}
          >
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <BrandLogo brand={car.marque} size="sm" />
                <span>{car.marque}</span>
              </div>
            </TableCell>
            <TableCell>{car.modele}</TableCell>
            <TableCell className="hidden md:table-cell">{car.type}</TableCell>
            <TableCell className="hidden lg:table-cell">
              {car.dateCommercialisation}
            </TableCell>
            <TableCell>
              <AppreciationBadge appreciation={car.appreciationQueChoisir} />
            </TableCell>
            <TableCell>
              <FiabilityScore score={car.indiceFiabilite} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
