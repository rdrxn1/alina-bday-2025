import { useCallback, useEffect, useRef, useState } from 'react'
import letDownSrc from '../assets/music/Let Down.mp3'
import bachpanSrc from '../assets/music/Bachpan.mp3'
import noSurprisesSrc from '../assets/music/No Surprises.mp3'
import nindiyaReSrc from '../assets/music/Nindiya Re Studio Version.mp3'
import baatUnkahiSrc from '../assets/music/Baat Unkahi.mp3'
import apocalypseSrc from '../assets/music/Cigarettes After Sex - Apocalypse.mp3'
import crySrc from '../assets/music/Cigarettes After Sex - Cry.mp3'
import eachTimeSrc from '../assets/music/Cigarettes After Sex - Each Time You Fall in Love.mp3'
import fallingInLoveSrc from '../assets/music/Cigarettes After Sex - Falling In Love.mp3'
import heavenlySrc from '../assets/music/Cigarettes After Sex - Heavenly.mp3'
import kSrc from '../assets/music/Cigarettes After Sex - K..mp3'
import nothingsGonnaSrc from '../assets/music/Cigarettes After Sex - Nothing_s Gonna Hurt You Baby.mp3'
import sunsetzSrc from '../assets/music/Cigarettes After Sex - Sunsetz.mp3'
import instantCrushSrc from '../assets/music/Daft Punk Julian Casablancas - Instant Crush feat. Julian Casablancas.mp3'
import faasleSrc from '../assets/music/Kaavish - Faasle Studio Version.mp3'
import terePyarSrc from '../assets/music/Kaavish - Tere Pyar Main.mp3'
import daydreamingSrc from '../assets/music/Radiohead - Daydreaming.mp3'
import fakePlasticSrc from '../assets/music/Radiohead - Fake Plastic Trees.mp3'
import motionPictureSrc from '../assets/music/Radiohead - Motion Picture Soundtrack.mp3'
import photoPages from '../data/photoPages.json'
import flowerPages from '../data/flowerPages.json'

const PHOTO_ASSETS = import.meta.glob('../assets/photos/*', {
  eager: true,
  import: 'default',
})
const resolvePhotoAsset = (fileName) => {
  if (!fileName) return null
  const match = Object.entries(PHOTO_ASSETS).find(([path]) => path.endsWith(fileName))
  return match ? match[1] : null
}
const FLOWER_ASSETS = import.meta.glob('../assets/flowers/*', {
  eager: true,
  import: 'default',
})
const resolveFlowerAsset = (fileName) => {
  if (!fileName) return null
  const match = Object.entries(FLOWER_ASSETS).find(([path]) => path.endsWith(fileName))
  return match ? match[1] : null
}
const PALETTE = Object.freeze({
  bg: '#ffe6f2',
  bgAlt: '#ffd8e9',
  primary: '#ff9fcf',
  secondary: '#7cd2ff',
  accent: '#ffc6df',
  text: '#5a3d7a',
  textLight: '#8a6ba0',
  border: '#ff85bb',
  windowBg: '#fff5f9',
  controlMinimize: '#ffe38a',
  controlMaximize: '#7cd2ff',
  controlClose: '#ff96b3',
  sunshine: '#ffd37d',
  mint: '#aee8ce',
  lavender: '#c7b9ff',
  peach: '#ffbfa4',
})
const DOT_PATTERN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18'><circle cx='2.5' cy='2.5' r='1.2' fill='%23${PALETTE.border.slice(1)}'/></svg>")`;
const SCROLLBAR_STYLES = `
  .custom-scroll {
    scrollbar-width: thin;
    scrollbar-color: ${PALETTE.primary} ${PALETTE.windowBg};
  }
  .custom-scroll::-webkit-scrollbar {
    width: 12px;
  }
  .custom-scroll::-webkit-scrollbar-track {
    background: ${PALETTE.windowBg};
    border-left: 2px solid ${PALETTE.border};
    border-right: 2px solid ${PALETTE.border};
  }
  .custom-scroll::-webkit-scrollbar-thumb {
    background: ${PALETTE.primary};
    border-radius: 8px;
    border: 3px solid ${PALETTE.windowBg};
  }
  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background: ${PALETTE.secondary};
  }
  .custom-scroll::-webkit-scrollbar-corner {
    background: ${PALETTE.windowBg};
  }
`
const WINDOW_META = {
  music: {
    title: 'FAVORITE_MUSIC.APP',
    width: 400,
    colors: {
      border: PALETTE.secondary,
      background: '#e6f6ff',
      titleBar: PALETTE.secondary,
    },
    taskLabel: 'Music',
  },
  about: {
    title: 'ALINA.TXT',
    width: 320,
    colors: {
      border: PALETTE.primary,
      background: '#ffe9f4',
      titleBar: PALETTE.primary,
    },
    taskLabel: 'About',
  },
  photos: {
    title: 'BIRTHDAY_2025.JPG',
    width: 300,
    colors: {
      border: PALETTE.sunshine,
      background: '#fff3df',
      titleBar: PALETTE.sunshine,
    },
    taskLabel: 'Photos',
  },
  flowers: {
    title: 'PIXEL_BLOOMS.PNG',
    width: 320,
    colors: {
      border: '#ffb5df',
      background: '#fff5fb',
      titleBar: '#ffb5df',
    },
    taskLabel: 'Flowers',
  },
  email: {
    title: 'BIRTHDAY_MAIL.EML',
    width: 560,
    colors: {
      border: PALETTE.lavender,
      background: '#f6f2ff',
      titleBar: PALETTE.lavender,
    },
    taskLabel: 'Email',
  },
}
const ICON_STYLES = Object.freeze({
  music: {
    tileBg: WINDOW_META.music.colors.titleBar,
    tileBorder: WINDOW_META.music.colors.border,
    labelBg: '#e8f4ff',
    labelBorder: WINDOW_META.music.colors.border,
    icon: {
      main: WINDOW_META.music.colors.titleBar,
      accent: '#ffffff',
      detail: '#2b4d66',
    },
  },
  about: {
    tileBg: WINDOW_META.about.colors.titleBar,
    tileBorder: WINDOW_META.about.colors.border,
    labelBg: '#ffe2ef',
    labelBorder: WINDOW_META.about.colors.border,
    icon: {
      main: WINDOW_META.about.colors.titleBar,
      accent: '#ffffff',
      detail: '#6b3454',
    },
  },
  photos: {
    tileBg: WINDOW_META.photos.colors.titleBar,
    tileBorder: WINDOW_META.photos.colors.border,
    labelBg: '#fff1dd',
    labelBorder: WINDOW_META.photos.colors.border,
    icon: {
      main: WINDOW_META.photos.colors.titleBar,
      accent: '#ffffff',
      detail: '#7a4f1d',
    },
  },
  flowers: {
    tileBg: WINDOW_META.flowers.colors.titleBar,
    tileBorder: WINDOW_META.flowers.colors.border,
    labelBg: '#ffeefd',
    labelBorder: WINDOW_META.flowers.colors.border,
    icon: {
      main: WINDOW_META.flowers.colors.titleBar,
      accent: '#ffffff',
      detail: '#7c3d63',
    },
  },
  email: {
    tileBg: WINDOW_META.email.colors.titleBar,
    tileBorder: WINDOW_META.email.colors.border,
    labelBg: '#f7f3ff',
    labelBorder: WINDOW_META.email.colors.border,
    icon: {
      main: WINDOW_META.email.colors.titleBar,
      accent: '#ffffff',
      detail: '#4a3c6d',
    },
  },
})
const TRACKS = Object.freeze([
  {
    id: 'let-down',
    title: 'Let Down',
    artist: 'Radiohead',
    src: letDownSrc,
    display: 'Let Down - Radiohead',
  },
  {
    id: 'bachpan',
    title: 'Bachpan',
    artist: 'Kaavish',
    src: bachpanSrc,
    display: 'Bachpan - Kaavish',
  },
  {
    id: 'no-surprises',
    title: 'No Surprises',
    artist: 'Radiohead',
    src: noSurprisesSrc,
    display: 'No Surprises - Radiohead',
  },
  {
    id: 'nindiya-re',
    title: 'Nindiya Re (Studio)',
    artist: 'Kaavish',
    src: nindiyaReSrc,
    display: 'Nindiya Re (Studio Version) - Kaavish',
  },
  {
    id: 'baat-unkahi',
    title: 'Baat Unkahi',
    artist: 'Kaavish',
    src: baatUnkahiSrc,
    display: 'Baat Unkahi - Kaavish',
  },
  {
    id: 'apocalypse',
    title: 'Apocalypse',
    artist: 'Cigarettes After Sex',
    src: apocalypseSrc,
    display: 'Apocalypse - Cigarettes After Sex',
  },
  {
    id: 'cry',
    title: 'Cry',
    artist: 'Cigarettes After Sex',
    src: crySrc,
    display: 'Cry - Cigarettes After Sex',
  },
  {
    id: 'each-time',
    title: 'Each Time You Fall in Love',
    artist: 'Cigarettes After Sex',
    src: eachTimeSrc,
    display: 'Each Time You Fall in Love - Cigarettes After Sex',
  },
  {
    id: 'falling-in-love',
    title: 'Falling In Love',
    artist: 'Cigarettes After Sex',
    src: fallingInLoveSrc,
    display: 'Falling In Love - Cigarettes After Sex',
  },
  {
    id: 'heavenly',
    title: 'Heavenly',
    artist: 'Cigarettes After Sex',
    src: heavenlySrc,
    display: 'Heavenly - Cigarettes After Sex',
  },
  {
    id: 'k',
    title: 'K.',
    artist: 'Cigarettes After Sex',
    src: kSrc,
    display: 'K. - Cigarettes After Sex',
  },
  {
    id: 'nothings-gonna',
    title: "Nothing's Gonna Hurt You Baby",
    artist: 'Cigarettes After Sex',
    src: nothingsGonnaSrc,
    display: "Nothing's Gonna Hurt You Baby - Cigarettes After Sex",
  },
  {
    id: 'sunsetz',
    title: 'Sunsetz',
    artist: 'Cigarettes After Sex',
    src: sunsetzSrc,
    display: 'Sunsetz - Cigarettes After Sex',
  },
  {
    id: 'instant-crush',
    title: 'Instant Crush',
    artist: 'Daft Punk feat. Julian Casablancas',
    src: instantCrushSrc,
    display: 'Instant Crush - Daft Punk feat. Julian Casablancas',
  },
  {
    id: 'faasle',
    title: 'Faasle (Studio)',
    artist: 'Kaavish',
    src: faasleSrc,
    display: 'Faasle (Studio Version) - Kaavish',
  },
  {
    id: 'tere-pyar',
    title: 'Tere Pyar Main',
    artist: 'Kaavish',
    src: terePyarSrc,
    display: 'Tere Pyar Main - Kaavish',
  },
  {
    id: 'daydreaming',
    title: 'Daydreaming',
    artist: 'Radiohead',
    src: daydreamingSrc,
    display: 'Daydreaming - Radiohead',
  },
  {
    id: 'fake-plastic',
    title: 'Fake Plastic Trees',
    artist: 'Radiohead',
    src: fakePlasticSrc,
    display: 'Fake Plastic Trees - Radiohead',
  },
  {
    id: 'motion-picture',
    title: 'Motion Picture Soundtrack',
    artist: 'Radiohead',
    src: motionPictureSrc,
    display: 'Motion Picture Soundtrack - Radiohead',
  },
])

