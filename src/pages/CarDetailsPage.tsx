import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, Car, Tag } from "lucide-react"
import { getCarById } from "@/data/cars"
import { Header } from "@/components/Header"
import { AppreciationBadge } from "@/components/AppreciationBadge"
import { FiabilityScore } from "@/components/FiabilityScore"
import { BrandLogo } from "@/components/BrandLogo"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CarDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const car = id ? getCarById(parseInt(id, 10)) : undefined

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="mx-auto max-w-2xl">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Véhicule non trouvé</p>
              <Button asChild className="mt-4">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à la recherche
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux résultats
          </Link>
        </Button>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Main Info Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <BrandLogo brand={car.marque} size="lg" />
                    <span>{car.marque} {car.modele}</span>
                  </CardTitle>
                  <CardDescription className="mt-1">{car.type}</CardDescription>
                </div>
                <AppreciationBadge
                  appreciation={car.appreciationQueChoisir}
                  className="w-fit text-sm"
                />
              </div>
            </CardHeader>
          </Card>

          {/* Fiability Score Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="rounded-full bg-primary/10 p-2">
                  <Car className="h-4 w-4 text-primary" />
                </div>
                Indice de Fiabilité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold">
                    <FiabilityScore score={car.indiceFiabilite} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">sur 100</p>
                </div>
                <FiabilityScore score={car.indiceFiabilite} showBar />
              </div>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="rounded-full bg-primary/10 p-2">
                  <Tag className="h-4 w-4 text-primary" />
                </div>
                Détails du Véhicule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Marque</dt>
                  <dd className="flex items-center gap-2 font-medium">
                    <BrandLogo brand={car.marque} size="sm" />
                    {car.marque}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Modèle</dt>
                  <dd className="font-medium">{car.modele}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Type</dt>
                  <dd className="font-medium">{car.type}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Commercialisation
                  </dt>
                  <dd className="font-medium">{car.dateCommercialisation}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Appreciation Legend Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Légende des Appréciations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <AppreciationBadge appreciation="Très bon" />
                <AppreciationBadge appreciation="Bon" />
                <AppreciationBadge appreciation="Moyen" />
                <AppreciationBadge appreciation="Médiocre" />
                <AppreciationBadge appreciation="Mauvais" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                L'appréciation est basée sur les données collectées par Que
                Choisir auprès des propriétaires de véhicules. L'indice de
                fiabilité prend en compte les pannes, les coûts de réparation et
                la satisfaction globale.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
