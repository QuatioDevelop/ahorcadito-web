import { createContext, useContext, useState, useCallback } from 'react'

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [player, setPlayer] = useState(() => {
    const saved = localStorage.getItem('ahorcadito_player')
    return saved ? JSON.parse(saved) : null
  })
  const [score, setScore] = useState(0)
  const [gamesPlayed, setGamesPlayed] = useState(0)

  const registerPlayer = useCallback((playerData) => {
    const data = { ...playerData, registeredAt: new Date().toISOString() }
    setPlayer(data)
    localStorage.setItem('ahorcadito_player', JSON.stringify(data))
  }, [])

  const addScore = useCallback((points) => {
    setScore(prev => {
      const next = prev + points
      return next
    })
    setGamesPlayed(prev => prev + 1)
  }, [])

  const resetSession = useCallback(() => {
    setScore(0)
    setGamesPlayed(0)
  }, [])

  const clearPlayer = useCallback(() => {
    setPlayer(null)
    setScore(0)
    setGamesPlayed(0)
    localStorage.removeItem('ahorcadito_player')
  }, [])

  return (
    <GameContext.Provider value={{ player, score, gamesPlayed, registerPlayer, addScore, resetSession, clearPlayer }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside GameProvider')
  return ctx
}
