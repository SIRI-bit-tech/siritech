import ContactClient from "@/components/contact-client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Siri Tech Portfolio",
  description:
    "Get in touch with Siri Tech for web development projects, collaborations, or professional inquiries. Let's build something amazing together.",
  keywords: ["contact siri tech", "web developer contact", "hire developer", "project inquiry"],
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <ContactClient />
      </main>
      <Footer />
    </div>
  )
}
