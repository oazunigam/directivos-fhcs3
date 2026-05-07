'use client'

import { useEffect } from 'react'
import { supabase } from '@/src/lib/supabase'

export default function HomePage() {

  useEffect(() => {

    async function testConnection() {

      const { data, error } = await supabase
        .from('personas')
        .select('*')

      console.log('DATA:', data)
      console.log('ERROR:', error)
    }

    testConnection()

  }, [])

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <h1 className="text-5xl font-bold">
        Conexión Supabase Perfecto
      </h1>
    </main>
  )
}