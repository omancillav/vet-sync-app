import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const filterServicesByCategory = (services, category) =>
  services.filter((service) =>
    category === 'Veterinaria' ? service.categoria_id === 1 : service.categoria_id === 2
  )

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
