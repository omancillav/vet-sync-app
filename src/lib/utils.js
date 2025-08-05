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

export const sortAppointmentsByDate = (appointments) => {
  return appointments.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
}

export const groupAppointmentsByStatus = (appointments) => {
  const pendingStatuses = ['Programada', 'En Curso', 'Reprogramada']
  const pending = appointments.filter((appointment) =>
    pendingStatuses.includes(appointment.status)
  )
  const history = appointments.filter(
    (appointment) => !pendingStatuses.includes(appointment.status)
  )

  return { pending, history }
}
