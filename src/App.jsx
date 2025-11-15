import { useState, useCallback } from 'react'
import LandingScreen2 from './components/LandingScreen2'
import UpdatePopup from './components/UpdatePopup'
import UpdateProgress from './components/UpdateProgress'
import DesktopExperience from './components/DesktopExperience'

function App() {
  // State machine: v24 -> updatePopup -> updating -> v25 -> desktop
  const [stage, setStage] = useState('v24')

  const handleV24Ready = useCallback(() => {
    setStage('updatePopup')
  }, [])

  const handleUpdateClick = useCallback(() => {
    setStage('updating')
  }, [])

  const handleUpdateComplete = useCallback(() => {
    setStage('v25')
  }, [])

  const handleV25Enter = useCallback(() => {
    setStage('desktop')
  }, [])

  // Stage 1: v24.0 with black/red theme
  if (stage === 'v24') {
    return (
      <LandingScreen2
        version="24.0"
        theme="dark"
        onEnter={handleV24Ready}
      />
    )
  }

  // Stage 2: Update popup dialog
  if (stage === 'updatePopup') {
    return (
      <UpdatePopup onUpdate={handleUpdateClick} />
    )
  }

  // Stage 3: Updating progress screen
  if (stage === 'updating') {
    return (
      <UpdateProgress onComplete={handleUpdateComplete} />
    )
  }

  // Stage 4: v25.0 with lavender/pink theme
  if (stage === 'v25') {
    return (
      <LandingScreen2
        version="25.0"
        theme="light"
        onEnter={handleV25Enter}
      />
    )
  }

  // Stage 5: Main desktop experience
  return <DesktopExperience />
}

export default App
