"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download, Mail, MapPin, Calendar, Award, Code, Users, Lightbulb } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    title: "Senior Full-Stack Developer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description:
      "Leading development of scalable web applications using React, Next.js, and Django. Mentoring junior developers and architecting cloud-native solutions.",
    technologies: ["React", "Next.js", "Django", "AWS", "PostgreSQL"],
  },
  {
    title: "Full-Stack Developer",
    company: "Digital Solutions Co.",
    period: "2020 - 2022",
    description:
      "Developed and maintained multiple client projects, focusing on performance optimization and user experience improvements.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    title: "Frontend Developer",
    company: "Creative Web Studio",
    period: "2018 - 2020",
    description:
      "Specialized in creating responsive, accessible web interfaces with modern JavaScript frameworks and CSS preprocessors.",
    technologies: ["JavaScript", "Vue.js", "SASS", "Webpack"],
  },
]

const achievements = [
  {
    icon: Award,
    title: "50+ Projects Completed",
    description: "Successfully delivered projects ranging from small business websites to enterprise applications.",
  },
  {
    icon: Users,
    title: "Team Leadership",
    description: "Led cross-functional teams of 5+ developers, designers, and project managers.",
  },
  {
    icon: Code,
    title: "Open Source Contributor",
    description: "Active contributor to various open-source projects with 1000+ GitHub contributions.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Focus",
    description: "Constantly exploring new technologies and implementing cutting-edge solutions.",
  },
]

export default function AboutClient() {
  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
      )

      // Bio section animation
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Experience timeline animation
      const experienceItems = experienceRef.current?.children
      if (experienceItems) {
        gsap.fromTo(
          experienceItems,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: experienceRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Achievements animation
      const achievementItems = achievementsRef.current?.children
      if (achievementItems) {
        gsap.fromTo(
          achievementItems,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleResumeDownload = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/download/`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "Siri_Tech_Resume.pdf"
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        console.error("Resume not available")
      }
    } catch (error) {
      console.error("Error downloading resume:", error)
    }
  }

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-20">
          <div className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden">
            <Image src="/professional-headshot.png" alt="Siri Tech" fill className="object-cover" />
          </div>
          <h1 className="font-serif font-black text-4xl sm:text-5xl text-foreground mb-4">About Siri Tech</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Passionate full-stack developer with 6+ years of experience creating innovative web solutions that make a
            difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={handleResumeDownload}>
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </div>
        </div>

        {/* Bio Section */}
        <div ref={bioRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="font-serif font-bold text-3xl text-foreground mb-6">My Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hello! I&apos;m Siri Tech, a passionate full-stack web developer based in the heart of innovation. My journey
                into web development began over 6 years ago when I discovered the power of code to transform ideas into
                reality.
              </p>
              <p>
                I specialize in creating modern, scalable web applications using cutting-edge technologies like React,
                Next.js, Django, and cloud platforms. My approach combines technical expertise with creative
                problem-solving to deliver solutions that not only work flawlessly but also provide exceptional user
                experiences.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, or
                mentoring aspiring developers. I believe in the power of continuous learning and sharing knowledge with
                the community.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-serif font-bold text-3xl text-foreground mb-6">Quick Facts</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Based in San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span>6+ Years of Experience</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="h-5 w-5 text-primary" />
                <span>50+ Projects Completed</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <span>Team Lead & Mentor</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-serif font-bold text-lg mb-4">Core Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Django",
                  "Python",
                  "PostgreSQL",
                  "AWS",
                  "Docker",
                  "Git",
                  "Tailwind CSS",
                ].map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-20">
          <h2 className="font-serif font-bold text-3xl text-foreground text-center mb-12">Professional Experience</h2>
          <div ref={experienceRef} className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="font-serif font-bold text-xl">{exp.title}</CardTitle>
                    <Badge variant="outline">{exp.period}</Badge>
                  </div>
                  <p className="text-primary font-medium">{exp.company}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="font-serif font-bold text-3xl text-foreground text-center mb-12">Key Achievements</h2>
          <div ref={achievementsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-serif font-bold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground text-sm">{achievement.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
