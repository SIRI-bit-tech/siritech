import AboutClient from "@/components/about-client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - Siri Tech Portfolio",
  description:
    "Learn more about Siri Tech, a passionate full-stack web developer with expertise in modern web technologies and innovative solutions.",
  keywords: ["about siri tech", "web developer bio", "full-stack developer", "professional background"],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <AboutClient />
      </main>
      <Footer />
    </div>
  )
}
