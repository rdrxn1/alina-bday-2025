import { useMemo, useState } from 'react'
import clsx from 'clsx'

function GalleryContent({ images = [], title }) {
  const safeImages = Array.isArray(images) ? images : []
  const [index, setIndex] = useState(0)
  const activeImage = safeImages[index]

  const hasMultiple = safeImages.length > 1

  const goNext = () => {
    setIndex((current) => (current + 1) % safeImages.length)
  }

  const goPrev = () => {
    setIndex((current) => (current - 1 + safeImages.length) % safeImages.length)
  }

  const thumbnails = useMemo(() => safeImages.slice(0, 6), [safeImages])

  if (!activeImage) {
    return null
  }

  return (
    <div className="relative space-y-6">
      <div className="relative overflow-hidden rounded-xl border-2 border-white/12 bg-black/40 shadow-bezel">
        <img
          src={activeImage.src}
          alt={activeImage.caption ?? title ?? 'Bouquet memory'}
          className="h-auto w-full object-cover"
        />

        {hasMultiple && (
          <div className="absolute inset-y-0 flex items-center justify-between px-4">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-white/15 bg-black/50 font-pixel text-lg text-white/80 transition hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-desktop-mint/40"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-white/15 bg-black/50 font-pixel text-lg text-white/80 transition hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-desktop-mint/40"
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <p className="text-center font-terminal text-xl text-white/80">
        {activeImage.caption}
      </p>

      {thumbnails.length > 1 && (
        <div className="flex flex-wrap justify-center gap-4">
          {thumbnails.map((thumb, thumbIndex) => (
            <button
              key={`${thumb.src}-${thumbIndex}`}
              type="button"
              onClick={() => setIndex(thumbIndex)}
              className={clsx(
                'overflow-hidden rounded-lg border-2 border-transparent shadow-bezel transition focus:outline-none focus-visible:ring-4 focus-visible:ring-desktop-lilac/40 md:w-28',
                thumbIndex === index ? 'border-desktop-lilac/50' : 'border-white/10'
              )}
            >
              <img
                src={thumb.src}
                alt={thumb.caption ?? `Bouquet ${thumbIndex + 1}`}
                className="h-20 w-20 object-cover md:h-24 md:w-28"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default GalleryContent
