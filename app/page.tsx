export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        
        <div className="mb-12">
          <span className="mb-4 inline-block rounded-full border border-zinc-700 px-4 py-1 text-sm text-zinc-300">
            Facultad de Humanidades y Ciencias Sociales
          </span>

          <h1 className="mb-6 text-6xl font-bold tracking-tight">
            Directivos Académicos
          </h1>

          <p className="max-w-3xl text-lg text-zinc-400">
            Plataforma institucional para consulta pública de directivos,
            trayectorias administrativas, periodos históricos y vigencias.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">
              Directivos activos
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              24
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">
              Dependencias
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              12
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">
              Periodos históricos
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              138
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">
              Próximos a vencer
            </p>

            <h2 className="mt-4 text-4xl font-bold text-amber-400">
              4
            </h2>
          </div>
        </div>

      </section>
    </main>
  );
}