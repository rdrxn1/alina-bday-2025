import { useState } from 'react'
import { motion } from 'framer-motion'

function MomentsWindow({ items = [] }) {
  const [activeId, setActiveId] = useState(null)

  const toggleItem = (itemId) => {
    setActiveId((current) => (current === itemId ? null : itemId))
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border-2 border-white/10 bg-black/30 p-6 shadow-bezel">
        <p className="font-terminal text-xl text-white/75">
          Tap an item on the shelf to read the note I left taped underneath.
        </p>
      </div>

      <div className="relative rounded-3xl border-2 border-white/12 bg-[#1b1731]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-x-10 bottom-10 h-2 rounded-full bg-black/40 blur-lg" aria-hidden />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const isActive = item.id === activeId

            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                className="relative flex flex-col items-center gap-3 rounded-2xl border-2 border-white/10 bg-black/25 px-4 py-6 text-center shadow-bezel transition focus:outline-none focus-visible:ring-4 focus-visible:ring-desktop-rose/40"
              >
                <div
                  className="flex h-20 w-full items-center justify-center rounded-xl border-2 border-white/12 bg-gradient-to-br from-[#3d3560] via-[#281f4b] to-[#181131]"
                  style={{
                    backgroundImage: `linear-gradient(145deg, ${item.tone ?? '#f7d8ff'} 0%, rgba(20,16,40,0.8) 100%)`,
                  }}
                >
                  <span className="font-pixel text-xs uppercase tracking-[0.4em] text-white">
                    {item.label}
                  </span>
                </div>

                <motion.p
                  layout
                  className="min-h-[64px] font-terminal text-lg text-white/70"
                  animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1.02 : 1 }}
                >
                  {isActive ? item.message : 'Tap to reveal why I picked this for you.'}
                </motion.p>

                <span
                  className="pointer-events-none absolute inset-x-8 bottom-2 h-1 rounded-full bg-desktop-mint/20 blur-sm"
                  aria-hidden
                />
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MomentsWindow
