# Code Style and Conventions

## TypeScript Configuration
- **Strict mode enabled** - Full type safety required
- **Target ES5** with modern library support
- **JSX preserve** for Next.js processing
- **Path aliases** - Use @/* for root, @/components/*, @/lib/*, etc.
- **No explicit any types** - Strong typing throughout

## Component Conventions
- **Functional components** with TypeScript interfaces
- **Props interfaces** defined for all components
- **Default exports** for main components
- **Named exports** for utilities and hooks
- **PascalCase** for component names and files

## File Structure Patterns
```
components/
├── ui/              # Reusable UI primitives (shadcn/ui)
├── [feature].tsx    # Feature-specific components
app/
├── layout.tsx       # Root layout
├── page.tsx         # Main page
├── globals.css      # Global styles
types/
├── [feature].ts     # TypeScript interfaces
data/
├── [feature]-data.ts # Data handling logic
```

## Styling Conventions
- **Tailwind CSS classes** for all styling
- **CSS custom properties** for theming (--background, --foreground, etc.)
- **Component variants** managed with class-variance-authority
- **Dark mode support** with class-based toggle
- **Responsive design** with mobile-first approach

## Import Conventions
- **Absolute imports** using path aliases
- **Group imports**: React → External libraries → Internal components → Types
- **Default imports** for main components
- **Named imports** for utilities and types

## Naming Conventions
- **kebab-case** for file names
- **PascalCase** for components and types
- **camelCase** for variables and functions
- **UPPER_CASE** for constants