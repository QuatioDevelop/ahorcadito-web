import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import Home from './pages/Home'
import Register from './pages/Register'
import Game from './pages/Game'
import Ranking from './pages/Ranking'
import Navbar from './components/Navbar'

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/juego" element={<Game />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </GameProvider>
  )
}

export default App
