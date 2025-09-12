'use client'

import { useEffect, useState } from 'react'
import { ProjectNode } from './ProjectNode'
import { matrixUtils } from './utils'

interface Project {
  id: string
  name: string
  cost: number // 1-10
  benefit: number // 1-10
  category: 'work' | 'learn' | 'build' | 'manage'
  status: 'active' | 'inactive' | 'completed'
  isBossBattle?: boolean
}

interface TacticalMapProps {
  projects?: Project[]
}

export function TacticalMap({ projects = [] }: TacticalMapProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className="tactical-map-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <defs>
          <filter id="paper-texture">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.04" 
              numOctaves={4} 
              seed={42} 
            />
            <feColorMatrix 
              type="saturate" 
              values="0"
            />
            <feComponentTransfer>
              <feFuncA 
                type="discrete" 
                tableValues="0 0.02 0.04 0.02 0"
              />
            </feComponentTransfer>
            <feComposite 
              operator="over" 
              in2="SourceGraphic"
            />
          </filter>
          
          <filter id="grid-variation">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.02" 
              numOctaves={2} 
              seed={5} 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              scale="0.8" 
            />
            <feGaussianBlur 
              stdDeviation="0.2" 
            />
          </filter>
          
          <filter id="hand-drawn-border">
            <feTurbulence 
              type="turbulence" 
              baseFrequency="0.01" 
              numOctaves={1} 
              seed={10} 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              scale="1.2" 
            />
          </filter>
        </defs>
      </svg>

      <div className="matrix-container">
        {/* Grid lines */}
        <svg className="matrix-grid" width="800" height="800">
          {/* Vertical grid lines */}
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={40 + i * 80}
              y1={40}
              x2={40 + i * 80}
              y2={760}
              className={i === 0 || i === 10 ? "grid-line-major" : "grid-line"}
            />
          ))}
          
          {/* Horizontal grid lines */}
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1={40}
              y1={40 + i * 80}
              x2={760}
              y2={40 + i * 80}
              className={i === 0 || i === 10 ? "grid-line-major" : "grid-line"}
            />
          ))}
        </svg>

        {/* Quadrant labels */}
        <div className="quadrant-label quadrant-top-left">
          <div className="quadrant-title">No-Brainer</div>
          <div className="quadrant-subtitle">High Ben • Low Cost</div>
        </div>
        
        <div className="quadrant-label quadrant-top-right">
          <div className="quadrant-title">Breakthrough</div>
          <div className="quadrant-subtitle">High Ben • High Cost</div>
        </div>
        
        <div className="quadrant-label quadrant-bottom-left">
          <div className="quadrant-title">Side-Projects</div>
          <div className="quadrant-subtitle">Low Ben • Low Cost</div>
        </div>
        
        <div className="quadrant-label quadrant-bottom-right">
          <div className="quadrant-title">Trap-Zone</div>
          <div className="quadrant-subtitle">Low Ben • High Cost</div>
        </div>

        {/* Axis labels */}
        <div className="axis-label axis-benefit">BENEFIT</div>
        <div className="axis-label axis-cost">COST</div>

        {/* Project nodes */}
        {projects.map((project) => {
          const position = matrixUtils.coordsToPixels(project.cost, project.benefit)
          return (
            <ProjectNode
              key={project.id}
              project={project}
              position={position}
            />
          )
        })}
      </div>
    </div>
  )
}