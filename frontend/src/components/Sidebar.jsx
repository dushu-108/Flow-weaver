import React, { useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const highlightRef = useRef(null)

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Workflows', path: '/workflows' },
    { label: 'Builder', path: '/builder' },
    { label: 'Settings', path: '/settings' }
  ]

  const activeItem = navItems.find(item => item.path === location.pathname)

  useGSAP(() => {
    if (highlightRef.current && activeItem) {
      const activeNav = document.querySelector(`[data-nav-path="${activeItem.path}"]`)
      if (activeNav) {
        gsap.to(highlightRef.current, {
          y: activeNav.offsetTop,
          duration: 0.4,
          ease: 'power2.out'
        })
      }
    }
  }, { dependencies: [location.pathname] })

  const handleNav = (path) => {
    navigate(path)
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-72 p-6 bg-[#07101b]/40 backdrop-blur-md border-r border-slate-800">
      <div className="text-white font-bold text-lg">Flow Weaver</div>
      <nav className="mt-8 relative space-y-2 text-sm text-slate-300">
        <div
          ref={highlightRef}
          className="absolute left-0 h-10 w-full bg-cyan-500/10 rounded-md pointer-events-none transition-all"
          style={{ transition: 'none' }}
        />
        
        {navItems.map(item => (
          <button
            key={item.path}
            data-nav-path={item.path}
            onClick={() => handleNav(item.path)}
            className={`relative w-full text-left py-2 px-3 rounded-md transition-colors cursor-pointer ${
              location.pathname === item.path ? 'text-cyan-300 font-medium' : 'hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
