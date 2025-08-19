const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export interface Project {
  id: number
  title: string
  description: string
  short_description: string
  github_url?: string
  live_url?: string
  image?: string
  technologies: string
  technology_list: string[]
  featured: boolean
  order: number
  created_at: string
  updated_at: string
}

export interface PortfolioStats {
  total_projects: number
  featured_projects: number
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/`)
    if (!response.ok) {
      throw new Error("Failed to fetch projects")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/featured/`)
    if (!response.ok) {
      throw new Error("Failed to fetch featured projects")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    return []
  }
}

export async function fetchProject(id: number): Promise<Project | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}/`)
    if (!response.ok) {
      throw new Error("Failed to fetch project")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching project:", error)
    return null
  }
}

export async function fetchPortfolioStats(): Promise<PortfolioStats> {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/`)
    if (!response.ok) {
      throw new Error("Failed to fetch portfolio stats")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching portfolio stats:", error)
    return { total_projects: 0, featured_projects: 0 }
  }
}