const EMAIL_CONTENT = Object.freeze({
  subject: 'Welcome to Your Birthday Site',
  message: `Hey Alina,

I wanted to create something special for you this year—a little corner of the internet that's just yours. This site is a journal, a memory box, a love letter, all wrapped into one.

Every year on your birthday, I'll update it with new memories, messages, and moments we've shared. Think of it as a growing timeline of us—a place where I can remind you how much you mean to me, even when the world feels heavy.

Inside, you'll find:
🌷 Memories - moments that live rent-free in my heart
💌 Messages - journal entries about you, for you
🎧 Songs - the soundtrack to our story
📸 Moments - your favorite things (because you deserve them all)
🎂 Birthday - a little ritual just for today
🕊️ For You - because everything beautiful reminds me of you

This is your space, Alina. A reminder that you are loved, seen, and celebrated—not just today, but every single day.

I hope this brings you a little joy, a little comfort, and a lot of smiles. You deserve all the softness the world can offer.

Happy birthday, my love. Here's to another year of us.`,
})

const formatTime = (value) => {
  if (!Number.isFinite(value) || value < 0) return '0:00'
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
function useDesktopMusicPlayer(tracks) {
  const audioRef = useRef(null)
  const analyserRef = useRef(null)
  const audioContextRef = useRef(null)
  const sourceRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const currentTrack = tracks[currentIndex]
  // Set up Web Audio API for visualization
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    // Initialize audio context and analyser on first play
    const setupAudioContext = () => {
      if (audioContextRef.current) return // Already set up
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 256
        analyser.smoothingTimeConstant = 0.8
        const source = audioContext.createMediaElementSource(audio)
        source.connect(analyser)
        analyser.connect(audioContext.destination)
        audioContextRef.current = audioContext
        analyserRef.current = analyser
        sourceRef.current = source
      } catch (error) {
        console.warn('Web Audio API not supported', error)
      }
    }
    audio.addEventListener('play', setupAudioContext)
    return () => {
      audio.removeEventListener('play', setupAudioContext)
    }
  }, [])
  const safePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return Promise.resolve(false)
    try {
      const playPromise = audio.play()
      if (playPromise && typeof playPromise.then === 'function') {
        return playPromise
          .then(() => {
            setIsPlaying(true)
            setAutoplayBlocked(false)
            return true
          })
          .catch(() => {
            setIsPlaying(false)
            setAutoplayBlocked(true)
            return false
          })
      }
      setIsPlaying(!audio.paused)
      setAutoplayBlocked(false)
      return Promise.resolve(true)
    } catch (error) {
      setIsPlaying(false)
      setAutoplayBlocked(true)
      return Promise.resolve(false)
    }
  }, [])
  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
  }, [])
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined
    const handleLoaded = () => {
      setDuration(audio.duration || 0)
    }
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0)
    }
    const handlePlayEvent = () => {
      setIsPlaying(true)
      setAutoplayBlocked(false)
    }
    const handlePauseEvent = () => {
      setIsPlaying(false)
    }
    const handleEndedEvent = () => {
      setCurrentTime(0)
      setIsPlaying(false)
      setCurrentIndex(prev => (prev + 1) % tracks.length)
    }
    audio.addEventListener('loadedmetadata', handleLoaded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('play', handlePlayEvent)
    audio.addEventListener('pause', handlePauseEvent)
    audio.addEventListener('ended', handleEndedEvent)
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoaded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('play', handlePlayEvent)
      audio.removeEventListener('pause', handlePauseEvent)
      audio.removeEventListener('ended', handleEndedEvent)
    }
  }, [tracks.length])
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return undefined
    audio.pause()
    audio.currentTime = 0
    setCurrentTime(0)
    setDuration(0)
    audio.volume = 0.75
    const handleLoaded = () => {
      setDuration(audio.duration || 0)
      safePlay()
    }
    audio.addEventListener('loadedmetadata', handleLoaded)
    try {
      audio.load()
    } catch (error) {
      // Ignore load errors for browsers that don't require it.
    }
    if (audio.readyState >= 1) {
      handleLoaded()
    }
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoaded)
    }
  }, [currentTrack, safePlay])
  const seekTo = useCallback((fraction) => {
    const audio = audioRef.current
    if (!audio) return
    const clamped = Math.min(Math.max(fraction, 0), 1)
    const targetDuration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : duration
    if (!targetDuration || !Number.isFinite(targetDuration)) return
    audio.currentTime = clamped * targetDuration
    setCurrentTime(audio.currentTime || 0)
  }, [duration])
  const selectTrack = useCallback((index) => {
    if (index < 0 || index >= tracks.length) return
    setCurrentIndex(prev => {
      if (index === prev) {
        const audio = audioRef.current
        if (!audio) return prev
        audio.currentTime = 0
        setCurrentTime(0)
        safePlay()
        return prev
      }
      return index
    })
  }, [safePlay, tracks.length])
  const next = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % tracks.length)
  }, [tracks.length])
  const prev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + tracks.length) % tracks.length)
  }, [tracks.length])
  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      safePlay()
    } else {
      pause()
    }
  }, [pause, safePlay])
  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setCurrentTime(0)
    setIsPlaying(false)
    setAutoplayBlocked(false)
  }, [])
  const progressPercent = duration ? Math.min(100, (currentTime / duration) * 100) : 0
  return {
    audioRef,
    analyserRef,
    currentTrack,
    currentIndex,
    isPlaying,
    autoplayBlocked,
    currentTime,
    duration,
    progressPercent,
    selectTrack,
    next,
    prev,
    togglePlay,
    seekTo,
    stop,
    safePlay,
  }
}
const INITIAL_WINDOWS = {
  email: { x: 420, y: 160, width: 560, height: 620, zIndex: 6, status: 'closed', maximized: false },
  music: { x: 450, y: 70, width: 400, height: 520, zIndex: 5, status: 'open', maximized: false },
  about: { x: 210, y: 210, width: 320, height: 300, zIndex: 4, status: 'open', maximized: false },
  photos: { x: 120, y: 420, width: 300, height: 280, zIndex: 3, status: 'open', maximized: false },
  flowers: { x: 450, y: 430, width: 320, height: 300, zIndex: 2, status: 'open', maximized: false },
}

