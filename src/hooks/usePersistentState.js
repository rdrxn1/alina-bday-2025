import { useCallback, useEffect, useRef, useState } from 'react'

const isBrowser = typeof window !== 'undefined'

function readLocalStorage(key, fallback) {
  if (!isBrowser) {
    return fallback
  }

  try {
    const stored = window.localStorage.getItem(key)
    return stored != null ? JSON.parse(stored) : fallback
  } catch (error) {
    console.warn(`[usePersistentState] Failed to read key "${key}":`, error)
    return fallback
  }
}

function writeLocalStorage(key, value) {
  if (!isBrowser) {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`[usePersistentState] Failed to write key "${key}":`, error)
  }
}

export function usePersistentState(key, defaultValue) {
  const initialised = useRef(false)
  const [state, setState] = useState(() => readLocalStorage(key, defaultValue))

  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true
      return
    }

    writeLocalStorage(key, state)
  }, [key, state])

  const setPersistedState = useCallback((valueOrUpdater) => {
    setState((prev) => {
      const next = typeof valueOrUpdater === 'function' ? valueOrUpdater(prev) : valueOrUpdater
      return next
    })
  }, [])

  return [state, setPersistedState]
}
