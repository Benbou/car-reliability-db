import { cn } from "@/lib/utils"

interface FiabilityScoreProps {
  score: number
  showBar?: boolean
  className?: string
}

function getScoreColor(score: number): string {
  if (score >= 95) return "text-green-600"
  if (score >= 90) return "text-green-500"
  if (score >= 85) return "text-yellow-500"
  if (score >= 80) return "text-orange-500"
  return "text-red-500"
}

function getBarColor(score: number): string {
  if (score >= 95) return "bg-green-600"
  if (score >= 90) return "bg-green-500"
  if (score >= 85) return "bg-yellow-500"
  if (score >= 80) return "bg-orange-500"
  return "bg-red-500"
}

export function FiabilityScore({
  score,
  showBar = false,
  className,
}: FiabilityScoreProps) {
  if (showBar) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full transition-all", getBarColor(score))}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={cn("text-sm font-semibold tabular-nums", getScoreColor(score))}>
          {score}
        </span>
      </div>
    )
  }

  return (
    <span className={cn("font-semibold tabular-nums", getScoreColor(score), className)}>
      {score}
    </span>
  )
}
