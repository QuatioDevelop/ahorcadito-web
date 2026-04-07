import { Link, useLocation } from 'react-router-dom'
import { useGame } from '../context/GameContext'

function GallowsIcon() {
  return (
    <svg viewBox="0 0 28 36" fill="none" className="w-5 h-7" aria-hidden="true">
      <line x1="4"  y1="34" x2="24" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="9"  y1="34" x2="9"  y2="4"  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="9"  y1="4"  x2="21" y2="4"  stroke="currentColor" strokeWidth="2"   strokeLinecap="round" />
      <line x1="9"  y1="14" x2="14" y2="4"  stroke="currentColor" strokeWidth="2"   strokeLinecap="round" />
      <path d="M21,4 C22.5,10 21,14 21,18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function Navbar() {
  const { player, score } = useGame()
  const location = useLocation()
  if (location.pathname === '/') return null

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(8,6,4,0.94)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(192,138,37,0.14)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2.5 group" style={{ color: 'var(--gold)', transition: 'color 0.2s' }}>
          <span className="group-hover:opacity-100 opacity-75 transition-opacity">
            <GallowsIcon />
          </span>
          <span
            className="font-display font-bold tracking-widest text-sm group-hover:text-gold-bright transition-colors"
            style={{ letterSpacing: '0.16em', color: 'var(--gold)' }}
          >
            AHORCADITO
          </span>
        </Link>

        <div className="flex items-center gap-5">
          {player && (
            <span className="font-body text-sm" style={{ color: 'var(--ink-muted)' }}>
              Hola,{' '}
              <span style={{ color: 'var(--ink-dim)' }}>{player.nombre}</span>
            </span>
          )}
          {player && (
            <span
              className="font-display font-bold text-xs tracking-wider"
              style={{
                background: 'rgba(192,138,37,0.1)',
                border: '1px solid rgba(192,138,37,0.28)',
                color: 'var(--gold)',
                padding: '0.2rem 0.7rem',
                borderRadius: '2px',
              }}
            >
              {score} pts
            </span>
          )}
          <Link
            to="/ranking"
            className="font-display text-xs tracking-widest uppercase transition-colors hover:text-gold"
            style={{ color: 'var(--ink-muted)', letterSpacing: '0.14em' }}
          >
            Ranking
          </Link>
        </div>

      </div>
    </nav>
  )
}
