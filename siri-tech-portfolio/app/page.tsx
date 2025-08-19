import HeroSection from "@/components/sections/hero-section"
import FeaturedProjects from "@/components/sections/featured-projects"
import SkillsSection from "@/components/sections/skills-section"
import CTASection from "@/components/sections/cta-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProjects />
        <SkillsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
