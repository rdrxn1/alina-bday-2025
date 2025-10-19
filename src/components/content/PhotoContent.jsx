function PhotoContent({ imageSrc, caption, title }) {
  if (!imageSrc) {
    return null
  }

  return (
    <figure className="overflow-hidden rounded-xl border-2 border-white/12 bg-black/40 shadow-bezel">
      <img
        src={imageSrc}
        alt={title ?? 'Memory photo'}
        className="h-auto w-full object-cover"
      />
      {caption && (
        <figcaption className="border-t border-white/10 px-6 py-5 text-center font-terminal text-xl text-white/80">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default PhotoContent
