import { useRef, useCallback } from 'react'

export function useBgm() {
  const audioRef = useRef<HTMLVideoElement | null>(null)
  const startedRef = useRef(false)

  const setAudioElement = useCallback((el: HTMLVideoElement | null) => {
    audioRef.current = el
    if (el) {
      el.loop = true
      el.volume = 0.35
    }
  }, [])

  const startBgm = useCallback(() => {
    if (startedRef.current || !audioRef.current) return
    startedRef.current = true
    const playPromise = audioRef.current.play()
    if (playPromise) {
      playPromise.catch(() => {
        startedRef.current = false
      })
    }
  }, [])

  return { setAudioElement, startBgm } as const
}
