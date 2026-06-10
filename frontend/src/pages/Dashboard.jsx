import React, { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import MetricCard from '../components/MetricCard'
import CreatorCard from '../components/CreatorCard'
import PipelineCard from '../components/PipelineCard'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  const [createOpen, setCreateOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const drawerRef = useRef(null)
  const mainRef = useRef(null)
  const navigate = useNavigate()

  useGSAP(() => {
    if (createOpen) {
      gsap.to(drawerRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out'
      })
    } else {
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.in'
      })
    }
  }, { dependencies: [createOpen] })

  const [pipelines, setPipelines] = useState([])

  const fetchWorkflows = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:4000/api/workflows/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const formatted = res.data.data.map(w => ({
        id: w._id,
        name: w.name,
        trigger: 'Webhook',
        status: w.isActive,
        successRate: 0,
        latency: 0,
        color: 'linear-gradient(90deg,#06b6d4,#8b5cf6)'
      }))
      setPipelines(formatted)
    } catch (error) {
      toast.error('Failed to load workflows')
    }
  }

  useEffect(() => {
    fetchWorkflows()
  }, [])

  async function handleToggle(id, val) {
    try {
      const token = localStorage.getItem('token')
      await axios.patch(`http://localhost:4000/api/workflows/toggle/${id}`, { isActive: val }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPipelines(p => p.map(x => x.id === id ? { ...x, status: !!val } : x))
      toast.success(val ? 'Workflow enabled' : 'Workflow paused')
    } catch (error) {
      toast.error('Failed to toggle workflow')
    }
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!newName.trim()) return
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:4000/api/workflows/create', { name: newName.trim() }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Workflow created!')
      setNewName('')
      setCreateOpen(false)
      fetchWorkflows()
    } catch (error) {
      toast.error('Failed to create workflow')
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200">
      <Sidebar />

      <main ref={mainRef} className="ml-72 p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-white">Welcome Back, Developer</h1>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard title="Total Executions" value="14,204" subtitle="All-time triggers processed" />

          <div className="bg-[#131B2E]/60 backdrop-blur-md rounded-lg p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-400">System Health</div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-md" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-emerald-300">99.4%</div>
              <div className="text-xs text-slate-400 mt-1">Live monitoring</div>
            </div>
          </div>

          <MetricCard title="Active Routes" value={<span className="text-white">5 / <span className="text-slate-400">7 Live</span></span>} subtitle={""} />

          <div className="bg-[#131B2E]/60 backdrop-blur-md rounded-lg p-4 flex flex-col justify-between">
            <div className="text-sm text-slate-400">Engine Latency</div>
            <div className="mt-3 inline-block rounded-md bg-cyan-600/20 px-3 py-2">
              <div className="text-2xl font-bold text-cyan-300">118 ms</div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreatorCard onOpen={() => setCreateOpen(true)} />

          {pipelines.map(p => (
            <PipelineCard key={p.id} pipeline={p} onToggle={handleToggle} onEdit={(id)=>navigate(`/builder/${id}`)} onAnalytics={(id)=>toast('Analytics coming soon!')} />
          ))}
        </section>
      </main>

      <div ref={drawerRef} className="fixed right-0 top-0 h-full w-96 bg-[#07101b]/60 backdrop-blur-md p-6 transform translate-x-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Create Workflow</h2>
          <button onClick={()=>setCreateOpen(false)} className="text-slate-400">Close</button>
        </div>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-sm text-slate-400">Name</label>
            <input value={newName} onChange={e=>setNewName(e.target.value)} className="w-full mt-2 p-2 rounded bg-[#0b1522]/40 border border-slate-700 text-white" placeholder="My Automation" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-cyan-500 text-black rounded">Create</button>
            <button type="button" onClick={()=>setCreateOpen(false)} className="px-4 py-2 border border-slate-700 rounded text-slate-200">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
