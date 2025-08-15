# Task Completion Workflow

## Standard Completion Checklist
When any development task is completed, follow this workflow:

### 1. Code Quality Verification
```bash
npm run type-check
```
- Must pass without TypeScript errors
- All types must be properly defined
- No `any` types unless absolutely necessary

### 2. Code Style and Linting
```bash
npm run lint
```
- Must pass ESLint checks
- Follow Next.js and React best practices
- No unused imports or variables

### 3. Build Verification
```bash
npm run build
```
- Production build must complete successfully
- No build-time errors or warnings
- All imports and dependencies resolved

### 4. Testing Considerations
- Manual testing in development mode (`npm run dev`)
- Verify responsive design on different screen sizes
- Test data quality features if modified
- Validate export functionality if changed

## Special Considerations for This Project

### Data Quality Features
- When modifying data handling, verify CSV parsing still works
- Test data quality indicators and corrections
- Ensure export functionality maintains data integrity

### UI Component Changes
- Follow shadcn/ui patterns for consistency
- Maintain accessibility standards
- Test dark mode compatibility
- Verify mobile responsiveness

### Performance Requirements
- Large dataset handling (1,556+ records)
- Virtual scrolling and pagination efficiency
- Search debouncing (300ms delay)
- Memory management for data operations

## Pre-Commit Standards
- All code must be properly typed
- No console.log statements in production code
- All components must be accessible (WCAG compliant)
- All new features should follow existing patterns