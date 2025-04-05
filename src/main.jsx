import App from '@/App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'

import { initWatchers } from '@subscriptions/initWatchers'
initWatchers();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
