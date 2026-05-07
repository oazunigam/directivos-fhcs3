'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase'

export default function HomePage() {

  const [personas, setPersonas] = useState<any[]>([])

  useEffect(() => {

    async function cargarPersonas() {

      const { data, error } = await supabase
        .from('personas')
        .select('*')

      console.log(data)
      console.log(error)

      if (data) {
        setPersonas(data)
      }
    }

    cargarPersonas()

  }, [])

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Directivos Académicos
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {personas.map((persona) => (

          <div
            key={persona.id}
            className="border border-zinc-800 bg-zinc-900 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold">
              {persona.nombre}
            </h2>

            <p className="text-zinc-400 mt-2">
              {persona.cargo}
            </p>
          </div>

        ))}

      </div>

    </main>
  )
}