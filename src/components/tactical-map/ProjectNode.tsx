interface Project {
  id: string
  name: string
  cost: number
  benefit: number
  category: 'work' | 'learn' | 'build' | 'manage'
  status: 'active' | 'inactive' | 'completed'
  isBossBattle?: boolean
}

interface ProjectPosition {
  x: number
  y: number
}

interface ProjectNodeProps {
  project: Project
  position: ProjectPosition
}

export function ProjectNode({ project, position }: ProjectNodeProps) {
  const getPatternClass = (category: string) => {
    switch (category) {
      case 'work': return 'pattern-work'
      case 'learn': return 'pattern-learn'
      case 'build': return 'pattern-build'
      case 'manage': return 'pattern-manage'
      default: return 'pattern-work'
    }
  }

  return (
    <div 
      className="project-node"
      style={{
        left: position.x,
        top: position.y,
      }}
      title={`${project.name} (Cost: ${project.cost}, Benefit: ${project.benefit})`}
    >
      <div 
        className={`project-rectangle ${getPatternClass(project.category)} ${
          project.isBossBattle ? 'high-priority' : ''
        }`}
      >
        {project.isBossBattle && (
          <div className="boss-battle-star">★</div>
        )}
      </div>
    </div>
  )
}