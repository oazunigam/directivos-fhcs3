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

    console.log(data)
    console.log(error)

    if (data) {
      setNombramientos(data)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f1f5f9] p-10">
        <h1 className="text-4xl font-bold">
          Cargando sistema...
        </h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f1f5f9] p-5">

      {/* HEADER */}

      <div className="bg-[#071639] text-white p-8 rounded-3xl mb-8">
        <h1 className="text-5xl font-bold mb-2">
          Sistema de Directivos Académicos FHCS
        </h1>

        <p className="text-xl text-slate-300">
          Facultad de Humanidades y Ciencias Sociales
        </p>
      </div>

      {/* KPIs */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <p className="text-slate-500 mb-2">
            Directivos activos
          </p>

          <h2 className="text-5xl font-bold text-[#071639]">
            {nombramientos.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <p className="text-slate-500 mb-2">
            Próximos a vencer
          </p>

          <h2 className="text-5xl font-bold text-orange-500">
            {
              nombramientos.filter(
                n => n.proximo_a_vencer
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <p className="text-slate-500 mb-2">
            Nombramientos recientes
          </p>

          <h2 className="text-5xl font-bold text-green-600">
            {
              nombramientos.filter(
                n => n.nombramiento_reciente
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <p className="text-slate-500 mb-2">
            Requieren autorización
          </p>

          <h2 className="text-5xl font-bold text-red-600">
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
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200"
          >

            <div className="flex items-start justify-between gap-8">

              {/* IZQUIERDA */}

              <div className="min-w-[320px] pr-8 border-r border-slate-200">

                <h2 className="text-[20px] font-bold text-[#071639] leading-tight">
                  {n.nombres} {n.apellidos}
                </h2>

                <p className="text-[16px] text-slate-700 mt-2">
                  {n.cargo}
                </p>

                <p className="text-slate-500 mt-2">
                  {n.dependencia}
                </p>

              </div>

              {/* DERECHA */}

              <div className="flex-1 grid grid-cols-8 gap-6">

                {/* ESTADO */}

                <div>

                  <p className="text-[11px] uppercase tracking-wide text-slate-400 leading-tight mb-2">
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

                {/* VIGENCIA */}

                <div>

                  <p className="text-[11px] uppercase tracking-wide text-slate-400 leading-tight mb-2">
                    Vigencia
                  </p>

                  <div className="space-y-2">

                    <p className="text-sm text-slate-800 leading-tight whitespace-nowrap">
                      {new Date(n.fecha_inicio).toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>

                    <p className="text-sm text-slate-800 leading-tight whitespace-nowrap">
                      {new Date(n.fecha_fin).toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>

                  </div>

                </div>

                {/* TIEMPO TOTAL */}

                <div>

                  <p className="text-[11px] uppercase tracking-wide text-slate-400 leading-tight mb-2">
                    Tiempo total nombramiento
                  </p>

                  <p className="font-bold text-[18px] text-slate-900">
                    {n.tiempo_total_nombramiento}
                  </p>

                  <p className="text-sm text-slate-500">
                    años
                  </p>

                </div>

                {/* TIEMPO EJECUTADO */}

                <div>

                  <p className="text-[11px] uppercase tracking-wide text-slate-400 leading-tight mb-2">
                    Tiempo ejecutado nombramiento
                  </p>

                  <p className="font-bold text-[18px] text-slate-900">
                    {n.tiempo_acumulado_hoy}
                  </p>

                  <p className="text-sm text-slate-500">
                    años
                  </p>

                </div>

                {/* TIEMPO RESTANTE */}

                <div>

                  <p className="text-[11px] uppercase tracking-wide text-slate-400 leading-tight mb-2">
                    Tiempo restante nombramiento
                  </p>

                  <p className="font-bold text-[18px] text-slate-900">
                    {n.tiempo_restante}
                  </p>

                  <p className="text-sm text-slate-500">
                    años
                  </p>

                </div>

                {/* PERIODOS TOTALES */}

                <div>

                  <p className="text-[11px] uppercase tracking-wide text-slate-400 leading-tight mb-2">
                    Tiempo total<br />períodos
                  </p>

                  <p className="font-bold text-[18px] text-slate-900">
                    {n.periodos_totales_nombramiento}
                  </p>

                  <p className="text-sm text-slate-500">
                    períodos
                  </p>

                </div>

                {/* PERIODOS EJECUTADOS */}

                <div>

                  <p className="text-[11px] uppercase tracking-wide text-slate-400 leading-tight mb-2">
                    Tiempo ejecutado períodos
                  </p>

                  <p className="font-bold text-[18px] text-slate-900">
                    {n.periodos_acumulados}
                  </p>

                  <p className="text-sm text-slate-500">
                    períodos
                  </p>

                </div>

                {/* PERIODOS RESTANTES */}

                <div>

                  <p className="text-[11px] uppercase tracking-wide text-slate-400 leading-tight mb-2">
                    Tiempo restante períodos
                  </p>

                  <p className="font-bold text-[18px] text-slate-900">
                    {n.periodos_restantes}
                  </p>

                  <p className="text-sm text-slate-500">
                    períodos
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