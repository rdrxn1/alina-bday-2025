import { motion } from 'framer-motion'

function ForYouWindow({ message, closing }) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative h-64 w-full overflow-hidden rounded-3xl border-2 border-white/12 bg-gradient-to-b from-[#2b2554] via-[#1a1534] to-[#0f0b1e] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(180,160,255,0.35),transparent_60%)]" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0e0b1b] via-[#0e0b1b]/80 to-transparent" aria-hidden />
        <div className="absolute left-12 right-12 top-10 h-24 rounded-[18px] border-2 border-white/15 bg-gradient-to-b from-[#16112c] to-[#0c0818] shadow-inner">
          <div className="absolute inset-0 bg-scanlines bg-[length:100%_12px] opacity-20" aria-hidden />
        </div>

        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.26, 0.82, 0.25, 1] }}
          className="absolute bottom-10 left-1/2 h-24 w-2 -translate-x-1/2 rounded-full bg-gradient-to-b from-desktop-mint to-desktop-highlight shadow-[0_0_12px_rgba(126,250,234,0.6)]"
        />

        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
          className="absolute bottom-20 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-desktop-rose to-desktop-lilac shadow-[0_10px_30px_rgba(255,154,201,0.45)]"
        >
          <span className="font-pixel text-sm uppercase tracking-[0.4em] text-white/90">🌷</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        className="max-w-3xl space-y-6 text-center"
      >
        <p className="font-terminal text-2xl text-white/85">{message}</p>
        {closing && <p className="font-terminal text-xl text-desktop-mint">{closing}</p>}
      </motion.div>
    </div>
  )
}

export default ForYouWindow
