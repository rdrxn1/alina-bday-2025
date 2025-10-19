import { useEffect, useRef } from 'react'

function AudioContent({ audioSrc, caption }) {
  const audioRef = useRef(null)

  useEffect(() => {
    const element = audioRef.current

    return () => {
      if (element) {
        element.pause()
      }
    }
  }, [audioSrc])

  if (!audioSrc) {
    return null
  }

  return (
    <div className="rounded-xl border-2 border-white/12 bg-black/40 p-8 text-center shadow-bezel">
      <audio
        ref={audioRef}
        controls
        className="w-full rounded-md border border-white/15 bg-black/30 p-4 text-white"
      >
        <source src={audioSrc} />
        Your browser does not support the audio element.
      </audio>
      {caption && <p className="mt-4 font-terminal text-xl text-white/80">{caption}</p>}
    </div>
  )
}

export default AudioContent
