import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function CreatorCard({ onOpen }) {
  const cardRef = useRef(null)
  const iconRef = useRef(null)
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'back.out(1.5)'
    })
  }, { scope: containerRef })

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      borderColor: 'rgba(6, 182, 212, 0.5)',
      boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)',
      duration: 0.4,
      ease: 'power2.out'
    })
    gsap.to(iconRef.current, {
      scale: 1.2,
      textShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      borderColor: 'rgba(6, 182, 212, 0.2)',
      boxShadow: '0 0 0px rgba(6, 182, 212, 0)',
      duration: 0.4,
      ease: 'power2.out'
    })
    gsap.to(iconRef.current, {
      scale: 1,
      textShadow: 'none',
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  return (
    <div ref={containerRef}>
      <div
        ref={cardRef}
        role="button"
        onClick={onOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="border-2 border-dashed border-cyan-500/20 rounded-lg p-6 flex items-center justify-center cursor-pointer h-39"
      >
        <div className="flex flex-col items-center text-center">
          <div ref={iconRef} className="text-cyan-400 text-6xl font-extrabold">
            +
          </div>
          <div className="mt-3 text-sm text-slate-400">Create new workflow</div>
        </div>
      </div>
    </div>
  )
}
