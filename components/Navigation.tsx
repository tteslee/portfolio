'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  GitBranch, 
  BarChart3, 
  Users, 
  Building2, 
  Settings,
  Upload,
  Menu,
  X
} from 'lucide-react'

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    description: 'Overview and key metrics'
  },
  {
    name: 'Scenarios',
    href: '/scenarios',
    icon: GitBranch,
    description: 'Generate and analyze scenarios'
  },
  {
    name: 'Actions',
    href: '/actions',
    icon: BarChart3,
    description: 'Manage portfolio actions'
  },
  {
    name: 'Actors',
    href: '/actors',
    icon: Users,
    description: 'View and manage stakeholders'
  },
  {
    name: 'Assets',
    href: '/assets',
    icon: Building2,
    description: 'Track portfolio assets'
  },
  {
    name: 'Data Import',
    href: '/data-import',
    icon: Upload,
    description: 'Import CSV data'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Configure portfolio settings'
  }
]

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-soft border border-secondary-200"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-secondary-600" />
          ) : (
            <Menu className="h-6 w-6 text-secondary-600" />
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Navigation sidebar */}
      <nav className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-secondary-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary-200">
            <div>
              <h1 className="text-xl font-bold text-primary-600">Portfolio Tool</h1>
              <p className="text-sm text-secondary-500">Strategic Management Platform</p>
            </div>
          </div>

          {/* Navigation items */}
          <div className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 group",
                    isActive
                      ? "bg-primary-50 text-primary-700 border border-primary-200"
                      : "text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 mr-3 transition-colors duration-200",
                    isActive ? "text-primary-600" : "text-secondary-400 group-hover:text-secondary-600"
                  )} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-secondary-200">
            <div className="text-xs text-secondary-500 text-center">
              <p>Dark Matter Labs</p>
              <p>Portfolio Tool v1.0</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
