import { 
  Portfolio, 
  Action, 
  Actor, 
  Asset, 
  Connection, 
  Impact, 
  ActionStatus, 
  ActorType, 
  AssetType 
} from '@/types'

export const mockActions: Action[] = [
  {
    id: 'action-1',
    name: 'Urban Green Infrastructure Development',
    description: 'Implement comprehensive green infrastructure across the city including parks, green roofs, and urban forests',
    targetOutcomes: ['Improved air quality', 'Enhanced biodiversity', 'Reduced urban heat island effect'],
    status: ActionStatus.IN_PROGRESS,
    timeline: {
      startDate: '2024-01-15',
      endDate: '2026-12-31',
      milestones: [
        { id: 'm1', title: 'Site Assessment', description: 'Complete environmental assessment of target areas', dueDate: '2024-03-15', status: 'completed' },
        { id: 'm2', title: 'Community Consultation', description: 'Engage with local communities and stakeholders', dueDate: '2024-06-30', status: 'in-progress' },
        { id: 'm3', title: 'Implementation Phase 1', description: 'Begin construction of priority green spaces', dueDate: '2024-12-31', status: 'pending' }
      ]
    },
    sector: 'Environmental',
    impactArea: 'Climate Resilience',
    budget: 2500000,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'action-2',
    name: 'Smart City Digital Platform',
    description: 'Develop an integrated digital platform for city services and citizen engagement',
    targetOutcomes: ['Improved service delivery', 'Enhanced citizen engagement', 'Data-driven decision making'],
    status: ActionStatus.NOT_STARTED,
    timeline: {
      startDate: '2024-03-01',
      endDate: '2025-08-31',
      milestones: [
        { id: 'm4', title: 'Requirements Gathering', description: 'Define platform requirements and user needs', dueDate: '2024-04-30', status: 'pending' },
        { id: 'm5', title: 'Development Phase', description: 'Build core platform functionality', dueDate: '2025-02-28', status: 'pending' },
        { id: 'm6', title: 'Pilot Launch', description: 'Launch pilot program with select services', dueDate: '2025-06-30', status: 'pending' }
      ]
    },
    sector: 'Technology',
    impactArea: 'Digital Transformation',
    budget: 1800000,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'action-3',
    name: 'Affordable Housing Initiative',
    description: 'Develop 500 affordable housing units across the city with integrated community services',
    targetOutcomes: ['Increased housing affordability', 'Reduced homelessness', 'Enhanced community cohesion'],
    status: ActionStatus.IN_PROGRESS,
    timeline: {
      startDate: '2023-09-01',
      endDate: '2027-06-30',
      milestones: [
        { id: 'm7', title: 'Land Acquisition', description: 'Secure suitable land parcels for development', dueDate: '2024-01-31', status: 'completed' },
        { id: 'm8', title: 'Design and Permitting', description: 'Complete architectural design and obtain permits', dueDate: '2024-06-30', status: 'in-progress' },
        { id: 'm9', title: 'Construction Phase 1', description: 'Begin construction of first 100 units', dueDate: '2024-12-31', status: 'pending' }
      ]
    },
    sector: 'Housing',
    impactArea: 'Social Equity',
    budget: 45000000,
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'action-4',
    name: 'Renewable Energy Transition',
    description: 'Transition municipal buildings and facilities to 100% renewable energy sources',
    targetOutcomes: ['Reduced carbon emissions', 'Lower energy costs', 'Increased energy security'],
    status: ActionStatus.COMPLETED,
    timeline: {
      startDate: '2022-01-01',
      endDate: '2023-12-31',
      milestones: [
        { id: 'm10', title: 'Energy Audit', description: 'Complete comprehensive energy audit of all facilities', dueDate: '2022-03-31', status: 'completed' },
        { id: 'm11', title: 'Solar Installation', description: 'Install solar panels on municipal buildings', dueDate: '2023-06-30', status: 'completed' },
        { id: 'm12', title: 'Grid Integration', description: 'Complete grid integration and testing', dueDate: '2023-12-31', status: 'completed' }
      ]
    },
    sector: 'Energy',
    impactArea: 'Climate Action',
    budget: 8500000,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2023-12-31T00:00:00Z'
  },
  {
    id: 'action-5',
    name: 'Public Transportation Enhancement',
    description: 'Expand and modernize public transportation network with electric buses and improved routes',
    targetOutcomes: ['Reduced traffic congestion', 'Improved air quality', 'Enhanced mobility access'],
    status: ActionStatus.ON_HOLD,
    timeline: {
      startDate: '2024-02-01',
      endDate: '2026-12-31',
      milestones: [
        { id: 'm13', title: 'Route Planning', description: 'Design optimized bus routes and schedules', dueDate: '2024-04-30', status: 'completed' },
        { id: 'm14', title: 'Fleet Procurement', description: 'Procure electric buses and charging infrastructure', dueDate: '2024-08-31', status: 'delayed' },
        { id: 'm15', title: 'System Launch', description: 'Launch enhanced public transportation system', dueDate: '2025-06-30', status: 'pending' }
      ]
    },
    sector: 'Transportation',
    impactArea: 'Mobility',
    budget: 32000000,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  }
]

