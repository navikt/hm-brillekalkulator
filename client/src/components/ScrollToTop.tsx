import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scroll to top every time user changes page
export function ScrollToTop() {
  const pathname = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
