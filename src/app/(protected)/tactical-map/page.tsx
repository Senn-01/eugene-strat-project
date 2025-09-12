import { Metadata } from 'next'
import { TacticalMap } from '@/components/tactical-map/TacticalMap'

export const metadata: Metadata = {
  title: 'Tactical Map | Eugene Strat',
  description: 'Strategic project matrix visualization',
}

// Sample data for development - replace with Supabase data fetching
const sampleProjects = [
  {
    id: '1',
    name: 'User Auth System',
    cost: 3,
    benefit: 8,
    category: 'work' as const,
    status: 'active' as const,
    isBossBattle: true,
  },
  {
    id: '2',
    name: 'React Patterns Course',
    cost: 2,
    benefit: 7,
    category: 'learn' as const,
    status: 'active' as const,
  },
  {
    id: '3',
    name: 'Personal Portfolio',
    cost: 4,
    benefit: 6,
    category: 'build' as const,
    status: 'active' as const,
  },
  {
    id: '4',
    name: 'Team Meetings',
    cost: 2,
    benefit: 4,
    category: 'manage' as const,
    status: 'active' as const,
  },
  {
    id: '5',
    name: 'Expensive Legacy System',
    cost: 9,
    benefit: 2,
    category: 'work' as const,
    status: 'active' as const,
  },
]

export default function TacticalMapPage() {
  return <TacticalMap projects={sampleProjects} />
}