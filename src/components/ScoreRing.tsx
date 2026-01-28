import { cn } from "@/lib/utils"

interface ScoreRingProps {
  score: number
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeConfig = {
  sm: { diameter: 60, strokeWidth: 4, fontSize: "text-sm" },
  md: { diameter: 80, strokeWidth: 5, fontSize: "text-lg" },
  lg: { diameter: 120, strokeWidth: 6, fontSize: "text-3xl" },
}

function getScoreColor(score: number): string {
  if (score >= 95) return "stroke-green-600"
  if (score >= 90) return "stroke-green-500"
  if (score >= 85) return "stroke-yellow-500"
  if (score >= 80) return "stroke-orange-500"
  return "stroke-red-500"
}

function getTextColor(score: number): string {
  if (score >= 95) return "text-green-600"
  if (score >= 90) return "text-green-500"
  if (score >= 85) return "text-yellow-600"
  if (score >= 80) return "text-orange-500"
  return "text-red-500"
}

export function ScoreRing({ score, size = "md", className }: ScoreRingProps) {
  const { diameter, strokeWidth, fontSize } = sizeConfig[size]
  const radius = (diameter - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const offset = circumference - progress

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={diameter}
        height={diameter}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        {/* Progress circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(getScoreColor(score), "transition-all duration-1000 ease-out")}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold tabular-nums", fontSize, getTextColor(score))}>
          {score}
        </span>
        {size === "lg" && (
          <span className="text-xs text-muted-foreground">/100</span>
        )}
      </div>
    </div>
  )
}
