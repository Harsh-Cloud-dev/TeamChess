import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './TopPage/Navbar'
createRoot(document.getElementById('TopPage')!).render(
  <StrictMode>
    <Navbar />
  </StrictMode>
)
createRoot(document.getElementById('MiddlePage')!).render(
  <StrictMode>

  </StrictMode>
)
createRoot(document.getElementById('EndPage')!).render(
  <StrictMode>

  </StrictMode>
)