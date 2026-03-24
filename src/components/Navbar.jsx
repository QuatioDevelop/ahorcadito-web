import { Link, useLocation } from 'react-router-dom'
import { useGame } from '../context/GameContext'

export default function Navbar() {
  const { player, score } = useGame()
  const location = useLocation()
  const isHome = location.pathname === '/'

  if (isHome) return null

  return (
    <nav className="bg-slate-900/80 backdrop-blur border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🪢</span>
          <span className="font-bold text-lg tracking-tight text-indigo-400 group-hover:text-indigo-300 transition-colors">
            Ahorcadito
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {player && (
            <span className="text-sm text-slate-400">
              Hola, <span className="text-slate-200 font-medium">{player.nombre}</span>
            </span>
          )}
          {player && (
            <span className="bg-indigo-500/20 text-indigo-300 text-sm font-bold px-3 py-1 rounded-full border border-indigo-500/30">
              {score} pts
            </span>
          )}
          <Link
            to="/ranking"
            className="text-slate-400 hover:text-slate-200 text-sm transition-colors"
          >
            Ranking
          </Link>
        </div>
      </div>
    </nav>
  )
}
