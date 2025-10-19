import { motion } from 'framer-motion'

function MemoriesWindow({ frames = [] }) {
  return (
    <div>
      <p className="font-terminal text-xl text-white/70">
        Hover each frame to read the note taped to the glass.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {frames.map((frame, index) => (
          <MemoryFrame key={`${frame.title}-${index}`} frame={frame} delay={index * 0.05} />
        ))}
      </div>
    </div>
  )
}

function MemoryFrame({ frame, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="group relative rounded-xl border-2 border-white/10 bg-black/25 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
    >
      <div
        className="relative h-40 rounded-md border-2 border-white/12 bg-gradient-to-br from-[#4b3f75] via-[#2a234d] to-[#191431]"
        style={{
          backgroundImage: `linear-gradient(135deg, ${frame.tones?.[0] ?? '#c9b8ff'} 0%, ${
            frame.tones?.[1] ?? '#f3d6ff'
          } 100%)`,
        }}
      >
        <div className="absolute inset-2 rounded-[6px] border border-white/15 bg-black/20" />
        <div className="pointer-events-none absolute inset-0 rounded-md bg-scanlines bg-[length:100%_12px] opacity-20 mix-blend-soft-light" />
        <span className="absolute -top-3 left-4 h-6 w-10 rotate-[-6deg] rounded-sm bg-[#fef3c7]/80 shadow-md" aria-hidden />
        <span className="absolute -top-3 right-6 h-6 w-10 rotate-[8deg] rounded-sm bg-[#fde68a]/70 shadow-md" aria-hidden />
      </div>

      <div className="mt-4 space-y-2">
        <p className="font-pixel text-[10px] uppercase tracking-[0.35em] text-desktop-mint/70">{frame.title}</p>
        <p className="font-terminal text-xl text-white/80 transition group-hover:text-white">{frame.caption}</p>
      </div>

      <span className="pointer-events-none absolute inset-x-8 bottom-0 h-2 rounded-full bg-black/40 blur-sm" />
    </motion.div>
  )
}

export default MemoriesWindow
