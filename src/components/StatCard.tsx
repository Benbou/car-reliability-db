import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: LucideIcon
  value: number
  label: string
  suffix?: string
  delay?: number
  className?: string
}

export function StatCard({
  icon: Icon,
  value,
  label,
  suffix = "",
  delay = 0,
  className,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    const duration = 1500
    const steps = 60
    const stepValue = value / steps
    let current = 0

    const interval = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(interval)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [value, isVisible])

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        "opacity-0",
        isVisible && "animate-slide-up opacity-100",
        className
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight font-mono">
              {displayValue.toLocaleString("fr-FR")}
            </span>
            {suffix && (
              <span className="text-lg text-muted-foreground">{suffix}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}
