"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto text-center px-4">
        <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h1 className="font-serif font-bold text-2xl text-foreground mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">An unexpected error occurred while loading this page.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          <Button onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          If the problem persists, please{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
