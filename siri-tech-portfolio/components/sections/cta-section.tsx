"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, MessageCircle } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const openChat = () => {
    if (window.smartsupp) {
      window.smartsupp("chat:open")
    }
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-primary to-accent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={contentRef}>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-primary-foreground mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Let&apos;s collaborate and bring your ideas to life. I&apos;m always excited to work on new challenges and create
            amazing digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={openChat}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start a Conversation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
