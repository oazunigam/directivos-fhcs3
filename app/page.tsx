import { supabase } from '../src/lib/supabase'

export default async function Home() {
  const { data: directivos } = await supabase
    .from('vista_nombramientos_metricas')
    .select('*')

  const totalActivos =
    directivos?.filter((d) => d.estado === 'activo').length || 0

  const proximosAVencer =
    directivos?.filter((d) => d.proximo_a_vencer).length || 0

  const recientes =
    directivos?.filter((d) => d.nombramiento_reciente).length || 0

  const requierenAutorizacion =
    directivos?.filter((d) => d.requiere_autorizacion).length || 0

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="bg-[#031749] rounded-2xl p-8 text-white mb-8">
          <h1 className="text-5xl font-bold">
            Sistema de Directivos Académicos FHCS
          </h1>

          <p className="text-2xl mt-3 opacity-90">
            Facultad de Humanidades y Ciencias Sociales
          </p>
        </div>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-slate-500">Directivos activos</p>

            <h2 className="text-5xl font-bold mt-2 text-[#031749]">
              {totalActivos}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-slate-500">Próximos a vencer</p>

            <h2 className="text-5xl font-bold mt-2 text-orange-500">
              {proximosAVencer}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-slate-500">Nombramientos recientes</p>

            <h2 className="text-5xl font-bold mt-2 text-green-600">
              {recientes}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-slate-500">Requieren autorización</p>

            <h2 className="text-5xl font-bold mt-2 text-red-600">
              {requierenAutorizacion}
            </h2>
          </div>

        </div>

        {/* LISTADO */}
        <div className="space-y-6">

          {directivos?.map((director) => (
            <div
              key={director.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
            >
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-4xl font-bold text-slate-900">
                    {director.nombre_completo}
                  </h2>

                  <p className="font-bold text-lg text-slate-900 mt-2">
                    {director.cargo}
                  </p>

                  <p className="text-slate-600 text-lg mt-1">
                    {director.dependencia}
                  </p>
                </div>

                <div className="text-right space-y-4">

                  <div>
                    <p className="text-sm text-slate-500">
                      Tiempo acumulado
                    </p>

                    <p className="text-2xl font-bold text-slate-900">
                      {director.tiempo_acumulado_hoy} años
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Tiempo restante
                    </p>

                    <p className="text-2xl font-bold text-slate-900">
                      {director.tiempo_restante} años
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Periodos
                    </p>

                    <p className="text-2xl font-bold text-slate-900">
                      {director.periodos_acumulados} / {director.periodos_totales}
                    </p>
                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </main>
  )
}