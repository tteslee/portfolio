'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import CSVImport from '@/components/CSVImport'
import { Action, Actor, Asset, Connection } from '@/types'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function DataImportPage() {
  const { addImportedData, clearImportedData } = usePortfolio()
  const [importedData, setImportedData] = useState<{
    actions: Action[]
    actors: Actor[]
    assets: Asset[]
    connections: Connection[]
  }>({
    actions: [],
    actors: [],
    assets: [],
    connections: []
  })

  const handleDataImported = (data: {
    actions: Action[]
    actors: Actor[]
    assets: Asset[]
    connections: Connection[]
  }) => {
    setImportedData(prev => ({
      actions: [...prev.actions, ...data.actions],
      actors: [...prev.actors, ...data.actors],
      assets: [...prev.assets, ...data.assets],
      connections: [...prev.connections, ...data.connections]
    }))

    // Update the shared portfolio state
    addImportedData(data)
  }

  const handleClearImportedData = () => {
    setImportedData({
      actions: [],
      actors: [],
      assets: [],
      connections: []
    })
    clearImportedData()
  }

  return (
    <div className="flex h-screen bg-secondary-50">
      <Navigation />
      
      <main className="flex-1 lg:ml-64 p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Data Import</h1>
            <p className="text-secondary-600">
              Upload CSV files to import your portfolio data
            </p>
          </div>

          {/* Import Section */}
          <div className="mb-8">
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                Import Your Portfolio Data
              </h2>
              <p className="text-secondary-600 mb-6">
                Upload CSV files for each data type. Each upload area is specifically designed for its data type.
              </p>
              <CSVImport onDataImported={handleDataImported} />
            </div>
          </div>

          {/* Imported Data Summary */}
          {Object.values(importedData).some(arr => arr.length > 0) && (
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-success-600" />
                  <h2 className="text-xl font-semibold text-secondary-900">
                    Data Successfully Imported!
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    className="btn-primary text-sm flex items-center gap-2"
                  >
                    View Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={handleClearImportedData}
                    className="btn-secondary text-sm"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">
                    {importedData.actions.length}
                  </div>
                  <div className="text-sm text-primary-700">Actions</div>
                </div>
                <div className="text-center p-4 bg-success-50 rounded-lg">
                  <div className="text-2xl font-bold text-success-600">
                    {importedData.actors.length}
                  </div>
                  <div className="text-sm text-success-700">Actors</div>
                </div>
                <div className="text-center p-4 bg-accent-50 rounded-lg">
                  <div className="text-2xl font-bold text-accent-600">
                    {importedData.assets.length}
                  </div>
                  <div className="text-sm text-accent-700">Assets</div>
                </div>
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-600">
                    {importedData.connections.length}
                  </div>
                  <div className="text-sm text-secondary-700">Connections</div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-success-50 rounded-lg border border-success-200">
                <p className="text-sm text-success-800">
                  ✅ Your data has been successfully imported and is now available in the dashboard. 
                  Click &quot;View Dashboard&quot; to see your updated portfolio metrics and visualizations.
                </p>
              </div>
            </div>
          )}


        </div>
      </main>
    </div>
  )
}
