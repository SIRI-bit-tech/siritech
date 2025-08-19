import Script from "next/script"

interface StructuredDataProps {
  type: "person" | "website" | "portfolio"
  data?: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://siritech.dev"

    switch (type) {
      case "person":
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Siri Tech",
          jobTitle: "Full-Stack Web Developer",
          description: "Professional web developer specializing in modern web technologies",
          url: baseUrl,
          sameAs: ["https://github.com/siritech", "https://linkedin.com/in/siritech", "https://twitter.com/siritech"],
          knowsAbout: [
            "React",
            "Next.js",
            "Django",
            "Python",
            "JavaScript",
            "TypeScript",
            "Web Development",
            "Full-Stack Development",
          ],
          email: "hello@siritech.dev",
          telephone: "+1-555-123-4567",
          address: {
            "@type": "PostalAddress",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            addressCountry: "US",
          },
        }

      case "website":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Siri Tech Portfolio",
          description: "Professional web developer portfolio showcasing projects, skills, and expertise",
          url: baseUrl,
          author: {
            "@type": "Person",
            name: "Siri Tech",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/projects?search={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }

      case "portfolio":
        return {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Siri Tech Web Development Portfolio",
          description: "A collection of web development projects showcasing modern technologies",
          author: {
            "@type": "Person",
            name: "Siri Tech",
          },
          url: `${baseUrl}/projects`,
          dateCreated: "2024-01-01",
          dateModified: new Date().toISOString().split("T")[0],
          ...data,
        }

      default:
        return {}
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  )
}
