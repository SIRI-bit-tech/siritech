"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Calendar, Star } from "lucide-react"
import type { Project } from "@/lib/api"

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && project) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
          },
        )
      }, contentRef)

      return () => ctx.revert()
    }
  }, [isOpen, project])

  if (!project) return null

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/placeholder.svg"
    if (imagePath.startsWith("http")) return imagePath
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "") : undefined) ||
      "http://localhost:8000"
    return `${backendUrl}${imagePath}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div ref={contentRef}>
          <DialogHeader>
            <DialogTitle className="font-serif font-bold text-2xl flex items-center gap-2">
              {project.title}
              {project.featured && (
                <Badge className="bg-accent text-accent-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Project Image */}
            {project.image && (
              <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
                <Image src={getImageUrl(project.image)} alt={project.title} fill className="object-cover" />
              </div>
            )}

            {/* Project Description */}
            <div>
              <h3 className="font-serif font-bold text-lg mb-3">About This Project</h3>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="font-serif font-bold text-lg mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technology_list.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Project Links */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.github_url && (
                <Button asChild className="flex-1">
                  <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View Source Code
                  </Link>
                </Button>
              )}
              {project.live_url && (
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Link>
                </Button>
              )}
            </div>

            {/* Project Metadata */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
              </div>
              {project.updated_at !== project.created_at && (
                <div className="flex items-center gap-1">
                  <span>Updated: {new Date(project.updated_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
