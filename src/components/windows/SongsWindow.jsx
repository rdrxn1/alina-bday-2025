import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

function SongsWindow({ description, cassettes = [] }) {
  const defaultCassetteId = useMemo(() => cassettes[0]?.id ?? null, [cassettes])
  const [activeId, setActiveId] = useState(defaultCassetteId)

  useEffect(() => {
    if (!defaultCassetteId) return

    const hasActiveCassette = cassettes.some((cassette) => cassette.id === activeId)
    if (!hasActiveCassette) {
      setActiveId(defaultCassetteId)
    }
  }, [activeId, cassettes, defaultCassetteId])

  const activeCassette = useMemo(
    () => cassettes.find((cassette) => cassette.id === activeId) ?? null,
    [activeId, cassettes]
  )

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative rounded-2xl border-2 border-white/12 bg-black/35 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3a2f5c]/60 via-transparent to-[#2a2449]/70" aria-hidden />

        <div className="relative space-y-4">
          <p className="font-terminal text-xl text-white/75">{description}</p>
          <div className="rounded-xl border-2 border-white/12 bg-[#191530]/90 p-4">
            {activeCassette ? (
              <iframe
                title={activeCassette.title}
                src={activeCassette.embedUrl}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-md border border-white/10"
              />
            ) : (
              <p className="font-terminal text-lg text-white/60">Select a cassette to begin playback.</p>
            )}
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {cassettes.map((cassette, index) => {
          const isActive = cassette.id === activeCassette?.id

          return (
            <motion.button
              key={cassette.id}
              type="button"
              onClick={() => setActiveId(cassette.id)}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
              className="relative flex w-full items-center gap-4 rounded-xl border-2 border-white/10 bg-black/30 px-4 py-3 text-left shadow-bezel transition focus:outline-none focus-visible:ring-4 focus-visible:ring-desktop-mint/40"
            >
              <div
                className="flex h-16 w-24 items-center justify-center rounded-lg border-2 border-white/15 bg-gradient-to-br from-[#3a335a] via-[#262046] to-[#181433]"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${cassette.tone ?? '#f3d6ff'} 0%, rgba(26,21,48,0.6) 100%)`,
                }}
              >
                <div className="flex h-10 w-16 items-center justify-between rounded-md border border-white/20 bg-black/40 px-2">
                  <span className="h-7 w-7 rounded-full border-2 border-white/25 bg-black/30" />
                  <span className="h-7 w-7 rounded-full border-2 border-white/25 bg-black/30" />
                </div>
              </div>

              <div className="flex-1">
                <p className="font-pixel text-[10px] uppercase tracking-[0.35em] text-desktop-mint/70">
                  {cassette.title}
                </p>
                <p className="mt-1 font-terminal text-lg text-white/80">{cassette.subtitle}</p>
              </div>

              <span
                className="pointer-events-none absolute inset-y-2 right-2 w-1 rounded-full bg-desktop-mint/30"
                style={{ opacity: isActive ? 1 : 0.1 }}
              />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default SongsWindow
