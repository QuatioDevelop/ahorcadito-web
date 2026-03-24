// ─── DataQ API Integration ────────────────────────────────────────────────────
// Activity : Ahorcadito web
// ID       : ahorcadito-web-vsjb
// Tenant   : 2cce66c1-47da-44bf-a8c6-a335e88686b7
// Auth type: email
// Guide    : ver ahorcadito.config.json
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL    = 'https://api.dev.quatio.co/dataq'
const TENANT_ID   = '2cce66c1-47da-44bf-a8c6-a335e88686b7'
const ACTIVITY_ID = 'ahorcadito-web-vsjb'

const TOKEN_KEY   = 'ahorcadito_token'
const RANKING_KEY = 'ahorcadito_ranking'
const QUEUE_KEY   = 'ahorcadito_queue'

// ─── Token helpers ────────────────────────────────────────────────────────────

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

// ─── Step 1: Autenticación ────────────────────────────────────────────────────
// POST /auth/:activityId  →  201 nuevo usuario | 200 usuario existente
// Guarda el token JWT para usarlo en las siguientes peticiones.

export async function registrarJugador(playerData) {
  if (!navigator.onLine) {
    // Sin internet: continuar localmente, se autenticará cuando vuelva la conexión
    return { success: true, player: { ...playerData, id: crypto.randomUUID(), offline: true } }
  }

  const res = await fetch(
    `${BASE_URL}/${TENANT_ID}/auth/${ACTIVITY_ID}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: playerData.correo,
        identifierType: 'email',
        userFields: {
          nombre: playerData.nombre,
          cedula: playerData.cedula,
          correo: playerData.correo,
        },
      }),
    }
  )

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Error de autenticación')

  saveToken(data.token)
  return { success: true, player: { ...playerData, userId: data.user.userId } }
}

// ─── Ranking local ────────────────────────────────────────────────────────────

function guardarEnRankingLocal(entry) {
  const ranking = JSON.parse(localStorage.getItem(RANKING_KEY) || '[]')
  ranking.push({ ...entry, id: crypto.randomUUID(), fecha: new Date().toISOString() })
  ranking.sort((a, b) => b.puntaje - a.puntaje)
  localStorage.setItem(RANKING_KEY, JSON.stringify(ranking.slice(0, 50)))
}

export async function obtenerRanking() {
  const data = localStorage.getItem(RANKING_KEY)
  return data ? JSON.parse(data) : []
}

// ─── Cola offline ─────────────────────────────────────────────────────────────

function encolar(payload) {
  const cola = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]')
  cola.push({ payload, token: getToken(), queuedAt: new Date().toISOString() })
  localStorage.setItem(QUEUE_KEY, JSON.stringify(cola))
}

async function enviarEntry(payload, token) {
  const res = await fetch(
    `${BASE_URL}/${TENANT_ID}/entries`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  )
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// Procesa la cola offline cuando vuelve la conexión
async function procesarCola() {
  const cola = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]')
  if (!cola.length) return

  const pendientes = []
  for (const item of cola) {
    try {
      // Si no había token al encolar, intentar reautenticar no es posible aquí;
      // se reintenta en el próximo guardarPuntaje con token activo.
      if (!item.token) { pendientes.push(item); continue }
      await enviarEntry(item.payload, item.token)
    } catch {
      pendientes.push(item) // vuelve a la cola si falla
    }
  }

  if (pendientes.length) {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(pendientes))
  } else {
    localStorage.removeItem(QUEUE_KEY)
  }
}

// Escuchar cuando vuelve la conexión (PWA)
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    procesarCola()
  })
}

// ─── Step 2: Guardar puntaje ──────────────────────────────────────────────────
// POST /entries  →  201 creado | 200 idempotency duplicate
// Si no hay internet, encola y reintenta al reconectarse.

export async function guardarPuntaje(entry) {
  // Siempre guardar localmente para el ranking en pantalla
  guardarEnRankingLocal(entry)

  const token = getToken()
  const idempotencyKey = `${entry.cedula}-${ACTIVITY_ID}-${Date.now()}`

  const payload = {
    activityId: ACTIVITY_ID,
    entryData: {
      puntaje:                    entry.puntaje,
      'preguntas-completadas':    entry['preguntas-completadas'],
      'vidas-restantes':          entry['vidas-restantes'],
      'tiempo-total':             entry['tiempo-total'],
      resultados:                 entry.resultados,
    },
    userData: {
      nombre: entry.nombre,
      cedula: entry.cedula,
      correo: entry.correo,
    },
    idempotencyKey,
  }

  if (!navigator.onLine || !token) {
    encolar(payload)
    return
  }

  try {
    await enviarEntry(payload, token)
  } catch {
    encolar(payload) // fallo de red → encolar para reintento
  }
}
