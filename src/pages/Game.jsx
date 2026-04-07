import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { guardarPuntaje } from '../services/api'
import { getPalabraAleatoria } from '../data/words'
import HangmanSVG from '../components/HangmanSVG'
import WordDisplay from '../components/WordDisplay'
import Keyboard from '../components/Keyboard'

const MAX_ERRORES = 6

function calcularPuntaje(tiempoSegundos, errores, longPalabra) {
  const base = longPalabra * 100
  const penalidad = errores * 50
  const bonus = Math.max(0, 300 - tiempoSegundos) * 2
  return Math.max(0, base - penalidad + bonus)
}

function formatTiempo(s) {
  const m = Math.floor(s / 60)
  const ss = s % 60
  return m > 0 ? `${m}:${String(ss).padStart(2, '0')}` : `${s}s`
}

export default function Game() {
  const navigate = useNavigate()
  const { player, addScore } = useGame()
  const [{ palabra, categoria }, setRonda] = useState(() => getPalabraAleatoria())
  const [letrasUsadas, setLetrasUsadas] = useState([])
  const [errores, setErrores] = useState(0)
  const [estado, setEstado] = useState('jugando') // jugando | ganado | perdido
  const [tiempo, setTiempo] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!player) { navigate('/registro'); return }
  }, [player, navigate])

  useEffect(() => {
    if (estado === 'jugando') {
      timerRef.current = setInterval(() => setTiempo(t => t + 1), 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [estado])

  const letrasAdivinadas = letrasUsadas.filter(l => palabra.includes(l))
  const todasAdivinadas = palabra.split('').every(l => l === ' ' || letrasAdivinadas.includes(l))

  function finalizarJuego(gano, erroresFinales, tiempoFinal) {
    const letrasCorrectas = palabra.replace(/ /g, '').length
    const pts = gano ? calcularPuntaje(tiempoFinal, erroresFinales, letrasCorrectas) : 0
    if (gano) addScore(pts)
    if (player) {
      guardarPuntaje({
        nombre: player.nombre,
        cedula: player.cedula,
        correo: player.correo ?? '',
        puntaje: pts,
        'preguntas-completadas': gano ? 1 : 0,
        'vidas-restantes': MAX_ERRORES - erroresFinales,
        'tiempo-total': tiempoFinal,
        resultados: letrasCorrectas - (palabra.split('').filter(l => l !== ' ' && !letrasUsadas.includes(l)).length),
      })
    }
  }

  useEffect(() => {
    if (todasAdivinadas && estado === 'jugando') {
      setEstado('ganado')
      finalizarJuego(true, errores, tiempo)
    }
  }, [todasAdivinadas, estado])

  useEffect(() => {
    if (errores >= MAX_ERRORES && estado === 'jugando') {
      setEstado('perdido')
      finalizarJuego(false, errores, tiempo)
    }
  }, [errores, estado])

  const handleLetra = useCallback((letra) => {
    if (letrasUsadas.includes(letra) || estado !== 'jugando') return
    setLetrasUsadas(prev => [...prev, letra])
    if (!palabra.includes(letra)) {
      setErrores(prev => prev + 1)
    }
  }, [letrasUsadas, palabra, estado])

  const puntajeActual = estado === 'ganado'
    ? calcularPuntaje(tiempo, errores, palabra.replace(/ /g, '').length)
    : 0

  return (
    <div className="game-page">

      {/* ── Header ── */}
      <div className="game-header">
        <div className="game-meta-block">
          <div className="game-meta-label">Categoría</div>
          <span className="game-category-badge">{categoria}</span>
        </div>
        <div className="game-meta-block game-meta-block--right">
          <div className="game-meta-label">Tiempo</div>
          <span className="game-timer">{formatTiempo(tiempo)}</span>
        </div>
      </div>

      {/* ── Hangman card ── */}
      <div className="card game-hangman-card">
        <HangmanSVG errores={errores} />

        <div className="game-errors">
          {Array.from({ length: MAX_ERRORES }).map((_, i) => (
            <div key={i} className={`error-dot ${i < errores ? 'error-dot--active' : ''}`} />
          ))}
        </div>

        <div
          className="game-error-label"
          style={{ color: errores >= MAX_ERRORES - 1 ? 'var(--crimson-bright)' : 'var(--ink-muted)' }}
        >
          {errores} / {MAX_ERRORES} errores
        </div>
      </div>

      {/* ── Word ── */}
      <WordDisplay palabra={palabra} letrasAdivinadas={letrasAdivinadas} />

      {/* ── Result modal ── */}
      {estado !== 'jugando' && (
        <div
          className="game-result animate-modal"
          style={{
            border: `1px solid ${estado === 'ganado' ? 'rgba(45,122,84,0.5)' : 'rgba(192,57,43,0.5)'}`,
            background: estado === 'ganado' ? 'rgba(14,36,26,0.92)' : 'rgba(36,12,12,0.92)',
          }}
        >
          {estado === 'ganado' ? (
            <>
              <div className="game-result-icon" style={{ color: 'var(--gold-bright)' }}>✦</div>
              <p className="game-result-title" style={{ color: 'var(--emerald-bright)' }}>
                ¡ADIVINASTE!
              </p>
              <p className="game-result-word">
                La palabra era:{' '}
                <span className="game-result-word-value">{palabra}</span>
              </p>
              {puntajeActual > 0 && (
                <p className="game-result-score">+{puntajeActual} puntos</p>
              )}
            </>
          ) : (
            <>
              <div className="game-result-icon" style={{ color: 'var(--crimson-bright)' }}>✝</div>
              <p className="game-result-title" style={{ color: 'var(--crimson-bright)' }}>FIN</p>
              <p className="game-result-word">
                La palabra era:{' '}
                <span className="game-result-word-value">{palabra}</span>
              </p>
            </>
          )}

          <button
            onClick={() => navigate('/ranking')}
            className="btn-primary game-result-btn"
          >
            Ver ranking
          </button>
        </div>
      )}

      {/* ── Keyboard ── */}
      <div className="game-keyboard-section">
        <div className="ornament-divider game-keyboard-divider">letras</div>
        <Keyboard
          letrasUsadas={letrasUsadas}
          onLetra={handleLetra}
          disabled={estado !== 'jugando'}
        />
      </div>

    </div>
  )
}
