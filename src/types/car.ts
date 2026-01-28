export type Appreciation =
  | "Très bon"
  | "Bon"
  | "Moyen"
  | "Médiocre"
  | "Mauvais"

export interface Car {
  id: number
  marque: string
  modele: string
  type: string
  dateCommercialisation: string
  appreciationQueChoisir: Appreciation
  indiceFiabilite: number
}

export interface Brand {
  rang: number
  marque: string
  appreciation: Appreciation
  indiceFiabilite: number
}

export interface CarFilters {
  marque?: string
  modele?: string
  type?: string
  appreciation?: Appreciation
}
