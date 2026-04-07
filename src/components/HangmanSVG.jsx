export default function HangmanSVG({ errores }) {
  return (
    <div className="w-full flex items-center justify-center">
      <img
        key={errores}
        src={`/hangman/state-${errores}.png`}
        alt={`Ahorcado con ${errores} errores`}
        className="hangman-img"
        style={{
          width: '100%',
          maxWidth: '320px',
          height: 'auto',
          aspectRatio: '1 / 1',
          objectFit: 'contain',
          display: 'block',
          margin: '0 auto',
        }}
      />
    </div>
  )
}
