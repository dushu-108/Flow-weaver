import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function MetricCard({ title, value, subtitle, accent }) {
  const cardRef = useRef(null)
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      <div
        ref={cardRef}
        onMouseEnter={() => {
          gsap.to(cardRef.current, {
            boxShadow: '0 25px 50px rgba(6, 182, 212, 0.15)',
            y: -5,
            duration: 0.4,
            ease: 'power2.out'
          })
        }}
        onMouseLeave={() => {
          gsap.to(cardRef.current, {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
          })
        }}
        className={`bg-[#131B2E]/60 backdrop-blur-md rounded-lg p-4 flex flex-col justify-between cursor-pointer h-full`}
      >
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">{title}</div>
        </div>
        <div className="mt-3">
          <div className="text-3xl font-extrabold text-white">{value}</div>
          {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
        </div>
      </div>
    </div>
  )
}
