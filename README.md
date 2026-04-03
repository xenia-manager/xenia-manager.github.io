# Xenia Manager Website

A modern, responsive website for Xenia Manager built with Next.js 16 and featuring a beautiful mica-inspired Fluent Design.

![Next.js](https://img.shields.io/badge/Next.js-16.2.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)

## Features

### Landing Page
- **Screenshots Gallery** - Interactive slideshow showcasing Xenia Manager interface
- **Optimized Settings** - View community-driven performance configurations for games
- **Translation Progress** - Track localization progress across multiple languages
- **Mica Design** - Beautiful translucent surfaces with backdrop blur effects
- **Dark/Light Theme** - Automatic theme switching based on system preferences
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Game Compatibility Page
- **Compatibility Browser** - Browse Xbox 360 game compatibility status for Xenia Canary
- **Advanced Filtering** - Filter by compatibility state, alphabetical letter, or optimized settings
- **Search Functionality** - Search games by title or ID
- **Sortable Columns** - Sort by title, state, or last updated date
- **Optimized Settings** - View TOML configurations directly within the table
- **Pagination** - Configurable page sizes (25, 50, 100, 200 games per page)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or [Node.js 18+](https://nodejs.org)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/xenia-manager/xenia-manager.github.io.git
   cd Website
   ```
2. Install dependencies:
   ```bash
   bun install
   ```
3. Run the development server:
   ```bash
   bun dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Sources

The application fetches data from:

### Landing Page
- **Screenshots**: [xenia-manager/xenia-manager](https://github.com/xenia-manager/xenia-manager)
  - `https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/`
- **Optimized Settings**: [xenia-manager/optimized-settings](https://github.com/xenia-manager/optimized-settings)
  - List: `https://xenia-manager.github.io/optimized-settings/data/settings.json`
  - Settings: `https://xenia-manager.github.io/optimized-settings/settings/{GAME_ID}.toml`
- **Translation Progress**: [xenia-manager/xenia-manager](https://github.com/xenia-manager/xenia-manager)
  - `https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/translation-progress.png`

### Game Compatibility Page
- **Game Compatibility**: [xenia-manager/database](https://github.com/xenia-manager/database)
  - `https://xenia-manager.github.io/database/data/game-compatibility/canary.json`
  - Backup: `https://raw.githubusercontent.com/xenia-manager/database/refs/heads/main/data/game-compatibility/canary.json`
- **Optimized Settings**: [xenia-manager/optimized-settings](https://github.com/xenia-manager/optimized-settings)
  - List: `https://xenia-manager.github.io/optimized-settings/data/settings.json`
  - Settings: `https://xenia-manager.github.io/optimized-settings/settings/{GAME_ID}.toml`

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles with theme variables
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main landing page
│   └── game-compatibility/
│       └── page.tsx      # Game compatibility page
├── components/
│   ├── Landing Page
│   │   ├── Footer.tsx                    # Site footer
│   │   ├── Header.tsx                    # Site header with theme toggle
│   │   ├── OptimizedSettingsSection.tsx  # Optimized settings popup with animations
│   │   ├── ScreenshotsSection.tsx        # Interactive screenshot gallery with zoom
│   │   └── TranslationProgressSection.tsx # Translation progress display
│   │
│   └── Game Compatibility
│       ├── GameCompatibilityFooter.tsx   # Footer for compatibility page
│       ├── GameCompatibilityList.tsx     # Main list component with filtering/pagination
│       ├── GameCompatibilityTable.tsx    # Table with expandable settings
│       ├── StateFilterBar.tsx            # Compatibility state filter buttons
│       ├── LetterFilterBar.tsx           # A-Z letter filter
│       ├── TomlDisplay.tsx               # TOML settings display
│       └── CustomSelect.tsx              # Custom dropdown component
└── lib/
    ├── fetchWithFallback.ts  # Fetch utility with fallback URLs
    ├── tomlParser.ts         # TOML file parser
    └── types.ts              # TypeScript type definitions
```

## Available Scripts

```bash
bun dev      # Start development server
bun build    # Build for production
bun start    # Start production server
bun lint     # Run ESLint
```

## License

This project is licensed under the BSD-3 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Xenia Manager](https://github.com/xenia-manager/xenia-manager) - Main application
- [Xenia Project](https://github.com/xenia-project/xenia) - Xbox 360 emulator
- Design inspired by Windows 11 Mica material
