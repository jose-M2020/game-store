import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import App from './App.jsx'
import './index.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import 'primeflex/primeflex.css';

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          refetchOnWindowFocus: false,
      },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  </React.StrictMode>,
)
