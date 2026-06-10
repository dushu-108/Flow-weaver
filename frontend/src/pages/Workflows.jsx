import React from 'react'
import Sidebar from '../components/Sidebar'

export default function Workflows() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200">
      <Sidebar />
      <main className="ml-72 p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-white">Workflows</h1>
          <p className="text-slate-400 mt-2">Manage your workflow automations</p>
        </header>
        <div className="bg-[#131B2E]/60 backdrop-blur-md rounded-lg p-8 text-center">
          <p className="text-slate-400">Workflows page coming soon...</p>
        </div>
      </main>
    </div>
  )
}