export const mockActors: Actor[] = [
  {
    id: 'actor-1',
    name: 'City Planning Department',
    type: ActorType.GOVERNMENT,
    sector: 'Government',
    role: 'Lead Coordinator',
    contactInfo: {
      email: 'planning@city.gov',
      phone: '+1-555-0123',
      website: 'https://city.gov/planning'
    },
    capacity: 8,
    influence: 9,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'actor-2',
    name: 'GreenTech Solutions Inc.',
    type: ActorType.PRIVATE_SECTOR,
    sector: 'Technology',
    role: 'Technology Partner',
    contactInfo: {
      email: 'contact@greentech.com',
      phone: '+1-555-0456',
      website: 'https://greentech.com'
    },
    capacity: 7,
    influence: 6,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'actor-3',
    name: 'Community Housing Coalition',
    type: ActorType.CIVIL_SOCIETY,
    sector: 'Housing',
    role: 'Advocacy Partner',
    contactInfo: {
      email: 'info@housingcoalition.org',
      phone: '+1-555-0789',
      website: 'https://housingcoalition.org'
    },
    capacity: 6,
    influence: 7,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'actor-4',
    name: 'Urban Research Institute',
    type: ActorType.ACADEMIC,
    sector: 'Research',
    role: 'Research Partner',
    contactInfo: {
      email: 'research@urbaninstitute.edu',
      phone: '+1-555-0321',
      website: 'https://urbaninstitute.edu'
    },
    capacity: 8,
    influence: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'actor-5',
    name: 'Local Business Association',
    type: ActorType.PRIVATE_SECTOR,
    sector: 'Business',
    role: 'Stakeholder',
    contactInfo: {
      email: 'info@localbusiness.org',
      phone: '+1-555-0654',
      website: 'https://localbusiness.org'
    },
    capacity: 5,
    influence: 8,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'actor-6',
    name: 'Environmental Justice Network',
    type: ActorType.CIVIL_SOCIETY,
    sector: 'Environmental',
    role: 'Advocacy Partner',
    contactInfo: {
      email: 'contact@ejnetwork.org',
      phone: '+1-555-0987',
      website: 'https://ejnetwork.org'
    },
    capacity: 7,
    influence: 6,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

export const mockAssets: Asset[] = [
  {
    id: 'asset-1',
    name: 'Federal Infrastructure Grant',
    type: AssetType.FUNDING,
    description: 'Federal funding for infrastructure development projects',
    value: 15000000,
    availability: 'available',
    owner: 'Federal Government',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'asset-2',
    name: 'City Data Platform',
    type: AssetType.DATA,
    description: 'Comprehensive city data platform with real-time analytics',
    value: 2000000,
    availability: 'available',
    owner: 'City Government',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'asset-3',
    name: 'Community Engagement Network',
    type: AssetType.NETWORK,
    description: 'Established network of community organizations and leaders',
    value: 500000,
    availability: 'available',
    owner: 'Community Coalition',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'asset-4',
    name: 'Green Technology Expertise',
    type: AssetType.KNOWLEDGE,
    description: 'Specialized knowledge in sustainable urban development',
    value: 300000,
    availability: 'available',
    owner: 'GreenTech Solutions',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'asset-5',
    name: 'Public Transportation Infrastructure',
    type: AssetType.INFRASTRUCTURE,
    description: 'Existing public transportation network and facilities',
    value: 25000000,
    availability: 'limited',
    owner: 'City Government',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'asset-6',
    name: 'Renewable Energy Systems',
    type: AssetType.TECHNOLOGY,
    description: 'Solar and wind energy systems for municipal buildings',
    value: 8500000,
    availability: 'available',
    owner: 'City Government',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

export const mockConnections: Connection[] = [
  {
    id: 'conn-1',
    sourceId: 'action-1',
    sourceType: 'action',
    targetId: 'actor-1',
    targetType: 'actor',
    relationshipType: 'dependency',
    strength: 9,
    description: 'City Planning Department leads the green infrastructure development',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'conn-2',
    sourceId: 'action-1',
    sourceType: 'action',
    targetId: 'asset-1',
    targetType: 'asset',
    relationshipType: 'support',
    strength: 8,
    description: 'Federal grant supports green infrastructure funding',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'conn-3',
    sourceId: 'action-2',
    sourceType: 'action',
    targetId: 'actor-2',
    targetType: 'actor',
    relationshipType: 'synergy',
    strength: 7,
    description: 'GreenTech Solutions provides technology expertise for digital platform',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'conn-4',
    sourceId: 'action-3',
    sourceType: 'action',
    targetId: 'actor-3',
    targetType: 'actor',
    relationshipType: 'synergy',
    strength: 8,
    description: 'Community Housing Coalition advocates for affordable housing',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'conn-5',
    sourceId: 'action-4',
    sourceType: 'action',
    targetId: 'asset-6',
    targetType: 'asset',
    relationshipType: 'dependency',
    strength: 10,
    description: 'Renewable energy systems are essential for energy transition',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'conn-6',
    sourceId: 'action-5',
    sourceType: 'action',
    targetId: 'asset-5',
    targetType: 'asset',
    relationshipType: 'dependency',
    strength: 9,
    description: 'Existing transportation infrastructure is foundation for enhancement',
    createdAt: '2024-01-01T00:00:00Z'
  }
]

export const mockImpacts: Impact[] = [
  {
    id: 'impact-1',
    actionId: 'action-1',
    type: 'direct',
    description: 'Reduction in urban heat island effect by 3-5°C',
    magnitude: 8,
    timeframe: 'medium',
    metrics: { temperature_reduction: 4, area_covered: 500 },
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'impact-2',
    actionId: 'action-1',
    type: 'co-benefit',
    description: 'Improved mental health and well-being for residents',
    magnitude: 6,
    timeframe: 'long',
    metrics: { health_improvement: 15 },
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'impact-3',
    actionId: 'action-2',
    type: 'direct',
    description: '30% improvement in city service response times',
    magnitude: 7,
    timeframe: 'short',
    metrics: { response_time_improvement: 30 },
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'impact-4',
    actionId: 'action-3',
    type: 'direct',
    description: '500 new affordable housing units created',
    magnitude: 9,
    timeframe: 'medium',
    metrics: { units_created: 500, families_housed: 500 },
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'impact-5',
    actionId: 'action-4',
    type: 'direct',
    description: '100% renewable energy for municipal buildings',
    magnitude: 10,
    timeframe: 'medium',
    metrics: { carbon_reduction: 25000, energy_cost_savings: 1200000 },
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'impact-6',
    actionId: 'action-5',
    type: 'indirect',
    description: 'Reduced traffic congestion and improved air quality',
    magnitude: 7,
    timeframe: 'medium',
    metrics: { congestion_reduction: 20, air_quality_improvement: 15 },
    createdAt: '2024-01-01T00:00:00Z'
  }
]

export const mockPortfolio: Portfolio = {
  id: 'portfolio-1',
  name: 'Sustainable City Transformation',
  description: 'Comprehensive portfolio of initiatives to transform the city into a sustainable, resilient, and equitable urban environment',
  actions: mockActions,
  actors: mockActors,
  assets: mockAssets,
  connections: mockConnections,
  impacts: mockImpacts,
  metadata: {
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    createdBy: 'City Planning Department',
    tags: ['sustainability', 'urban development', 'climate action', 'social equity'],
    sector: 'Urban Development',
    region: 'Metropolitan Area'
  }
}
