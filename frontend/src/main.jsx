import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


// Create a new QueryClient instance
// This client will be used to manage the cache and configuration for React Query
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
 <BrowserRouter>   
 <QueryClientProvider client={queryClient}>
  <App/>
 </QueryClientProvider>
    </BrowserRouter>
)
