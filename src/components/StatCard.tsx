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
        "rounded-xl border bg-white p-5 shadow-sm transition-all",
        "opacity-0",
        isVisible && "animate-slide-up opacity-100",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tracking-tight tabular-nums">
              {displayValue.toLocaleString("fr-FR")}
            </span>
            {suffix && (
              <span className="text-sm text-muted-foreground">{suffix}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}
