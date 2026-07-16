import { useEffect, useState } from 'react'

import { getColorPalette } from './color-palette.getters'

export function useColorPalette() {
  const [colorPalette, setColorPalette] = useState(getColorPalette)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColorPalette(getColorPalette())
    })

    observer.observe(document.documentElement, {
      attributeFilter: ['class'],
      attributes: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return colorPalette
}
