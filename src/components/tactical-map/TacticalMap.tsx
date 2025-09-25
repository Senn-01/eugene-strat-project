'use client'

import { useEffect, useState } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'
import { ChartHeader } from './ChartHeader'
import { ProjectNode } from './ProjectNode'
import { ProjectModal } from './ProjectModal'
import { matrixUtils } from './utils'
import { useTacticalMapState } from './useTacticalMapState'
import { Project } from '@/lib/types/project.types'

interface TacticalMapProps {
  initialProjects?: Project[]
}

export function TacticalMap({ initialProjects = [] }: TacticalMapProps) {
  const [viewMode, setViewMode] = useState<'all' | 'focus'>('all')

  const {
    projects,
    isModalOpen,
    modalMode,
    selectedProject,
    totalXP,
    isLoading,
    error,
    initializeProjects,
    handleProjectEdit,
    handleProjectSave,
    handleProjectComplete,
    handleBossBattleToggle,
    openCreateModal,
    closeModal,
    clearError,
  } = useTacticalMapState()

  useEffect(() => {
    initializeProjects(initialProjects)
  }, [initializeProjects, initialProjects])

  // In focus mode, show all projects but let CSS handle dimming
  const visibleProjects = projects

  return (
    <>
      <div className="tactical-map-wrapper" data-view-mode={viewMode}>
        <ChartHeader
          onAddProject={openCreateModal}
          triageCount={0} // TODO: Connect to actual capture count when triage is implemented
        />

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
        {visibleProjects
          .filter(project => project.status !== 'completed')
          .map((project) => {
            const position = matrixUtils.coordsToPixels(project.cost, project.benefit)
            return (
              <ProjectNode
                key={project.id}
                project={project}
                position={position}
                onEdit={handleProjectEdit}
                onComplete={handleProjectComplete}
                onToggleBossBattle={handleBossBattleToggle}
              />
            )
          })}
      </div>

      <div className="matrix-footer">
        <div className={`chart-footer-controls ${viewMode === 'focus' ? 'focus' : 'all'}`}>
          <button
            className="icon-toggle"
            type="button"
            title={viewMode === 'all' ? 'Switch to Focus mode' : 'Show all projects'}
            onClick={() => setViewMode(viewMode === 'all' ? 'focus' : 'all')}
          >
            <span className="icon-square" aria-hidden="true">
              {viewMode === 'all' ? (
                <Eye size={12} />
              ) : (
                <EyeOff size={12} />
              )}
            </span>
            <span className="toggle-label">{viewMode === 'all' ? 'ALL' : 'FOCUS'}</span>
          </button>
          <div className="visible-count">projects counts : {projects.filter(p => p.status !== 'completed').length}</div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="tactical-map-error" onClick={clearError}>
          <div className="error-message">{error}</div>
          <button className="error-dismiss">
            <X size={16} aria-label="Dismiss error" />
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="tactical-map-loading">
          <div className="loading-spinner">Loading...</div>
        </div>
      )}
    </div>

    {/* Project Modal */}
    <ProjectModal
      isOpen={isModalOpen}
      project={selectedProject}
      mode={modalMode}
      onClose={closeModal}
      onSave={handleProjectSave}
      existingProjects={projects}
    />
  </>
  )
}