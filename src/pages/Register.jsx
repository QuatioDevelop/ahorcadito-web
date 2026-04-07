import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { registrarJugador } from '../services/api'

const FORM_VACIO = { nombre: '', cedula: '', correo: '' }

export default function Register() {
  const navigate = useNavigate()
  const { registerPlayer } = useGame()
  const [form, setForm] = useState(FORM_VACIO)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}
    if (!form.nombre.trim() || form.nombre.trim().length < 2) e.nombre = 'Ingresa tu nombre completo'
    if (!form.cedula.trim() || !/^\d{5,12}$/.test(form.cedula.trim())) e.cedula = 'Cédula inválida (solo números, 5–12 dígitos)'
    if (!form.correo.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo.trim())) e.correo = 'Correo electrónico inválido'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const { player } = await registrarJugador(form)
      registerPlayer({ ...player, ...form })
      navigate('/juego')
    } catch {
      setErrors({ general: 'Ocurrió un error. Intenta de nuevo.' })
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  return (
    <div
      className="min-h-[calc(100vh-57px)] flex items-center justify-center px-4 py-12 relative"
      style={{ background: 'var(--bg-void)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 45%, rgba(192,138,37,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="font-display text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: 'var(--gold-dim)' }}
          >
            ◆ Participante ◆
          </div>
          <h2
            className="font-display font-bold text-3xl tracking-wide"
            style={{ color: 'var(--ink)', letterSpacing: '0.1em' }}
          >
            REGISTRO
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, var(--gold-dim))' }} />
            <span style={{ color: 'var(--gold)', fontSize: '0.6rem' }}>✦</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, var(--gold-dim), transparent)' }} />
          </div>
          <p className="font-body text-base mt-3 italic" style={{ color: 'var(--ink-muted)' }}>
            Ingresa tus datos para comenzar
          </p>
        </div>

        {/* Form card */}
        <div className="card">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            <div>
              <label
                className="block font-display text-xs tracking-widest uppercase mb-2"
                style={{ color: 'var(--ink-dim)', letterSpacing: '0.14em' }}
              >
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                className="input-field"
                autoComplete="name"
              />
              {errors.nombre && (
                <p className="font-body text-sm mt-1.5" style={{ color: 'var(--crimson-bright)' }}>
                  {errors.nombre}
                </p>
              )}
            </div>

            <div>
              <label
                className="block font-display text-xs tracking-widest uppercase mb-2"
                style={{ color: 'var(--ink-dim)', letterSpacing: '0.14em' }}
              >
                Cédula
              </label>
              <input
                type="text"
                name="cedula"
                value={form.cedula}
                onChange={handleChange}
                placeholder="Ej: 1234567890"
                className="input-field"
                inputMode="numeric"
                maxLength={12}
              />
              {errors.cedula && (
                <p className="font-body text-sm mt-1.5" style={{ color: 'var(--crimson-bright)' }}>
                  {errors.cedula}
                </p>
              )}
            </div>

            <div>
              <label
                className="block font-display text-xs tracking-widest uppercase mb-2"
                style={{ color: 'var(--ink-dim)', letterSpacing: '0.14em' }}
              >
                Correo electrónico
              </label>
              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="Ej: juan@correo.com"
                className="input-field"
                autoComplete="email"
              />
              {errors.correo && (
                <p className="font-body text-sm mt-1.5" style={{ color: 'var(--crimson-bright)' }}>
                  {errors.correo}
                </p>
              )}
            </div>

            {errors.general && (
              <p
                className="font-body text-sm text-center py-2 px-3 rounded"
                style={{
                  color: 'var(--crimson-bright)',
                  background: 'var(--crimson-glow)',
                  border: '1px solid rgba(192,57,43,0.25)',
                }}
              >
                {errors.general}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2"
              style={{ padding: '0.85rem 2rem' }}
            >
              {loading ? 'Registrando...' : 'Comenzar partida'}
            </button>

          </form>
        </div>

        <p
          className="text-center font-body text-sm italic mt-5"
          style={{ color: 'var(--ink-faint)' }}
        >
          Solo usamos tus datos para el ranking del juego
        </p>

      </div>
    </div>
  )
}
