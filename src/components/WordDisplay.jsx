export default function WordDisplay({ palabra, letrasAdivinadas }) {
  return (
    <div
      className="flex flex-wrap justify-center gap-x-2 gap-y-3 my-6"
      aria-label="Palabra a adivinar"
    >
      {palabra.split('').map((letra, i) => {
        if (letra === ' ') {
          return <div key={i} className="w-4" />
        }
        const revealed = letrasAdivinadas.includes(letra)
        return (
          <div key={i} className="word-letter">
            <span className={`word-letter__char ${revealed ? 'word-letter__char--revealed' : ''}`}>
              {revealed ? letra : ''}
            </span>
            <div className={`word-letter__line ${revealed ? 'word-letter__line--revealed' : ''}`} />
          </div>
        )
      })}
    </div>
  )
}
