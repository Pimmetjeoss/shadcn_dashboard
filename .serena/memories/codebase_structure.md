# Codebase Structure and Key Files

## Root Level Files
- **package.json** - Dependencies and scripts
- **tsconfig.json** - TypeScript configuration with path aliases
- **next.config.js** - Next.js configuration
- **tailwind.config.js** - Tailwind CSS and design system configuration
- **CLAUDE.md** - shadcn MCP server rules and testing guidelines
- **README.md** - Comprehensive project documentation
- **uvx.md** - Detailed UX journey and component specifications
- **forbes_dataset.csv** - Source data file

## App Directory (Next.js App Router)
```
app/
├── layout.tsx      # Root layout with metadata and fonts
├── page.tsx        # Main dashboard page
└── globals.css     # Global styles and CSS variables
```

## Components Architecture
```
components/
├── ui/                          # shadcn/ui components (reusable primitives)
│   ├── button.tsx, card.tsx, table.tsx, etc.
│   └── sidebar.tsx              # Sidebar navigation component
├── dashboard.tsx                # Main dashboard layout
├── app-sidebar.tsx              # Application sidebar navigation
├── overview.tsx                 # Landing dashboard with metrics
├── data-table.tsx               # Enhanced table with filtering
├── visualizations.tsx           # Charts and graphs
├── data-quality.tsx             # Quality management interface
├── export-modal.tsx             # Data export functionality
├── record-details-modal.tsx     # Individual record details
├── advanced-search.tsx          # Search and filtering
├── help.tsx                     # Help and documentation
├── error-boundary.tsx           # Error handling
└── interactive-charts.tsx       # Interactive chart components
```

## Data and Types
```
types/
└── billionaire.ts               # TypeScript interfaces for data models

data/
└── billionaire-data.ts          # CSV parsing and data quality simulation

utils/                           # Utility functions (if any)
hooks/                           # Custom React hooks (if any)
lib/                             # Shared library code (if any)
```

## Key Dependencies Structure
- **shadcn/ui components** - Professional UI component library
- **Radix UI primitives** - Accessible base components
- **Data visualization** - Recharts for charts and graphs
- **CSV handling** - Papa Parse for data processing
- **File operations** - file-saver for export functionality

## Configuration Files
- **TypeScript** - Strict mode with modern configuration
- **Tailwind** - Custom design system with dark mode support
- **Next.js** - App router with TypeScript and ESLint integration
- **ESLint** - Next.js recommended configuration