import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function BirthdayWindow({ message, prompt, afterglow }) {
  const [isLit, setIsLit] = useState(false)

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-full rounded-3xl border-2 border-white/12 bg-gradient-to-b from-[#2c2550] via-[#1d193b] to-[#141029] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-x-20 top-10 h-40 rounded-[20px] border-4 border-[#7c6ccf] bg-gradient-to-b from-[#2f2a53] to-[#120f24] shadow-inner" />
        <div className="relative mx-auto flex h-[220px] w-[220px] flex-col items-center justify-end">
          <div className="relative h-14 w-40 rounded-t-[22px] border-4 border-[#513f6f] bg-gradient-to-b from-[#f6d1ff] via-[#f2bbf4] to-[#e7a4d4] shadow-[inset_0_-8px_12px_rgba(0,0,0,0.2)]">
            <div className="absolute inset-x-4 -top-4 h-3 rounded-full bg-white/30 blur-sm" />
            <div className="absolute inset-x-4 bottom-2 flex justify-between">
              <span className="h-2 w-8 rounded-full bg-white/20" />
              <span className="h-2 w-8 rounded-full bg-white/20" />
              <span className="h-2 w-8 rounded-full bg-white/20" />
            </div>
          </div>

          <motion.div
            className="absolute bottom-14 flex h-24 w-6 cursor-pointer flex-col items-center justify-start"
            onClick={() => setIsLit(true)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="h-16 w-full rounded-[6px] bg-gradient-to-b from-[#f9f3cc] to-[#f6b7d2] shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]" />
            <AnimatePresence>
              {isLit ? (
                <motion.span
                  key="flame"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative -top-4 block h-10 w-10 rounded-full bg-gradient-to-b from-[#ffd27f] via-[#ff9a76] to-[#ff5f6d] shadow-[0_0_20px_rgba(255,214,127,0.8)]"
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#ffdd99]/60" aria-hidden />
                </motion.span>
              ) : (
                <motion.span
                  key="wick"
                  className="relative -top-4 block h-4 w-2 rounded-full bg-white/70"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-6 rounded-b-3xl bg-black/40 blur" aria-hidden />
      </div>

      <div className="max-w-3xl text-center">
        {!isLit && (
          <p className="font-terminal text-xl text-white/70">{prompt}</p>
        )}

        <AnimatePresence>
          {isLit && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-6"
            >
              <p className="font-terminal text-2xl leading-relaxed text-white/85">
                {message}
              </p>
              <p className="font-terminal text-xl text-desktop-mint">{afterglow}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BirthdayWindow
