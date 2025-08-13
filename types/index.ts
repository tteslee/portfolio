// Core Portfolio Types
export interface Action {
  id: string;
  name: string;
  description: string;
  targetOutcomes: string[];
  status: ActionStatus;
  timeline: {
    startDate: string;
    endDate: string;
    milestones: Milestone[];
  };
  sector: string;
  impactArea: string;
  budget?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Actor {
  id: string;
  name: string;
  type: ActorType;
  sector: string;
  role: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  capacity: number; // 1-10 scale
  influence: number; // 1-10 scale
  createdAt: string;
  updatedAt: string;
}

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  description: string;
  value?: number;
  availability: 'available' | 'limited' | 'unavailable';
  owner?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Connection {
  id: string;
  sourceId: string;
  sourceType: 'action' | 'actor' | 'asset';
  targetId: string;
  targetType: 'action' | 'actor' | 'asset';
  relationshipType: 'dependency' | 'synergy' | 'conflict' | 'support';
  strength: number; // 1-10 scale
  description?: string;
  createdAt: string;
}

export interface Impact {
  id: string;
  actionId: string;
  type: 'direct' | 'indirect' | 'co-benefit';
  description: string;
  magnitude: number; // 1-10 scale
  timeframe: 'short' | 'medium' | 'long';
  metrics?: Record<string, number>;
  createdAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  dependencies?: string[];
}

// Enums
export enum ActionStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ON_HOLD = 'on_hold',
  CANCELLED = 'cancelled'
}

export enum ActorType {
  GOVERNMENT = 'government',
  PRIVATE_SECTOR = 'private_sector',
  CIVIL_SOCIETY = 'civil_society',
  ACADEMIC = 'academic',
  COMMUNITY = 'community',
  INTERNATIONAL = 'international'
}

export enum AssetType {
  FUNDING = 'funding',
  INFRASTRUCTURE = 'infrastructure',
  DATA = 'data',
  KNOWLEDGE = 'knowledge',
  NETWORK = 'network',
  TECHNOLOGY = 'technology'
}

// Portfolio Types
export interface Portfolio {
  id: string;
  name: string;
  description: string;
  actions: Action[];
  actors: Actor[];
  assets: Asset[];
  connections: Connection[];
  impacts: Impact[];
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    tags: string[];
    sector: string;
    region: string;
  };
}

// Scenario Types
export interface Scenario {
  id: string;
  name: string;
  description: string;
  selectedActions: string[];
  parameters: {
    timelineAdjustment: number; // months
    budgetMultiplier: number;
    riskLevel: 'low' | 'medium' | 'high';
    conditions: string[];
  };
  projectedImpacts: {
    direct: Impact[];
    indirect: Impact[];
    coBenefits: Impact[];
  };
  createdAt: string;
  updatedAt: string;
}

// Dashboard Types
export interface DashboardMetrics {
  totalActions: number;
  totalActors: number;
  totalAssets: number;
  completedActions: number;
  inProgressActions: number;
  totalFunding: number;
  synergisticSolutions: number;
  crossSectorCollaborations: number;
  averageImpactScore: number;
}

export interface GapAnalysis {
  missingStakeholders: string[];
  missingAssets: string[];
  missingDependencies: string[];
  potentialSynergies: Connection[];
  recommendations: string[];
}

// Filter Types
export interface PortfolioFilters {
  sector?: string;
  actorType?: ActorType;
  status?: ActionStatus;
  impactArea?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
