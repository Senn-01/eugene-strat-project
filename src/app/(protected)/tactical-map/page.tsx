import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TacticalMap } from '@/components/tactical-map/TacticalMap'
import { Project } from '@/lib/types/project.types'

export const metadata: Metadata = {
  title: 'Tactical Map | Eugene Strat',
  description: 'Strategic project matrix visualization',
}

async function getProjects(): Promise<Project[]> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return projects || []
}

export default async function TacticalMapPage() {
  const projects = await getProjects()

  return <TacticalMap initialProjects={projects} />
}