const createInitialWindowsState = () =>
  Object.fromEntries(Object.entries(INITIAL_WINDOWS).map(([key, value]) => [key, { ...value }]))

function Y2KBirthdayDesktop() {
  const [windows, setWindows] = useState(() => createInitialWindowsState())
  const [dragState, setDragState] = useState(null)
  const [resizeState, setResizeState] = useState(null)
  const [startOpen, setStartOpen] = useState(false)
  const [mailUnread, setMailUnread] = useState(true)
  const [mailAlertVisible, setMailAlertVisible] = useState(true)
  const containerRef = useRef(null)
  const musicPlayer = useDesktopMusicPlayer(TRACKS)
  const { stop: stopMusic } = musicPlayer

  useEffect(() => {
    if (!mailUnread) {
      setMailAlertVisible(false)
    }
  }, [mailUnread])

  const bringToFront = useCallback((key) => {
    setWindows(prev => {
      const maxZ = Math.max(...Object.values(prev).map(w => w.zIndex))
      return { ...prev, [key]: { ...prev[key], zIndex: maxZ + 1 } }
    })
  }, [])
  const handleWindowMouseDown = useCallback((e, key) => {
    if (e.button !== 0) return
    if (e.target.closest('.window-controls') || e.target.closest('.resize-handle')) return
    if (!e.target.closest('.window-header')) return
    
    const win = windows[key]
    if (win.maximized) return
    e.preventDefault()
    bringToFront(key)
    const rect = e.currentTarget.getBoundingClientRect()
    setDragState({
      key,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    })
  }, [windows, bringToFront])
  const handleResizeMouseDown = useCallback((e, key) => {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    const win = windows[key]
    if (win.maximized) return
    bringToFront(key)
    setResizeState({
      key,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: win.width,
      startHeight: win.height,
    })
  }, [windows, bringToFront])
  const handleMouseMove = useCallback((e) => {
    if (dragState) {
      const container = containerRef.current
      if (!container) return
      const containerRect = container.getBoundingClientRect()
      const win = windows[dragState.key]
      
      let newX = e.clientX - dragState.offsetX
      let newY = e.clientY - dragState.offsetY
      newX = Math.max(0, Math.min(newX, containerRect.width - win.width))
      newY = Math.max(0, Math.min(newY, containerRect.height - 50 - win.height))
      setWindows(prev => ({
        ...prev,
        [dragState.key]: { ...prev[dragState.key], x: newX, y: newY }
      }))
    } else if (resizeState) {
      const deltaX = e.clientX - resizeState.startX
      const deltaY = e.clientY - resizeState.startY
      
      const newWidth = Math.max(220, resizeState.startWidth + deltaX)
      const newHeight = Math.max(200, resizeState.startHeight + deltaY)
      setWindows(prev => ({
        ...prev,
        [resizeState.key]: { ...prev[resizeState.key], width: newWidth, height: newHeight }
      }))
    }
  }, [dragState, resizeState, windows])
  const handleMouseUp = useCallback(() => {
    setDragState(null)
    setResizeState(null)
  }, [])
  const handleMinimize = useCallback((key) => {
    setWindows(prev => ({ ...prev, [key]: { ...prev[key], status: 'minimized' } }))
  }, [])
  const handleMaximize = useCallback((key) => {
    setWindows(prev => {
      const win = prev[key]
      const container = containerRef.current
      if (!container) return prev
      const rect = container.getBoundingClientRect()
      
      if (win.maximized) {
        return {
          ...prev,
          [key]: {
            ...win,
            maximized: false,
            x: win.restoreX,
            y: win.restoreY,
            width: win.restoreWidth,
            height: win.restoreHeight,
          }
        }
      }
      return {
        ...prev,
        [key]: {
          ...win,
          maximized: true,
          restoreX: win.x,
          restoreY: win.y,
          restoreWidth: win.width,
          restoreHeight: win.height,
          x: 80,
          y: 8,
          width: rect.width - 160,
          height: rect.height - 60,
        }
      }
    })
  }, [])
  const handleClose = useCallback((key) => {
    setWindows(prev => ({ ...prev, [key]: { ...prev[key], status: 'closed' } }))
    if (key === 'music') {
      stopMusic()
    }
  }, [stopMusic])
  const handleRestore = useCallback((key) => {
    setStartOpen(false)
    if (key === 'email') {
      setMailUnread(false)
      setMailAlertVisible(false)
    }
    setWindows(prev => {
      const maxZ = Math.max(...Object.values(prev).map(w => w.zIndex))
      return { ...prev, [key]: { ...prev[key], status: 'open', maximized: false, zIndex: maxZ + 1 } }
    })
  }, [setMailAlertVisible, setMailUnread])

  const handleIconClick = useCallback((key) => {
    handleRestore(key)
  }, [handleRestore])
  const minimizedWindows = Object.entries(windows)
    .filter(([, w]) => w.status === 'minimized')
    .map(([key]) => key)
  const closedWindows = Object.entries(windows)
    .filter(([, w]) => w.status === 'closed')
    .map(([key]) => key)
  return (
    <>
      <style>{SCROLLBAR_STYLES}</style>
      <div
        ref={containerRef}
        className="relative h-screen w-screen select-none overflow-hidden"
        style={{ backgroundColor: PALETTE.bg }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseDown={(e) => {
          if (!e.target.closest('.start-button') && !e.target.closest('.start-menu')) {
            setStartOpen(false)
          }
        }}
      >
        <DotGrid />
        <FloatingShapes />
        <aside className="absolute left-5 top-8 flex flex-col gap-6">
          <DesktopIcon
            icon={<MailIcon {...ICON_STYLES.email.icon} />}
            label="EMAIL"
            colors={ICON_STYLES.email}
            badge={mailUnread ? '1' : null}
            onClick={() => handleIconClick('email')}
          />
          <DesktopIcon
            icon={<MusicIcon {...ICON_STYLES.music.icon} />}
            label="MY_MUSIC"
            colors={ICON_STYLES.music}
            onClick={() => handleIconClick('music')}
          />
          <DesktopIcon
            icon={<FileIcon {...ICON_STYLES.about.icon} />}
            label="ABOUT"
            colors={ICON_STYLES.about}
            onClick={() => handleIconClick('about')}
          />
          <DesktopIcon
            icon={<PhotoIcon {...ICON_STYLES.photos.icon} />}
            label="PHOTOS"
            colors={ICON_STYLES.photos}
            onClick={() => handleIconClick('photos')}
          />
          <DesktopIcon
            icon={<FlowerIcon {...ICON_STYLES.flowers.icon} />}
            label="FLOWERS"
            colors={ICON_STYLES.flowers}
            onClick={() => handleIconClick('flowers')}
          />
        </aside>

        {windows.email.status === 'open' && (
          <Window
            windowKey="email"
            data={windows.email}
            meta={WINDOW_META.email}
            onMouseDown={handleWindowMouseDown}
            onResizeStart={handleResizeMouseDown}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            onClose={handleClose}
          >
            <EmailContent />
          </Window>
        )}

        {mailUnread && mailAlertVisible && (
          <MailNotification
            onDismiss={() => setMailAlertVisible(false)}
            onOpen={() => handleIconClick('email')}
          />
        )}

        {windows.music.status === 'open' && (
          <Window
            windowKey="music"
            data={windows.music}
            meta={WINDOW_META.music}
            onMouseDown={handleWindowMouseDown}
            onResizeStart={handleResizeMouseDown}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            onClose={handleClose}
          >
            <MusicContent player={musicPlayer} />
          </Window>
        )}
        {windows.about.status === 'open' && (
          <Window
            windowKey="about"
            data={windows.about}
            meta={WINDOW_META.about}
            onMouseDown={handleWindowMouseDown}
            onResizeStart={handleResizeMouseDown}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            onClose={handleClose}
          >
            <AboutContent />
          </Window>
        )}
        {windows.photos.status === 'open' && (
          <Window
            windowKey="photos"
            data={windows.photos}
            meta={WINDOW_META.photos}
            onMouseDown={handleWindowMouseDown}
            onResizeStart={handleResizeMouseDown}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            onClose={handleClose}
          >
            <PhotosContent />
          </Window>
        )}
        {windows.flowers.status === 'open' && (
          <Window
            windowKey="flowers"
            data={windows.flowers}
            meta={WINDOW_META.flowers}
            onMouseDown={handleWindowMouseDown}
            onResizeStart={handleResizeMouseDown}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            onClose={handleClose}
          >
            <FlowersContent />
          </Window>
        )}
        <audio
          ref={musicPlayer.audioRef}
          src={musicPlayer.currentTrack?.src}
          preload="metadata"
          className="hidden"
        />
        <Taskbar
          minimizedWindows={minimizedWindows}
          closedWindows={closedWindows}
          windowInfo={WINDOW_META}
          onRestore={handleRestore}
          startOpen={startOpen}
          onToggleStart={() => setStartOpen(p => !p)}
          musicPlayer={musicPlayer}
          musicWindowStatus={windows.music.status}
        />
      </div>
    </>
  )
}
function Window({ windowKey, data, meta, onMouseDown, onResizeStart, onMinimize, onMaximize, onClose, children }) {
  const style = {
    left: `${data.x}px`,
    top: `${data.y}px`,
    width: `${data.width}px`,
    height: `${data.height}px`,
    zIndex: data.zIndex,
  }
  return (
    <div
      className="absolute flex flex-col"
      style={{
        ...style,
        border: `3px solid ${meta.colors.border}`,
        backgroundColor: meta.colors.background,
        boxShadow: '0 18px 45px rgba(90, 61, 122, 0.15)',
      }}
      onMouseDown={(e) => onMouseDown(e, windowKey)}
    >
      <div
        className="window-header flex cursor-move items-center justify-between px-3 py-2"
        style={{
          backgroundColor: meta.colors.titleBar,
        }}
      >
        <span className="text-sm font-bold tracking-widest" style={{ color: PALETTE.text }}>
          {meta.title}
        </span>
        <div className="window-controls flex gap-1.5">
          <button
            className="h-6 w-6 border-2 flex items-center justify-center text-sm font-bold transition-opacity hover:opacity-70"
            style={{
              backgroundColor: PALETTE.controlMinimize,
              borderColor: PALETTE.border,
            }}
            onClick={(e) => { e.stopPropagation(); onMinimize(windowKey) }}
          >
            _
          </button>
          <button
            className="h-6 w-6 border-2 flex items-center justify-center text-sm font-bold transition-opacity hover:opacity-70"
            style={{
              backgroundColor: PALETTE.controlMaximize,
              borderColor: PALETTE.border,
            }}
            onClick={(e) => { e.stopPropagation(); onMaximize(windowKey) }}
          >
            □
          </button>
          <button
            className="h-6 w-6 border-2 flex items-center justify-center text-sm font-bold transition-opacity hover:opacity-70"
            style={{
              backgroundColor: PALETTE.controlClose,
              borderColor: PALETTE.border,
            }}
            onClick={(e) => { e.stopPropagation(); onClose(windowKey) }}
          >
            ✕
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto custom-scroll" style={{ color: PALETTE.text }}>
        {children}
      </div>
      {!data.maximized && (
        <div
          className="resize-handle absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
          style={{
            backgroundColor: meta.colors.border,
          }}
          onMouseDown={(e) => onResizeStart(e, windowKey)}
        />
      )}
    </div>
  )
}

function EmailContent() {
  const bulletPrefixes = ['🌷', '💌', '🎧', '📸', '🎂', '🕊️']
  const blocks = EMAIL_CONTENT.message.split('\n\n')

  return (
    <div className="flex h-full flex-col gap-6 p-6" style={{ color: PALETTE.text }}>
      <div
        className="flex items-center justify-between gap-6 rounded-3xl border-2 px-6 py-5"
        style={{
          backgroundColor: '#f7f3ff',
          borderColor: WINDOW_META.email.colors.border,
          boxShadow: '0 14px 28px rgba(122, 102, 180, 0.25)',
        }}
      >
        <div className="flex items-center gap-5">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl border-2"
            style={{
              backgroundColor: WINDOW_META.email.colors.titleBar,
              borderColor: WINDOW_META.email.colors.border,
            }}
          >
            <MailIcon {...ICON_STYLES.email.icon} />
          </div>
          <div className="text-base font-mono leading-tight">
            <div className="text-xs font-bold uppercase tracking-[0.6em]" style={{ color: PALETTE.textLight }}>
              From: Waleed
            </div>
            <div className="text-2xl font-semibold" style={{ color: PALETTE.text }}>
              Subject: {EMAIL_CONTENT.subject}
            </div>
          </div>
        </div>
        <div
          className="rounded-full border-2 px-5 py-2 text-sm font-bold uppercase tracking-[0.45em]"
          style={{
            backgroundColor: '#ffffff',
            borderColor: WINDOW_META.email.colors.border,
            color: PALETTE.text,
          }}
        >
          Inbox
        </div>
      </div>

      <div
        className="flex-1 space-y-7 overflow-y-auto rounded-3xl border-2 p-7 custom-scroll"
        style={{
          borderColor: WINDOW_META.email.colors.border,
          background: 'linear-gradient(180deg, #ffffff 0%, #f3edff 100%)',
          boxShadow: '0 22px 48px rgba(90, 61, 122, 0.16)',
        }}
      >
        {blocks.map((block, blockIndex) => {
          const lines = block.split('\n').filter(Boolean)
          if (lines.length === 0) {
            return null
          }

          const hasList =
            lines.length > 1 &&
            lines.slice(1).every((line) => bulletPrefixes.some((prefix) => line.trim().startsWith(prefix)))

          if (hasList) {
            return (
              <div key={blockIndex} className="space-y-4">
                <p className="text-2xl font-semibold" style={{ color: PALETTE.text }}>
                  {lines[0]}
                </p>
                <ul className="space-y-3 text-lg font-mono" style={{ color: PALETTE.text }}>
                  {lines.slice(1).map((line, index) => {
                    const trimmed = line.trim()
                    const firstSpace = trimmed.indexOf(' ')
                    const icon = firstSpace >= 0 ? trimmed.slice(0, firstSpace) : trimmed
                    const text = firstSpace >= 0 ? trimmed.slice(firstSpace + 1).trim() : ''
                    return (
                      <li key={index} className="flex items-start gap-4">
                        <span className="text-2xl leading-none">{icon}</span>
                        <span className="flex-1 text-xl leading-relaxed">{text}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          }

          return (
            <p key={blockIndex} className="text-xl leading-relaxed" style={{ color: PALETTE.text }}>
              {lines.map((line, lineIndex) => (
                <span key={lineIndex}>
                  {line}
                  {lineIndex < lines.length - 1 && <br />}
                </span>
              ))}
            </p>
          )
        })}

        <div className="rounded-3xl border-2 px-6 py-5 text-lg" style={{ borderColor: PALETTE.border, backgroundColor: '#fff1f8' }}>
          <div className="text-2xl font-semibold" style={{ color: PALETTE.text }}>
            With all my love,
          </div>
          <div className="text-3xl font-bold" style={{ color: PALETTE.text }}>
            Waleed
          </div>
          <div className="text-xs uppercase tracking-[0.55em]" style={{ color: PALETTE.textLight }}>
            November 2025
          </div>
        </div>
      </div>
    </div>
  )
}
function MusicVisualizer({ analyserRef, isPlaying }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const analyser = analyserRef.current
    if (!canvas || !analyser) return
    const ctx = canvas.getContext('2d')
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setCanvasSize()
    const resizeObserver =
      typeof window !== 'undefined' && 'ResizeObserver' in window
        ? new ResizeObserver(() => {
            setCanvasSize()
          })
        : null
    if (resizeObserver) {
      resizeObserver.observe(canvas)
    }
    const handleWindowResize = () => {
      setCanvasSize()
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleWindowResize)
    }
    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const width = canvas.width / dpr
      const height = canvas.height / dpr
      const centerY = height / 2
      // Clear with background
      ctx.fillStyle = '#e8f7ff'
      ctx.fillRect(0, 0, width, height)
      if (!isPlaying) {
        // Draw static centerline when paused
        ctx.strokeStyle = PALETTE.secondary + '40'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, centerY)
        ctx.lineTo(width, centerY)
        ctx.stroke()
        return
      }
      analyser.getByteFrequencyData(dataArray)
      // Draw traditional waveform
      const barCount = 80
      const barWidth = width / barCount
      const barGap = 1
      const maxBarHeight = height / 2 - 10
      // Sample mainly from lower frequencies (where most music energy is)
      // Use only first 60% of frequency data for better visualization
      const usableBufferLength = Math.floor(bufferLength * 0.6)
      // Draw bars mirrored from center
      for (let i = 0; i < barCount; i++) {
        // Map bar index to frequency data with emphasis on lower frequencies
        const normalizedIndex = i / (barCount - 1)
        const dataIndex = Math.floor(normalizedIndex * usableBufferLength)
        const value = dataArray[dataIndex] / 255
        const barHeight = value * maxBarHeight
        const x = i * barWidth
        const actualBarWidth = barWidth - barGap
        // Create gradient for each bar
        const topGradient = ctx.createLinearGradient(x, centerY - barHeight, x, centerY)
        topGradient.addColorStop(0, PALETTE.secondary)
        topGradient.addColorStop(0.6, PALETTE.accent)
        topGradient.addColorStop(1, PALETTE.lavender + '60')
        const bottomGradient = ctx.createLinearGradient(x, centerY, x, centerY + barHeight)
        bottomGradient.addColorStop(0, PALETTE.lavender + '60')
        bottomGradient.addColorStop(0.4, PALETTE.accent)
        bottomGradient.addColorStop(1, PALETTE.secondary)
        // Draw top half (above center)
        ctx.fillStyle = topGradient
        ctx.fillRect(x, centerY - barHeight, actualBarWidth, barHeight)
        // Draw bottom half (below center)
        ctx.fillStyle = bottomGradient
        ctx.fillRect(x, centerY, actualBarWidth, barHeight)
      }
      // Draw subtle center line
      ctx.strokeStyle = PALETTE.secondary + '30'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, centerY)
      ctx.lineTo(width, centerY)
      ctx.stroke()
      animationRef.current = requestAnimationFrame(draw)
    }
    draw()
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(draw)
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleWindowResize)
      }
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [analyserRef, isPlaying])
  return (
    <div
      className="rounded-lg border-2 overflow-hidden"
      style={{
        borderColor: PALETTE.secondary,
        backgroundColor: '#e8f7ff',
        height: '110px',
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  )
}
function MusicContent({ player }) {
  const [isDragging, setIsDragging] = useState(false)
  const progressBarRef = useRef(null)
  if (!player || !player.currentTrack) {
    return (
      <div
        className="flex h-full items-center justify-center p-4 text-sm font-semibold"
        style={{ color: PALETTE.text }}
      >
        Audio unavailable.
      </div>
    )
  }
  const {
    currentTrack,
    progressPercent,
    currentTime,
    duration,
    isPlaying,
    autoplayBlocked,
    togglePlay,
    next,
    prev,
    selectTrack,
    seekTo,
    currentIndex,
    analyserRef,
  } = player
  const handleSeek = useCallback((event) => {
    if (!duration) return
    const bounds = progressBarRef.current?.getBoundingClientRect()
    if (!bounds) return
    const offset = event.clientX - bounds.left
    const percent = Math.min(Math.max(offset / bounds.width, 0), 1)
    seekTo(percent)
  }, [duration, seekTo])
  const handleMouseDown = useCallback((event) => {
    setIsDragging(true)
    handleSeek(event)
  }, [handleSeek])
  useEffect(() => {
    if (!isDragging) return
    const handleMouseMove = (event) => {
      handleSeek(event)
    }
    const handleMouseUp = () => {
      setIsDragging(false)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleSeek])
  return (
    <div className="flex h-full flex-col gap-3 p-3">
      <div
        className="space-y-2.5 rounded-xl border-2 p-3 shadow-[0_18px_40px_rgba(124,210,255,0.2)]"
        style={{
          borderColor: PALETTE.secondary,
          backgroundColor: '#e8f7ff',
        }}
      >
        <div className="text-sm font-bold tracking-[0.35em]" style={{ color: PALETTE.text }}>
          NOW PLAYING
        </div>
        <div
          className="rounded-lg border-2 px-3 py-2 text-sm font-mono"
          style={{
            backgroundColor: '#bfe9ff',
            borderColor: PALETTE.secondary,
            color: PALETTE.text,
          }}
        >
          {currentTrack.display}
        </div>
        <div className="space-y-2">
          <div
            ref={progressBarRef}
            className="relative h-5 w-full overflow-visible rounded-full border-2"
            style={{
              borderColor: PALETTE.secondary,
              backgroundColor: '#cfefff',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progressPercent}%`,
                background: `linear-gradient(90deg, ${PALETTE.secondary}, ${PALETTE.primary})`,
                boxShadow: '0 2px 6px rgba(124, 210, 255, 0.5)',
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-transform hover:scale-125"
              style={{
                left: `${progressPercent}%`,
                marginLeft: '-8px',
                backgroundColor: PALETTE.primary,
                borderColor: PALETTE.border,
                boxShadow: '0 2px 8px rgba(255, 159, 207, 0.6)',
              }}
            />
          </div>
          <div className="flex justify-between text-xs font-semibold" style={{ color: PALETTE.textLight }}>
            <span>{formatTime(currentTime)}</span>
            <span>{duration ? formatTime(duration) : '--:--'}</span>
          </div>
        </div>
        {autoplayBlocked && (
          <div
            className="rounded-md border-2 px-3 py-2 text-xs font-semibold"
            style={{
              borderColor: PALETTE.border,
              backgroundColor: '#fff1f8',
              color: PALETTE.text,
            }}
          >
            Press play to start "Let Down" - some browsers block autoplay without interaction.
          </div>
        )}
      </div>
      {analyserRef && <MusicVisualizer analyserRef={analyserRef} isPlaying={isPlaying} />}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          className="h-10 w-12 border-2 text-sm font-bold transition-opacity hover:opacity-80"
          style={{
            backgroundColor: PALETTE.secondary,
            borderColor: PALETTE.border,
            color: PALETTE.text,
          }}
          onClick={prev}
        >
          ⏮
        </button>
        <button
          type="button"
          className="h-12 w-14 border-2 text-base font-bold transition-transform hover:scale-[1.03] hover:opacity-90"
          style={{
            backgroundColor: PALETTE.accent,
            borderColor: PALETTE.border,
            color: PALETTE.text,
          }}
          onClick={togglePlay}
        >
          {isPlaying ? '⏸' : '⏵'}
        </button>
        <button
          type="button"
          className="h-10 w-12 border-2 text-sm font-bold transition-opacity hover:opacity-80"
          style={{
            backgroundColor: PALETTE.secondary,
            borderColor: PALETTE.border,
            color: PALETTE.text,
          }}
          onClick={next}
        >
          ⏭
        </button>
      </div>
      <div
        className="flex-1 space-y-2 overflow-y-auto rounded-xl border-2 p-3 custom-scroll"
        style={{
          borderColor: PALETTE.secondary,
          backgroundColor: '#f0fbff',
          color: PALETTE.text,
        }}
      >
        <div className="text-xs font-bold tracking-widest" style={{ color: PALETTE.textLight }}>
          PLAYLIST
        </div>
        <div className="space-y-2">
          {TRACKS.map((track, index) => {
            const isCurrent = index === currentIndex
            return (
              <button
                key={track.id}
                type="button"
                className="flex w-full items-center justify-between gap-3 rounded-lg border-2 px-3 py-2 text-left text-xs font-semibold transition-transform hover:translate-x-[2px] hover:opacity-90"
                style={{
                  borderColor: isCurrent ? PALETTE.secondary : PALETTE.border,
                  backgroundColor: isCurrent ? '#d9f3ff' : '#ffffff',
                  color: PALETTE.text,
                  boxShadow: isCurrent ? '0 8px 20px rgba(124, 210, 255, 0.25)' : 'none',
                }}
                onClick={() => selectTrack(index)}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px]"
                    style={{
                      borderColor: isCurrent ? PALETTE.secondary : PALETTE.border,
                      backgroundColor: isCurrent ? PALETTE.secondary : '#fdfbfe',
                      color: PALETTE.text,
                    }}
                  >
                    {isCurrent && isPlaying ? '♪' : index + 1}
                  </span>
                  <span>{track.display}</span>
                </span>
                {isCurrent && (
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: PALETTE.textLight }}>
                    {isPlaying ? 'PLAYING' : 'PAUSED'}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
function AboutContent() {
  return (
    <div
      className="p-4 text-sm font-mono overflow-y-auto h-full custom-scroll"
      style={{
        color: PALETTE.text,
        backgroundColor: '#ffeef6',
        border: `2px solid ${PALETTE.primary}`,
      }}
    >
      <div className="font-bold text-sm mb-3 tracking-widest">ALINA.TXT</div>
      <div className="space-y-2 text-xs" style={{ color: PALETTE.textLight }}>
        <div>Birthday: November 15</div>
        <div>Sign: Scorpio</div>
        <div className="mt-4 font-bold text-sm" style={{ color: PALETTE.text }}>Favorites:</div>
        <div>Colors: Lavender, blush, starlight blue</div>
        <div>Flowers: Tulips, roses, sunflowers</div>
        <div>Songs: Kaavish - Bachpan on repeat</div>
        <div>Comfort: Quiet mornings, handwritten notes</div>
        <div>Magic trick: The way she softens the room by smiling</div>
        <div className="mt-4 font-bold text-sm" style={{ color: PALETTE.text }}>System Notes:</div>
        <div>Treat gently. Always adored. Requires daily compliments.</div>
      </div>
    </div>
  )
}
function PhotosContent() {
  const pages = photoPages?.pages ?? []
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!pages.length) {
    return (
      <div
        className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center font-mono text-xs"
        style={{ color: PALETTE.text }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em]">NO PAGES FOUND</p>
        <p className="max-w-xs text-[13px] text-rose-900/70">
          Add a new entry to <code className="rounded bg-white/80 px-2 py-0.5">src/data/photoPages.json</code> to start curating a
          story-driven photo book.
        </p>
      </div>
    )
  }

  const safeIndex = Math.min(Math.max(currentIndex, 0), pages.length - 1)
  const activePage = pages[safeIndex]
  const { title, caption, entries = [], showTitle = true } = activePage

  const movePage = (direction) => {
    setCurrentIndex((prev) => {
      const next = prev + direction
      if (next < 0) return 0
      if (next > pages.length - 1) return pages.length - 1
      return next
    })
  }

  return (
    <div
      className="flex h-full flex-col gap-4 p-5 font-mono"
      style={{
        color: PALETTE.text,
        backgroundColor: '#fff7ec',
      }}
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.45em]" style={{ color: PALETTE.textLight }}>
        <span>Page {safeIndex + 1} / {pages.length}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => movePage(-1)}
            disabled={safeIndex === 0}
            className="rounded-full border-2 px-3 py-1 text-[10px] font-semibold transition disabled:opacity-40"
            style={{
              borderColor: PALETTE.border,
              color: PALETTE.text,
              backgroundColor: '#fff',
            }}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => movePage(1)}
            disabled={safeIndex === pages.length - 1}
            className="rounded-full border-2 px-3 py-1 text-[10px] font-semibold transition disabled:opacity-40"
            style={{
              borderColor: PALETTE.border,
              color: PALETTE.text,
              backgroundColor: '#fff',
            }}
          >
            Next
          </button>
        </div>
      </div>

      <div
        className="flex flex-col gap-3 rounded-2xl border-4 p-4 shadow-[0_18px_35px_rgba(255,172,132,0.25)]"
        style={{
          borderColor: PALETTE.border,
          backgroundColor: '#fffaf1',
        }}
      >
        {showTitle && title && (
          <div
            className="text-center text-sm font-bold uppercase tracking-[0.4em]"
            style={{ color: PALETTE.text }}
          >
            {title}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {entries.map((entry, index) => (
            <PhotoEntry key={`${activePage.id}-${index}`} entry={entry} />
          ))}
        </div>

        {caption && (
          <p
            className="text-center text-[13px] font-semibold tracking-wide"
            style={{ color: PALETTE.textLight }}
          >
            {caption}
          </p>
        )}
      </div>
    </div>
  )
}

function PhotoEntry({ entry }) {
  if (entry.type === 'text') {
    return (
      <div
        className="h-full rounded-xl border-2 px-4 py-5 text-sm"
        style={{
          borderColor: PALETTE.sunshine,
          backgroundColor: '#fff',
          color: PALETTE.text,
        }}
      >
        {entry.content}
      </div>
    )
  }

  const src = resolvePhotoAsset(entry.file)

  if (!src) {
    return (
      <div
        className="flex min-h-[140px] flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-5 text-center text-xs"
        style={{
          borderColor: PALETTE.border,
          color: PALETTE.textLight,
        }}
      >
        Missing file
        <span className="text-[10px]">{entry.file}</span>
      </div>
    )
  }

  return (
    <figure className="overflow-hidden rounded-xl border-2" style={{ borderColor: PALETTE.border }}>
      <img src={src} alt={entry.alt ?? 'Memory photo'} className="h-full w-full object-cover" />
    </figure>
  )
}

function FlowersContent() {
  const bouquets = flowerPages?.bouquets ?? []
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!bouquets.length) {
    return (
      <div
        className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center font-mono text-xs"
        style={{ color: PALETTE.text }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em]">NO BOUQUETS FOUND</p>
        <p className="max-w-xs text-[13px] text-rose-900/70">
          Add entries to <code className="rounded bg-white/80 px-2 py-0.5">src/data/flowerPages.json</code> and drop matching
          files into <code className="rounded bg-white/80 px-2 py-0.5">src/assets/flowers</code>.
        </p>
      </div>
    )
  }

  const safeIndex = Math.min(Math.max(currentIndex, 0), bouquets.length - 1)
  const activeSpread = bouquets[safeIndex]
  const { title, caption, entries = [], showTitle = true } = activeSpread

  const movePage = (direction) => {
    setCurrentIndex((prev) => {
      const next = prev + direction
      if (next < 0) return 0
      if (next > bouquets.length - 1) return bouquets.length - 1
      return next
    })
  }

  return (
    <div
      className="flex h-full flex-col gap-4 p-5 font-mono"
      style={{
        color: PALETTE.text,
        backgroundColor: '#fff0f7',
      }}
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.45em]" style={{ color: PALETTE.textLight }}>
        <span>Page {safeIndex + 1} / {bouquets.length}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => movePage(-1)}
            disabled={safeIndex === 0}
            className="rounded-full border-2 px-3 py-1 text-[10px] font-semibold transition disabled:opacity-40"
            style={{
              borderColor: WINDOW_META.flowers.colors.border,
              color: PALETTE.text,
              backgroundColor: '#fff',
            }}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => movePage(1)}
            disabled={safeIndex === bouquets.length - 1}
            className="rounded-full border-2 px-3 py-1 text-[10px] font-semibold transition disabled:opacity-40"
            style={{
              borderColor: WINDOW_META.flowers.colors.border,
              color: PALETTE.text,
              backgroundColor: '#fff',
            }}
          >
            Next
          </button>
        </div>
      </div>

      <div
        className="flex flex-col gap-3 rounded-2xl border-4 p-4 shadow-[0_18px_35px_rgba(255,165,212,0.25)]"
        style={{
          borderColor: WINDOW_META.flowers.colors.border,
          backgroundColor: '#fff7fb',
        }}
      >
        {showTitle && title && (
          <div
            className="text-center text-sm font-bold uppercase tracking-[0.4em]"
            style={{ color: '#a24b77' }}
          >
            {title}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {entries.map((entry, index) => (
            <FlowerEntry key={`${activeSpread.id}-${index}`} entry={entry} />
          ))}
        </div>

        {caption && (
          <p
            className="text-center text-[13px] font-semibold tracking-wide"
            style={{ color: PALETTE.textLight }}
          >
            {caption}
          </p>
        )}
      </div>
    </div>
  )
}

function FlowerEntry({ entry }) {
  if (entry.type === 'text') {
    return (
      <div
        className="h-full rounded-xl border-2 px-4 py-5 text-sm"
        style={{
          borderColor: WINDOW_META.flowers.colors.border,
          backgroundColor: '#fff',
          color: PALETTE.text,
        }}
      >
        {entry.content}
      </div>
    )
  }

  const src = resolveFlowerAsset(entry.file)

  if (!src) {
    return (
      <div
        className="flex min-h-[140px] flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-5 text-center text-xs"
        style={{
          borderColor: WINDOW_META.flowers.colors.border,
          color: PALETTE.textLight,
        }}
      >
        Missing file
        <span className="text-[10px]">{entry.file}</span>
      </div>
    )
  }

  return (
    <figure className="overflow-hidden rounded-xl border-2" style={{ borderColor: WINDOW_META.flowers.colors.border }}>
      <img src={src} alt={entry.alt ?? 'Bouquet photo'} className="h-full w-full object-contain bg-white" />
    </figure>
  )
}

function MailNotification({ onDismiss, onOpen }) {
  return (
    <div
      className="absolute right-10 top-10 flex max-w-xs cursor-pointer flex-col gap-2 rounded-2xl border-4 px-5 py-4 shadow-lg"
      style={{
        backgroundColor: PALETTE.windowBg,
        borderColor: WINDOW_META.email.colors.border,
        color: PALETTE.text,
        boxShadow: '0 18px 30px rgba(116, 96, 164, 0.25)',
        zIndex: 999,
      }}
      onClick={() => {
        onOpen?.()
        onDismiss?.()
      }}
    >
      <div className="flex items-center gap-3 text-base font-semibold tracking-wide">
        <MailIcon {...ICON_STYLES.email.icon} />
        YOU'VE GOT MAIL!
      </div>
      <div className="text-sm font-mono leading-relaxed" style={{ color: PALETTE.textLight }}>
        Tap here to jump straight into your birthday inbox.
      </div>
      <div
        className="self-end text-[11px] font-semibold tracking-[0.4em]"
        style={{ color: WINDOW_META.email.colors.border }}
      >
        OPEN MAIL
      </div>
    </div>
  )
}

function DesktopIcon({ icon, label, onClick, colors, badge }) {
  const palette = colors ?? {
    tileBg: PALETTE.accent,
    tileBorder: PALETTE.border,
    labelBg: PALETTE.bgAlt,
    labelBorder: PALETTE.border,
  }
  return (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer transition-opacity hover:opacity-80"
      onClick={onClick}
    >
      <div
        className="relative flex h-14 w-14 items-center justify-center border-3"
        style={{
          backgroundColor: palette.tileBg,
          border: `3px solid ${palette.tileBorder}`,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        }}
      >
        {icon}
        {badge && (
          <span
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold"
            style={{
              backgroundColor: '#ff4d6d',
              borderColor: '#b3132c',
              color: '#fff4f7',
              boxShadow: '0 6px 12px rgba(179, 19, 44, 0.4)',
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div
        className="text-sm font-semibold text-center px-3 py-1 tracking-wide"
        style={{
          color: PALETTE.text,
          backgroundColor: palette.labelBg,
          border: `2px solid ${palette.labelBorder}`,
        }}
      >
        {label}
      </div>
    </div>
  )
}
function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-30"
      style={{
        backgroundImage: DOT_PATTERN,
        backgroundSize: '18px 18px',
        backgroundRepeat: 'repeat',
      }}
    />
  )
}
function FloatingShapes() {
  const shapes = [
    { top: '8%', left: '12%', size: 22, color: PALETTE.primary },
    { top: '18%', left: '75%', size: 26, color: PALETTE.secondary },
    { top: '45%', left: '88%', size: 20, color: PALETTE.accent },
    { top: '65%', left: '20%', size: 28, color: PALETTE.sunshine },
    { top: '80%', left: '65%', size: 24, color: PALETTE.mint },
    { top: '30%', left: '40%', size: 18, color: PALETTE.lavender },
    { top: '12%', left: '52%', size: 16, color: PALETTE.accent },
    { top: '70%', left: '12%', size: 20, color: PALETTE.secondary },
  ]
  return (
    <div className="pointer-events-none absolute inset-0">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className="absolute opacity-30"
          style={{
            top: shape.top,
            left: shape.left,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            backgroundColor: shape.color,
            border: `2px solid ${PALETTE.border}`,
            boxShadow: '0 12px 30px rgba(255, 143, 191, 0.22)',
          }}
        />
      ))}
    </div>
  )
}
function Taskbar({ minimizedWindows, closedWindows, windowInfo, onRestore, startOpen, onToggleStart, musicPlayer, musicWindowStatus }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex h-14 items-center gap-3 px-4 text-sm"
      style={{
        backgroundColor: PALETTE.primary,
        borderTop: `3px solid ${PALETTE.border}`,
        boxShadow: '0 -6px 20px rgba(90, 61, 122, 0.15)',
      }}
    >
      <div className="relative">
        <button
          className="start-button px-6 py-3 font-bold border-2 tracking-widest transition-opacity hover:opacity-85 text-sm"
          style={{
            backgroundColor: PALETTE.accent,
            borderColor: PALETTE.border,
            color: PALETTE.text,
            boxShadow: `0 4px 0 rgba(90, 61, 122, 0.15)`,
          }}
          onClick={(e) => { e.stopPropagation(); onToggleStart() }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          START
        </button>
        {startOpen && (
          <div
            className="start-menu absolute bottom-full left-0 mb-3 w-60 p-4 border-2"
            style={{
              backgroundColor: PALETTE.windowBg,
              borderColor: PALETTE.border,
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="text-sm font-bold mb-3 pb-2 tracking-wide" 
              style={{ 
                color: PALETTE.text, 
                borderBottom: `2px solid ${PALETTE.border}` 
              }}>
              PROGRAMS
            </div>
            <div className="space-y-2">
              {closedWindows.length > 0 ? (
                closedWindows.map(key => (
                  <button
                    key={key}
                    className="w-full text-left px-4 py-2 text-sm font-semibold border-2 transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: windowInfo[key].colors.titleBar,
                      borderColor: windowInfo[key].colors.border,
                      color: PALETTE.text,
                      boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                    }}
                    onClick={() => onRestore(key)}
                  >
                    {windowInfo[key].taskLabel}
                  </button>
                ))
              ) : (
                <div className="text-center py-3 text-sm" style={{ color: PALETTE.textLight }}>
                  No closed windows
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-1 gap-2">
        {minimizedWindows.map(key => {
          const info = windowInfo[key]
          if (!info) return null
          if (key === 'music' && musicPlayer && musicWindowStatus === 'minimized') {
            return (
              <MiniMusicControls
                key={key}
                player={musicPlayer}
                palette={info.colors}
                onRestore={() => onRestore(key)}
              />
            )
          }
          return (
            <button
              key={key}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wide border-2 transform transition-transform hover:-translate-y-0.5 transition-opacity hover:opacity-90"
              style={{
                backgroundColor: info.colors.titleBar,
                borderColor: info.colors.border,
                color: PALETTE.text,
                boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
              }}
              onClick={() => onRestore(key)}
            >
              {info.taskLabel}
            </button>
          )
        })}
      </div>
      <div
        className="px-4 py-2 border-2 font-mono text-sm font-semibold"
        style={{
          backgroundColor: PALETTE.accent,
          borderColor: PALETTE.border,
          color: PALETTE.text,
        }}
      >
        12:34 AM
      </div>
    </div>
  )
}
function MiniMusicControls({ player, palette, onRestore }) {
  const trackLabel = player.currentTrack?.display ?? 'Unknown Track'
  const progressWidth = Math.min(100, Math.max(0, player.progressPercent ?? 0))
  return (
    <div
      className="flex items-center gap-3 rounded-lg border-2 px-3 py-2 text-xs"
      style={{
        backgroundColor: palette.background,
        borderColor: palette.border,
        color: PALETTE.text,
        boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
      }}
    >
      <div className="flex min-w-[160px] flex-col gap-1">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.35em]"
          style={{ color: PALETTE.textLight }}
        >
          Now Playing
        </span>
        <span className="text-xs font-mono leading-tight" title={trackLabel}>
          {trackLabel}
        </span>
        <div className="flex items-center gap-2">
          <div
            className="relative h-1.5 flex-1 overflow-hidden rounded-full border"
            style={{
              borderColor: palette.border,
              backgroundColor: '#ffffff',
            }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progressWidth}%`,
                background: `linear-gradient(90deg, ${palette.titleBar}, ${PALETTE.accent})`,
              }}
            />
          </div>
          <span
            className="text-[10px] font-semibold"
            style={{ color: PALETTE.textLight }}
          >
            {formatTime(player.currentTime)} / {player.duration ? formatTime(player.duration) : '--:--'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className="h-8 w-8 border-2 font-bold transition-opacity hover:opacity-80"
          style={{
            backgroundColor: palette.titleBar,
            borderColor: palette.border,
            color: PALETTE.text,
          }}
          onClick={player.prev}
        >
          ⏮
        </button>
        <button
          type="button"
          className="h-9 w-9 border-2 text-sm font-bold transition-opacity hover:opacity-85"
          style={{
            backgroundColor: PALETTE.accent,
            borderColor: palette.border,
            color: PALETTE.text,
          }}
          onClick={player.togglePlay}
        >
          {player.isPlaying ? '⏸' : '⏵'}
        </button>
        <button
          type="button"
          className="h-8 w-8 border-2 font-bold transition-opacity hover:opacity-80"
          style={{
            backgroundColor: palette.titleBar,
            borderColor: palette.border,
            color: PALETTE.text,
          }}
          onClick={player.next}
        >
          ⏭
        </button>
        <button
          type="button"
          className="h-8 w-8 border-2 text-sm font-bold transition-opacity hover:opacity-80"
          style={{
            backgroundColor: '#ffffff',
            borderColor: palette.border,
            color: PALETTE.text,
          }}
          onClick={onRestore}
          title="Restore player"
        >
          ▣
        </button>
      </div>
    </div>
  )
}
// SVG Icons
function MailIcon({ main = PALETTE.lavender, accent = '#ffffff', detail = '#4a3c6d' }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke={detail} strokeWidth="2" fill={main} />
      <path d="M4 6L12 13L20 6" stroke={detail} strokeWidth="2" fill="none" />
      <path d="M4 19L10.5 12.5" stroke={detail} strokeWidth="1.5" />
      <path d="M20 19L13.5 12.5" stroke={detail} strokeWidth="1.5" />
      <rect x="7" y="8" width="10" height="3" fill={accent} stroke={detail} strokeWidth="1" />
    </svg>
  )
}

function MusicIcon({ main = PALETTE.secondary, accent = PALETTE.mint, detail = PALETTE.text }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M9 18V5L21 3V16" stroke={detail} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
      <rect x="3" y="15" width="6" height="6" stroke={detail} strokeWidth="2" fill={main}/>
      <rect x="15" y="13" width="6" height="6" stroke={detail} strokeWidth="2" fill={accent}/>
    </svg>
  )
}
function FileIcon({ main = PALETTE.primary, accent = PALETTE.accent, detail = PALETTE.text }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M13 2H6V22H18V9L13 2Z" stroke={detail} strokeWidth="2" fill={main}/>
      <polygon points="13,2 13,9 20,9" fill={accent} stroke={detail} strokeWidth="2"/>
      <line x1="9" y1="13" x2="15" y2="13" stroke={detail} strokeWidth="1.5"/>
      <line x1="9" y1="16" x2="15" y2="16" stroke={detail} strokeWidth="1.5"/>
    </svg>
  )
}
function PhotoIcon({ main = PALETTE.sunshine, accent = PALETTE.accent, detail = PALETTE.text }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" stroke={detail} strokeWidth="2" fill={main}/>
      <circle cx="8" cy="8" r="2" fill={detail}/>
      <path d="M21 15L16 10L5 21H21V15Z" fill={accent} stroke={detail} strokeWidth="1.5"/>
    </svg>
  )
}
function FlowerIcon({ main = '#ffb5df', accent = '#ffeefd', detail = '#7c3d63' }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="12" width="16" height="8" rx="1" stroke={detail} strokeWidth="1.5" fill={accent} />
      <rect x="9" y="6" width="6" height="8" stroke={detail} strokeWidth="1.5" fill={main} />
      <circle cx="7" cy="8" r="3" stroke={detail} strokeWidth="1.5" fill={accent} />
      <circle cx="17" cy="8" r="3" stroke={detail} strokeWidth="1.5" fill={accent} />
      <circle cx="12" cy="4.5" r="3" stroke={detail} strokeWidth="1.5" fill={main} />
      <path d="M12 20V24" stroke={detail} strokeWidth="1.5" />
    </svg>
  )
}
function HeartIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      <path d="M12 21L10.55 19.7C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 19.7L12 21Z" 
        fill={PALETTE.text} stroke={PALETTE.text} strokeWidth="2"/>
    </svg>
  )
}
export default Y2KBirthdayDesktop
