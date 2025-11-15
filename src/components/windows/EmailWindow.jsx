import { motion } from 'framer-motion'

function EmailWindow({ subject, message }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Email Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-white/15 bg-gradient-to-br from-[#2b2554]/60 to-[#1a1534]/60 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      >
        <p className="font-pixel text-[9px] uppercase tracking-[0.35em] text-desktop-mint/70">From: Waleed</p>
        <p className="mt-3 font-terminal text-xl text-white/90">{subject}</p>
      </motion.div>

      {/* Email Body */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-h-[60vh] overflow-y-auto rounded-xl border border-white/10 bg-gradient-to-b from-[#1e1940]/80 to-[#0f0b1e]/80 p-8 shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
      >
        <div className="space-y-6 font-terminal text-lg leading-relaxed text-white/85">
          {message.split('\n\n').map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 border-t border-white/10 pt-6"
        >
          <p className="font-terminal text-base text-desktop-mint/80">With all my love,</p>
          <p className="mt-2 font-terminal text-lg text-white/90">Waleed</p>
          <p className="mt-1 font-pixel text-[8px] uppercase tracking-[0.4em] text-white/40">
            November 2025
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default EmailWindow
