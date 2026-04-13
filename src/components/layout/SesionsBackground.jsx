import React from 'react'

const SesionsBackground = ({ photos }) => {
  if (!photos?.length) return null
  return (
    <div className="relative w-full h-[50vh] md:h-screen min-h-[280px] overflow-hidden">
      {photos.map((photo, index) => {
        const src = photo?.ImageBg
        if (!src || typeof src !== 'string') return null
        return (
          <img
            key={index}
            src={src}
            alt="Cover"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )
      })}
    </div>
  )
}

export default SesionsBackground
