export interface WeatherData {
  name: string
  country: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
  condition: string
  timestamp: string
}

export interface ForecastData {
  date: string
  minTemp: number
  maxTemp: number
  description: string
  icon: string
}

export class WeatherService {
  private apiKey: string
  private baseUrl = "/api" // 👈 use Next.js proxy, not direct OpenWeather

  constructor() {
    this.apiKey =
      process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ||
      "b0a3ec63fa1876caf9be071f125d3fbf" // fallback (only dev!)

    try {
      console.log("DEBUG: WeatherService using apiKey =", this.apiKey)
    } catch {
      // ignore if console not available
    }
  }

  async getCurrentWeather(city: string, units: "metric" | "imperial" = "metric"): Promise<WeatherData> {
    if (!city || city.trim().length === 0) {
      throw new Error("Please enter a valid city name.")
    }

    if (!this.apiKey || this.apiKey === "demo_key") {
      throw new Error("API key not configured. Please add your OpenWeatherMap API key.")
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(
        `${this.baseUrl}/weather?q=${encodeURIComponent(city.trim())}&appid=${this.apiKey}&units=${units}`,
        {
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
        },
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        if (response.status === 404) throw new Error(`City "${city}" not found.`)
        if (response.status === 401) throw new Error("Invalid API key.")
        if (response.status === 429) throw new Error("Too many requests. Try again later.")
        if (response.status >= 500) throw new Error("Weather service unavailable.")
        throw new Error(`Failed to fetch weather data (${response.status}).`)
      }

      const data = await response.json()

      if (!data || !data.name || !data.main || !data.weather?.[0]) {
        throw new Error("Invalid weather data received.")
      }

      return {
        name: data.name,
        country: data.sys?.country || "Unknown",
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description || "Unknown",
        humidity: data.main.humidity || 0,
        windSpeed: data.wind?.speed || 0,
        icon: data.weather[0].icon || "01d",
        condition: this.getWeatherCondition(data.weather[0].main),
        timestamp: new Date().toLocaleString(),
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timed out. Please try again.")
      }
      throw error
    }
  }

  async getForecast(city: string, units: "metric" | "imperial" = "metric"): Promise<ForecastData[]> {
    if (!city || city.trim().length === 0) return []
    if (!this.apiKey || this.apiKey === "demo_key") return []

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(
        `${this.baseUrl}/forecast?q=${encodeURIComponent(city.trim())}&appid=${this.apiKey}&units=${units}`,
        {
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
        },
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        console.warn("Forecast fetch failed:", response.status)
        return []
      }

      const data = await response.json()
      if (!data || !Array.isArray(data.list)) {
        console.warn("Invalid forecast data structure")
        return []
      }

      return data.list
        .filter((_: any, index: number) => index % 8 === 0) // 3h steps → every 8th = ~24h
        .slice(0, 3) // next 3 days
        .map((item: any) => ({
          date: new Date(item.dt * 1000).toLocaleDateString(),
          minTemp: Math.round(item.main?.temp_min || 0),
          maxTemp: Math.round(item.main?.temp_max || 0),
          description: item.weather?.[0]?.description || "Unknown",
          icon: item.weather?.[0]?.icon || "01d",
        }))
    } catch (error) {
      console.error("Forecast fetch error:", error)
      return []
    }
  }

  private getWeatherCondition(main: string): string {
    const conditions: { [key: string]: string } = {
      Clear: "sunny",
      Clouds: "cloudy",
      Rain: "rainy",
      Drizzle: "rainy",
      Thunderstorm: "rainy",
      Snow: "snowy",
      Mist: "cloudy",
      Fog: "cloudy",
      Haze: "cloudy",
    }
    return conditions[main] || "default"
  }

  getWeatherIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }
}

export const weatherService = new WeatherService()
