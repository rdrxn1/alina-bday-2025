import { motion } from 'framer-motion'

function DesktopWindowFrame({ title, onClose, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative w-full max-w-4xl rounded-[26px] border-4 border-[#f8b4ff]/50 bg-gradient-to-br from-[#2d1e5c]/95 via-[#1e1545]/95 to-[#130d30]/95 text-white shadow-[0_50px_140px_rgba(24,12,56,0.6)]"
    >
      <div className="relative flex items-center justify-between gap-3 rounded-t-[22px] border-b-2 border-[#f8d2ff]/40 bg-gradient-to-r from-[#fde8ff] via-[#fbcfff] to-[#fabaf7] px-6 py-4 text-[#3b1f58]">
        <div>
          <p className="font-pixel text-[10px] uppercase tracking-[0.35em] text-[#784f9e]">Window</p>
          <h2 className="mt-1 font-terminal text-3xl text-[#3b1f58]">{title}</h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-[#f895cd]/70 bg-[#fdd3ff]/70 font-pixel text-sm tracking-[0.25em] text-[#471f5d] transition hover:bg-[#fbb1ef] focus:outline-none focus-visible:ring-4 focus-visible:ring-desktop-rose/40"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="max-h-[74vh] overflow-y-auto bg-gradient-to-br from-[#241643]/85 via-[#20123a]/90 to-[#1a1132]/95 px-6 py-6">
        {children}
      </div>
    </motion.div>
  )
}

export default DesktopWindowFrame
