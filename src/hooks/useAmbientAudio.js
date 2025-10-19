import { useEffect, useRef } from 'react'

export function useAmbientAudio(source, enabled, volume = 0.35) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (!source) {
      return () => {}
    }

    if (!audioRef.current) {
      const audio = new Audio(source)
      audio.loop = true
      audio.volume = volume
      audioRef.current = audio
    }

    const audio = audioRef.current

    if (enabled) {
      audio.play().catch(() => {})
    } else if (!audio.paused) {
      audio.pause()
      audio.currentTime = 0
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [source, enabled, volume])
}
