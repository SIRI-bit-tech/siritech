import ProjectsClient from "@/components/projects-client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects - Siri Tech Portfolio",
  description:
    "Explore my portfolio of web development projects showcasing modern technologies and innovative solutions.",
  keywords: ["web development projects", "React projects", "Django projects", "full-stack development"],
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <ProjectsClient />
      </main>
      <Footer />
    </div>
  )
}
