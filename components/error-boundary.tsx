"use client"

import React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Weather Dashboard Error:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Alert className="bg-destructive/10 border-destructive/20">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertTitle className="text-destructive">Something went wrong</AlertTitle>
              <AlertDescription className="text-destructive/80 mt-2">
                The weather dashboard encountered an unexpected error. Please try refreshing the page.
              </AlertDescription>
              <Button
                onClick={this.resetError}
                variant="outline"
                size="sm"
                className="mt-4 border-destructive/30 text-destructive hover:bg-destructive/10 bg-transparent"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </Alert>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
