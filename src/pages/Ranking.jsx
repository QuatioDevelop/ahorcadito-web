import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerRanking } from '../services/api'
import { useGame } from '../context/GameContext'

const MEDALS = ['I', 'II', 'III']

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
    <div
      className="max-w-2xl mx-auto px-4 py-8 pb-12 relative"
      style={{ minHeight: 'calc(100vh - 57px)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(192,138,37,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <div
          className="font-display text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: 'var(--gold-dim)' }}
        >
          ◆ Tabla de honor ◆
        </div>
        <h2
          className="font-display font-bold text-4xl tracking-wider"
          style={{ color: 'var(--ink)', letterSpacing: '0.12em' }}
        >
          RANKING
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3">
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, var(--gold-dim))' }} />
          <span style={{ color: 'var(--gold)', fontSize: '0.6rem' }}>✦</span>
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, var(--gold-dim), transparent)' }} />
        </div>
        <p className="font-body text-base italic mt-2" style={{ color: 'var(--ink-muted)' }}>
          Los mejores jugadores de Ahorcadito
        </p>
      </div>

      {/* Table card */}
      <div className="card relative z-10">
        {loading ? (
          <div
            className="text-center py-10 font-body text-lg italic"
            style={{ color: 'var(--ink-muted)' }}
          >
            Cargando...
          </div>
        ) : ranking.length === 0 ? (
          <div className="text-center py-10">
            <p className="font-display text-sm tracking-widest uppercase" style={{ color: 'var(--ink-muted)' }}>
              Sin registros aún
            </p>
            <p className="font-body italic text-base mt-1" style={{ color: 'var(--ink-faint)' }}>
              ¡Sé el primero en jugar!
            </p>
          </div>
        ) : (
          <div>
            {/* Column headers */}
            <div
              className="grid grid-cols-12 gap-1 font-display text-[10px] tracking-[0.18em] uppercase pb-3 mb-1"
              style={{
                color: 'var(--ink-muted)',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <span className="col-span-1">#</span>
              <span className="col-span-5">Jugador</span>
              <span className="col-span-3 text-center">Puntaje</span>
              <span className="col-span-3 text-center">Tiempo</span>
            </div>

            <div className="space-y-0.5 mt-2">
              {ranking.map((entry, i) => {
                const isMe = player && entry.cedula === player.cedula
                const isTop = i < 3
                return (
                  <div
                    key={entry.id || i}
                    className="grid grid-cols-12 gap-1 items-center px-2 py-2.5 rounded transition-all"
                    style={{
                      background: isMe
                        ? 'rgba(192,138,37,0.08)'
                        : isTop
                          ? 'rgba(192,138,37,0.03)'
                          : 'transparent',
                      border: isMe
                        ? '1px solid rgba(192,138,37,0.25)'
                        : '1px solid transparent',
                    }}
                  >
                    {/* Rank */}
                    <span className="col-span-1">
                      {isTop ? (
                        <span
                          className="font-display font-bold text-xs"
                          style={{
                            color: i === 0 ? '#e5ab40' : i === 1 ? '#b0a090' : '#9a7050',
                          }}
                        >
                          {MEDALS[i]}
                        </span>
                      ) : (
                        <span
                          className="font-stamp text-xs"
                          style={{ color: 'var(--ink-muted)' }}
                        >
                          {i + 1}
                        </span>
                      )}
                    </span>

                    {/* Player */}
                    <div className="col-span-5">
                      <p
                        className="font-body font-medium text-base leading-tight"
                        style={{ color: isMe ? 'var(--gold-bright)' : 'var(--ink)' }}
                      >
                        {entry.nombre}
                        {isMe && (
                          <span
                            className="font-display text-[10px] tracking-wider ml-1.5"
                            style={{ color: 'var(--gold-dim)' }}
                          >
                            (tú)
                          </span>
                        )}
                      </p>
                      <p
                        className="font-stamp text-xs leading-none mt-0.5"
                        style={{ color: 'var(--ink-faint)' }}
                      >
                        {entry.cedula}
                      </p>
                    </div>

                    {/* Score */}
                    <div className="col-span-3 text-center">
                      <span
                        className="font-stamp font-bold text-base"
                        style={{ color: isTop ? 'var(--gold-bright)' : 'var(--gold)' }}
                      >
                        {entry.puntaje}
                      </span>
                      <span
                        className="font-display text-[10px] ml-0.5"
                        style={{ color: 'var(--ink-muted)' }}
                      >
                        pts
                      </span>
                    </div>

                    {/* Time */}
                    <div className="col-span-3 text-center">
                      <span
                        className="font-stamp text-sm"
                        style={{ color: 'var(--ink-muted)' }}
                      >
                        {entry['tiempo-total'] ?? entry.tiempo ?? '—'}s
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-center mt-7 relative z-10">
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
