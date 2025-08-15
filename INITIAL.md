## FEATURE:

Een moderne web applicatie voor het uploaden, valideren en beheren van billionaire wealth CSV data met Supabase integratie. Het systeem biedt real-time validatie, batch processing, error handling, en een intuïtieve drag-and-drop interface gebouwd met Next.js, shadcn/ui componenten, en Ionicons.

### Core Functionaliteiten:
- **CSV Upload**: Drag-and-drop interface met file validatie
- **Data Validatie**: Multi-level validatie (schema, business rules, data kwaliteit)
- **Batch Processing**: Efficiënte verwerking van grote datasets
- **Error Handling**: Gedetailleerde error logging en recovery mechanismes
- **Data Transformatie**: Automatische conversie van currency strings naar numerieke waarden
- **Dashboard**: Overzicht van uploads, validatie status, en data visualisaties
- **Audit Trail**: Complete logging van alle uploads en wijzigingen

## EXAMPLES:

### Example CSV File (`examples/billionaires_sample.csv`):
```csv
Rank,Name,Net Worth,Change,Percentage Change,Age,Source,Country/Territory
1,Elon Musk,$405.6 B,$6.1 B,1.52%,54,\"Tesla, SpaceX\",United States
2,Larry Ellison,$290.6 B,$2.9 B,1.01%,80,Oracle,United States
3,Mark Zuckerberg,$245.9 B,$724 M,-0.29%,41,Facebook,United States
4,Jeff Bezos,$244.0 B,$715 M,-0.29%,61,Amazon,United States
5,Warren Buffett,$143.9 B,$1.2 B,0.84%,94,\"Berkshire Hathaway\",United States
```

### Example Validation Rules (`examples/validation_rules.json`):
```json
{
  \"required_fields\": [\"Rank\", \"Name\", \"Net Worth\", \"Age\", \"Country/Territory\"],
  \"field_rules\": {
    \"Rank\": {
      \"type\": \"integer\",
      \"min\": 1,
      \"unique\": true
    },
    \"Age\": {
      \"type\": \"integer\",
      \"min\": 18,
      \"max\": 120
    },
    \"Net Worth\": {
      \"type\": \"currency\",
      \"format\": \"^\\\\$[0-9,]+\\\\.?[0-9]*\\\\s*[BMK]?$\",
      \"min_value\": 1000000000
    },
    \"Percentage Change\": {
      \"type\": \"percentage\",
      \"format\": \"^-?[0-9]+\\\\.?[0-9]*%$\"
    }
  },
  \"business_rules\": [
    {
      \"name\": \"unique_rank\",
      \"description\": \"Rank moet uniek zijn binnen batch\"
    },
    {
      \"name\": \"valid_country\",
      \"description\": \"Country moet bestaan in referentie tabel\"
    }
  ]
}
```

### Example Parsed Data (`examples/parsed_output.json`):
```json
{
  \"batch_id\": \"550e8400-e29b-41d4-a716-446655440000\",
  \"total_rows\": 5,
  \"parsed_data\": [
    {
      \"rank\": 1,
      \"name\": \"Elon Musk\",
      \"net_worth_usd\": 40560000000000,
      \"net_worth_display\": \"$405.6 B\",
      \"change_usd\": 610000000000,
      \"change_display\": \"$6.1 B\",
      \"percentage_change\": 1.52,
      \"age\": 54,
      \"source\": [\"Tesla\", \"SpaceX\"],
      \"country_territory\": \"United States\",
      \"validation_status\": \"validated\"
    }
  ],
  \"errors\": []
}
```

### Example Error Log (`examples/error_log.json`):
```json
{
  \"batch_id\": \"550e8400-e29b-41d4-a716-446655440000\",
  \"errors\": [
    {
      \"row_number\": 6,
      \"field_name\": \"Age\",
      \"error_message\": \"Age value 150 exceeds maximum allowed (120)\",
      \"raw_value\": \"150\",
      \"severity\": \"error\"
    },
    {
      \"row_number\": 7,
      \"field_name\": \"Net Worth\",
      \"error_message\": \"Invalid currency format\",
      \"raw_value\": \"123.45\",
      \"severity\": \"error\"
    }
  ]
}
```

