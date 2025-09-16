"use client"

import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  message?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ message = "Loading...", size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-accent mb-2`} />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  )
}
