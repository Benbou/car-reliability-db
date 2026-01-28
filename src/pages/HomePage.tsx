import { useState, useMemo } from "react"
import { Car, Shield, Database } from "lucide-react"
import { SearchBar } from "@/components/SearchBar"
import { CarTable } from "@/components/CarTable"
import { FilterPanel } from "@/components/FilterPanel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Appreciation } from "@/types/car"
import { carsData, getUniqueMarques, getUniqueTypes } from "@/data/cars"

export function HomePage() {
  const [marqueFilter, setMarqueFilter] = useState("")
  const [modeleSearch, setModeleSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [appreciationFilter, setAppreciationFilter] = useState("")

  const totalCars = carsData.length
  const totalMarques = new Set(carsData.map((c) => c.marque)).size

  const marques = getUniqueMarques()
  const types = getUniqueTypes()

  const filteredCars = useMemo(() => {
    return carsData.filter((car) => {
      if (marqueFilter && marqueFilter !== "all" && car.marque !== marqueFilter) {
        return false
      }
      if (typeFilter && typeFilter !== "all" && car.type !== typeFilter) {
        return false
      }
      if (
        appreciationFilter &&
        appreciationFilter !== "all" &&
        car.appreciationQueChoisir !== appreciationFilter
      ) {
        return false
      }
      if (
        modeleSearch &&
        !car.modele.toLowerCase().includes(modeleSearch.toLowerCase()) &&
        !car.marque.toLowerCase().includes(modeleSearch.toLowerCase())
      ) {
        return false
      }
      return true
    })
  }, [marqueFilter, typeFilter, appreciationFilter, modeleSearch])

  const handleSearch = (marque: string, modele: string) => {
    setMarqueFilter(marque)
    setModeleSearch(modele)
  }

  const handleMarqueChange = (value: string) => {
    setMarqueFilter(value)
  }

  const handleClearFilters = () => {
    setMarqueFilter("")
    setModeleSearch("")
    setTypeFilter("")
    setAppreciationFilter("")
  }

  const hasFilters = marqueFilter || modeleSearch || typeFilter || appreciationFilter

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="rounded-full bg-primary/10 p-2.5">
                <Car className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Fiabilité Automobile
              </h1>
            </div>

            {/* Search Bar */}
            <div className="mx-auto max-w-xl">
              <SearchBar
                initialMarque={marqueFilter}
                initialModele={modeleSearch}
                onSearch={handleSearch}
              />
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Database className="h-4 w-4" />
                <span><strong className="text-foreground">{totalCars}</strong> modèles</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Car className="h-4 w-4" />
                <span><strong className="text-foreground">{totalMarques}</strong> marques</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" />
                <span>Données <strong className="text-foreground">Que Choisir</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader className="space-y-4 pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg">
                {hasFilters ? "Résultats" : "Tous les véhicules"}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({filteredCars.length} véhicule
                  {filteredCars.length > 1 ? "s" : ""})
                </span>
              </CardTitle>
            </div>

            <FilterPanel
              marques={marques}
              types={types}
              selectedMarque={marqueFilter}
              selectedType={typeFilter}
              selectedAppreciation={appreciationFilter}
              onMarqueChange={handleMarqueChange}
              onTypeChange={setTypeFilter}
              onAppreciationChange={(value) =>
                setAppreciationFilter(value as Appreciation | "")
              }
              onClearFilters={handleClearFilters}
            />
          </CardHeader>

          <CardContent className="pt-0">
            <CarTable cars={filteredCars} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
