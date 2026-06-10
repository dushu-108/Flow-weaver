import React from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Workflows from './pages/Workflows'
import Settings from './pages/Settings'
import Flow from './pages/Flow'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { background: '#131B2E', color: '#fff' } }} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/builder/:id" element={<Flow />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
