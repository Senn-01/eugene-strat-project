'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { ProjectActionsMenu } from './ProjectActionsMenu'
import { Project } from '@/lib/types/project.types'

interface ProjectPosition {
  x: number
  y: number
}

interface ProjectNodeProps {
  project: Project
  position: ProjectPosition
  onEdit?: (project: Project) => void
  onComplete?: (project: Project, accuracyRating: number, xpEarned: number) => void
  onToggleBossBattle?: (project: Project) => void
}

export function ProjectNode({
  project,
  position,
  onEdit = () => {},
  onComplete = () => {},
  onToggleBossBattle = () => {}
}: ProjectNodeProps) {
  const [showMenu, setShowMenu] = useState(false)
  const getPatternClass = (category: string) => {
    switch (category) {
      case 'work': return 'pattern-work'
      case 'learn': return 'pattern-learn'
      case 'build': return 'pattern-build'
      case 'manage': return 'pattern-manage'
      default: return 'pattern-work'
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowMenu(true)
  }

  const handleCloseMenu = () => {
    setShowMenu(false)
  }

  return (
    <>
      <div
        className={`project-node ${showMenu ? 'menu-active' : ''}`}
        data-status={project.status}
        style={{
          left: position.x,
          top: position.y,
        }}
        title={`${project.name} (Cost: ${project.cost}, Benefit: ${project.benefit})`}
        onClick={handleClick}
      >
        <div
          className={`project-rectangle ${getPatternClass(project.category)} ${
            project.priority === 'must' ? 'high-priority' : ''
          }`}
        >
          {project.is_boss_battle && (
            <div className="boss-battle-star">
              <Star size={16} fill="currentColor" aria-label="Boss Battle" />
            </div>
          )}
        </div>
      </div>

      {showMenu && (
        <ProjectActionsMenu
          project={project}
          position={position}
          onEdit={onEdit}
          onComplete={onComplete}
          onToggleBossBattle={onToggleBossBattle}
          onClose={handleCloseMenu}
        />
      )}
    </>
  )
}