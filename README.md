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

## 💻 Systeem Vereisten

### **Minimale Vereisten**
- **Node.js**: 18.17.0 of hoger (LTS aanbevolen)
- **RAM**: 4GB vrij geheugen (voor grote datasets)
- **Schijfruimte**: 500MB voor installatie + uploads
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### **Aanbevolen Setup**
- **Node.js**: 20.x LTS
- **RAM**: 8GB of meer
- **SSD**: Voor snellere file processing
- **Moderne browser**: Voor optimale performance

### **OS Compatibiliteit**
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu 20.04+, CentOS 8+)

## 🚀 Complete Installatie Guide

### **Stap 1: Repository Klonen**
```bash
# Clone de repository
git clone https://github.com/Pimmetjeoss/shadcn_dashboard.git

# Ga naar de project directory
cd shadcn_dashboard
```

### **Stap 2: Node.js Versie Setup**
```bash
# Als je nvm gebruikt (aanbevolen)
nvm use

# Of installeer Node.js 18.17.0+ handmatig vanaf nodejs.org
node --version  # Moet 18.17.0+ tonen
```

### **Stap 3: Dependencies Installeren**
```bash
# Installeer alle benodigde packages
npm install

# Verificeer installatie
npm list --depth=0
```

### **Stap 4: Environment Setup**
```bash
# Kopieer environment template
cp .env.example .env.local

# Optioneel: Bewerk .env.local voor custom configuratie
# Voor basis gebruik zijn de defaults voldoende
```

### **Stap 5: Applicatie Starten**
```bash
# Start development server
npm run dev

# Open browser en ga naar:
# http://localhost:3000
```

### **Stap 6: Verificatie**
- ✅ Pagina laadt zonder errors
- ✅ App launcher menu werkt (hamburger icon)
- ✅ Alle 4 applicaties zijn toegankelijk
- ✅ Forbes data wordt correct geladen

## 🛠️ Development Commands

```bash
# Development server
npm run dev                 # Start dev server op localhost:3000

# Build commands  
npm run build              # Production build
npm start                  # Start production server

# Code quality
npm run lint               # ESLint checking
npm run type-check         # TypeScript verificatie

# Pakket management
npm install                # Installeer dependencies
npm update                 # Update packages
npm audit                  # Security check
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

## 🔧 Troubleshooting

### **Veelvoorkomende Problemen**

#### **❌ "Cannot find module" Error**
```bash
# Oplossing: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### **❌ "Port 3000 is already in use"**
```bash
# Oplossing 1: Gebruik andere poort
npm run dev -- -p 3001

# Oplossing 2: Kill proces op poort 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <process_id> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

#### **❌ Memory Errors / "JavaScript heap out of memory"**
```bash
# Oplossing: Verhoog memory limit
export NODE_OPTIONS="--max-old-space-size=8192"
npm run dev

# Of gebruik de ingebouwde script
npm run dev  # Gebruikt al --max-old-space-size=4096
```

#### **❌ "Module not found: Can't resolve 'fs'"**
```bash
# Dit is normaal - 'fs' werkt niet in browser
# De fout verdwijnt meestal na eerste build
npm run build
```

#### **❌ TypeScript Errors**
```bash
# Oplossing: Check en fix types
npm run type-check

# Als errors persisteren:
rm -rf .next
npm run build
```

#### **❌ ESLint Warnings**
```bash
# Fix automatische problemen
npm run lint -- --fix

# Voor handmatige fixes
npm run lint
```

### **Performance Problemen**

#### **🐌 Langzame Laadtijden**
- **Geheugen**: Zorg voor minimaal 4GB vrij RAM
- **Node.js**: Update naar nieuwste LTS versie
- **Browser**: Gebruik Chrome/Edge voor beste performance
- **Dataset**: Grote CSV files kunnen lang duren om te laden

#### **🐌 App Switching Traag**
- **Browser Cache**: Clear browser cache en reload
- **Memory**: Sluit andere browser tabs
- **Dev Tools**: Sluit developer tools tijdens gebruik

### **OS-Specifieke Issues**

#### **Windows**
```powershell
# Als npm install faalt:
npm install --force

# Voor path issues:
set PATH=%PATH%;C:\Users\<username>\AppData\Roaming\npm
```

#### **macOS**
```bash
# Voor permission errors:
sudo chown -R $(whoami) ~/.npm

# Voor M1/M2 Macs:
arch -x64 npm install
```

#### **Linux**
```bash
# Voor permission issues:
sudo chown -R $USER /usr/local/lib/node_modules

# Voor oude Node.js:
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### **Development Issues**

#### **Hot Reload Werkt Niet**
```bash
# Restart dev server
Ctrl+C
npm run dev

# Check .next cache
rm -rf .next
npm run dev
```

#### **Environment Variables Worden Niet Geladen**
- Check `.env.local` exists
- Restart development server
- Variabelen moeten starten met `NEXT_PUBLIC_` voor client-side

### **Nog Steeds Problemen?**

1. **Check Node.js versie**: `node --version` (moet 18.17.0+ zijn)
2. **Check npm versie**: `npm --version` (moet 8+ zijn)
3. **Reinstall alles**:
   ```bash
   rm -rf node_modules package-lock.json .next
   npm install
   npm run dev
   ```
4. **Create GitHub Issue** met:
   - OS en versie
   - Node.js versie
   - Exacte error message
   - Stappen om te reproduceren

## 🎉 Toekomstige Features

- **Supabase Integratie**: Echte database voor CSV uploads
- **Real-time Samenwerking**: Multi-user document editing
- **API Integraties**: Koppeling met externe services
- **Advanced Analytics**: Machine learning insights

---

**Opmerking**: Deze applicatie demonstreert professionele data handling technieken en kan worden aangepast voor andere datasets met vergelijkbare vereisten.