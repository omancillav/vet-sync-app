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
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export const sortAppointments = (appointments) => {
  return appointments.sort((a, b) => {
    const activeStatuses = ['Programada', 'Reprogramada', 'En Curso']

    const aIsActive = activeStatuses.includes(a.status)
    const bIsActive = activeStatuses.includes(b.status)

    if (aIsActive && !bIsActive) return -1
    if (!aIsActive && bIsActive) return 1

    const getDateTime = (appointment) => {
      const [year, month, day] = appointment.fecha.split('-').map(Number)
      const [hours, minutes] = appointment.hora_inicio.split(':').map(Number)
      return new Date(year, month - 1, day, hours, minutes)
    }

    const dateTimeA = getDateTime(a)
    const dateTimeB = getDateTime(b)

    if (aIsActive && bIsActive) {
      return dateTimeA - dateTimeB
    }

    return dateTimeB - dateTimeA
  })
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
