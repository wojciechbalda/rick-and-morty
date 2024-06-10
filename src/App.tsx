import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('./layouts/RootLayout'),
    children: [
      {
        index: true,
        lazy: () => import('./routes/Home')
      },
      {
        path: 'characters',
        lazy: () => import('./routes/AllCharacters'),
      },
      {
          path: 'characters/:character',
          lazy: () => import('./routes/Character')
      },
      {
        path: 'episodes',
        lazy: () => import('./routes/AllEpisodes'),
      },
      {
        path: 'episodes/:episode',
        lazy: () => import('./routes/Episode')
      },
      {
        path: 'locations',
        lazy: () => import('./routes/AllLocations'),
      },
      {
        path: 'locations/:location',
        lazy: () => import('./routes/Location')
      }
    ]
  }
])

export default function App() {

  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>

}

