import { useCallback, useRef, useState } from 'react'

export function useMeasure() {
  const [width, setWidth] = useState(0)

  const observer = useRef<null | ResizeObserver>(null)

  const ref = useCallback((node: HTMLElement | null) => {
    observer.current?.disconnect()

    if (!node) {
      return
    }

    observer.current = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })

    observer.current.observe(node)
  }, [])

  return [ref, width] as const
}
