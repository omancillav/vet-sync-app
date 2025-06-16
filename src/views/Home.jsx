export function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Bienvenido a VetSync
          </h1>
          <p className="text-xl text-muted-foreground">
            Tu plataforma integral para el cuidado veterinario
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Gestión de Mascotas</h3>
            <p className="text-muted-foreground">
              Administra toda la información de tus mascotas en un solo lugar
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Citas Médicas</h3>
            <p className="text-muted-foreground">
              Programa y gestiona las citas veterinarias de manera eficiente
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Servicios</h3>
            <p className="text-muted-foreground">
              Descubre todos los servicios veterinarios disponibles
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
