import { useState } from 'react'
import { Dog } from 'lucide-react'

export function PetImage({ src, alt, className }) {
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    setHasError(true)
  }

  if (!src || hasError) {
    return (
      <div className={`${className} bg-gray-100 border-2 border-gray-200 flex items-center justify-center`}>
        <Dog className="w-2/3 h-2/3 text-gray-400" />
      </div>
    )
  }

  return <img className={className} src={src} alt={alt} onError={handleError} />
}
