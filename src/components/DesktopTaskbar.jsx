import { useEffect, useState } from 'react'
import clsx from 'clsx'

function DesktopTaskbar({ siteTitle, audioEnabled, onToggleAudio, activeWindow }) {
  const [clock, setClock] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(formatTime(new Date()))
    }, 30_000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative z-30 flex h-14 w-full items-center gap-4 border-t border-[#f8d2ff]/40 bg-[#281a58]/80 px-4 text-white shadow-[0_-10px_40px_rgba(23,14,48,0.6)] backdrop-blur-md">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border-2 border-[#f8d2ff]/60 bg-gradient-to-r from-[#f8b4ff] to-[#ff9ed6] px-4 py-2 font-pixel text-[10px] uppercase tracking-[0.4em] text-[#3b1f58] shadow-[0_6px_18px_rgba(255,146,214,0.45)]"
      >
        <span aria-hidden>✦</span>
        Start
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-3 text-xs">
        {activeWindow ? (
          <span className="truncate rounded-md border border-white/10 bg-white/10 px-3 py-1 font-terminal text-sm text-white/80">
            {activeWindow}
          </span>
        ) : (
          <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-terminal text-sm text-white/60">
            {siteTitle}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={onToggleAudio}
        className={clsx(
          'rounded-md border-2 px-3 py-2 font-pixel text-[10px] uppercase tracking-[0.3em] transition',
          audioEnabled
            ? 'border-[#fdd8ff]/60 bg-[#fdb7ff]/30 text-desktop-mint shadow-[0_8px_18px_rgba(126,250,234,0.25)]'
            : 'border-white/20 bg-white/10 text-white/50'
        )}
      >
        {audioEnabled ? '🔊' : '🔇'}
      </button>

      <span className="rounded-md border border-[#f8d2ff]/30 bg-[#2d1a5c]/80 px-3 py-1 font-terminal text-sm text-white/85">
        {clock}
      </span>
    </div>
  )
}

function formatTime(date) {
  return date.toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default DesktopTaskbar
