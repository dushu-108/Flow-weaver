import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ToggleSwitch from './ToggleSwitch'

export default function PipelineCard({ pipeline, onToggle, onEdit, onAnalytics }) {
  const cardRef = useRef(null)
  const borderRef = useRef(null)
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      boxShadow: '0 20px 40px rgba(6, 182, 212, 0.15)',
      y: -8,
      duration: 0.4,
      ease: 'power2.out'
    })
    gsap.to(borderRef.current, {
      boxShadow: 'inset 0 0 20px rgba(6, 182, 212, 0.2)',
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    })
    gsap.to(borderRef.current, {
      boxShadow: 'none',
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  return (
    <div ref={containerRef}>
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-lg bg-[#131B2E]/60 backdrop-blur-md p-4 flex flex-col justify-between shadow-sm"
      >
        <div ref={borderRef} className="absolute inset-x-0 top-0 h-1 rounded-t-lg" style={{ background: pipeline.color || 'transparent' }} />

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/5 text-cyan-300">
              {pipeline.icon || (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-cyan-300"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/></svg>)}
            </div>
            <div>
              <div className="text-white font-medium">{pipeline.name}</div>
              <div className="text-xs text-slate-400">{pipeline.trigger}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-300 mr-2">{pipeline.status ? 'ON' : 'OFF'}</div>
            <ToggleSwitch checked={pipeline.status} onChange={(val) => onToggle?.(pipeline.id, val)} />
          </div>
        </div>

        <div className="mt-4 text-xs font-mono text-slate-400">Success rate: {pipeline.successRate}% | Latency: {pipeline.latency}ms</div>

        <div className="mt-4 flex gap-3">
          <button onClick={() => onEdit?.(pipeline.id)} className="px-3 py-2 bg-slate-800 text-sm text-white rounded-md transition-all">Edit Pipeline</button>
          <button onClick={() => onAnalytics?.(pipeline.id)} className="px-3 py-2 border border-slate-700 text-sm text-slate-200 rounded-md bg-transparent transition-all">Analytics History</button>
        </div>
      </div>
    </div>
  )
}
