"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProjectCard from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { fetchProjects, fetchPortfolioStats, type Project, type PortfolioStats } from "@/lib/api"
import { Search, Filter, Grid, List } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsClient() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [stats, setStats] = useState<PortfolioStats>({ total_projects: 0, featured_projects: 0 })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Get all unique technologies from projects
  const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.technology_list))).sort()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, statsData] = await Promise.all([fetchProjects(), fetchPortfolioStats()])
        setProjects(projectsData)
        setFilteredProjects(projectsData)
        setStats(statsData)
      } catch (error) {
        console.error("Failed to load projects data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter projects based on search term and selected technology
  useEffect(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.short_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.technology_list.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedTech) {
      filtered = filtered.filter((project) => project.technology_list.includes(selectedTech))
    }

    setFilteredProjects(filtered)
  }, [projects, searchTerm, selectedTech])

  useEffect(() => {
    if (loading) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
      )

      // Filters animation
      gsap.fromTo(
        filtersRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
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
            stagger: 0.1,
            delay: 0.4,
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [loading, filteredProjects])

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-64 h-8 bg-muted animate-pulse rounded mx-auto mb-4"></div>
            <div className="w-96 h-4 bg-muted animate-pulse rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-full h-96 bg-muted animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="font-serif font-black text-4xl sm:text-5xl text-foreground mb-4">My Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            A collection of {stats.total_projects} projects showcasing my expertise in modern web development.
            {stats.featured_projects > 0 && ` ${stats.featured_projects} featured projects highlight my best work.`}
          </p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span>Total: {stats.total_projects}</span>
            <span>•</span>
            <span>Featured: {stats.featured_projects}</span>
            <span>•</span>
            <span>Filtered: {filteredProjects.length}</span>
          </div>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Technology Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTech === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTech(null)}
            >
              All Technologies
            </Button>
            {allTechnologies.slice(0, 10).map((tech) => (
              <Button
                key={tech}
                variant={selectedTech === tech ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
              >
                {tech}
              </Button>
            ))}
            {allTechnologies.length > 10 && (
              <Badge variant="secondary" className="px-2 py-1">
                +{allTechnologies.length - 10} more
              </Badge>
            )}
          </div>
        </div>

        {/* Projects Grid/List */}
        <div
          ref={projectsRef}
          className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} className={viewMode === "list" ? "max-w-4xl mx-auto" : ""}>
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  shortDescription={project.short_description}
                  image={project.image}
                  githubUrl={project.github_url}
                  liveUrl={project.live_url}
                  technologies={project.technology_list}
                  featured={project.featured}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="font-serif font-bold text-xl mb-2">No projects found</h3>
                <p>Try adjusting your search terms or filters.</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedTech(null)
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Load More Button (for future pagination) */}
        {filteredProjects.length > 0 && filteredProjects.length >= 9 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
