# Contributing to Flora Feed

Thank you for your interest in contributing to Flora Feed! This document provides an overview of the project structure and guidelines for contributing.

## 📁 Project Structure

```
src/
├── components/
│   ├── app/              # Main app components
│   │   ├── AppHeader.tsx
│   │   ├── WelcomeScreen.tsx
│   │   ├── WeekNavigation.tsx
│   │   ├── NutrientCard.tsx
│   │   ├── NutrientRow.tsx
│   │   ├── WateringStatusCard.tsx
│   │   └── index.ts
│   ├── settings/         # Settings-related components
│   │   ├── CustomPresetEditor.tsx
│   │   ├── PresetSelector.tsx
│   │   ├── CustomPresetManager.tsx
│   │   └── index.ts
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   └── tabs.tsx
│   └── SettingsPage.tsx  # Main settings page component
├── hooks/                # Custom React hooks
│   ├── useSchedule.ts    # Schedule state management
│   ├── useSettings.ts    # Settings state management
│   ├── useWatering.ts    # Watering records management
│   └── index.ts
├── utils/                # Utility functions
│   ├── storage.ts        # localStorage management
│   └── unitConverter.ts  # Unit conversion utilities
├── data/                 # Static data
│   └── feedingSchedule.ts # GH Flora Series feeding schedules
├── types/                # TypeScript type definitions
│   └── index.ts
├── constants/            # App-wide constants
│   └── app.ts
├── lib/                  # Library utilities
│   └── utils.ts          # General utilities (cn, etc.)
├── assets/               # Static assets
├── App.tsx               # Main app component
├── App.css               # App styles
├── main.tsx              # App entry point
└── index.css             # Global styles
```

## 🏗️ Architecture Overview

### Component Organization

- **`components/app/`**: Components specific to the main feeding tracker functionality
- **`components/settings/`**: Components for managing app settings and custom presets
- **`components/ui/`**: Reusable UI primitives from shadcn/ui

### State Management

We use custom hooks for state management instead of a global state library:

- **`useSchedule`**: Manages feeding schedule state (start date, current week, navigation)
- **`useSettings`**: Manages app settings (unit preference, selected preset)
- **`useWatering`**: Manages watering records for each week

### Data Flow

1. User interactions trigger handlers in component files
2. Handlers call custom hooks to update state
3. Hooks interact with localStorage via `utils/storage.ts`
4. Components re-render with updated state

## 🎨 Code Style

### TypeScript

- Use TypeScript for all new code
- Define types in `src/types/index.ts` for reusability
- Use proper type annotations (avoid `any`)

### React

- Use functional components with hooks
- Extract complex logic into custom hooks
- Keep components focused on a single responsibility
- Use meaningful component and prop names

### Documentation

- Add JSDoc comments to all exported functions
- Include parameter descriptions and return types
- Document complex logic with inline comments

Example:
```typescript
/**
 * Calculate current week number based on start date
 * @param startDate - The date when the feeding schedule started
 * @returns The current week number (1-13)
 */
export const getCurrentWeek = (startDate: Date): number => {
  // Implementation
};
```

## 📝 Adding New Features

### Adding a New Component

1. Create the component file in the appropriate directory
2. Add proper TypeScript types for props
3. Add JSDoc documentation
4. Export from the directory's `index.ts`
5. Update this documentation if needed

### Adding a New Hook

1. Create the hook in `src/hooks/`
2. Follow the naming convention `use[Name].ts`
3. Add proper TypeScript types
4. Add JSDoc documentation
5. Export from `src/hooks/index.ts`

### Adding New Types

1. Add type definitions to `src/types/index.ts`
2. Group related types together
3. Use descriptive names
4. Add JSDoc comments for complex types

## 🧪 Testing

Before submitting a pull request:

1. Test all modified functionality
2. Check for linter errors: `pnpm lint`
3. Build the project: `pnpm build`
4. Test the production build: `pnpm preview`

## 📦 Dependencies

### Production Dependencies

- **React 19**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Styling
- **shadcn/ui**: Component library
- **Lucide React**: Icons

### Adding Dependencies

When adding new dependencies:

1. Explain why it's needed
2. Ensure it doesn't duplicate existing functionality
3. Consider bundle size impact
4. Document usage in relevant files

## 🔧 Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with descriptive messages
6. Push to your fork
7. Open a pull request

## 💡 Best Practices

### Component Design

- Keep components small and focused
- Extract reusable logic into hooks
- Use composition over prop drilling
- Avoid inline functions in render methods

### State Management

- Use local state when possible
- Lift state only when necessary
- Avoid prop drilling with proper component structure
- Use custom hooks for complex state logic

### Performance

- Memoize expensive calculations
- Avoid unnecessary re-renders
- Use proper React keys for lists
- Lazy load components when appropriate

### Accessibility

- Use semantic HTML
- Add proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Questions?

Feel free to open an issue for:
- Questions about the codebase
- Feature requests
- Bug reports
- Architecture discussions

## 🙏 Thank You!

Your contributions help make Flora Feed better for everyone!

