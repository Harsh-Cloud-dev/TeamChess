import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './Components/TopPage/Navbar'
createRoot(document.getElementById('Navbar')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)
createRoot(document.getElementById('MiddlePage')).render(
  <StrictMode>
    <h1>
      Middle Page
    </h1>
  </StrictMode>
)
createRoot(document.getElementById('EndPage')).render(
  <StrictMode>
    <h1>
      EndPage
    </h1>
  </StrictMode>
)
