'use client'

import Navigation from '@/components/Navigation'
import DashboardMetrics from '@/components/DashboardMetrics'
import DependenciesNetwork from '@/components/DependenciesNetwork'
import TimelineProgress from '@/components/TimelineProgress'
import { usePortfolio } from '@/contexts/PortfolioContext'

export default function Dashboard() {
  const { portfolio } = usePortfolio()

  return (
    <div className="flex h-screen bg-secondary-50">
      <Navigation />
      
      <main className="flex-1 lg:ml-64 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Dashboard</h1>
            <p className="text-secondary-600">
              Overview of your portfolio performance and key insights
            </p>
          </div>

          {/* Summary Metrics */}
          <div className="mb-8">
            <DashboardMetrics portfolio={portfolio} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dependencies & Synergies */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                Dependencies & Synergies
              </h2>
              <DependenciesNetwork portfolio={portfolio} />
            </div>

            {/* Timeline & Progress */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                Timeline & Progress
              </h2>
              <TimelineProgress portfolio={portfolio} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
