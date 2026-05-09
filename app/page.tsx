'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../src/lib/supabase'

type Nombramiento = {
  id: number

  nombres: string
  apellidos: string

  cargo: string
  dependencia: string

  fecha_inicio: string
  fecha_fin: string

  tiempo_acumulado_hoy: number
  tiempo_total_nombramiento: number
  tiempo_restante: number

  periodos_acumulados: number
  periodos_totales_nombramiento: number
  periodos_restantes: number

  proximo_a_vencer: boolean
  nombramiento_reciente: boolean
  requiere_autorizacion: boolean

  estado: string
}

export default function Home() {
  const [nombramientos, setNombramientos] = useState<Nombramiento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNombramientos()
  }, [])

  async function fetchNombramientos() {
    const { data, error } = await supabase
      .from('vista_nombramientos_metricas')
      .select('*')

    console.log('DATA:', data)
    console.log('ERROR:', error)

    if (data) {
      setNombramientos(data)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl font-bold">
          Cargando sistema...
        </h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f1f5f9] p-8">

      {/* HEADER */}

      <div className="bg-[#071639] text-white p-8 rounded-2xl mb-8">
        <h1 className="text-5xl font-bold mb-2">
          Sistema de Directivos Académicos FHCS
        </h1>

        <p className="text-xl text-slate-300">
          Facultad de Humanidades y Ciencias Sociales
        </p>
      </div>

      {/* TARJETAS KPI */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500 mb-2">
            Directivos activos
          </p>

          <h2 className="text-4xl font-bold text-[#071639]">
            {nombramientos.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500 mb-2">
            Próximos a vencer
          </p>

          <h2 className="text-4xl font-bold text-orange-500">
            {
              nombramientos.filter(
                n => n.proximo_a_vencer
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500 mb-2">
            Nombramientos recientes
          </p>

          <h2 className="text-4xl font-bold text-green-600">
            {
              nombramientos.filter(
                n => n.nombramiento_reciente
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500 mb-2">
            Requieren autorización
          </p>

          <h2 className="text-4xl font-bold text-red-600">
            {
              nombramientos.filter(
                n => n.requiere_autorizacion
              ).length
            }
          </h2>
        </div>

      </div>

      {/* LISTADO */}

      <div className="space-y-6">

        {nombramientos.map((n) => (

          <div
            key={n.id}
            className="bg-white rounded-2xl p-6 shadow"
          >

            <div className="flex justify-between items-center">

              {/* INFORMACIÓN IZQUIERDA */}

              <div>

                <h2 className="text-2xl font-bold text-[#071639]">
                  {n.nombres} {n.apellidos}
                </h2>

                <p className="text-lg text-gray-700">
                  {n.cargo}
                </p>

                <p className="text-gray-500 mt-1">
                  {n.dependencia}
                </p>

              </div>

              {/* INFORMACIÓN DERECHA */}

              <div className="flex items-center gap-14">

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                    Estado
                  </p>

                  <span
                    className={`
                      px-4 py-1 rounded-full text-sm font-semibold
                      ${
                        n.estado === 'activo'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }
                    `}
                  >
                    {n.estado}
                  </span>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                    Vigencia
                  </p>

                  <p className="font-semibold text-slate-900">
                    {n.fecha_inicio} - {n.fecha_fin}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                    Períodos
                  </p>

                  <p className="font-semibold text-slate-900">
                    {n.periodos_totales_nombramiento}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                    Tiempo acumulado
                  </p>

                  <p className="font-semibold text-slate-900">
                    {n.tiempo_acumulado_hoy} años
                  </p>
                </div>

              </div>

            </div>

            {/* ALERTAS */}

            <div className="flex gap-3 mt-6 flex-wrap">

              {n.proximo_a_vencer && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  Próximo a vencer
                </span>
              )}

              {n.nombramiento_reciente && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Nombramiento reciente
                </span>
              )}

              {n.requiere_autorizacion && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  Requiere autorización
                </span>
              )}

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}