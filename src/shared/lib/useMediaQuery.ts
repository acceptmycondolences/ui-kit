import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') {
        return () => undefined
      }

      const mediaQueryList = window.matchMedia(query)

      mediaQueryList.addEventListener('change', onStoreChange)

      return () => {
        mediaQueryList.removeEventListener('change', onStoreChange)
      }
    },
    () => {
      if (typeof window === 'undefined') {
        return false
      }

      return window.matchMedia(query).matches
    },
    () => false,
  )
}
