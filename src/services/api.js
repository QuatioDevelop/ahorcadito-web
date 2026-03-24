// Servicio de API - actualmente usa localStorage
// Para conectar a una API real, reemplaza las implementaciones de cada función
// manteniendo los mismos nombres y firmas.

const RANKING_KEY = 'ahorcadito_ranking'

// --- Jugador ---

/**
 * Registra un jugador. Actualmente guarda en localStorage.
 * @param {{ nombre: string, cedula: string, correo: string }} playerData
 * @returns {Promise<{ success: boolean, player: object }>}
 */
export async function registrarJugador(playerData) {
  // TODO: reemplazar con: return fetch('/api/jugadores', { method: 'POST', body: JSON.stringify(playerData) })
  const player = { ...playerData, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
  return { success: true, player }
}

// --- Ranking ---

/**
 * Obtiene el ranking global.
 * @returns {Promise<Array>}
 */
export async function obtenerRanking() {
  // TODO: reemplazar con: return fetch('/api/ranking').then(r => r.json())
  const data = localStorage.getItem(RANKING_KEY)
  return data ? JSON.parse(data) : []
}

/**
 * Guarda una entrada en el ranking.
 * @param {{ nombre: string, cedula: string, puntaje: number, tiempo: number }} entry
 * @returns {Promise<void>}
 */
export async function guardarPuntaje(entry) {
  // TODO: reemplazar con: return fetch('/api/ranking', { method: 'POST', body: JSON.stringify(entry) })
  const ranking = await obtenerRanking()
  ranking.push({ ...entry, id: crypto.randomUUID(), fecha: new Date().toISOString() })
  ranking.sort((a, b) => b.puntaje - a.puntaje)
  localStorage.setItem(RANKING_KEY, JSON.stringify(ranking.slice(0, 50)))
}
