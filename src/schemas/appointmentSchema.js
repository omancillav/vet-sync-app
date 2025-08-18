import { z } from 'zod'

export const appointmentSchema = z.object({
  cliente_id: z.string({
    required_error: 'El ID del cliente es obligatorio',
    invalid_type_error: 'El ID del cliente debe ser un UUID vÃ¡lido'
  })
    .uuid('El ID del cliente debe ser un UUID vÃ¡lido')
    .trim(),

  mascota_id: z.string({
    required_error: 'El ID de la mascota es obligatorio',
    invalid_type_error: 'El ID de la mascota debe ser un UUID vÃ¡lido'
  })
    .uuid('El ID de la mascota debe ser un UUID vÃ¡lido')
    .trim(),

  servicio_id: z.number({
    required_error: 'El ID del servicio es obligatorio',
    invalid_type_error: 'El ID del servicio debe ser un nÃºmero'
  })
    .int('El ID del servicio debe ser un nÃºmero entero'),

  status: z.string()
    .trim()
    .max(20, 'El estado no debe exceder los 20 caracteres')
    .default('Programada'),

  fecha: z.string({
    required_error: 'La fecha de la cita es obligatoria',
    invalid_type_error: 'La fecha de la cita debe ser una cadena de texto vÃ¡lida'
  })
    .trim()
    .refine(val => {
      return /^\d{4}-\d{2}-\d{2}$/.test(val)
    }, {
      message: 'La fecha debe tener el formato YYYY-MM-DD'
    }),

  hora_inicio: z.string({
    required_error: 'La hora de la cita es obligatoria',
    invalid_type_error: 'La hora de la cita debe ser una cadena de texto vÃ¡lida'
  })
    .trim()
    .refine(val => {
      return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(val)
    }, {
      message: 'La hora debe tener el formato HH:MM o HH:MM:SS'
    }),

  motivo_consulta: z.string()
    .trim()
    .default('')
})
