export function Appointments() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mis Citas
          </h1>
          <p className="text-muted-foreground">
            Administra todas tus citas veterinarias
          </p>
        </div>

        <div className="grid gap-6">
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Citas Próximas</h3>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm">
                Nueva Cita
              </button>
            </div>

            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                📅
              </div>
              <h4 className="text-lg font-medium mb-2">No tienes citas programadas</h4>
              <p className="text-muted-foreground">
                Programa tu primera cita veterinaria
              </p>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Historial de Citas</h3>

            <div className="text-center py-8">
              <div className="w-12 h-12 bg-muted rounded-full mx-auto mb-3 flex items-center justify-center">
                📋
              </div>
              <p className="text-muted-foreground">
                Aquí aparecerá el historial de tus citas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
