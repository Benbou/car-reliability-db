# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Architecture

This is a React + TypeScript application for browsing car reliability data, built with Vite.

### Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4 (using @tailwindcss/vite plugin)
- **UI Components**: Custom ShadCN-style components (Radix UI primitives)
- **Routing**: React Router v7

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Base UI primitives (Button, Card, Select, Table, etc.)
│   ├── AppreciationBadge.tsx  # Color-coded reliability rating badge
│   ├── FiabilityScore.tsx     # Reliability score display with progress bar
│   ├── CarTable.tsx           # Sortable car data table
│   ├── FilterPanel.tsx        # Filter controls for search
│   ├── Header.tsx             # Navigation header
│   └── SearchBar.tsx          # Brand/model search component
├── pages/               # Route pages
│   ├── HomePage.tsx     # / - Landing page with search
│   ├── SearchPage.tsx   # /search - Results with filters
│   └── CarDetailsPage.tsx # /car/:id - Vehicle details
├── data/
│   └── cars.ts          # Mock car data and data utilities
├── types/
│   └── car.ts           # TypeScript interfaces (Car, Appreciation, CarFilters)
└── lib/
    └── utils.ts         # cn() utility for class merging
```

### Key Patterns

- **Path Aliases**: Use `@/` for imports (maps to `src/`)
- **Tailwind v4**: CSS variables defined in `@theme` block in `index.css`
- **Appreciation Levels**: Color-coded as "Très bon" (green) → "Très mauvais" (red)
- **Data Layer**: Currently uses mock data in `src/data/cars.ts` - designed to be replaced with API/database

### Data Integration

The app expects car data with this structure:
```typescript
interface Car {
  id: number
  marque: string              // Brand
  modele: string              // Model
  type: string                // Category (Berline, Citadine, etc.)
  dateCommercialisation: string
  appreciationQueChoisir: Appreciation  // Rating level
  indiceFiabilite: number     // 0-100 reliability score
}
```

Data is loaded from `src/data/cars.ts` which contains:
- 637 car models with reliability ratings
- 36 brands with overall reliability scores
