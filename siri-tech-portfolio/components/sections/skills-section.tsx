"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Skill {
  name: string
  level: number
  category: string
}

const skills: Skill[] = [
  { name: "React", level: 95, category: "Frontend" },
  { name: "Next.js", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 88, category: "Frontend" },
  { name: "Tailwind CSS", level: 92, category: "Frontend" },
  { name: "Django", level: 85, category: "Backend" },
  { name: "Python", level: 90, category: "Backend" },
  { name: "PostgreSQL", level: 80, category: "Backend" },
  { name: "Redis", level: 75, category: "Backend" },
  { name: "AWS", level: 70, category: "DevOps" },
  { name: "Docker", level: 78, category: "DevOps" },
  { name: "Git", level: 95, category: "Tools" },
  { name: "Figma", level: 82, category: "Tools" },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

      // Skills animation
      const skillElements = skillsRef.current?.querySelectorAll(".skill-item")
      if (skillElements) {
        skillElements.forEach((skill, index) => {
          const progressBar = skill.querySelector(".progress-bar")
          const progressFill = skill.querySelector(".progress-fill")
          const level = Number.parseInt(skill.getAttribute("data-level") || "0")

          // Animate skill item appearance
          gsap.fromTo(
            skill,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: skill,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse",
              },
            },
          )

          // Animate progress bar fill
          gsap.fromTo(
            progressFill,
            { width: "0%" },
            {
              width: `${level}%`,
              duration: 1.5,
              ease: "power2.out",
              delay: index * 0.1 + 0.3,
              scrollTrigger: {
                trigger: skill,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse",
              },
            },
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I specialize in modern web technologies and have experience across the full development stack.
          </p>
        </div>

        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="space-y-6">
              <h3 className="font-serif font-bold text-xl text-foreground mb-6">{category}</h3>
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div key={skill.name} className="skill-item" data-level={skill.level}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="progress-bar w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="progress-fill h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
