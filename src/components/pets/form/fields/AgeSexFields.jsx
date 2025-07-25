import { Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function AgeSexFields({ control, errors }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {/* Edad */}
      <div className="grid gap-2">
        <Label htmlFor="edad">Edad (años)</Label>
        <Controller
          name="edad"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="edad"
              type="number"
              placeholder="Edad en años"
              min="0"
              max="99"
              maxLength={2}
              onInput={(e) => {
                if (e.target.value.length > 2) {
                  e.target.value = e.target.value.slice(0, 2)
                }
                if (e.target.value < 0) {
                  e.target.value = 0
                }
                field.onChange(e.target.value ? Number(e.target.value) : '')
              }}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                  e.preventDefault()
                }
              }}
              className={`text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${errors.edad ? 'border-red-500' : ''}`}
            />
          )}
        />
        {errors.edad && <p className="text-sm text-red-500">{errors.edad.message}</p>}
      </div>

      {/* Sexo */}
      <div className="grid gap-4 sm:gap-2">
        <Label>Sexo</Label>
        <Controller
          name="sexo"
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioGroup value={value} onValueChange={onChange} className="flex items-center w-full">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="M" id="M" />
                <Label htmlFor="M">Macho</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="H" id="H" />
                <Label htmlFor="H">Hembra</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.sexo && <p className="text-sm text-red-500">{errors.sexo.message}</p>}
      </div>
    </div>
  )
}
