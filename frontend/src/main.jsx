import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './Components/TopPage/Navbar'
import Endpage from './Components/EndPage/Endpage'
import Board from './Components/MiddlePage/Board'
createRoot(document.getElementById('Navbar')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)
createRoot(document.getElementById('MiddlePage')).render(
  <StrictMode>
    <h1>
      <Board />
    </h1>
  </StrictMode>
)
createRoot(document.getElementById('EndPage')).render(
  <StrictMode>
    <h1>
      <Endpage />
    </h1>
  </StrictMode>
)
