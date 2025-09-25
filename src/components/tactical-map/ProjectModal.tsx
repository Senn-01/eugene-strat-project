'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Project, ProjectCreateInput, ProjectUpdateInput } from '@/lib/types/project.types'

interface ProjectModalProps {
  isOpen: boolean
  project?: Project | null
  mode: 'create' | 'edit'
  onClose: () => void
  onSave: (project: ProjectCreateInput | ProjectUpdateInput) => void
  existingProjects?: Project[]
}

const initialProject: Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  name: '',
  description: '',
  cost: 5,
  benefit: 5,
  category: 'work',
  priority: 'should',
  status: 'active',
  confidence: 'medium',
  tags: [],
  due_date: null,
  is_boss_battle: false,
}

// Business terminology mappings
const confidenceLabels = [
  { value: 'very_low', label: 'Britney Spears', number: 1 },
  { value: 'low', label: 'Leap Faith', number: 2 },
  { value: 'medium', label: 'Gut Feel', number: 3 },
  { value: 'high', label: 'Magna Cum', number: 4 },
  { value: 'very_high', label: 'JCVD', number: 5 },
]

const statusOptions = [
  { value: 'active', label: 'Focus' },
  { value: 'inactive', label: 'Visible' },
]

export function ProjectModal({
  isOpen,
  project,
  mode,
  onClose,
  onSave,
  existingProjects = []
}: ProjectModalProps) {
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'>>(initialProject)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && project) {
        setFormData({
          name: project.name,
          description: project.description || '',
          cost: project.cost,
          benefit: project.benefit,
          category: project.category,
          priority: project.priority,
          status: project.status,
          confidence: project.confidence,
          tags: project.tags || [],
          due_date: project.due_date || null,
          is_boss_battle: project.is_boss_battle || false,
        })
      } else {
        setFormData(initialProject)
      }
      setErrors({})
    }
  }, [isOpen, mode, project])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required'
    }

    // Check for coordinate conflicts (excluding current project in edit mode)
    const conflictingProject = existingProjects.find(p =>
      p.cost === formData.cost &&
      p.benefit === formData.benefit &&
      p.status !== 'completed' &&
      (mode === 'create' || p.id !== project?.id)
    )

    if (conflictingProject) {
      newErrors.coordinates = `Position ${formData.cost},${formData.benefit} is occupied by "${conflictingProject.name}"`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (mode === 'edit' && project) {
      const updateData: ProjectUpdateInput = {
        id: project.id,
        name: formData.name,
        description: formData.description || undefined,
        cost: formData.cost,
        benefit: formData.benefit,
        category: formData.category,
        priority: formData.priority,
        status: formData.status === 'completed' ? undefined : formData.status, // Can't update to completed via modal
        confidence: formData.confidence,
        tags: formData.tags.length > 0 ? formData.tags : undefined,
        due_date: formData.due_date || null,
        is_boss_battle: formData.is_boss_battle,
      }
      onSave(updateData)
    } else {
      const createData: ProjectCreateInput = {
        name: formData.name,
        description: formData.description || undefined,
        cost: formData.cost,
        benefit: formData.benefit,
        category: formData.category,
        priority: formData.priority,
        status: formData.status === 'completed' ? 'active' : formData.status, // Can't create completed projects
        confidence: formData.confidence,
        tags: formData.tags.length > 0 ? formData.tags : undefined,
        due_date: formData.due_date || null,
      }
      onSave(createData)
    }
    onClose()
  }

  const handleClose = () => {
    setFormData(initialProject)
    setErrors({})
    onClose()
  }

  const getCostGuidance = (cost: number): string => {
    if (cost <= 3) return 'Quick wins (<5 hours) - Could finish in one sitting'
    if (cost <= 6) return 'Moderate effort (5-20 hours) - Multiple work sessions needed'
    return 'Major undertaking (>20 hours) - Significant time investment'
  }

  const getBenefitGuidance = (benefit: number): string => {
    if (benefit <= 3) return 'Minor improvement - Nice to have, marginal benefit'
    if (benefit <= 6) return 'Notable progress - Clear value, moves the needle'
    return 'Game-changer - Transformative, unlocks new possibilities'
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">
              {mode === 'create' ? 'Create Project' : 'Edit Project'}
            </div>
            <div className="modal-subtitle">
              Strategic Matrix Positioning
            </div>
          </div>
          <button
            className="button-cancel"
            onClick={handleClose}
            type="button"
          >
            <X size={16} aria-label="Close modal" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="single-column-form">

            {/* Section 1: Project Identity */}
            <div className="modal-section modal-section-yellow">
              <div className="section-header section-header-yellow">
                <h3 className="section-title">WHAT&apos;S THE PROJECT?</h3>
              </div>
              <div className="section-content">
                <input
                  type="text"
                  className="field-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter project name"
                  required
                />
                {errors.name && <div className="field-error">{errors.name}</div>}
              </div>
            </div>

            {/* Section 2: Strategic Position */}
            <div className="modal-section modal-section-white">
              <div className="section-header section-header-yellow">
                <h3 className="section-title">POSITION ON MATRIX</h3>
              </div>
              <div className="section-content">
                <div className="strategic-grid">
                  <div className="slider-container">
                    <label className="slider-label">Effort (Cost)</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.cost}
                      onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                      className="slider-input"
                    />
                    <div className="slider-value">{formData.cost} of 10</div>
                    <div className="slider-guidance">
                      {getCostGuidance(formData.cost)}
                    </div>
                  </div>

                  <div className="slider-container">
                    <label className="slider-label">Value (Benefit)</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.benefit}
                      onChange={(e) => setFormData({ ...formData, benefit: Number(e.target.value) })}
                      className="slider-input"
                    />
                    <div className="slider-value">{formData.benefit} of 10</div>
                    <div className="slider-guidance">
                      {getBenefitGuidance(formData.benefit)}
                    </div>
                  </div>
                </div>
                {errors.coordinates && (
                  <div className="coordinate-error">{errors.coordinates}</div>
                )}
              </div>
            </div>

            {/* Section 3: Category & Tags */}
            <div className="modal-section modal-section-white">
              <div className="section-header section-header-yellow">
                <h3 className="section-title">CATEGORIZE & TAG</h3>
              </div>
              <div className="section-content">
                <div className="category-horizontal">
                  {[
                    { value: 'work', label: 'WORK' },
                    { value: 'learn', label: 'LEARN' },
                    { value: 'build', label: 'BUILD' },
                    { value: 'manage', label: 'MANAGE' },
                  ].map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      className={`category-button pattern-${cat.value} ${formData.category === cat.value ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, category: cat.value as Project['category'] })}
                    >
                      <div className="category-pattern"></div>
                      <span className="category-label">{cat.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tags */}
                <div className="tags-section">
                  <label className="field-label">Tags (optional):</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.tags?.join(', ') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    })}
                    placeholder="e.g., frontend, urgent, client"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Priority & Status */}
            <div className="modal-section modal-section-white">
              <div className="section-header section-header-yellow">
                <h3 className="section-title">PRIORITIZE & STATUS</h3>
              </div>
              <div className="section-content">
                <div className="priority-status-grid">
                  <div className="setting-group">
                    <label className="setting-label">Priority:</label>
                    <div className="toggle-group-horizontal">
                      {[
                        { value: 'must', label: 'MUST' },
                        { value: 'should', label: 'SHOULD' },
                        { value: 'nice', label: 'NICE' },
                      ].map((pri) => (
                        <button
                          key={pri.value}
                          type="button"
                          className={`toggle-button ${formData.priority === pri.value ? 'selected' : ''}`}
                          onClick={() => setFormData({ ...formData, priority: pri.value as Project['priority'] })}
                        >
                          {pri.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="setting-group">
                    <label className="setting-label">Status:</label>
                    <div className="toggle-group-horizontal">
                      {statusOptions.map((stat) => (
                        <button
                          key={stat.value}
                          type="button"
                          className={`toggle-button ${formData.status === stat.value ? 'selected' : ''}`}
                          onClick={() => setFormData({ ...formData, status: stat.value as Project['status'] })}
                        >
                          {stat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Confidence & Timeline */}
            <div className="modal-section modal-section-grey">
              <div className="section-header section-header-grey">
                <h3 className="section-title">CONFIDENCE & TIMELINE</h3>
              </div>
              <div className="section-content">
                <div className="confidence-section">
                  <label className="field-label">How confident are you?</label>
                  <div className="confidence-blocks">
                    {confidenceLabels.map((conf) => (
                      <button
                        key={conf.value}
                        type="button"
                        className={`confidence-block ${formData.confidence === conf.value ? 'selected' : ''}`}
                        onClick={() => setFormData({ ...formData, confidence: conf.value as Project['confidence'] })}
                      >
                        <div className="confidence-label">{conf.label}</div>
                        <div className="confidence-number">{conf.number}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="due-date-section">
                  <label className="field-label">Due Date (optional):</label>
                  <input
                    type="date"
                    value={formData.due_date || ''}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value || null })}
                    className="date-input"
                  />
                </div>
              </div>
            </div>

          </div>
        </form>

        <div className="modal-actions">
          <button
            type="button"
            className="button-cancel"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button-create"
            onClick={handleSubmit}
          >
            {mode === 'create' ? 'Create Project' : 'Update Project'}
          </button>
        </div>
      </div>
    </div>
  )
}