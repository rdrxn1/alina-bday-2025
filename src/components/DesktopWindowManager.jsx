import { AnimatePresence, motion } from 'framer-motion'
import DesktopWindowFrame from './DesktopWindowFrame'
import { useDesktop } from '../context/DesktopContext'
import MemoriesWindow from './windows/MemoriesWindow'
import MessagesWindow from './windows/MessagesWindow'
import SongsWindow from './windows/SongsWindow'
import MomentsWindow from './windows/MomentsWindow'
import BirthdayWindow from './windows/BirthdayWindow'
import ForYouWindow from './windows/ForYouWindow'

const WINDOW_COMPONENTS = {
  memories: MemoriesWindow,
  messages: MessagesWindow,
  songs: SongsWindow,
  moments: MomentsWindow,
  birthday: BirthdayWindow,
  forYou: ForYouWindow,
}

function DesktopWindowManager() {
  const { activeIcon, closeWindow } = useDesktop()

  const ActiveComponent = activeIcon ? WINDOW_COMPONENTS[activeIcon.variant] ?? null : null

  return (
    <AnimatePresence>
      {activeIcon && ActiveComponent ? (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center px-4 py-16 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={closeWindow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <DesktopWindowFrame title={activeIcon.windowTitle} onClose={closeWindow}>
            <ActiveComponent {...activeIcon.content} />
          </DesktopWindowFrame>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default DesktopWindowManager
