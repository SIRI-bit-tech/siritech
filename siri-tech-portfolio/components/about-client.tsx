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
    title: "Full-Stack Developer",
    company: "Freelance & Personal Projects",
    period: "2022 - Present",
    description:
      "Developing modern web applications using React, Next.js, and Django. Building scalable solutions and continuously learning new technologies through hands-on projects.",
    technologies: ["React", "Next.js", "Django", "PostgreSQL", "Tailwind CSS"],
  },
  {
    title: "Frontend Developer",
    company: "Personal Learning Journey",
    period: "2021 - 2022",
    description:
      "Started web development journey by mastering HTML, CSS, JavaScript and modern frameworks. Built various projects to solidify understanding of core concepts.",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Git"],
  },
  {
    title: "Self-Taught Developer",
    company: "Independent Study",
    period: "2020 - 2021",
    description:
      "Began coding journey through online courses, tutorials, and documentation. Focused on building a strong foundation in programming fundamentals.",
    technologies: ["JavaScript", "Python", "HTML/CSS", "Version Control"],
  },
]

const achievements = [
  {
    icon: Code,
    title: "20+ Projects Built",
    description: "Created diverse projects ranging from simple websites to full-stack applications for learning and portfolio.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learner",
    description: "Always exploring new technologies and implementing modern development practices in personal projects.",
  },
  {
    icon: Award,
    title: "Self-Motivated",
    description: "Successfully transitioned into web development through dedicated self-study and consistent practice.",
  },
  {
    icon: Users,
    title: "Community Engaged",
    description: "Active in developer communities, learning from others and sharing knowledge through code repositories.",
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
            Passionate full-stack developer with 2+ years of experience building modern web applications and constantly learning new technologies.
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
                Hello! I&apos;m Siri Tech, a passionate full-stack web developer who discovered the world of programming 2+ years ago. My journey began with curiosity about how websites work, and it quickly turned into a deep passion for creating digital solutions.
              </p>
              <p>
                I specialize in building modern web applications using technologies like React, Next.js, Django, and various databases. My approach focuses on writing clean, maintainable code while creating user-friendly interfaces that provide great experiences.
              </p>
              <p>
                As a self-taught developer, I&apos;ve learned the value of persistence, continuous learning, and hands-on practice. I&apos;m always working on personal projects, exploring new technologies, and looking for opportunities to grow and contribute to meaningful projects.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-serif font-bold text-3xl text-foreground mb-6">Quick Facts</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Based in Delta State, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span>2+ Years of Development</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="h-5 w-5 text-primary" />
                <span>20+ Personal Projects</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <span>Self-Taught & Motivated</span>
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
                  "JavaScript",
                  "HTML/CSS",
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
          <h2 className="font-serif font-bold text-3xl text-foreground text-center mb-12">Learning Journey</h2>
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
          <h2 className="font-serif font-bold text-3xl text-foreground text-center mb-12">Key Highlights</h2>
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