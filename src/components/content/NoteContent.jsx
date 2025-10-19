function NoteContent({ text }) {
  if (!text) {
    return null
  }

  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-white/12 bg-black/35 p-8 text-left shadow-bezel">
      <div className="absolute inset-0 bg-scanlines bg-[length:100%_12px] opacity-20 mix-blend-screen" aria-hidden />
      <p className="relative font-terminal text-2xl leading-relaxed text-white/90">
        {text}
      </p>
    </div>
  )
}

export default NoteContent
