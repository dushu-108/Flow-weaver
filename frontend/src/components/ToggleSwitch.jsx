import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function ToggleSwitch({ checked, onChange }) {
  const knobRef = useRef(null)
  const bgRef = useRef(null)

  useGSAP(() => {
    if (checked) {
      gsap.to(knobRef.current, {
        x: 20,
        duration: 0.4,
        ease: 'power2.out'
      })
      gsap.to(bgRef.current, {
        backgroundColor: 'rgba(6, 182, 212, 0.7)',
        duration: 0.4,
        ease: 'power2.out'
      })
    } else {
      gsap.to(knobRef.current, {
        x: 0,
        duration: 0.4,
        ease: 'power2.out'
      })
      gsap.to(bgRef.current, {
        backgroundColor: 'rgba(55, 65, 81, 0.4)',
        duration: 0.4,
        ease: 'power2.out'
      })
    }
  }, { dependencies: [checked] })

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={e => onChange?.(e.target.checked)}
      />
      <div ref={bgRef} className="w-11 h-6 bg-gray-700/40 rounded-full peer-focus:outline-none"></div>
      <div ref={knobRef} className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
    </label>
  )
}
