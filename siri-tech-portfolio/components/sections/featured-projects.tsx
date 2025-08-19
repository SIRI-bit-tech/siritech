"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProjectCard from "@/components/project-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { fetchFeaturedProjects, type Project } from "@/lib/api"

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const featuredProjects = await fetchFeaturedProjects()
        setProjects(featuredProjects)
      } catch (error) {
        console.error("Failed to load featured projects:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  useEffect(() => {
    if (loading) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Projects animation
      const projectCards = projectsRef.current?.children
      if (projectCards) {
        gsap.fromTo(
          projectCards,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [loading, projects])

  if (loading) {
    return (
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-4">Featured Projects</h2>
            <div className="flex justify-center space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-80 h-96 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and expertise in modern web development.
          </p>
        </div>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              shortDescription={project.short_description}
              image={project.image}
              githubUrl={project.github_url}
              liveUrl={project.live_url}
              technologies={project.technology_list}
              featured={project.featured}
            />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
