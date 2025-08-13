'use client'

import { useState } from 'react'
import { Upload, AlertCircle, CheckCircle, X, Download } from 'lucide-react'
import { Action, Actor, Asset, Connection, ActionStatus, ActorType, AssetType } from '@/types'
import { generateId } from '@/lib/utils'

interface CSVImportProps {
  onDataImported: (data: { actions: Action[], actors: Actor[], assets: Asset[], connections: Connection[] }) => void
}

interface ImportResult {
  success: boolean
  message: string
  data?: { actions: Action[], actors: Actor[], assets: Asset[], connections: Connection[] }
  errors?: string[]
}

type DataType = 'actions' | 'actors' | 'assets' | 'connections'

export default function CSVImport({ onDataImported }: CSVImportProps) {
  const [importResults, setImportResults] = useState<Record<DataType, ImportResult | null>>({
    actions: null,
    actors: null,
    assets: null,
    connections: null
  })
  const [isProcessing, setIsProcessing] = useState<Record<DataType, boolean>>({
    actions: false,
    actors: false,
    assets: false,
    connections: false
  })

  const parseCSV = (csvText: string): string[][] => {
    const lines = csvText.split('\n').filter(line => line.trim())
    return lines.map(line => {
      // Handle quoted fields with commas
      const fields: string[] = []
      let current = ''
      let inQuotes = false
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        if (char === '"') {
          inQuotes = !inQuotes
        } else if (char === ',' && !inQuotes) {
          fields.push(current.trim())
          current = ''
        } else {
          current += char
        }
      }
      fields.push(current.trim())
      return fields
    })
  }

  const parseActions = (rows: string[][]): Action[] => {
    const headers = rows[0]
    const dataRows = rows.slice(1)
    
    return dataRows.map(row => {
      const action: Action = {
        id: generateId(),
        name: row[headers.indexOf('name')] || 'Unnamed Action',
        description: row[headers.indexOf('description')] || '',
        targetOutcomes: row[headers.indexOf('targetOutcomes')]?.split(';').filter(Boolean) || [],
        status: (row[headers.indexOf('status')] as ActionStatus) || ActionStatus.NOT_STARTED,
        timeline: {
          startDate: row[headers.indexOf('startDate')] || new Date().toISOString().split('T')[0],
          endDate: row[headers.indexOf('endDate')] || new Date().toISOString().split('T')[0],
          milestones: []
        },
        sector: row[headers.indexOf('sector')] || 'General',
        impactArea: row[headers.indexOf('impactArea')] || 'General',
        budget: parseFloat(row[headers.indexOf('budget')]) || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      return action
    })
  }

  const parseActors = (rows: string[][]): Actor[] => {
    const headers = rows[0]
    const dataRows = rows.slice(1)
    
    return dataRows.map(row => {
      const actor: Actor = {
        id: generateId(),
        name: row[headers.indexOf('name')] || 'Unnamed Actor',
        type: (row[headers.indexOf('type')] as ActorType) || ActorType.CIVIL_SOCIETY,
        sector: row[headers.indexOf('sector')] || 'General',
        role: row[headers.indexOf('role')] || 'Stakeholder',
        contactInfo: {
          email: row[headers.indexOf('email')] || undefined,
          phone: row[headers.indexOf('phone')] || undefined,
          website: row[headers.indexOf('website')] || undefined
        },
        capacity: parseInt(row[headers.indexOf('capacity')]) || 5,
        influence: parseInt(row[headers.indexOf('influence')]) || 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      return actor
    })
  }

  const parseAssets = (rows: string[][]): Asset[] => {
    const headers = rows[0]
    const dataRows = rows.slice(1)
    
    return dataRows.map(row => {
      const asset: Asset = {
        id: generateId(),
        name: row[headers.indexOf('name')] || 'Unnamed Asset',
        type: (row[headers.indexOf('type')] as AssetType) || AssetType.KNOWLEDGE,
        description: row[headers.indexOf('description')] || '',
        value: parseFloat(row[headers.indexOf('value')]) || 0,
        availability: (row[headers.indexOf('availability')] as 'available' | 'limited' | 'unavailable') || 'available',
        owner: row[headers.indexOf('owner')] || undefined,
        location: row[headers.indexOf('location')] || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      return asset
    })
  }

  const parseConnections = (rows: string[][]): Connection[] => {
    const headers = rows[0]
    const dataRows = rows.slice(1)
    
    return dataRows.map(row => {
      const connection: Connection = {
        id: generateId(),
        sourceId: row[headers.indexOf('sourceId')] || '',
        sourceType: (row[headers.indexOf('sourceType')] as 'action' | 'actor' | 'asset') || 'action',
        targetId: row[headers.indexOf('targetId')] || '',
        targetType: (row[headers.indexOf('targetType')] as 'action' | 'actor' | 'asset') || 'actor',
        relationshipType: (row[headers.indexOf('relationshipType')] as 'dependency' | 'synergy' | 'conflict' | 'support') || 'synergy',
        strength: parseInt(row[headers.indexOf('strength')]) || 5,
        description: row[headers.indexOf('description')] || undefined,
        createdAt: new Date().toISOString()
      }
      return connection
    })
  }

  const handleFileUpload = async (file: File, dataType: DataType) => {
    setIsProcessing(prev => ({ ...prev, [dataType]: true }))
    setImportResults(prev => ({ ...prev, [dataType]: null }))

    try {
      const text = await file.text()
      const rows = parseCSV(text)
      
      if (rows.length < 2) {
        throw new Error('CSV file must have at least a header row and one data row')
      }

      let result: ImportResult

      switch (dataType) {
        case 'actions':
          const actions = parseActions(rows)
          result = {
            success: true,
            message: `Successfully imported ${actions.length} actions`,
            data: { actions, actors: [], assets: [], connections: [] }
          }
          break
        case 'actors':
          const actors = parseActors(rows)
          result = {
            success: true,
            message: `Successfully imported ${actors.length} actors`,
            data: { actions: [], actors, assets: [], connections: [] }
          }
          break
        case 'assets':
          const assets = parseAssets(rows)
          result = {
            success: true,
            message: `Successfully imported ${assets.length} assets`,
            data: { actions: [], actors: [], assets, connections: [] }
          }
          break
        case 'connections':
          const connections = parseConnections(rows)
          result = {
            success: true,
            message: `Successfully imported ${connections.length} connections`,
            data: { actions: [], actors: [], assets: [], connections }
          }
          break
        default:
          throw new Error('Invalid data type')
      }

      setImportResults(prev => ({ ...prev, [dataType]: result }))
      
      if (result.success && result.data) {
        onDataImported(result.data)
      }

    } catch (error) {
      setImportResults(prev => ({
        ...prev,
        [dataType]: {
          success: false,
          message: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          errors: [error instanceof Error ? error.message : 'Unknown error']
        }
      }))
    } finally {
      setIsProcessing(prev => ({ ...prev, [dataType]: false }))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dataType: DataType) => {
    e.preventDefault()
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0], dataType)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, dataType: DataType) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file, dataType)
    }
  }

  const downloadTemplate = (dataType: DataType) => {
    const templates = {
      actions: `name,description,status,sector,impactArea,budget,startDate,endDate,targetOutcomes
"Urban Green Infrastructure","Implement comprehensive green infrastructure",in_progress,Environmental,Climate Resilience,2500000,2024-01-15,2026-12-31,"Improved air quality;Enhanced biodiversity"`,
      actors: `name,type,sector,role,capacity,influence,email,phone,website
"City Planning Department",government,Government,Lead Coordinator,8,9,planning@city.gov,+1-555-0123,https://city.gov/planning`,
      assets: `name,type,description,value,availability,owner,location
"Federal Infrastructure Grant",funding,"Federal funding for projects",15000000,available,"Federal Government",`,
      connections: `sourceId,sourceType,targetId,targetType,relationshipType,strength,description
"action-1",action,"actor-1",actor,dependency,9,"City Planning leads the project"`
    }

    const blob = new Blob([templates[dataType]], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${dataType}-template.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getDataTypeInfo = (dataType: DataType) => {
    switch (dataType) {
      case 'actions':
        return {
          title: 'Actions',
          description: 'Portfolio initiatives and projects',
          color: 'primary',
          icon: '📊'
        }
      case 'actors':
        return {
          title: 'Actors',
          description: 'Stakeholders and organizations',
          color: 'success',
          icon: '👥'
        }
      case 'assets':
        return {
          title: 'Assets',
          description: 'Resources and capabilities',
          color: 'accent',
          icon: '🏗️'
        }
      case 'connections':
        return {
          title: 'Connections',
          description: 'Relationships between elements',
          color: 'secondary',
          icon: '🔗'
        }
    }
  }

  return (
    <div className="space-y-8">
      {/* Upload Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(['actions', 'actors', 'assets', 'connections'] as DataType[]).map((dataType) => {
          const info = getDataTypeInfo(dataType)
          const result = importResults[dataType]
          const processing = isProcessing[dataType]
          
          return (
            <div key={dataType} className="card">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900">{info.title}</h3>
                  <p className="text-sm text-secondary-600">{info.description}</p>
                </div>
              </div>

              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  `border-${info.color}-300 hover:border-${info.color}-400`
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, dataType)}
              >
                <Upload className="mx-auto h-8 w-8 text-secondary-400 mb-3" />
                <p className="text-sm font-medium text-secondary-900 mb-2">
                  Upload {info.title} CSV
                </p>
                <p className="text-xs text-secondary-600 mb-3">
                  Drag and drop or click to browse
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileSelect(e, dataType)}
                  className="hidden"
                  id={`csv-upload-${dataType}`}
                  disabled={processing}
                />
                <label
                  htmlFor={`csv-upload-${dataType}`}
                  className={`btn-primary inline-block cursor-pointer text-sm ${
                    processing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {processing ? 'Processing...' : 'Choose File'}
                </label>
              </div>

              {/* Download Template */}
              <div className="mt-3 text-center">
                <button
                  onClick={() => downloadTemplate(dataType)}
                  className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1 mx-auto"
                >
                  <Download className="h-3 w-3" />
                  Download Template
                </button>
              </div>

              {/* Import Result */}
              {result && (
                <div className={`mt-4 p-3 rounded-lg border ${
                  result.success 
                    ? 'bg-success-50 border-success-200' 
                    : 'bg-error-50 border-error-200'
                }`}>
                  <div className="flex items-start gap-2">
                    {result.success ? (
                      <CheckCircle className="h-4 w-4 text-success-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-error-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        result.success ? 'text-success-800' : 'text-error-800'
                      }`}>
                        {result.message}
                      </p>
                      {result.errors && (
                        <ul className="mt-1 text-xs text-error-700">
                          {result.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <button
                      onClick={() => setImportResults(prev => ({ ...prev, [dataType]: null }))}
                      className="text-secondary-400 hover:text-secondary-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* CSV Format Guide */}
      <div className="card">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          CSV Format Requirements
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">Actions CSV</h4>
            <p className="text-sm text-secondary-600 mb-2">
              Required columns: name, description, status, sector, impactArea, budget, startDate, endDate
            </p>
            <div className="bg-secondary-50 p-3 rounded text-xs font-mono">
              name,description,status,sector,impactArea,budget,startDate,endDate,targetOutcomes<br/>
              &quot;Urban Green Infrastructure&quot;,&quot;Implement green spaces&quot;,in_progress,Environmental,Climate Resilience,2500000,2024-01-15,2026-12-31,&quot;Improved air quality;Enhanced biodiversity&quot;
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">Actors CSV</h4>
            <p className="text-sm text-secondary-600 mb-2">
              Required columns: name, type, sector, role, capacity, influence
            </p>
            <div className="bg-secondary-50 p-3 rounded text-xs font-mono">
              name,type,sector,role,capacity,influence,email<br/>
              &quot;City Planning Department&quot;,government,Government,Lead Coordinator,8,9,planning@city.gov
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">Assets CSV</h4>
            <p className="text-sm text-secondary-600 mb-2">
              Required columns: name, type, description, value, availability
            </p>
            <div className="bg-secondary-50 p-3 rounded text-xs font-mono">
              name,type,description,value,availability,owner<br/>
              &quot;Federal Infrastructure Grant&quot;,funding,&quot;Federal funding for projects&quot;,15000000,available,&quot;Federal Government&quot;
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-secondary-800 mb-2">Connections CSV</h4>
            <p className="text-sm text-secondary-600 mb-2">
              Required columns: sourceId, sourceType, targetId, targetType, relationshipType, strength
            </p>
            <div className="bg-secondary-50 p-3 rounded text-xs font-mono">
              sourceId,sourceType,targetId,targetType,relationshipType,strength,description<br/>
              &quot;action-1&quot;,action,&quot;actor-1&quot;,actor,dependency,9,&quot;City Planning leads the project&quot;
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
