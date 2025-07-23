import { useState } from 'react'
import { Dog } from 'lucide-react'

export function PetImage({ src, alt, className }) {
  const [hasError, setHasError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleError = () => {
    setHasError(true)
  }

  const handleLoad = () => {
    setImgLoaded(true)
  }

  if (!src || hasError) {
    return (
      <div className={`${className} bg-gray-100 border-2 border-gray-200 flex items-center justify-center`}>
        <Dog className="w-2/3 h-2/3 text-gray-400" />
      </div>
    )
  }

  return (
    <div className={`relative ${className} rounded-full overflow-hidden`}>
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
          <Dog className="w-1/3 h-1/3 text-gray-400" />
        </div>
      )}

      <img
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}
