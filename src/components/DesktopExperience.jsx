import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDesktop } from '../context/DesktopContext'
import { useAmbientAudio } from '../hooks/useAmbientAudio'
import DesktopIconGrid from './DesktopIconGrid'
import DesktopWindowManager from './DesktopWindowManager'
import LandingScreen2 from './LandingScreen2'
import DesktopTaskbar from './DesktopTaskbar'

function DesktopExperience() {
  const { site, status, error, icons, audioEnabled, toggleAudio, activeWindowId, activeIcon } = useDesktop()
  const [hasEntered, setHasEntered] = useState(false)

  useAmbientAudio(site?.config?.backgroundAudio, audioEnabled, site?.config?.ambientVolume ?? 0.35)

  useEffect(() => {
    if (status === 'error') {
      console.error(error)
    }
  }, [status, error])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a1530] text-white">
        <motion.div
          className="flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-white/10 bg-black/40 font-pixel text-[10px] uppercase tracking-[0.35em]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          Booting...
        </motion.div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#1a1530] px-6 text-center text-white/80">
        <p className="font-pixel text-sm uppercase tracking-[0.35em] text-desktop-rose">System Error</p>
        <p className="mt-4 max-w-xl font-terminal text-2xl leading-snug">
          Couldn't load Alina's desktop. Refresh the page or make sure <code className="rounded bg-white/10 px-2 py-1 text-sm">public/site.json</code> exists.
        </p>
      </div>
    )
  }

  if (!site) {
    return null
  }

  if (!hasEntered) {
    return (
      <LandingScreen2
        title={site.siteTitle ?? 'AlinaOS'}
        tagline={site.tagline}
        onEnter={() => setHasEntered(true)}
      />
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <BackgroundLayers />

      <div className="relative z-10 flex min-h-screen flex-col">
        <main className="flex-1 px-6 py-8 sm:px-10 sm:py-12">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
            <header className="w-full max-w-sm rounded-xl border border-white/10 bg-black/30 p-4 shadow-[0_15px_30px_rgba(0,0,0,0.35)]">
              <p className="font-pixel text-[10px] uppercase tracking-[0.35em] text-desktop-mint/70">Desktop</p>
              <p className="mt-2 font-terminal text-xl text-white/85">
                {site.tagline ?? 'A lavender night made just for you.'}
              </p>
            </header>

            <div className="w-full max-w-xl">
              <DesktopIconGrid icons={icons} />
            </div>
          </div>
        </main>

        <DesktopTaskbar
          siteTitle={site.siteTitle}
          audioEnabled={audioEnabled}
          onToggleAudio={toggleAudio}
          activeWindow={activeIcon?.windowTitle}
        />
      </div>

      <DesktopWindowManager key={activeWindowId ?? 'docked'} />
    </div>
  )
}

function BackgroundLayers() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[#1a1660]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[length:96px_96px]"
        style={{
          backgroundImage: 'linear-gradient(#f7c7ff 1px, transparent 1px), linear-gradient(90deg, #a6c9ff 1px, transparent 1px)',
        }}
        aria-hidden
      />
    </>
  )
}

export default DesktopExperience
