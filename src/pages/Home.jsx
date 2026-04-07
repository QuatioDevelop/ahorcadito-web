import { useNavigate } from 'react-router-dom'

function BgGallows() {
  return (
    <svg
      viewBox="0 0 260 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', maxWidth: '420px' }}
    >
      <line x1="18" y1="305" x2="242" y2="305" stroke="#c08a25" strokeWidth="6" strokeLinecap="round" />
      <line x1="68" y1="305" x2="68" y2="20"  stroke="#c08a25" strokeWidth="7" strokeLinecap="round" />
      <line x1="68" y1="20"  x2="180" y2="20"  stroke="#c08a25" strokeWidth="6" strokeLinecap="round" />
      <line x1="68" y1="78"  x2="115" y2="20"  stroke="#c08a25" strokeWidth="5" strokeLinecap="round" />
      <path d="M180,20 C184,40 180,52 180,66" stroke="#c08a25" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="180" cy="72" rx="9" ry="7" stroke="#c08a25" strokeWidth="3" />
      <circle cx="180" cy="95" r="22" stroke="#c08a25" strokeWidth="3.5" />
      <line x1="180" y1="117" x2="180" y2="188" stroke="#c08a25" strokeWidth="4" strokeLinecap="round" />
      <path d="M180,140 Q156,160 134,174" stroke="#c08a25" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M180,140 Q204,160 226,174" stroke="#c08a25" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M180,188 Q156,214 134,244" stroke="#c08a25" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M180,188 Q204,214 226,244" stroke="#c08a25" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      {/* Radial amber glow */}
      <div className="home-glow" />

      {/* Vignette */}
      <div className="home-vignette" />

      {/* Background gallows silhouette */}
      <div className="home-bg-gallows">
        <BgGallows />
      </div>

      {/* Main content */}
      <div className="home-content">

        {/* Overline */}
        <div className="home-overline">
          <span>◆</span>
          <span>Quatio</span>
          <span>◆</span>
        </div>

        {/* Title */}
        <h1 className="home-title animate-title-glow">
          AHORCO<span className="home-title-accent">DITO</span>
        </h1>

        {/* Ornamental divider */}
        <div className="home-divider">
          <div className="home-divider-line" />
          <span className="home-divider-star">✦</span>
          <div className="home-divider-line" />
        </div>

        {/* Subtitle */}
        <p className="home-subtitle">El juego del ahorcado</p>
        <p className="home-desc">Adivina la palabra antes de que sea demasiado tarde</p>

        {/* CTAs */}
        <div className="home-ctas">
          <button onClick={() => navigate('/registro')} className="btn-primary home-btn-play">
            Jugar ahora
          </button>
          <button onClick={() => navigate('/ranking')} className="btn-secondary home-btn-rank">
            Ver ranking
          </button>
        </div>

      </div>

      {/* Footer */}
      <div className="home-footer">
        Ahorcadito &copy; {new Date().getFullYear()}
      </div>
    </div>
  )
}
