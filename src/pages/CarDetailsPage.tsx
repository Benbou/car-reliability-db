import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, Car, Tag, Info } from "lucide-react"
import { getCarById } from "@/data/cars"
import { Header } from "@/components/Header"
import { Breadcrumb } from "@/components/Breadcrumb"
import { AppreciationBadge } from "@/components/AppreciationBadge"
import { FiabilityScore } from "@/components/FiabilityScore"
import { ScoreRing } from "@/components/ScoreRing"
import { BrandLogo } from "@/components/BrandLogo"
import { SimilarCars } from "@/components/SimilarCars"
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
            <CardContent className="flex flex-col items-center py-16 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Car className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">Véhicule non trouvé</h2>
              <p className="text-muted-foreground mt-2 mb-6">
                Ce véhicule n'existe pas ou a été supprimé
              </p>
              <Button asChild>
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

  const getScoreComment = (score: number) => {
    if (score >= 96) return "Excellente fiabilité, parmi les meilleurs du marché"
    if (score >= 93) return "Très bonne fiabilité, peu de problèmes signalés"
    if (score >= 90) return "Bonne fiabilité, quelques problèmes mineurs"
    if (score >= 85) return "Fiabilité correcte, attention aux points faibles"
    return "Fiabilité perfectible, se renseigner sur les problèmes courants"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Recherche", href: "/" },
            { label: car.marque },
            { label: car.modele },
          ]}
        />

        {/* Back button mobile */}
        <Button asChild variant="ghost" className="mb-6 -ml-3 md:hidden">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Hero Card */}
          <Card className="lg:col-span-2 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                    <BrandLogo brand={car.marque} size="lg" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl md:text-3xl">
                      {car.marque} <span className="text-muted-foreground font-normal">{car.modele.replace(car.marque, "").trim()}</span>
                    </CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2 text-base">
                      <Tag className="h-4 w-4" />
                      {car.type}
                    </CardDescription>
                  </div>
                </div>
                <AppreciationBadge
                  appreciation={car.appreciationQueChoisir}
                  className="w-fit"
                />
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Score Ring */}
                <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-muted/50">
                  <ScoreRing score={car.indiceFiabilite} size="lg" />
                  <p className="mt-4 text-sm text-muted-foreground text-center max-w-xs">
                    {getScoreComment(car.indiceFiabilite)}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Car className="h-4 w-4" />
                      Marque
                    </span>
                    <span className="font-medium flex items-center gap-2">
                      <BrandLogo brand={car.marque} size="sm" />
                      {car.marque}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Tag className="h-4 w-4" />
                      Type
                    </span>
                    <span className="font-medium">{car.type}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Commercialisation
                    </span>
                    <span className="font-medium text-sm">{car.dateCommercialisation}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fiability Score Card */}
          <Card className="card-hover opacity-0 animate-slide-up stagger-1" style={{ animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="text-lg">Indice détaillé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold">
                  <FiabilityScore score={car.indiceFiabilite} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">sur 100 points</p>
              </div>

              <FiabilityScore score={car.indiceFiabilite} showBar />

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Appréciation</span>
                  <span className="font-medium">{car.appreciationQueChoisir}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similar Cars */}
          <Card className="lg:col-span-3 opacity-0 animate-slide-up stagger-2" style={{ animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="h-5 w-5 text-primary" />
                Véhicules similaires
              </CardTitle>
              <CardDescription>
                Véhicules du même segment avec un niveau de fiabilité comparable
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimilarCars currentCar={car} limit={4} />
            </CardContent>
          </Card>

          {/* Legend Card */}
          <Card className="lg:col-span-3 opacity-0 animate-slide-up stagger-3" style={{ animationFillMode: "forwards" }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="h-5 w-5 text-muted-foreground" />
                À propos de l'indice de fiabilité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-4">
                {(["Très bon", "Bon", "Moyen", "Médiocre", "Mauvais"] as const).map((appreciation) => (
                  <AppreciationBadge key={appreciation} appreciation={appreciation} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                L'indice de fiabilité est calculé par Que Choisir à partir des données collectées
                auprès des propriétaires de véhicules. Il prend en compte les pannes signalées,
                les coûts de réparation et la satisfaction globale des utilisateurs.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
