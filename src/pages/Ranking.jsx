import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerRanking } from '../services/api'
import { useGame } from '../context/GameContext'


const MEDALLAS = ['🥇', '🥈', '🥉']

export default function Ranking() {
  const navigate = useNavigate()
  const { player, clearPlayer } = useGame()
  const [ranking, setRanking] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    obtenerRanking()
      .then(data => setRanking(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">Ranking</h2>
        <p className="text-slate-400 mt-1">Los mejores jugadores de Ahorcadito</p>
      </div>

      <div className="card">
        {loading ? (
          <div className="text-center py-8 text-slate-400">Cargando ranking...</div>
        ) : ranking.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400 mb-1">Aún no hay puntajes guardados</p>
            <p className="text-slate-500 text-sm">¡Sé el primero en jugar!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Header */}
            <div className="grid grid-cols-12 text-xs text-slate-500 uppercase tracking-widest px-3 pb-2 border-b border-slate-700">
              <span className="col-span-1">#</span>
              <span className="col-span-5">Jugador</span>
              <span className="col-span-3 text-center">Puntaje</span>
              <span className="col-span-3 text-center">Tiempo</span>
            </div>

            {ranking.map((entry, i) => {
              const isMe = player && entry.cedula === player.cedula
              return (
                <div
                  key={entry.id || i}
                  className={`grid grid-cols-12 items-center px-3 py-3 rounded-xl transition-colors ${
                    isMe ? 'bg-indigo-500/15 border border-indigo-500/30' : 'hover:bg-slate-700/30'
                  }`}
                >
                  <span className="col-span-1 text-lg">
                    {i < 3 ? MEDALLAS[i] : <span className="text-slate-400 font-mono text-sm">{i + 1}</span>}
                  </span>
                  <div className="col-span-5">
                    <p className={`font-medium text-sm ${isMe ? 'text-indigo-300' : 'text-slate-200'}`}>
                      {entry.nombre} {isMe && <span className="text-xs text-indigo-400">(tú)</span>}
                    </p>
                    <p className="text-slate-500 text-xs">{entry.cedula}</p>
                  </div>
                  <div className="col-span-3 text-center">
                    <span className="text-yellow-400 font-bold font-mono">{entry.puntaje}</span>
                    <span className="text-slate-500 text-xs"> pts</span>
                  </div>
                  <div className="col-span-3 text-center">
                    <span className="text-slate-400 font-mono text-sm">{entry.tiempo}s</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-center mt-6">
        <button
          onClick={() => { clearPlayer(); navigate('/') }}
          className="btn-primary"
        >
          Siguiente jugador
        </button>
      </div>
    </div>
  )
}
