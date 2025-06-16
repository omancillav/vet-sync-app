export function Services() {
  const services = [
    {
      name: 'Consulta General',
      description: 'Revisión completa del estado de salud de tu mascota',
      price: '$500 - $800',
      duration: '30-45 min'
    },
    {
      name: 'Vacunación',
      description: 'Esquemas completos de vacunación para todas las edades',
      price: '$200 - $400',
      duration: '15-20 min'
    },
    {
      name: 'Cirugía',
      description: 'Procedimientos quirúrgicos especializados',
      price: '$2,000 - $8,000',
      duration: '1-4 horas'
    },
    {
      name: 'Odontología',
      description: 'Limpieza dental y tratamientos odontológicos',
      price: '$800 - $1,500',
      duration: '45-90 min'
    },
    {
      name: 'Laboratorio',
      description: 'Estudios de sangre, orina y otros análisis',
      price: '$300 - $1,200',
      duration: 'Resultados en 24-48h'
    },
    {
      name: 'Emergencias',
      description: 'Atención de urgencias las 24 horas',
      price: '$1,000 - $3,000',
      duration: 'Variable'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Nuestros Servicios
          </h1>
          <p className="text-muted-foreground">
            Servicios veterinarios completos para el cuidado de tu mascota
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {service.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Precio:</span>
                  <span className="font-medium">{service.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duración:</span>
                  <span className="font-medium">{service.duration}</span>
                </div>
              </div>

              <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors text-sm">
                Agendar Cita
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
