'use client'

import { Portfolio } from '@/types'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface TimelineProgressProps {
  portfolio: Portfolio
}

export default function TimelineProgress({ portfolio }: TimelineProgressProps) {
  // Get all milestones from all actions
  const allMilestones = portfolio.actions.flatMap(action => 
    action.timeline.milestones.map(milestone => ({
      ...milestone,
      actionName: action.name,
      actionId: action.id
    }))
  )

  // Sort milestones by due date
  const sortedMilestones = allMilestones.sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )

  // Calculate overall progress
  const totalMilestones = allMilestones.length
  const completedMilestones = allMilestones.filter(m => m.status === 'completed').length
  const overallProgress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0

  // Get date range for timeline
  const dates = sortedMilestones.map(m => new Date(m.dueDate))
  const minDate = new Date(Math.min(...dates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...dates.map(d => d.getTime())))
  const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24))

  const getMilestonePosition = (date: string) => {
    const milestoneDate = new Date(date)
    const daysFromStart = (milestoneDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    return (daysFromStart / totalDays) * 100
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success-600" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-primary-600" />
      case 'delayed':
        return <AlertCircle className="h-4 w-4 text-error-600" />
      default:
        return <Clock className="h-4 w-4 text-secondary-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-500'
      case 'in-progress':
        return 'bg-primary-500'
      case 'delayed':
        return 'bg-error-500'
      default:
        return 'bg-secondary-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-secondary-700">Overall Progress</span>
          <span className="text-sm text-secondary-600">{Math.round(overallProgress)}%</span>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
        <p className="text-xs text-secondary-500">
          {completedMilestones} of {totalMilestones} milestones completed
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-secondary-600" />
          <span className="text-sm font-medium text-secondary-700">Timeline</span>
        </div>
        
        <div className="relative">
          {/* Timeline track */}
          <div className="absolute top-4 left-0 right-0 h-1 bg-secondary-200 rounded-full"></div>
          
          {/* Progress overlay */}
          <div 
            className="absolute top-4 left-0 h-1 bg-primary-600 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          ></div>

          {/* Milestone markers */}
          <div className="relative">
            {sortedMilestones.map((milestone) => (
              <div
                key={milestone.id}
                className="absolute top-0 transform -translate-x-1/2"
                style={{ left: `${getMilestonePosition(milestone.dueDate)}%` }}
              >
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${getStatusColor(milestone.status)}`}></div>
                
                {/* Milestone tooltip */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white border border-secondary-200 rounded-lg shadow-medium p-3 min-w-48 z-10 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                  <div className="flex items-start gap-2">
                    {getStatusIcon(milestone.status)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-secondary-900">{milestone.title}</p>
                      <p className="text-xs text-secondary-600 mt-1">{milestone.actionName}</p>
                      <p className="text-xs text-secondary-500 mt-1">Due: {formatDate(milestone.dueDate)}</p>
                      <p className="text-xs text-secondary-600 mt-2">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Date labels */}
          <div className="flex justify-between mt-6 text-xs text-secondary-500">
            <span>{formatDate(minDate.toISOString())}</span>
            <span>{formatDate(maxDate.toISOString())}</span>
          </div>
        </div>
      </div>

      {/* Recent Milestones */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-secondary-700">Recent Milestones</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {sortedMilestones.slice(-5).reverse().map((milestone) => (
            <div key={milestone.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary-50">
              {getStatusIcon(milestone.status)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-900 truncate">{milestone.title}</p>
                <p className="text-xs text-secondary-600">{milestone.actionName}</p>
              </div>
              <span className="text-xs text-secondary-500">{formatDate(milestone.dueDate)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
