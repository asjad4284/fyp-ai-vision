# React + Tailwind + Framer Motion + Lucide React

A modern React project with Tailwind CSS for styling, Framer Motion for animations, and Lucide React for beautiful icons.

## Project Setup

### Tech Stack
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── App.jsx           # Main component with Framer Motion & Lucide React examples
├── App.css           # App-specific styles
├── index.css         # Global styles (includes Tailwind directives)
├── main.jsx          # React entry point
└── assets/           # Static assets
```

## Features

- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive layouts
- **Smooth Animations**: Framer Motion integration for elegant animations and interactions
- **Icon System**: 1000+ icons available from Lucide React
- **Modern Tooling**: Vite for fast HMR and optimized builds

## Usage Examples

### Using Lucide Icons
```jsx
import { Heart, Star, Zap } from 'lucide-react';

function MyComponent() {
  return (
    <div>
      <Heart className="w-6 h-6 text-red-500" />
      <Star className="w-6 h-6 text-yellow-500" />
      <Zap className="w-6 h-6 text-blue-500" />
    </div>
  );
}
```

### Using Framer Motion
```jsx
import { motion } from 'framer-motion';

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Animated Content
    </motion.div>
  );
}
```

### Using Tailwind CSS
```jsx
function StyledComponent() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white">Hello World</h1>
    </div>
  );
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Lucide React Documentation](https://lucide.dev)

## License

This project is open source and available under the MIT License.
