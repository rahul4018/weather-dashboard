"use client"

import { useState } from "react"
import { WeatherSearch } from "@/components/weather-search"
import { WeatherDisplay } from "@/components/weather-display"
import { ForecastDisplay } from "@/components/forecast-display"
import { WeatherService, type WeatherData, type ForecastData } from "@/lib/weather-api"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const weatherService = new WeatherService()

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [units, setUnits] = useState<"metric" | "imperial">("metric")
  const [lastSearchedCity, setLastSearchedCity] = useState<string>("")

  const handleSearch = async (city: string) => {
    setIsLoading(true)
    setError(null)
    setLastSearchedCity(city)

    try {
      const [currentWeather, forecast] = await Promise.all([
        weatherService.getCurrentWeather(city, units),
        weatherService.getForecast(city, units),
      ])

      setWeatherData(currentWeather)
      setForecastData(forecast)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setWeatherData(null)
      setForecastData([])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleUnits = async () => {
    const newUnits = units === "metric" ? "imperial" : "metric"
    setUnits(newUnits)

    // Re-fetch data with new units if we have a last searched city
    if (lastSearchedCity) {
      setIsLoading(true)
      try {
        const [currentWeather, forecast] = await Promise.all([
          weatherService.getCurrentWeather(lastSearchedCity, newUnits),
          weatherService.getForecast(lastSearchedCity, newUnits),
        ])

        setWeatherData(currentWeather)
        setForecastData(forecast)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update units")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const backgroundClass = weatherData ? `weather-${weatherData.condition}` : "weather-default"

  return (
    <div className={`min-h-screen transition-all duration-1000 ${backgroundClass}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Smart Weather Dashboard</h1>
          <p className="text-white/90 text-lg drop-shadow">Get real-time weather information for any city</p>
        </div>

        <div className="mb-8">
          <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-6">
            <Alert className="bg-destructive/10 border-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {weatherData && (
          <>
            <WeatherDisplay data={weatherData} units={units} onToggleUnits={toggleUnits} />
            <ForecastDisplay forecasts={forecastData} units={units} />
          </>
        )}

        {!weatherData && !isLoading && !error && (
          <div className="text-center text-white/80 mt-12">
            <p className="text-lg">Enter a city name to get started</p>
            <p className="text-sm mt-2 opacity-75">
              Note: This demo requires an OpenWeatherMap API key. Add your key to NEXT_PUBLIC_OPENWEATHER_API_KEY
              environment variable.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
