const LETRAS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')

export default function Keyboard({ letrasUsadas, onLetra, disabled }) {
  return (
    <div className="flex flex-wrap justify-center gap-[7px] max-w-[340px] mx-auto" role="group" aria-label="Teclado">
      {LETRAS.map(letra => {
        const usada = letrasUsadas.includes(letra)
        const cls = usada
          ? 'key-btn key-btn--used'
          : disabled
            ? 'key-btn key-btn--disabled'
            : 'key-btn key-btn--active'
        return (
          <button
            key={letra}
            onClick={() => !usada && !disabled && onLetra(letra)}
            disabled={usada || disabled}
            aria-label={`Letra ${letra}`}
            className={cls}
          >
            {letra}
          </button>
        )
      })}
    </div>
  )
}
