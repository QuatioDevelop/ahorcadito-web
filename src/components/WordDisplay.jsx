export default function WordDisplay({ palabra, letrasAdivinadas }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 my-6" aria-label="Palabra a adivinar">
      {palabra.split('').map((letra, i) => {
        const revealed = letrasAdivinadas.includes(letra) || letra === ' '
        return (
          <div key={i} className="flex flex-col items-center">
            <span className={`text-2xl font-bold w-8 text-center transition-all duration-300 ${
              letra === ' ' ? 'text-transparent' : revealed ? 'text-indigo-300' : 'text-transparent'
            }`}>
              {revealed ? letra : '_'}
            </span>
            {letra !== ' ' && (
              <div className={`h-0.5 w-8 mt-1 rounded transition-colors duration-300 ${
                revealed ? 'bg-indigo-400' : 'bg-slate-600'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
