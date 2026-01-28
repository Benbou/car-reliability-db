import { cn } from "@/lib/utils"

interface FiabilityScoreProps {
  score: number
  showBar?: boolean
  className?: string
}

function getScoreColor(score: number): string {
  if (score >= 90) return "text-appreciation-tres-bon"
  if (score >= 80) return "text-appreciation-bon"
  if (score >= 70) return "text-appreciation-moyen"
  if (score >= 60) return "text-appreciation-mauvais"
  return "text-appreciation-tres-mauvais"
}

function getBarColor(score: number): string {
  if (score >= 90) return "bg-appreciation-tres-bon"
  if (score >= 80) return "bg-appreciation-bon"
  if (score >= 70) return "bg-appreciation-moyen"
  if (score >= 60) return "bg-appreciation-mauvais"
  return "bg-appreciation-tres-mauvais"
}

export function FiabilityScore({
  score,
  showBar = false,
  className,
}: FiabilityScoreProps) {
  if (showBar) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full transition-all", getBarColor(score))}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={cn("font-semibold", getScoreColor(score))}>
          {score}
        </span>
      </div>
    )
  }

  return (
    <span className={cn("font-semibold", getScoreColor(score), className)}>
      {score}
    </span>
  )
}
