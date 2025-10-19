import { useState, useCallback } from 'react'
import LandingScreen2 from './components/LandingScreen2'
import Y2KBirthdayDesktop from './components/Y2KBirthdayDesktop'

function App() {
  const [entered, setEntered] = useState(false)
  const handleEnter = useCallback(() => setEntered(true), [])

  if (!entered) {
    return (
      <LandingScreen2
        tagline="A lavender night made just for you."
        onEnter={handleEnter}
      />
    )
  }

  return <Y2KBirthdayDesktop />
}

export default App
