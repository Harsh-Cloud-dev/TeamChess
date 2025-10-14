import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './Components/JSX/Navbar/Navbar'
import ChessBoard from './Components/JSX/ChessBoard/Board'
createRoot(document.getElementById('Navbar')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)
createRoot(document.getElementById('MiddlePage')).render(
  <StrictMode>
    <ChessBoard />
  </StrictMode>
)
