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

  useEffect(() => {
    if (todasAdivinadas && estado === 'jugando') {
      setEstado('ganado')
      const pts = calcularPuntaje(tiempo, errores, palabra.replace(/ /g, '').length)
      addScore(pts)
      if (player) guardarPuntaje({ nombre: player.nombre, cedula: player.cedula, puntaje: pts, tiempo })
    }
  }, [todasAdivinadas, estado])

  useEffect(() => {
    if (errores >= MAX_ERRORES && estado === 'jugando') {
      setEstado('perdido')
    }
  }, [errores, estado])

  const handleLetra = useCallback((letra) => {
    if (letrasUsadas.includes(letra) || estado !== 'jugando') return
    setLetrasUsadas(prev => [...prev, letra])
    if (!palabra.includes(letra)) {
      setErrores(prev => prev + 1)
    }
  }, [letrasUsadas, palabra, estado])

  function nuevaRonda() {
    setRonda(getPalabraAleatoria())
    setLetrasUsadas([])
    setErrores(0)
    setEstado('jugando')
    setTiempo(0)
  }

  const puntajeActual = estado === 'ganado'
    ? calcularPuntaje(tiempo, errores, palabra.replace(/ /g, '').length)
    : null

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header del juego */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs text-slate-500 uppercase tracking-widest">Categoría</span>
          <p className="text-indigo-300 font-semibold">{categoria}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 uppercase tracking-widest">Tiempo</span>
          <p className="text-slate-300 font-mono font-semibold">{tiempo}s</p>
        </div>
      </div>

      {/* Ahorcado SVG */}
      <div className="card mb-6">
        <HangmanSVG errores={errores} />
        <div className="flex justify-center gap-1 mt-2">
          {Array.from({ length: MAX_ERRORES }).map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-colors duration-300 ${i < errores ? 'bg-red-500' : 'bg-slate-700'}`} />
          ))}
        </div>
        <p className="text-center text-slate-500 text-sm mt-1">
          {errores}/{MAX_ERRORES} errores
        </p>
      </div>

      {/* Palabra */}
      <WordDisplay palabra={palabra} letrasAdivinadas={letrasAdivinadas} />

      {/* Estado: ganado o perdido */}
      {estado !== 'jugando' && (
        <div className={`card mb-6 text-center border-2 ${estado === 'ganado' ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
          {estado === 'ganado' ? (
            <>
              <p className="text-3xl mb-1">🎉</p>
              <p className="text-green-400 font-bold text-xl">¡Adivinaste!</p>
              <p className="text-slate-400 text-sm mt-1">La palabra era: <span className="text-white font-bold">{palabra}</span></p>
              {puntajeActual !== null && (
                <p className="text-indigo-300 font-bold text-lg mt-2">+{puntajeActual} puntos</p>
              )}
            </>
          ) : (
            <>
              <p className="text-3xl mb-1">💀</p>
              <p className="text-red-400 font-bold text-xl">¡Perdiste!</p>
              <p className="text-slate-400 text-sm mt-1">La palabra era: <span className="text-white font-bold">{palabra}</span></p>
            </>
          )}
          <div className="flex gap-3 justify-center mt-4">
            <button onClick={() => navigate('/ranking')} className="btn-primary">
              Ver ranking
            </button>
          </div>
        </div>
      )}

      {/* Teclado */}
      <Keyboard letrasUsadas={letrasUsadas} onLetra={handleLetra} disabled={estado !== 'jugando'} />
    </div>
  )
}
