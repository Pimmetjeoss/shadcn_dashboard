# Shadcn Dashboard - Multi-Applicatie Suite

Een professionele, enterprise-grade applicatie suite gebouwd met Next.js, shadcn/ui, en TypeScript. De suite bevat meerdere gespecialiseerde applicaties voor data-analyse, document management, en web tools.

## 🚀 Applicaties

### 1. **Dashboard** - Forbes Billionaire Analytics
- **Overzicht Dashboard**: Belangrijke statistieken, data kwaliteit indicatoren, en snelle acties
- **Geavanceerde Data Tabel**: Filtering, zoeken, sorteren, en paginering (50 rijen per pagina)
- **Data Kwaliteit Management**: Geautomatiseerde issue detectie en correctie suggesties
- **Data Visualisaties**: Geografische distributie, leeftijd demografie, en vermogen analyse
- **Export Systeem**: Ondersteuning voor meerdere formaten (CSV, JSON, Excel)

### 2. **Excel/CSV Upload**
- **Bestandsupload**: Ondersteuning voor CSV, Excel (.xlsx, .xls) bestanden
- **Grote Bestanden**: Tot 100MB uploads met progress tracking
- **Data Validatie**: Automatische kwaliteitscontroles en error reporting
- **Batch Processing**: Efficiënte verwerking van grote datasets

### 3. **Documents** - Document Management
- **Document Organisatie**: Categoriseer en beheer al je documenten
- **Zoek Functionaliteit**: Zoek op bestandsnaam, auteur, of inhoud
- **Categorieën**: Reports, Proposals, Guidelines, Notes, Finance
- **Bestandstypen**: PDF, DOCX, XLSX, TXT en meer

### 4. **URL Analyzer** - Website Analysis
- **Performance Analyse**: Laadtijden, pagina grootte, en snelheid scores
- **Security Scanning**: HTTPS status, SSL certificaten, security headers
- **SEO Optimalisatie**: Meta tags, keywords, en SEO scores
- **Technologie Detectie**: Frameworks en libraries identificatie

## ✨ Nieuwe Functionaliteiten

### 🎯 **App Launcher**
- **Hamburger Menu**: Eenvoudige navigatie tussen alle applicaties
- **Visual Indicators**: Duidelijke iconen en beschrijvingen per app
- **Context Behoud**: Breadcrumb navigatie toont huidige locatie
- **Responsive Design**: Werkt perfect op desktop, tablet en mobile

### 🔧 **Technische Verbeteringen**
- **Modulaire Architectuur**: Elke app heeft eigen routing en componenten
- **Shared Components**: Herbruikbare UI elementen via shadcn/ui
- **Type Safety**: Volledige TypeScript ondersteuning
- **Performance**: Geoptimaliseerd voor snelle laadtijden

## 📊 Dataset Informatie (Forbes Billionaires)

- **Records**: 1.556 Forbes billionaire vermeldingen
- **Kolommen**: Rank, Name, Net Worth, Change, Percentage Change, Age, Source, Country/Territory
- **Geografische Spreiding**: 68+ landen vertegenwoordigd
- **Leeftijdbereik**: 20-101 jaar
- **Vermogensbereik**: $2.4B - $405.6B

## 🚀 Snel Starten

### Vereisten
- Node.js 18+ 
- npm of yarn

### Installatie
```bash
# Installeer dependencies
npm install

# Start development server
npm run dev

# Build voor productie
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

## 🏗️ Architectuur

### App Structuur
```
app/
├── dashboard/              # Forbes Billionaire Analytics
├── csv-upload/             # Excel/CSV Upload Tool
├── documents/              # Document Management
├── url-analyzer/           # Website Analysis Tool
└── page.tsx               # Root redirect naar dashboard
```

### Component Structuur
```
components/
├── app-launcher.tsx        # Multi-app navigation menu
├── dashboard.tsx           # Main dashboard layout
├── app-sidebar.tsx         # Application sidebar
├── overview.tsx            # Forbes dashboard overview
├── data-table.tsx          # Enhanced table with filtering
├── visualizations.tsx      # Charts and graphs
├── data-quality.tsx        # Quality management interface
└── ui/                     # shadcn/ui components
    ├── dropdown-menu.tsx   # App launcher dropdown
    ├── button.tsx
    ├── card.tsx
    ├── table.tsx
    └── ...
