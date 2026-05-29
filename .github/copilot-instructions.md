# React + Tailwind CSS + Framer Motion + Lucide React

## Project Overview

This is a modern React project with the following stack:
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animation library  
- **Lucide React** - Icon system

## Project Dependencies

### Core Dependencies
- `react` - React library
- `react-dom` - React DOM library

### UI & Styling
- `tailwindcss` - Utility-first CSS framework
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes

### Animation & Icons
- `framer-motion` - Animation library
- `lucide-react` - Icon library

### Dev Dependencies
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `eslint` - Code linting

## Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration with Tailwind and autoprefixer
- `vite.config.js` - Vite configuration
- `eslint.config.js` - ESLint configuration

## Key Files

- `src/App.jsx` - Main component demonstrating Framer Motion and Lucide React
- `src/index.css` - Global styles with Tailwind directives (@tailwind base, components, utilities)
- `src/main.jsx` - React entry point
- `index.html` - HTML template

## Available Commands

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint checks
```

## Development Guidelines

1. **Components**: Place React components in `src/` directory
2. **Styling**: Use Tailwind CSS utility classes for styling
3. **Animations**: Use Framer Motion for smooth animations
4. **Icons**: Import icons from `lucide-react` as needed
5. **Assets**: Store static files in `src/assets/`

## Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Edit files in `src/` and changes will hot-reload
4. Build for production: `npm run build`

## Useful Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion API Reference](https://www.framer.com/motion)
- [Lucide React Icons](https://lucide.dev)
- [React Documentation](https://react.dev)
