import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './Components/JSX/Navbar/Navbar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)
