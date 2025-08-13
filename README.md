# Portfolio Tool v1.0

A strategic thinking and management platform that enables portfolio managers, practitioners, and investors to design, analyze, and navigate complex portfolios of interconnected actions, actors, and assets—particularly in urban contexts.

## Features

### Core Functionality
- **Portfolio Data Management**: Input and manage actions, actors, and assets
- **Gap Analysis**: Identify missing stakeholders, assets, and dependencies
- **Dependency Mapping**: Visualize relationships and connections between portfolio elements
- **Scenario Generation**: Create "what-if" scenarios based on action clusters
- **Progress Tracking**: Monitor milestones and overall portfolio progress
- **Impact Visualization**: Track direct, indirect, and co-benefit impacts

### Dashboard Features
- **Summary Metrics**: Key performance indicators (Actions, Actors, Assets)
- **Network Visualization**: Interactive dependency and synergy mapping
- **Timeline Progress**: Visual timeline with milestone tracking
- **Status Management**: Real-time status updates for all portfolio elements

## Technology Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Cytoscape.js** for network visualizations
- **ECharts** for data visualizations
- **Lucide React** for icons

### Data Management
- **TanStack Query** for data fetching
- **TanStack Table** for large datasets
- **Mock data** for development and demonstration

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Project Structure

```
portfolio-tool/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation
│   ├── DashboardMetrics.tsx
│   ├── DependenciesNetwork.tsx
│   └── TimelineProgress.tsx
├── lib/                   # Utility functions
│   ├── utils.ts           # Helper functions
│   └── mock-data.ts       # Sample data
├── types/                 # TypeScript type definitions
│   └── index.ts
└── public/                # Static assets
```

## Data Model

### Core Entities

**Actions**: Initiatives with timelines, milestones, and outcomes
- Name, description, target outcomes
- Status tracking (Not Started, In Progress, Completed, On Hold)
- Timeline with milestones
- Budget and impact areas

**Actors**: Stakeholders and organizations
- Name, type (Government, Private Sector, Civil Society, etc.)
- Role, capacity, and influence ratings
- Contact information and sector

**Assets**: Resources available to the portfolio
- Funding, infrastructure, data, knowledge, networks
- Availability status and ownership
- Value and location information

**Connections**: Relationships between portfolio elements
- Dependencies, synergies, conflicts, support relationships
- Strength ratings and descriptions

**Impacts**: Measurable outcomes and effects
- Direct, indirect, and co-benefit impacts
- Magnitude ratings and timeframes
- Quantitative metrics

## Usage Guide

### Dashboard Navigation

1. **Summary Metrics**: View key portfolio statistics
   - Total actions, actors, and assets
   - Progress indicators and funding totals

2. **Dependencies & Synergies**: Interactive network visualization
   - Hover over nodes to see details
   - Color-coded relationship types
   - Legend for interpretation

3. **Timeline & Progress**: Track portfolio progress
   - Overall completion percentage
   - Milestone timeline with status indicators
   - Recent milestone updates

### Portfolio Management

The tool supports comprehensive portfolio management with:
- **Data Import**: CSV upload and manual entry
- **Real-time Updates**: Status changes and progress tracking
- **Filtering & Search**: Find specific elements quickly
- **Export Capabilities**: Generate reports and gap analyses

## Contributing

### Development Guidelines

1. **Type Safety**: All components must be properly typed
2. **Accessibility**: Follow WCAG 2.1 AA guidelines
3. **Performance**: Optimize for portfolios with 200+ actions
4. **Testing**: Test on localhost before deployment

### Code Style

- Use TypeScript for all new code
- Follow the established component patterns
- Use Tailwind CSS for styling
- Implement responsive design for all components

## Future Enhancements

### Planned Features (v2.0)
- **Advanced Visualizations**: Network diagrams and spatial mapping
- **Financial Modeling**: Full financial impact analysis
- **Live Data Integration**: Automated data ingestion
- **Collaborative Features**: Multi-user editing and commenting
- **Advanced Analytics**: Machine learning insights and predictions

### Technical Improvements
- **Backend API**: NestJS backend with PostgreSQL
- **Graph Database**: Neo4j for complex relationship queries
- **Authentication**: Role-based access control
- **Real-time Updates**: WebSocket connections for live data

## Support

For technical support or feature requests, please contact the development team at Dark Matter Labs.

## License

This project is proprietary software developed by Dark Matter Labs. All rights reserved.

---

**Portfolio Tool v1.0** - Strategic Management Platform for Urban Portfolios
