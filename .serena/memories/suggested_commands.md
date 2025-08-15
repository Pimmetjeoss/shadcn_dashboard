# Suggested Development Commands

## Primary Development Commands
```bash
# Install dependencies
npm install

# Start development server (with increased memory allocation)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## Task Completion Workflow
When completing any development task, run these commands in order:
1. `npm run type-check` - Ensure TypeScript compilation
2. `npm run lint` - Check code quality and style
3. `npm run build` - Verify production build works

## Windows-Specific Utilities
Since this is a Windows environment, use these commands for system operations:
- `dir` instead of `ls` for listing files
- `type` instead of `cat` for reading files
- `find` or `findstr` for text searching
- `powershell` for advanced scripting
- `git` commands work as expected

## Project-Specific Notes
- The dev server uses increased memory allocation (`--max-old-space-size=4096`)
- TypeScript strict mode is enabled
- ESLint configuration follows Next.js standards
- Build process includes both TypeScript and ESLint checks