import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Siri Tech - Web Developer Portfolio",
    short_name: "Siri Tech",
    description:
      "Professional web developer portfolio showcasing projects, skills, and expertise in modern web technologies.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2c3e50",
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
