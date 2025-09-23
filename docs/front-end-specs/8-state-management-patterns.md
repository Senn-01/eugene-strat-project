# 8. State Management Patterns

## Component State Examples
```jsx
// TacticalMap Page State
const useTacticalMapState = () => {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bossBattleProject, setBossBattleProject] = useState(null)
  const [xpPoints, setXPPoints] = useState(0)

  const handleProjectCreate = (projectData) => {
    // Validate coordinates
    const isPositionTaken = projects.some(
      p => p.cost === projectData.cost && p.benefit === projectData.benefit
    )
    
    if (isPositionTaken) {
      throw new Error('Position already occupied')
    }

    const newProject = {
      ...projectData,
      id: generateId(),
      created_at: new Date().toISOString()
    }

    setProjects(prev => [...prev, newProject])
    setIsModalOpen(false)
  }

  const handleBossBattleToggle = (projectId) => {
    setBossBattleProject(prev => prev === projectId ? null : projectId)
  }

  const handleProjectComplete = (projectId, accuracyRating) => {
    const project = projects.find(p => p.id === projectId)
    const xpEarned = project.cost * project.benefit * 10 * (bossBattleProject === projectId ? 2 : 1)
    
    setXPPoints(prev => prev + xpEarned)
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, status: 'completed', accuracy: accuracyRating } : p
    ))
  }

  return {
    projects,
    selectedProject,
    isModalOpen,
    bossBattleProject,
    xpPoints,
    handleProjectCreate,
    handleBossBattleToggle,
    handleProjectComplete,
    setIsModalOpen,
    setSelectedProject
  }
}

// Project Form State
const useProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    benefit: '',
    category: '',
    priority: '',
    status: 'focus',
    confidence: '',
    tags: '',
    dueDate: '',
    description: ''
  })

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      cost: '',
      benefit: '',
      category: '',
      priority: '',
      status: 'focus',
      confidence: '',
      tags: '',
      dueDate: '',
      description: ''
    })
  }

  const validateForm = () => {
    const required = ['name', 'cost', 'benefit', 'category', 'priority', 'confidence']
    return required.every(field => formData[field])
  }

  return {
    formData,
    updateField,
    resetForm,
    validateForm,
    isValid: validateForm()
  }
}
```
