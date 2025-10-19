import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { usePersistentState } from '../hooks/usePersistentState'

const DesktopContext = createContext(null)

const STORAGE_KEYS = {
  audio: 'alina-desktop::audio-enabled',
}

export function DesktopProvider({ children }) {
  const [site, setSite] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [audioEnabled, setAudioEnabled] = usePersistentState(STORAGE_KEYS.audio, true)
  const [activeWindowId, setActiveWindowId] = useState(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function loadSite() {
      setStatus('loading')

      try {
        const response = await fetch('/site.json', { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Failed to load site configuration (${response.status})`)
        }

        const data = await response.json()

        if (!isMounted) {
          return
        }

        setSite(data)
        setStatus('ready')
      } catch (loadError) {
        if (!isMounted && loadError.name === 'AbortError') {
          return
        }

        console.error('Unable to load site.json', loadError)
        setError(loadError)
        setStatus('error')
      }
    }

    loadSite()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const icons = site?.icons ?? []

  const activeIcon = useMemo(() => {
    if (!activeWindowId) {
      return null
    }

    return icons.find((item) => item.id === activeWindowId) ?? null
  }, [activeWindowId, icons])

  const openWindow = useCallback((iconId) => {
    setActiveWindowId(iconId)
  }, [])

  const closeWindow = useCallback(() => {
    setActiveWindowId(null)
  }, [])

  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => !prev)
  }, [setAudioEnabled])

  const value = {
    site,
    status,
    error,
    audioEnabled,
    toggleAudio,
    icons,
    openWindow,
    closeWindow,
    activeWindowId,
    activeIcon,
  }

  return (
    <DesktopContext.Provider value={value}>
      {children}
    </DesktopContext.Provider>
  )
}

export function useDesktop() {
  const context = useContext(DesktopContext)

  if (!context) {
    throw new Error('useDesktop must be used within a DesktopProvider')
  }

  return context
}
