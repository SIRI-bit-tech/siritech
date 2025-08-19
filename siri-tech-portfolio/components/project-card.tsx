"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Eye } from "lucide-react"
import ProjectDetailModal from "@/components/project-detail-modal"
import { fetchProject, type Project } from "@/lib/api"

interface ProjectCardProps {
  id: number
  title: string
  shortDescription: string
  image?: string
  githubUrl?: string
  liveUrl?: string
  technologies: string[]
  featured?: boolean
}

export default function ProjectCard({
  id,
  title,
  shortDescription,
  image,
  githubUrl,
  liveUrl,
  technologies,
  featured = false,
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fullProject, setFullProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(false)

  const handleViewDetails = async () => {
    if (!fullProject) {
      setLoading(true)
      try {
        const project = await fetchProject(id)
        setFullProject(project)
      } catch (error) {
        console.error("Failed to load project details:", error)
      } finally {
        setLoading(false)
      }
    }
    setIsModalOpen(true)
  }

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {image && (
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <Image
              src={image || "/placeholder.svg?height=200&width=400&query=project screenshot"}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {featured && <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">Featured</Badge>}
          </div>
        )}

        <CardHeader>
          <CardTitle className="font-serif font-bold text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">{shortDescription}</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.slice(0, 4).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{technologies.length - 4} more
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleViewDetails} disabled={loading}>
              <Eye className="h-4 w-4 mr-2" />
              {loading ? "Loading..." : "Details"}
            </Button>
            {githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </Link>
              </Button>
            )}
            {liveUrl && (
              <Button size="sm" asChild>
                <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Demo
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <ProjectDetailModal project={fullProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
