# Forbes Billionaire CSV Viewer

A professional, enterprise-grade CSV data viewing application designed to handle the Forbes billionaire dataset with comprehensive data quality management and interactive visualizations.

## Features

### Core Functionality
- **Dataset Overview Dashboard**: Key metrics, data quality indicators, and quick actions
- **Enhanced Data Table**: Advanced filtering, search, sorting, and pagination (50 rows per page)
- **Data Quality Management**: Automated issue detection, correction suggestions, and cleanup tools
- **Data Visualizations**: Geographic distribution, age demographics, and wealth analysis
- **Export System**: Multiple format support (CSV, JSON, Excel) with data quality options

### Data Quality Features
- **Parsing Error Detection**: Currency format inconsistencies, special characters, encoding issues
- **Validation Status**: Visual indicators (✅ valid, ⚠️ warning, ❌ error)
- **Issue Categorization**: Parsing, format, missing data, and encoding problems
- **Automated Corrections**: Bulk fix operations and manual review workflow

### Technical Features
- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **Performance Optimized**: Virtual scrolling, debounced search, pagination
- **Accessibility Compliant**: WCAG standards, keyboard navigation, screen reader support
- **TypeScript**: Full type safety and modern React patterns

## Dataset Information

- **Records**: 1,556 Forbes billionaire entries
- **Columns**: Rank, Name, Net Worth, Change, Percentage Change, Age, Source, Country/Territory
- **Geographic Distribution**: 68+ countries represented
- **Age Range**: 20-101 years
- **Net Worth Range**: $2.4B - $405.6B

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

### Development
```bash
# Type checking
npm run type-check

# Linting
npm run lint
```

## Architecture

### Component Structure
```
components/
├── dashboard.tsx           # Main dashboard layout
├── app-sidebar.tsx         # Navigation sidebar
├── overview.tsx            # Landing dashboard with metrics
├── data-table.tsx          # Enhanced table with filtering
├── visualizations.tsx      # Charts and graphs
├── data-quality.tsx        # Quality management interface
└── ui/                     # Reusable UI components
    ├── button.tsx
    ├── card.tsx
    ├── table.tsx
    ├── badge.tsx
    └── ...
```

### Data Layer
```
data/
└── billionaire-data.ts     # CSV parsing and quality simulation

types/
└── billionaire.ts          # TypeScript interfaces
```

## Data Quality Simulation

The application simulates realistic data quality issues found in real CSV datasets:

### Issue Types
- **Currency Parsing** (~1.5%): Format inconsistencies like "$219.0 B" → "219.0B$"
- **Character Encoding** (~0.5%): UTF-8 issues with international names
- **Missing Data** (~0.3%): Invalid or missing age/change information
- **Format Issues** (~0.8%): Special characters causing parsing problems

### Quality Metrics
- **Overall Score**: 98.5% data quality
- **Valid Records**: 1,533 records
- **Records with Issues**: 23 records
- **Issue Categorization**: By type and severity

## Usage Examples

### Scenario 1: Data Exploration
1. Navigate to Data Table
2. Search for "tech billionaires"
3. Filter by country (USA) and age range (20-50)
4. Sort by net worth
5. Export filtered results

### Scenario 2: Quality Assessment
1. Go to Data Quality section
2. Review parsing error summary
3. Examine flagged records
4. Apply automated corrections
5. Export clean dataset

### Scenario 3: Visualization Analysis
1. Open Visualizations dashboard
2. Review geographic distribution
3. Analyze age demographics
4. Export charts for reporting

## Performance Considerations

- **Large Dataset Handling**: Virtual scrolling and pagination
- **Search Optimization**: Debounced input with 300ms delay
- **Memory Management**: Lazy loading and data streaming
- **Caching**: Intelligent filter and search result caching

## Accessibility Features

- **WCAG 2.1 AA Compliant**: Color contrast, keyboard navigation
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Keyboard Shortcuts**: Full keyboard navigation support
- **Focus Management**: Logical tab order and focus indicators

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create a GitHub issue
- Check the Help section in the application
- Review the documentation

---

**Note**: This application demonstrates professional CSV data handling techniques and can be adapted for other datasets with similar requirements.