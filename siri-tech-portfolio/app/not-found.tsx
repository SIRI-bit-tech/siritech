"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="mb-8">
            <h1 className="font-serif font-black text-6xl text-primary mb-4">404</h1>
            <h2 className="font-serif font-bold text-2xl text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              Sorry, the page you are looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
