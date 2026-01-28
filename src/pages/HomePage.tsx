import { useState, useMemo } from "react"
import { Car, Database, Shield, TrendingUp, BarChart3 } from "lucide-react"
import { Header } from "@/components/Header"
import { SearchBar } from "@/components/SearchBar"
import { CarTable } from "@/components/CarTable"
import { FilterPanel } from "@/components/FilterPanel"
import { StatCard } from "@/components/StatCard"
import { ReliabilityChart } from "@/components/ReliabilityChart"
import { CompareBar } from "@/components/CompareBar"
import { CompareModal } from "@/components/CompareModal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Appreciation, Car as CarType } from "@/types/car"
import { carsData, brandsData, getUniqueMarques, getUniqueTypes } from "@/data/cars"

export function HomePage() {
  const [marqueFilter, setMarqueFilter] = useState("")
  const [modeleSearch, setModeleSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [appreciationFilter, setAppreciationFilter] = useState("")
  const [selectedCars, setSelectedCars] = useState<CarType[]>([])
  const [showCompareModal, setShowCompareModal] = useState(false)

  const totalCars = carsData.length
  const totalMarques = new Set(carsData.map((c) => c.marque)).size
  const avgScore = Math.round(carsData.reduce((acc, c) => acc + c.indiceFiabilite, 0) / carsData.length * 10) / 10

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

  const handleToggleCompare = (car: CarType) => {
    setSelectedCars(prev => {
      const exists = prev.find(c => c.id === car.id)
      if (exists) {
        return prev.filter(c => c.id !== car.id)
      }
      if (prev.length >= 4) return prev
      return [...prev, car]
    })
  }

  const handleRemoveFromCompare = (carId: number) => {
    setSelectedCars(prev => prev.filter(c => c.id !== carId))
  }

  const handleClearCompare = () => {
    setSelectedCars([])
  }

  const hasFilters = marqueFilter || modeleSearch || typeFilter || appreciationFilter

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative border-b mesh-gradient-hero py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Title */}
            <div className="mb-8 text-center opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
              <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm text-primary mb-4 shadow-sm">
                <Database className="h-4 w-4" />
                <span>Base de données fiabilité</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Trouvez le véhicule{" "}
                <span className="text-gradient">le plus fiable</span>
              </h1>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Comparez la fiabilité de {totalCars} modèles de {totalMarques} marques
                grâce aux données exclusives de Que Choisir
              </p>
            </div>

            {/* Search Bar */}
            <div className="mx-auto max-w-2xl opacity-0 animate-slide-up stagger-1" style={{ animationFillMode: "forwards" }}>
              <div className="rounded-xl bg-white border shadow-sm p-2">
                <SearchBar
                  initialMarque={marqueFilter}
                  initialModele={modeleSearch}
                  onSearch={handleSearch}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <StatCard
                icon={Database}
                value={totalCars}
                label="Modèles analysés"
                delay={200}
              />
              <StatCard
                icon={Car}
                value={totalMarques}
                label="Marques couvertes"
                delay={300}
              />
              <StatCard
                icon={TrendingUp}
                value={avgScore}
                label="Score moyen"
                suffix="/100"
                delay={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main column - Table */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {hasFilters ? "Résultats" : "Tous les véhicules"}
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-normal text-primary">
                        {filteredCars.length}
                      </span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Cliquez sur + pour ajouter à la comparaison
                    </p>
                  </div>
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
                <CarTable
                  cars={filteredCars}
                  selectedCars={selectedCars}
                  onToggleCompare={handleToggleCompare}
                  maxCompare={4}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Chart */}
          <div className="space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Top 10 des marques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ReliabilityChart brands={brandsData} limit={10} />
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  Légende
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "Très bon", color: "bg-green-600", range: "95+" },
                    { label: "Bon", color: "bg-green-500", range: "90-94" },
                    { label: "Moyen", color: "bg-yellow-500", range: "85-89" },
                    { label: "Médiocre", color: "bg-orange-500", range: "80-84" },
                    { label: "Mauvais", color: "bg-red-500", range: "<80" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${item.color}`} />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {item.range}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground border-t pt-4">
                  Indice de fiabilité basé sur les données collectées par Que Choisir
                  auprès des propriétaires de véhicules.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Compare Bar */}
      <CompareBar
        selectedCars={selectedCars}
        onRemove={handleRemoveFromCompare}
        onCompare={() => setShowCompareModal(true)}
        onClear={handleClearCompare}
      />

      {/* Compare Modal */}
      {showCompareModal && (
        <CompareModal
          cars={selectedCars}
          onClose={() => setShowCompareModal(false)}
          onRemove={handleRemoveFromCompare}
        />
      )}

      {/* Bottom padding for compare bar */}
      {selectedCars.length > 0 && <div className="h-20" />}
    </div>
  )
}
