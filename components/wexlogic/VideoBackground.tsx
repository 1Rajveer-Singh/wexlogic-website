'use client'

import { useEffect, useRef } from 'react'

export function VideoBackground({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const loadVideo = () => {
      video.src = src
      video.load()
      video.play().catch(() => {/* autoplay blocked */})
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadVideo, { timeout: 2000 })
    } else {
      setTimeout(loadVideo, 1000)
    }
  }, [src])

  return (
    <>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.12,
          mixBlendMode: 'multiply',
        }}
      />
      {/* Warm paper gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(255, 253, 245, 0.4) 0%, rgba(255, 253, 245, 0.95) 85%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </>
  )
}
