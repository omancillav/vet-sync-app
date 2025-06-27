import { useState } from 'react'
import LazyLoad from 'react-lazyload'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ServicesCard({ service }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const ImagePlaceholder = () => (
    <div className="w-full aspect-video bg-gray-200 animate-pulse flex items-center justify-center">
      <div className="text-gray-400 text-sm">Cargando...</div>
    </div>
  )

  return (
    <Card key={service.id} className={`h-full flex flex-col overflow-hidden group ${service.img_url ? 'pt-0' : ''}`}>
      {service.img_url && !imageError && (
        <LazyLoad
          height={200}
          offset={100}
          placeholder={<ImagePlaceholder />}
          once
        >
          <div className="relative w-full aspect-video overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400 text-sm">Cargando...</div>
              </div>
            )}

            <img
              src={service.img_url}
              alt={service.nombre}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-102 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {imageLoaded && (
              <>
                <div className="absolute inset-0 bg-black/42"></div>
                <div className="absolute inset-0 flex items-end p-4">
                  <h3 className="text-white text-xl md:text-2xl font-semibold">{service.nombre}</h3>
                </div>
              </>
            )}
          </div>
        </LazyLoad>
      )}

      <div className="flex-1 flex flex-col">
        <CardHeader className="pb-2">
          {(!service.img_url || imageError) && (
            <CardTitle className="text-md md:text-xl font-semibold">{service.nombre}</CardTitle>
          )}
          <CardDescription className="line-clamp-2 text-sm md:text-base">{service.descripcion}</CardDescription>
        </CardHeader>

        <CardContent className="mt-auto">
          <section className="flex justify-between mb-4 bg-accent px-8 py-3 rounded-md text-center">
            <div className="flex flex-col justify-center">
              <p className="text-sm">Duración</p>
              <p className="font-semibold text-md">{service.duracion_estimada} min</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm">Precio</p>
              <p className="font-semibold text-md">${service.precio}</p>
            </div>
          </section>
          <Button className="w-full bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm md:text-md hover:cursor-pointer">
            Agendar Cita
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}