```

### Data Layer
```
data/
└── billionaire-data.ts     # CSV parsing en quality simulation

types/
└── billionaire.ts          # TypeScript interfaces
```

## 📋 Gebruiksvoorbeelden

### Scenario 1: Multi-App Navigatie
1. Klik op het hamburger menu (☰) in de header
2. Selecteer gewenste applicatie uit dropdown
3. Elke app behoudt eigen context en navigatie
4. Breadcrumb toont huidige locatie

### Scenario 2: Data Verkenning (Dashboard)
1. Navigeer naar Data Table in Forbes Dashboard
2. Zoek naar "tech billionaires"
3. Filter op land (USA) en leeftijdsbereik (20-50)
4. Sorteer op vermogen
5. Exporteer gefilterde resultaten

### Scenario 3: CSV Upload Workflow
1. Ga naar Excel/CSV Upload applicatie
2. Selecteer CSV of Excel bestand
3. Monitor upload progress
4. Bekijk data validatie resultaten
5. Download verwerkte data

### Scenario 4: Document Management
1. Open Documents applicatie
2. Upload documenten naar categorieën
3. Zoek op naam, auteur of inhoud
4. Beheer document metadata
5. Download of preview bestanden

### Scenario 5: Website Analyse
1. Ga naar URL Analyzer
2. Voer website URL in
3. Bekijk performance metrics
4. Controleer security status
5. Download analyse rapport

## 🎯 Data Kwaliteit Simulatie

De Forbes applicatie simuleert realistische data kwaliteit problemen:

### Issue Types
- **Currency Parsing** (~1.5%): Format inconsistenties zoals "$219.0 B" → "219.0B$"
- **Character Encoding** (~0.5%): UTF-8 problemen met internationale namen
- **Missing Data** (~0.3%): Ontbrekende leeftijd/change informatie
- **Format Issues** (~0.8%): Speciale karakters die parsing problemen veroorzaken

### Kwaliteit Metrics
- **Overall Score**: 98.5% data kwaliteit
- **Valid Records**: 1.533 records
- **Records met Issues**: 23 records
- **Issue Categorisatie**: Op type en ernst

## ⚡ Performance Overwegingen

- **Grote Dataset Handling**: Virtual scrolling en paginering
- **Zoek Optimalisatie**: Debounced input met 300ms vertraging
- **Memory Management**: Lazy loading en data streaming
- **Caching**: Intelligente filter en zoekresultaat caching
- **App Switching**: Optimale routing tussen applicaties

## ♿ Toegankelijkheid Features

- **WCAG 2.1 AA Compliant**: Kleurcontrast, keyboard navigatie
- **Screen Reader Ondersteuning**: Juiste ARIA labels en beschrijvingen  
- **Keyboard Shortcuts**: Volledige keyboard navigatie ondersteuning
- **Focus Management**: Logische tab volgorde en focus indicatoren

## 🌐 Browser Ondersteuning

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Bijdragen

1. Fork de repository
2. Maak een feature branch
3. Implementeer je wijzigingen
4. Voeg tests toe indien van toepassing
5. Dien een pull request in

## 📄 Licentie

MIT License - zie LICENSE bestand voor details

## 🆘 Support

Voor vragen en problemen:
- Maak een GitHub issue
- Bekijk de Help sectie in de applicatie
- Raadpleeg de documentatie

## 🎉 Toekomstige Features

- **Supabase Integratie**: Echte database voor CSV uploads
- **Real-time Samenwerking**: Multi-user document editing
- **API Integraties**: Koppeling met externe services
- **Advanced Analytics**: Machine learning insights

---

**Opmerking**: Deze applicatie demonstreert professionele data handling technieken en kan worden aangepast voor andere datasets met vergelijkbare vereisten.