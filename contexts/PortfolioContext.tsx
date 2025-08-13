'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Portfolio, Action, Actor, Asset, Connection } from '@/types'
import { mockPortfolio } from '@/lib/mock-data'

interface PortfolioContextType {
  portfolio: Portfolio
  updatePortfolio: (newPortfolio: Portfolio) => void
  addImportedData: (data: {
    actions: Action[]
    actors: Actor[]
    assets: Asset[]
    connections: Connection[]
  }) => void
  clearImportedData: () => void
  resetToMockData: () => void
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolio, setPortfolio] = useState<Portfolio>(mockPortfolio)

  const updatePortfolio = (newPortfolio: Portfolio) => {
    setPortfolio(newPortfolio)
  }

  const addImportedData = (data: {
    actions: Action[]
    actors: Actor[]
    assets: Asset[]
    connections: Connection[]
  }) => {
    setPortfolio(prev => ({
      ...prev,
      actions: [...prev.actions, ...data.actions],
      actors: [...prev.actors, ...data.actors],
      assets: [...prev.assets, ...data.assets],
      connections: [...prev.connections, ...data.connections]
    }))
  }

  const clearImportedData = () => {
    setPortfolio(mockPortfolio)
  }

  const resetToMockData = () => {
    setPortfolio(mockPortfolio)
  }

  return (
    <PortfolioContext.Provider value={{
      portfolio,
      updatePortfolio,
      addImportedData,
      clearImportedData,
      resetToMockData
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
