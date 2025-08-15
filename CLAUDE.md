
## Bash Commands
```bash
# Development
npm run dev                 # Start Next.js dev server
npm run build              # Production build
npm run lint               # Run ESLint
npm run type-check         # TypeScript checking

# Supabase
npx supabase start         # Start local Supabase
npx supabase db reset      # Reset database with migrations
npx supabase gen types     # Generate TypeScript types

# Testing
npm run test:upload        # Test CSV upload flow
npm run test:validation    # Test validation rules
```

## Code Style
- **ALWAYS** use shadcn/ui components via MCP server
- Import Ionicons from 'react-ionicons' for ALL icons
- Currency values MUST be stored as BIGINT in cents
- Use Zod schemas for ALL validation
- Destructure imports: `import { Button, Card } from '@/components/ui'`

## Project Structure
```
/app
  /upload      → Main upload page
  /dashboard   → Data overview
  /api
    /validate  → CSV validation endpoint
    /process   → Batch processing
/components
  /ui          → shadcn components
  /upload      → Upload-specific components
/lib
  /supabase    → Database client
  /parsers     → CSV & currency parsers
  /validators  → Zod schemas
```

## Critical Files
- `lib/parsers/currency.ts` - Convert \"$405.6 B\" → cents
- `lib/validators/csv-schema.ts` - Zod validation rules
- `components/upload/dropzone.tsx` - Main upload interface
- `supabase/migrations/*.sql` - Database schema

## Workflow Rules

### IMPORTANT: shadcn/ui Implementation
1. **FIRST** use MCP demo tool to see component usage
2. **THEN** implement according to demo
3. **ALWAYS** test with Playwright after implementation
4. **VERIFY** with screenshot before marking complete

### Database Operations
- **YOU MUST** enable RLS on all tables
- **NEVER** expose service keys in frontend
- **ALWAYS** use transactions for batch inserts
- Parse CSV client-side to avoid Vercel timeout

### Validation Flow
1. Client-side validation for UX
2. Server-side validation for security
3. Store both display and numeric values
4. Log all validation errors to database

## Environment Setup
```env
NEXT_PUBLIC_SUPABASE_URL=      # Required
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Required  
SUPABASE_SERVICE_ROLE_KEY=     # Backend only!
```

## Testing Instructions
1. Test with example CSV in `/examples/billionaires_sample.csv`
2. Verify currency parsing: \"$405.6 B\" → 40560000000000 cents
3. Check batch processing with 100+ rows
4. Test error recovery with malformed data
5. Verify RLS policies block unauthorized access

## Common Pitfalls to Avoid
- **DON'T** create indexes inside CREATE TABLE statements
- **DON'T** use float for currency (use BIGINT in cents)
- **DON'T** parse large CSV synchronously (blocks UI)
- **DON'T** skip RLS \"for now\" - security from day 1
- **DON'T** call Supabase directly from frontend for writes

## Custom Theme Variables
```css
/* Use provided theme in styles/globals.css */
--primary: 15.1111 55.5556% 52.3529%;
--font-sans: AR One Sans, ui-sans-serif;
```

## Quick Debug Commands
```bash
# Check database schema
npx supabase db diff

# View error logs
npx supabase db logs

# Test CSV parser
node lib/parsers/test-parser.js

# Verify RLS policies
npx supabase db test
```

## Branch Naming
- `feature/csv-upload-[component]`
- `fix/validation-[issue]`
- `refactor/parser-[improvement]`

## Performance Targets
- CSV parse: <2s for 1000 rows
- Validation: <500ms per batch
- Upload: <5s for 10MB file
- Dashboard load: <1s initial

## REMEMBER
- Client-side parsing prevents timeouts
- Batch inserts max 100 rows
- Web Workers for files >5MB
- Virtual scrolling for >1000 rows
- Rate limit: 10 uploads/hour/user
`
}