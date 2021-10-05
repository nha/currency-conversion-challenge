import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'currency-flags/dist/currency-flags.min.css'

import { ChosenThemeProvider, ThemeProvider } from '@/providers'
import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 2 // 2 hours
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChosenThemeProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ChosenThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
