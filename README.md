# Flora Feed

<img width="407" height="844" alt="Screenshot 2025-10-17 at 11 30 57 AM" src="https://github.com/user-attachments/assets/a69f4ed0-b30f-4623-819e-50f5210c8877" />
<img width="407" height="844" alt="Screenshot 2025-10-17 at 11 30 57 AM" src="https://github.com/user-attachments/assets/02b1e8af-021c-4916-9439-39c12402543b" />


A Progressive Web App (PWA) for tracking your General Hydroponics Flora Series feeding schedule. Built with Vite, React, TypeScript, Tailwind CSS, and Shadcn/UI. Developed using claude-4.5-sonnet.

## Features

- 📅 **Schedule Tracking**: Set your start date and automatically calculate weekly feeding schedules
- 🌱 **12-Week Schedule**: Complete vegetation and flowering phase tracking
- 💧 **Watering Records**: Mark and track when you've watered each week (with unmark capability)
- 🔄 **Week Navigation**: Easily navigate between weeks to view past and future schedules
- 🎚️ **Multiple Preset Levels**: Choose from Light, Medium (recommended), or Aggressive feeding schedules
- ✏️ **Custom Presets**: Create, edit, and manage your own custom feeding schedules
- 📦 **Import/Export**: Backup and share your custom presets as JSON files
- 📏 **Unit Conversion**: Display nutrients in ml/gal, ml/5L, or ml/L based on your preference
- 📱 **PWA Support**: Install on your device for offline access
- 💾 **Local Storage**: All data stored locally on your device
- 🔄 **Reset Schedule**: Clear all data and start fresh when needed

## Included Nutrients

### Base Nutrients
- FloraMicro®
- FloraGro®
- FloraBloom®

### Supplements
- CALiMAGic®
- Floralicious
- KoolBloom

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Docker Development

You can also run the app using Docker:

```bash
# Development mode (hot reload)
docker-compose up dev

# Production build and serve
docker-compose up prod

# Or build and run manually
docker build -t flora-feed .
docker run -p 8080:80 flora-feed
```

The app will be available at:
- Development: http://localhost:5173
- Production: http://localhost:8080

## Usage

1. **First Time Setup**: When you first open the app, you can optionally adjust settings (preset, units) or enter your schedule start date (the date you started week 1)
2. **Choose a Preset**: Select from Light, Medium, or Aggressive feeding schedules, or create your own custom preset
3. **Set Units**: Choose your preferred measurement unit (ml/gal, ml/5L, or ml/L)
4. **View Schedule**: The app will automatically show you the current week based on your start date
5. **Navigate Weeks**: Use the arrow buttons to view different weeks
6. **Mark as Watered**: Click the "Mark as Watered" button after feeding to record the date, time, and nutrients used
7. **Manage Data**: Access settings to change presets, manage custom schedules, or reset your data

## Deployment

### GitHub Pages

This app is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

2. **Push to main branch** - The app will automatically deploy via GitHub Actions

3. **Configure base path** (if needed):
   - The `vite.config.ts` is set to use `/feed_app/` as the base path
   - Update this to match your repository name or use `/` for user/org pages

4. **Access your app** at: `https://<username>.github.io/feed_app/`

### Other Platforms

The app can be deployed to any static hosting service:
- **Vercel**: Connect your repo and deploy automatically
- **Netlify**: Connect your repo and deploy automatically
- **Cloudflare Pages**: Connect your repo and deploy automatically
- **Docker**: Use the provided Dockerfile to deploy to any container platform

## PWA Installation

### On Desktop (Chrome/Edge)
1. Open the app in your browser
2. Click the install icon in the address bar
3. Click "Install"

### On Mobile (iOS)
1. Open the app in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"

### On Mobile (Android)
1. Open the app in Chrome
2. Tap the menu icon (three dots)
3. Tap "Install app" or "Add to Home Screen"

## Data Storage

All data is stored locally on your device using localStorage. This means:
- ✅ Your data never leaves your device
- ✅ No internet connection required after initial load
- ✅ Works offline as a PWA
- ⚠️ Data is device-specific (not synced across devices)
- ⚠️ Clearing browser data will delete your schedule

## Feed Schedule Details

The app includes three default feeding presets based on the official General Hydroponics Flora Series feed charts:

- **Light Feed**: Lower nutrient concentration for sensitive plants or beginners
- **Medium Feed**: Balanced nutrient levels for most plants (recommended)
- **Aggressive Feed**: Higher nutrient concentration for vigorous growth and experienced growers

Each preset follows the standard GH schedule structure:
- **Weeks 1-4**: Vegetation/Grow phase (18h photoperiod)
- **Weeks 5-12**: Flowering/Bloom phase (12h photoperiod)
- **Week 13**: Flush (plain water only)

### Disclaimer

**The default feeding schedules in this app are based on the General Hydroponics Flora Series feed charts.** For the official recommendations and detailed growing information, please refer to the [General Hydroponics Feed Charts](https://generalhydroponics.com/feedcharts).

This app is for informational and tracking purposes only. Always follow the manufacturer's instructions and adjust feeding based on your specific growing conditions, plant needs, and environmental factors. Start with lower concentrations and gradually increase as needed.

## Tech Stack

- **Vite** - Build tool
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Shadcn/UI** - Component library
- **Lucide React** - Icons
- **Vite PWA Plugin** - PWA functionality

## Project Structure

The codebase is organized for maintainability and scalability:

```
src/
├── components/       # React components
│   ├── app/         # Main app components
│   ├── settings/    # Settings components
│   └── ui/          # Reusable UI components
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── data/            # Static data (feeding schedules)
├── types/           # TypeScript type definitions
└── constants/       # App-wide constants
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed architecture documentation.

## License

MIT License - Open Source
