export function Pets() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mis Mascotas
          </h1>
          <p className="text-muted-foreground">
            Gestiona la información de todas tus mascotas
          </p>
        </div>

        <div className="bg-card border rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
            🐾
          </div>
          <h3 className="text-xl font-semibold mb-2">No tienes mascotas registradas</h3>
          <p className="text-muted-foreground mb-6">
            Comienza agregando información sobre tus queridas mascotas
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
            Agregar Mascota
          </button>
        </div>
      </div>
    </div>
  )
}
