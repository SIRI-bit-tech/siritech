import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import ChatWidget from "@/components/chat-widget"
import StructuredData from "@/components/structured-data"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: {
    default: "Siri Tech - Web Developer Portfolio",
    template: "%s | Siri Tech Portfolio",
  },
  description:
    "Professional web developer portfolio showcasing projects, skills, and expertise in modern web technologies including React, Next.js, Django, and Python.",
  generator: "Siri Tech",
  applicationName: "Siri Tech Portfolio",
  keywords: [
    "web developer",
    "portfolio",
    "React",
    "Next.js",
    "Django",
    "full-stack",
    "JavaScript",
    "TypeScript",
    "Python",
    "frontend",
    "backend",
    "Siri Tech",
  ],
  authors: [{ name: "Siri Tech", url: "https://siritech.dev" }],
  creator: "Siri Tech",
  publisher: "Siri Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://siritech.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Siri Tech - Web Developer Portfolio",
    description:
      "Professional web developer portfolio showcasing projects, skills, and expertise in modern web technologies.",
    siteName: "Siri Tech Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Siri Tech - Web Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siri Tech - Web Developer Portfolio",
    description:
      "Professional web developer portfolio showcasing projects, skills, and expertise in modern web technologies.",
    images: ["/og-image.png"],
    creator: "@siritech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2c3e50" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var _smartsupp = _smartsupp || {};
                _smartsupp.key = '4b25ba6501f55f334aa0785b777aa03879d17e01';
                _smartsupp.theme = {
                  color: {
                    primary: '#2c3e50',
                    accent: '#3498db'
                  }
                };
                window.smartsupp||(function(d) {
                  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                  c.type='text/javascript';c.charset='utf-8';c.async=true;
                  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
                })(document);
              } catch (e) {
                console.warn('Smartsupp chat could not be loaded:', e);
              }
            `,
          }}
        />
        <noscript>
          Powered by{" "}
          <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">
            Smartsupp
          </a>
        </noscript>
      </head>
      <body className="font-sans">
        <StructuredData type="person" />
        <StructuredData type="website" />
        {children}
        <ChatWidget />
        <Toaster />
      </body>
    </html>
  )
}
