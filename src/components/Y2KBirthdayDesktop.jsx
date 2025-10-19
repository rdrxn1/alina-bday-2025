import { useCallback, useState, useRef } from 'react'

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
  chat: {
    title: 'MY_COOL_CHAT.EXE',
    width: 340,
    colors: {
      border: PALETTE.lavender,
      background: '#f1ecff',
      titleBar: PALETTE.lavender,
    },
    taskLabel: 'Chat',
  },
  music: {
    title: 'FAVORITE_MUSIC.APP',
    width: 300,
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
  chat: {
    tileBg: WINDOW_META.chat.colors.titleBar,
    tileBorder: WINDOW_META.chat.colors.border,
    labelBg: '#f6f2ff',
    labelBorder: WINDOW_META.chat.colors.border,
    icon: {
      main: WINDOW_META.chat.colors.titleBar,
      accent: '#ffffff',
      detail: '#4a3c6d',
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
})

const INITIAL_WINDOWS = {
  music: { x: 90, y: 70, width: 300, height: 280, zIndex: 1, status: 'open', maximized: false },
  chat: { x: 410, y: 90, width: 340, height: 320, zIndex: 2, status: 'open', maximized: false },
  about: { x: 210, y: 210, width: 320, height: 300, zIndex: 3, status: 'open', maximized: false },
  photos: { x: 540, y: 190, width: 300, height: 280, zIndex: 4, status: 'open', maximized: false },
}

function Y2KBirthdayDesktop() {
  const [windows, setWindows] = useState(INITIAL_WINDOWS)
  const [dragState, setDragState] = useState(null)
  const [resizeState, setResizeState] = useState(null)
  const [startOpen, setStartOpen] = useState(false)
  const containerRef = useRef(null)

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
  }, [])

  const handleRestore = useCallback((key) => {
    setStartOpen(false)
    setWindows(prev => {
      const maxZ = Math.max(...Object.values(prev).map(w => w.zIndex))
      return { ...prev, [key]: { ...prev[key], status: 'open', maximized: false, zIndex: maxZ + 1 } }
    })
  }, [])

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
          icon={<MusicIcon {...ICON_STYLES.music.icon} />}
          label="MY_MUSIC"
          colors={ICON_STYLES.music}
          onClick={() => handleIconClick('music')}
        />
        <DesktopIcon
          icon={<ChatIcon {...ICON_STYLES.chat.icon} />}
          label="CHAT"
          colors={ICON_STYLES.chat}
          onClick={() => handleIconClick('chat')}
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
        </aside>

        {windows.chat.status === 'open' && (
          <Window
            windowKey="chat"
            data={windows.chat}
            meta={WINDOW_META.chat}
            onMouseDown={handleWindowMouseDown}
            onResizeStart={handleResizeMouseDown}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            onClose={handleClose}
          >
            <ChatContent />
          </Window>
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
            <MusicContent />
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

        <Taskbar
          minimizedWindows={minimizedWindows}
          closedWindows={closedWindows}
          windowInfo={WINDOW_META}
          onRestore={handleRestore}
          startOpen={startOpen}
          onToggleStart={() => setStartOpen(p => !p)}
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

function ChatContent() {
  return (
    <div className="p-4 space-y-3 text-sm">
      <div
        className="h-40 overflow-y-auto p-3 text-sm font-mono custom-scroll"
        style={{
          border: `2px solid ${PALETTE.lavender}`,
          backgroundColor: '#f1e9ff',
        }}
      >
        <div className="mb-3">
          <span className="font-bold" style={{ color: PALETTE.text }}>Waleed:</span>
          <span style={{ color: PALETTE.textLight }}> Hey! Happy birthday!!</span>
        </div>
        <div className="mb-3">
          <span className="font-bold" style={{ color: PALETTE.text }}>Alina:</span>
          <span style={{ color: PALETTE.textLight }}> Thanks so much!</span>
        </div>
        <div className="mb-3">
          <span className="font-bold" style={{ color: PALETTE.text }}>Waleed:</span>
          <span style={{ color: PALETTE.textLight }}> Tonight's desktop is all yours.</span>
        </div>
        <div>
          <span className="font-bold" style={{ color: PALETTE.text }}>Alina:</span>
          <span style={{ color: PALETTE.textLight }}> Then play me Kaavish and tell me a secret.</span>
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 text-sm border-2 focus:outline-none"
          style={{
            borderColor: PALETTE.accent,
            backgroundColor: PALETTE.bg,
            color: PALETTE.text,
          }}
        />
        <button
          className="px-4 py-2 text-sm font-bold border-2 transition-opacity hover:opacity-80"
          style={{
            backgroundColor: PALETTE.accent,
            borderColor: PALETTE.border,
            color: PALETTE.text,
          }}
        >
          SEND
        </button>
      </div>
    </div>
  )
}

function MusicContent() {
  return (
    <div className="p-4 space-y-4">
      <div
        className="p-4 text-center"
        style={{
          border: `2px solid ${PALETTE.secondary}`,
          backgroundColor: '#e8f7ff',
        }}
      >
        <div className="text-sm font-bold mb-2 tracking-widest" style={{ color: PALETTE.text }}>
          NOW PLAYING
        </div>
        <div className="text-sm mb-3 font-mono" style={{ color: PALETTE.textLight }}>
          Kaavish - Bachpan
        </div>
        <div className="h-12 flex items-center justify-center" style={{ backgroundColor: '#bfe9ff' }}>
          <svg className="w-full h-10" viewBox="0 0 200 40">
            <path d="M10,20 L30,10 L50,25 L70,15 L90,22 L110,18 L130,24 L150,20 L170,16 L190,20"
              stroke={PALETTE.secondary} strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
      <div className="flex justify-center gap-3">
        {['⏮', '⏯', '⏭'].map(btn => (
          <button
            key={btn}
            className="w-12 h-10 border-2 text-sm font-bold transition-opacity hover:opacity-80"
            style={{
              backgroundColor: PALETTE.secondary,
              borderColor: PALETTE.border,
            }}
          >
            {btn}
          </button>
        ))}
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
  return (
    <div className="p-5 text-center space-y-4 flex flex-col items-center justify-center h-full">
      <div
        className="w-32 h-32 flex items-center justify-center"
        style={{
          backgroundColor: PALETTE.accent,
          border: `3px solid ${PALETTE.border}`,
          boxShadow: '0 18px 40px rgba(255, 211, 125, 0.28)',
        }}
      >
        <HeartIcon />
      </div>
      <div
        className="px-6 py-2 text-sm font-bold tracking-widest"
        style={{
          backgroundColor: PALETTE.sunshine,
          border: `2px solid ${PALETTE.border}`,
          color: PALETTE.text,
        }}
      >
        HAPPY BIRTHDAY ALINA
      </div>
      <div className="text-xs font-mono" style={{ color: PALETTE.textLight }}>
        Everything beautiful reminds me of you.
      </div>
    </div>
  )
}

function DesktopIcon({ icon, label, onClick, colors }) {
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
        className="w-14 h-14 flex items-center justify-center border-3"
        style={{
          backgroundColor: palette.tileBg,
          border: `3px solid ${palette.tileBorder}`,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        }}
      >
        {icon}
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

function Taskbar({ minimizedWindows, closedWindows, windowInfo, onRestore, startOpen, onToggleStart }) {
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
        {minimizedWindows.map(key => (
          <button
            key={key}
            className="px-4 py-2 text-xs font-bold tracking-wide uppercase border-2 transition-transform transform hover:-translate-y-0.5 transition-opacity hover:opacity-90"
            style={{
              backgroundColor: windowInfo[key].colors.titleBar,
              borderColor: windowInfo[key].colors.border,
              color: PALETTE.text,
              boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
            }}
            onClick={() => onRestore(key)}
          >
            {windowInfo[key].taskLabel}
          </button>
        ))}
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

// SVG Icons
function MusicIcon({ main = PALETTE.secondary, accent = PALETTE.mint, detail = PALETTE.text }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M9 18V5L21 3V16" stroke={detail} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
      <rect x="3" y="15" width="6" height="6" stroke={detail} strokeWidth="2" fill={main}/>
      <rect x="15" y="13" width="6" height="6" stroke={detail} strokeWidth="2" fill={accent}/>
    </svg>
  )
}

function ChatIcon({ main = PALETTE.accent, accent = PALETTE.lavender, detail = PALETTE.text }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="14" stroke={detail} strokeWidth="2" fill={main}/>
      <path d="M3 17L7 21V17H3Z" stroke={detail} strokeWidth="2" fill={accent}/>
      <line x1="7" y1="8" x2="17" y2="8" stroke={detail} strokeWidth="2"/>
      <line x1="7" y1="12" x2="14" y2="12" stroke={detail} strokeWidth="2"/>
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

function HeartIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      <path d="M12 21L10.55 19.7C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 19.7L12 21Z" 
        fill={PALETTE.text} stroke={PALETTE.text} strokeWidth="2"/>
    </svg>
  )
}

export default Y2KBirthdayDesktop
