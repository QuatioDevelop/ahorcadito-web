const LETRAS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')

export default function Keyboard({ letrasUsadas, onLetra, disabled }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto" role="group" aria-label="Teclado">
      {LETRAS.map(letra => {
        const usada = letrasUsadas.includes(letra)
        return (
          <button
            key={letra}
            onClick={() => !usada && !disabled && onLetra(letra)}
            disabled={usada || disabled}
            className={`w-9 h-9 rounded-lg text-sm font-bold transition-all duration-150 ${
              usada
                ? 'bg-slate-700/40 text-slate-600 cursor-not-allowed'
                : 'bg-slate-700 hover:bg-indigo-500 active:scale-95 text-slate-200 cursor-pointer shadow'
            }`}
            aria-label={`Letra ${letra}`}
          >
            {letra}
          </button>
        )
      })}
    </div>
  )
}
