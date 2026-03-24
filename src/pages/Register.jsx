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
    if (!form.cedula.trim() || !/^\d{5,12}$/.test(form.cedula.trim())) e.cedula = 'Cédula inválida (solo números, 5-12 dígitos)'
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
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Registro</h2>
          <p className="text-slate-400 mt-2">Ingresa los datos del participante</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
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
              {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
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
              {errors.cedula && <p className="text-red-400 text-xs mt-1">{errors.cedula}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
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
              {errors.correo && <p className="text-red-400 text-xs mt-1">{errors.correo}</p>}
            </div>

            {errors.general && (
              <p className="text-red-400 text-sm text-center">{errors.general}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          Solo usamos tus datos para el ranking del juego
        </p>
      </div>
    </div>
  )
}
