<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
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