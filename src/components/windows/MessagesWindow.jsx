import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function MessagesWindow({ entries = [], closing }) {
  const [typedLines, setTypedLines] = useState([])
  const [lineIndex, setLineIndex] = useState(0)
  const [currentLine, setCurrentLine] = useState('')
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (lineIndex >= entries.length) {
      return undefined
    }

    const activeLine = entries[lineIndex]

    if (charIndex < activeLine.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(activeLine.slice(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)
      }, 38)
      return () => clearTimeout(timeout)
    }

    const nextLineTimeout = setTimeout(() => {
      setTypedLines((prev) => [...prev, activeLine])
      setLineIndex((prev) => prev + 1)
      setCurrentLine('')
      setCharIndex(0)
    }, 800)

    return () => clearTimeout(nextLineTimeout)
  }, [charIndex, entries, lineIndex])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border-2 border-white/12 bg-black/40 p-6 shadow-bezel">
        <div className="space-y-4 font-terminal text-2xl text-white/85">
          {typedLines.map((line, index) => (
            <motion.p
              key={`typed-${index}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {line}
            </motion.p>
          ))}

          {lineIndex < entries.length && (
            <p className="relative whitespace-pre text-white">
              <span>{currentLine}</span>
              <BlinkingCaret />
            </p>
          )}
        </div>
      </div>

      {closing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: lineIndex >= entries.length ? 1 : 0,
            y: lineIndex >= entries.length ? 0 : 10,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-xl border-2 border-desktop-mint/20 bg-desktop-mint/10 p-6 font-terminal text-2xl text-desktop-mint"
        >
          {closing}
        </motion.div>
      )}
    </div>
  )
}

function BlinkingCaret() {
  return (
    <span className="ml-1 inline-block h-6 w-1 bg-desktop-mint animate-pulse" aria-hidden />
  )
}

export default MessagesWindow
