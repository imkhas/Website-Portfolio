import { createRouter as createTanStackRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import { RouterProvider } from '@tanstack/react-router'
import Home from './components/Home'

const rootRoute = createRootRoute({
  component: () => <Home />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => null,
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = createTanStackRouter({
  routeTree,
  defaultPreload: 'intent',
})

export default router
