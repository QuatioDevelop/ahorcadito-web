export default function HangmanSVG({ errores }) {
  const stroke = { stroke: '#e2e8f0', strokeWidth: 3, strokeLinecap: 'round' }
  const strokeRed = { stroke: '#ef4444', strokeWidth: 3, strokeLinecap: 'round' }

  return (
    <svg viewBox="0 0 200 220" className="w-full max-w-[240px] mx-auto" aria-label={`Ahorcado con ${errores} errores`}>
      {/* Estructura del cadalso */}
      <line x1="20" y1="210" x2="180" y2="210" {...stroke} />
      <line x1="60" y1="210" x2="60" y2="20" {...stroke} />
      <line x1="60" y1="20" x2="130" y2="20" {...stroke} />
      <line x1="130" y1="20" x2="130" y2="45" {...stroke} />

      {/* Cabeza */}
      {errores >= 1 && (
        <circle cx="130" cy="58" r="13" fill="none" {...strokeRed} />
      )}
      {/* Cuerpo */}
      {errores >= 2 && (
        <line x1="130" y1="71" x2="130" y2="130" {...strokeRed} />
      )}
      {/* Brazo izquierdo */}
      {errores >= 3 && (
        <line x1="130" y1="85" x2="105" y2="108" {...strokeRed} />
      )}
      {/* Brazo derecho */}
      {errores >= 4 && (
        <line x1="130" y1="85" x2="155" y2="108" {...strokeRed} />
      )}
      {/* Pierna izquierda */}
      {errores >= 5 && (
        <line x1="130" y1="130" x2="105" y2="160" {...strokeRed} />
      )}
      {/* Pierna derecha */}
      {errores >= 6 && (
        <line x1="130" y1="130" x2="155" y2="160" {...strokeRed} />
      )}
    </svg>
  )
}
