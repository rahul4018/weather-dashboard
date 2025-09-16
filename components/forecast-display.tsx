"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ForecastData } from "@/lib/weather-api"
import { weatherService } from "@/lib/weather-api"

interface ForecastDisplayProps {
  forecasts: ForecastData[]
  units: "metric" | "imperial"
}

export function ForecastDisplay({ forecasts, units }: ForecastDisplayProps) {
  const tempUnit = units === "metric" ? "°C" : "°F"

  if (forecasts.length === 0) {
    return null
  }

  return (
    <Card className="mt-6 bg-card/95 backdrop-blur-sm border-border/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-card-foreground">3-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {forecasts.map((forecast, index) => (
            <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-2">{forecast.date}</p>
              <img
                src={weatherService.getWeatherIcon(forecast.icon) || "/placeholder.svg"}
                alt={forecast.description}
                className="w-12 h-12 mx-auto mb-2"
                crossOrigin="anonymous"
              />
              <p className="text-xs text-muted-foreground capitalize mb-2">{forecast.description}</p>
              <div className="flex justify-center gap-2 text-sm">
                <span className="font-bold text-card-foreground">
                  {forecast.maxTemp}
                  {tempUnit}
                </span>
                <span className="text-muted-foreground">
                  {forecast.minTemp}
                  {tempUnit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
