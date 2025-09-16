"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface WeatherSearchProps {
  onSearch: (city: string) => void
  isLoading: boolean
}

export function WeatherSearch({ onSearch, isLoading }: WeatherSearchProps) {
  const [city, setCity] = useState("")
  const [inputError, setInputError] = useState("")

  const validateInput = (value: string): boolean => {
    if (!value || value.trim().length === 0) {
      setInputError("Please enter a city name")
      return false
    }
    if (value.trim().length < 2) {
      setInputError("City name must be at least 2 characters")
      return false
    }
    if (!/^[a-zA-Z\s\-',.]+$/.test(value.trim())) {
      setInputError("Please enter a valid city name")
      return false
    }
    setInputError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateInput(city) && !isLoading) {
      onSearch(city.trim())
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCity(value)
    if (inputError && value.trim().length >= 2) {
      setInputError("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as any)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className={`pl-10 bg-card border-border focus:ring-accent focus:border-accent ${
              inputError ? "border-destructive focus:border-destructive focus:ring-destructive" : ""
            }`}
            disabled={isLoading}
            maxLength={100}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !city.trim() || !!inputError}
          className="bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
      {inputError && <p className="text-destructive text-sm mt-1 ml-1">{inputError}</p>}
    </form>
  )
}
