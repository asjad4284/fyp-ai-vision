import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',        // Preload route JS on hover/focus
  defaultPreloadDelay: 50,
  scrollRestoration: true,         // Restore scroll position on back/forward
})

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
