'use client'

import { Portfolio } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { 
  BarChart3, 
  Users, 
  Building2, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  DollarSign,
  GitBranch
} from 'lucide-react'

interface DashboardMetricsProps {
  portfolio: Portfolio
}

export default function DashboardMetrics({ portfolio }: DashboardMetricsProps) {
  const metrics = {
    totalActions: portfolio.actions.length,
    totalActors: portfolio.actors.length,
    totalAssets: portfolio.assets.length,
    completedActions: portfolio.actions.filter(a => a.status === 'completed').length,
    inProgressActions: portfolio.actions.filter(a => a.status === 'in_progress').length,
    totalFunding: portfolio.assets
      .filter(a => a.type === 'funding')
      .reduce((sum, asset) => sum + (asset.value || 0), 0),
    synergisticSolutions: portfolio.connections.filter(c => c.relationshipType === 'synergy').length,
    crossSectorCollaborations: new Set(
      portfolio.connections
        .filter(c => c.sourceType === 'actor' && c.targetType === 'actor')
        .map(c => `${c.sourceId}-${c.targetId}`)
    ).size
  }

  const metricCards = [
    {
      title: 'Actions',
      value: metrics.totalActions,
      icon: BarChart3,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      description: `${metrics.completedActions} completed, ${metrics.inProgressActions} in progress`
    },
    {
      title: 'Actors',
      value: metrics.totalActors,
      icon: Users,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      description: `${metrics.crossSectorCollaborations} cross-sector collaborations`
    },
    {
      title: 'Assets',
      value: metrics.totalAssets,
      icon: Building2,
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
      description: `${formatCurrency(metrics.totalFunding)} total funding`
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metricCards.map((metric) => (
        <div key={metric.title} className="metric-card">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${metric.bgColor} ${metric.color} mb-4`}>
            <metric.icon className="h-6 w-6" />
          </div>
          <div className="metric-value">{metric.value}</div>
          <div className="metric-label">{metric.title}</div>
          <p className="text-xs text-secondary-500 mt-2">{metric.description}</p>
        </div>
      ))}
    </div>
  )
}
