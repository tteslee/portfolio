'use client'

import { useEffect, useRef, useState } from 'react'
import { Portfolio } from '@/types'
import cytoscape from 'cytoscape'

interface DependenciesNetworkProps {
  portfolio: Portfolio
}

export default function DependenciesNetwork({ portfolio }: DependenciesNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cyRef = useRef<cytoscape.Core | null>(null)
  const [networkError, setNetworkError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    setNetworkError(null) // Reset error state

    // Prepare nodes
    const nodes = [
      // Actions
      ...portfolio.actions.map(action => ({
        data: {
          id: action.id,
          label: action.name,
          type: 'action',
          status: action.status,
          sector: action.sector
        }
      })),
      // Actors
      ...portfolio.actors.map(actor => ({
        data: {
          id: actor.id,
          label: actor.name,
          type: 'actor',
          actorType: actor.type,
          sector: actor.sector
        }
      })),
      // Assets
      ...portfolio.assets.map(asset => ({
        data: {
          id: asset.id,
          label: asset.name,
          type: 'asset',
          assetType: asset.type,
          availability: asset.availability
        }
      }))
    ]

    // Get all valid node IDs
    const validNodeIds = new Set([
      ...portfolio.actions.map(a => a.id),
      ...portfolio.actors.map(a => a.id),
      ...portfolio.assets.map(a => a.id)
    ])

    // Prepare edges - only include connections where both source and target exist
    const validConnections = portfolio.connections.filter(conn => {
      const sourceExists = validNodeIds.has(conn.sourceId)
      const targetExists = validNodeIds.has(conn.targetId)
      
      if (!sourceExists || !targetExists) {
        console.warn(`Skipping connection ${conn.id}: ${!sourceExists ? `Source ${conn.sourceId} not found` : ''} ${!targetExists ? `Target ${conn.targetId} not found` : ''}`)
        return false
      }
      return true
    })

    const edges = validConnections.map(conn => ({
      data: {
        id: conn.id,
        source: conn.sourceId,
        target: conn.targetId,
        relationshipType: conn.relationshipType,
        strength: conn.strength
      }
    }))

    // Initialize Cytoscape
    try {
      cyRef.current = cytoscape({
        container: containerRef.current,
        elements: {
          nodes,
          edges
        },
        style: [
          {
            selector: 'node[type="action"]',
            style: {
              'background-color': '#0ea5e9',
              'border-color': '#0284c7',
              'border-width': 2,
              'width': 20,
              'height': 20,
              'label': 'data(label)',
              'font-size': '8px',
              'text-wrap': 'wrap',
              'text-max-width': '60px',
              'text-valign': 'bottom',
              'text-halign': 'center',
              'text-margin-y': 8
            }
          },
          {
            selector: 'node[type="actor"]',
            style: {
              'background-color': '#22c55e',
              'border-color': '#16a34a',
              'border-width': 2,
              'width': 16,
              'height': 16,
              'label': 'data(label)',
              'font-size': '8px',
              'text-wrap': 'wrap',
              'text-max-width': '60px',
              'text-valign': 'bottom',
              'text-halign': 'center',
              'text-margin-y': 8
            }
          },
          {
            selector: 'node[type="asset"]',
            style: {
              'background-color': '#eab308',
              'border-color': '#ca8a04',
              'border-width': 2,
              'width': 14,
              'height': 14,
              'label': 'data(label)',
              'font-size': '8px',
              'text-wrap': 'wrap',
              'text-max-width': '60px',
              'text-valign': 'bottom',
              'text-halign': 'center',
              'text-margin-y': 8
            }
          },
          {
            selector: 'edge[relationshipType="dependency"]',
            style: {
              'width': 2,
              'line-color': '#ef4444',
              'target-arrow-color': '#ef4444',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            }
          },
          {
            selector: 'edge[relationshipType="synergy"]',
            style: {
              'width': 2,
              'line-color': '#22c55e',
              'target-arrow-color': '#22c55e',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            }
          },
          {
            selector: 'edge[relationshipType="support"]',
            style: {
              'width': 2,
              'line-color': '#0ea5e9',
              'target-arrow-color': '#0ea5e9',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            }
          },
          {
            selector: 'edge[relationshipType="conflict"]',
            style: {
              'width': 2,
              'line-color': '#f59e0b',
              'target-arrow-color': '#f59e0b',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            }
          }
        ],
        layout: {
          name: 'cose',
          animate: true,
          animationDuration: 1000,
          nodeDimensionsIncludeLabels: true,
          padding: 20,
          componentSpacing: 40,
          nodeRepulsion: 4500,
          nodeOverlap: 20,
          idealEdgeLength: 50,
          edgeElasticity: 100,
          nestingFactor: 5,
          gravity: 80,
          numIter: 1000,
          initialTemp: 200,
          coolingFactor: 0.95,
          minTemp: 1.0
        }
      })

      // Add event listeners
      cyRef.current.on('mouseover', 'node', function(e) {
        const node = e.target
        node.style('border-width', 4)
        node.style('border-color', '#1f2937')
      })

      cyRef.current.on('mouseout', 'node', function(e) {
        const node = e.target
        const nodeData = node.data()
        if (nodeData.type === 'action') {
          node.style('border-color', '#0284c7')
        } else if (nodeData.type === 'actor') {
          node.style('border-color', '#16a34a')
        } else if (nodeData.type === 'asset') {
          node.style('border-color', '#ca8a04')
        }
        node.style('border-width', 2)
      })

      // Fit the graph to the container
      cyRef.current.fit()

    } catch (error) {
      console.error('Error initializing Cytoscape network:', error)
      setNetworkError(error instanceof Error ? error.message : 'Failed to load network visualization')
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy()
        cyRef.current = null
      }
    }
  }, [portfolio])

  return (
    <div className="w-full h-80">
      {networkError ? (
        <div className="w-full h-full rounded-lg border border-secondary-200 bg-secondary-50 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-secondary-500 mb-2">⚠️</div>
            <p className="text-sm text-secondary-600 mb-2">Network visualization could not be loaded</p>
            <p className="text-xs text-secondary-500">{networkError}</p>
          </div>
        </div>
      ) : (
        <div ref={containerRef} className="w-full h-full rounded-lg border border-secondary-200" />
      )}
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
          <span>Actions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-success-600 rounded-full"></div>
          <span>Actors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-accent-600 rounded-full"></div>
          <span>Assets</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-error-500"></div>
          <span>Dependencies</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-success-500"></div>
          <span>Synergies</span>
        </div>
      </div>
    </div>
  )
}