### Example Supabase Schema (`examples/database_schema.sql`):
```sql
-- Main table voor billionaire data
CREATE TABLE billionaires (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rank INTEGER NOT NULL,
  name TEXT NOT NULL,
  net_worth_usd BIGINT NOT NULL, -- In cents voor precisie
  net_worth_display TEXT NOT NULL, -- Original format voor display
  change_usd BIGINT, -- Kan NULL zijn, in cents
  change_display TEXT, -- Original format
  percentage_change DECIMAL(5,2),
  age INTEGER CHECK (age > 0 AND age < 150),
  source TEXT[],
  country_territory TEXT NOT NULL,
  
  -- Metadata
  batch_id UUID NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id),
  validation_status TEXT CHECK (validation_status IN ('pending', 'validated', 'failed'))
);

-- Indexes moeten APART worden aangemaakt
CREATE INDEX idx_batch_id ON billionaires(batch_id);
CREATE INDEX idx_rank ON billionaires(rank);
CREATE INDEX idx_net_worth ON billionaires(net_worth_usd DESC);

-- Upload batch tracking
CREATE TABLE upload_batches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  total_rows INTEGER NOT NULL,
  successful_rows INTEGER DEFAULT 0,
  failed_rows INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('processing', 'completed', 'failed', 'partial')),
  error_log JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Validation errors log
CREATE TABLE validation_errors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id UUID REFERENCES upload_batches(id),
  row_number INTEGER NOT NULL,
  field_name TEXT NOT NULL,
  error_message TEXT NOT NULL,
  raw_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE billionaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE upload_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE validation_errors ENABLE ROW LEVEL SECURITY;
```

## DOCUMENTATION:

### Primary Documentation Sources:
1. **Supabase Documentation**: https://context7.com/context7/supabase_com-docs/llms.txt
   - Database setup, RLS policies, Edge Functions
   - Authentication & Authorization
   - Real-time subscriptions

2. **shadcn/ui Components**: https://context7.com/shadcn-ui/ui/llms.txt
   - Component library documentation
   - Theming and styling guidelines
   - Form components & validation

3. **React Icons (Ionicons)**: https://context7.com/react-icons/react-icons/llms.txt
   - Icon implementation
   - Ionicons specific usage

### Additional Resources:
- **Papa Parse Documentation**: CSV parsing library
- **React Dropzone**: Drag-and-drop file upload
- **Zod Documentation**: Schema validation
- **React Hook Form**: Form state management
- **TanStack Table**: Data table implementation
- **Recharts**: Data visualization

## OTHER CONSIDERATIONS:

### Critical Implementation Notes:
- **Parse CSV client-side** → Voorkom Vercel 10 sec timeout
- **Batch inserts** → Max 100 rows per Supabase call
- **ALTIJD RLS policies** → Nooit skip voor \"gemak\"
- **Service key ALLEEN backend** → Never expose in frontend
- **Currency in cents** → Voorkom floating point issues
- **Web Workers** → Voor files > 5MB
- **Validate twice** → Client voor UX, server voor security
- **Rollback ready** → Elke batch moet reversible zijn
- **Rate limit uploads** → 10 per uur per user
- **Test met edge cases** → 0 values, negative percentages, special chars

### Environment Variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key  # Backend only!
```

### Common AI Assistant Mistakes:
1. **Indexes binnen CREATE TABLE** → PostgreSQL ondersteunt dit NIET
2. **Float voor currency** → Gebruik BIGINT in cents
3. **Sync CSV parsing** → Blokkeert UI, gebruik async/streaming
4. **Skip RLS \"voor nu\"** → Security vanaf dag 1
5. **Direct Supabase writes vanuit frontend** → Gebruik API routes
`
}