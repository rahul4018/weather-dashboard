"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Droplets, Wind, Clock, ToggleLeft, ToggleRight } from "lucide-react"
import type { WeatherData } from "@/lib/weather-api"
import { weatherService } from "@/lib/weather-api"

interface WeatherDisplayProps {
  data: WeatherData
  units: "metric" | "imperial"
  onToggleUnits: () => void
}

export function WeatherDisplay({ data, units, onToggleUnits }: WeatherDisplayProps) {
  const tempUnit = units === "metric" ? "°C" : "°F"
  const windUnit = units === "metric" ? "m/s" : "mph"

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Weather Card */}
      <Card className="mb-6 bg-card/95 backdrop-blur-sm border-border/50 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {data.country}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleUnits}
              className="flex items-center gap-2 bg-accent/10 hover:bg-accent/20 border-accent/30"
            >
              {units === "metric" ? <ToggleLeft className="h-4 w-4" /> : <ToggleRight className="h-4 w-4" />}
              {units === "metric" ? "°C" : "°F"}
            </Button>
          </div>
          <CardTitle className="text-3xl font-bold text-card-foreground mb-2">{data.name}</CardTitle>
          <div className="flex items-center justify-center gap-4">
            <img
              src={weatherService.getWeatherIcon(data.icon) || "/placeholder.svg"}
              alt={data.description}
              className="w-20 h-20"
              crossOrigin="anonymous"
            />
            <div className="text-center">
              <div className="text-6xl font-bold text-card-foreground mb-2">
                {data.temperature}
                <span className="text-3xl text-muted-foreground">{tempUnit}</span>
              </div>
              <p className="text-lg text-muted-foreground capitalize">{data.description}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-card/95 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-full">
                <Thermometer className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="text-2xl font-bold text-card-foreground">
                  {data.temperature}
                  {tempUnit}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/95 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-full">
                <Droplets className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="text-2xl font-bold text-card-foreground">{data.humidity}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/95 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-full">
                <Wind className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
                <p className="text-2xl font-bold text-card-foreground">
                  {data.windSpeed} {windUnit}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Last Updated */}
      <Card className="bg-card/95 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Last updated: {data.timestamp}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
