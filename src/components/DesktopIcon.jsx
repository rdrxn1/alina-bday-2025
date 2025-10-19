import { motion } from 'framer-motion'
import clsx from 'clsx'
import { useDesktop } from '../context/DesktopContext'

function DesktopIcon({ icon }) {
  const { openWindow, activeWindowId } = useDesktop()
  const isActive = activeWindowId === icon.id

  return (
    <motion.button
      type="button"
      onClick={() => openWindow(icon.id)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        'group flex w-[132px] flex-col items-center gap-3 rounded-lg px-3 pt-2 pb-4 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-desktop-mint/50',
        isActive ? 'bg-white/10' : 'bg-white/0 hover:bg-white/5'
      )}
    >
      <span
        className={clsx(
          'flex h-20 w-20 items-center justify-center rounded-[22px] border border-white/15 bg-gradient-to-br from-[#3a3559] via-[#251f46] to-[#161330] text-3xl shadow-[0_12px_24px_rgba(0,0,0,0.4)] transition',
          isActive ? 'border-desktop-mint/60 shadow-[0_18px_28px_rgba(126,250,234,0.25)]' : null
        )}
      >
        <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{icon.emoji}</span>
      </span>
      <span
        className={clsx(
          'rounded-md px-3 py-1 text-center font-pixel text-[10px] uppercase tracking-[0.35em] text-white/85 shadow-[0_2px_6px_rgba(0,0,0,0.45)] transition',
          isActive ? 'bg-desktop-highlight/70 text-white' : 'bg-black/35 group-hover:bg-black/55'
        )}
      >
        {icon.label}
      </span>
    </motion.button>
  )
}

export default DesktopIcon
