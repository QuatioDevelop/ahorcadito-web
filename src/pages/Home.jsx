import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg">
        {/* Logo / Marca */}
        <div className="mb-6">
          <span className="text-8xl select-none" role="img" aria-label="Ahorcadito">🪢</span>
        </div>

        <h1 className="text-6xl font-extrabold tracking-tight mb-3">
          <span className="text-white">Ahorco</span>
          <span className="text-indigo-400">dito</span>
        </h1>

        <p className="text-slate-400 text-lg mb-2">
          El juego del ahorcado, ahora en tu navegador
        </p>
        <p className="text-slate-500 text-sm mb-10">
          Adivina la palabra antes de que sea demasiado tarde 💀
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/registro')}
            className="btn-primary text-lg px-10"
          >
            Jugar ahora
          </button>
          <button
            onClick={() => navigate('/ranking')}
            className="btn-secondary"
          >
            Ver ranking
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-slate-600 text-xs">
        Ahorcadito &copy; {new Date().getFullYear()}
      </div>
    </div>
  )
}
