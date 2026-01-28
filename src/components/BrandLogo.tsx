import { useState } from "react"

interface BrandLogoProps {
  brand: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const brandDomains: Record<string, string> = {
  "Alfa Romeo": "alfaromeo.com",
  "Aston Martin": "astonmartin.com",
  "Audi": "audi.com",
  "BMW": "bmw.com",
  "BYD": "byd.com",
  "Citroën": "citroen.com",
  "Cupra": "cupraofficial.com",
  "Dacia": "dacia.com",
  "DS": "dsautomobiles.com",
  "DS Automobiles": "dsautomobiles.com",
  "Ferrari": "ferrari.com",
  "Fiat": "fiat.com",
  "Ford": "ford.com",
  "Honda": "honda.com",
  "Hyundai": "hyundai.com",
  "Jaguar": "jaguar.com",
  "Jeep": "jeep.com",
  "Kia": "kia.com",
  "Lancia": "lancia.com",
  "Land Rover": "landrover.com",
  "Lexus": "lexus.com",
  "Lynk & Co": "lynkco.com",
  "Maserati": "maserati.com",
  "Mazda": "mazda.com",
  "Mercedes": "mercedes-benz.com",
  "Mercedes-Benz": "mercedes-benz.com",
  "MG": "mg.co.uk",
  "Mini": "mini.com",
  "Mitsubishi": "mitsubishi-motors.com",
  "Nissan": "nissan.com",
  "Opel": "opel.com",
  "Peugeot": "peugeot.com",
  "Polestar": "polestar.com",
  "Porsche": "porsche.com",
  "Renault": "renault.com",
  "Seat": "seat.com",
  "Skoda": "skoda-auto.com",
  "Smart": "smart.com",
  "Subaru": "subaru.com",
  "Suzuki": "suzuki.com",
  "Tesla": "tesla.com",
  "Toyota": "toyota.com",
  "Volkswagen": "volkswagen.com",
  "Volvo": "volvocars.com",
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
}

export function BrandLogo({ brand, size = "md", className = "" }: BrandLogoProps) {
  const [hasError, setHasError] = useState(false)

  const domain = brandDomains[brand]

  if (!domain || hasError) {
    return null
  }

  const logoUrl = `https://img.logo.dev/${domain}?token=pk_VAZ6tvAVQHCDwKeaNRVyjQ`

  return (
    <img
      src={logoUrl}
      alt={`${brand} logo`}
      className={`${sizeClasses[size]} rounded-sm object-contain ${className}`}
      onError={() => setHasError(true)}
    />
  )
}
