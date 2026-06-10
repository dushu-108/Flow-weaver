import React, { useState } from 'react'
import { Position, useReactFlow } from '@xyflow/react'
import { BaseNode } from './Basenode'

export default function EmailActionNode({ id, data }) {
  const { updateNodeData } = useReactFlow()
  const [to, setTo] = useState(data?.to || '')
  const [subject, setSubject] = useState(data?.subject || '')
  const [body, setBody] = useState(data?.body || '')

  const handleToChange = (e) => {
    setTo(e.target.value)
    updateNodeData(id, { to: e.target.value })
  }

  const handleSubjectChange = (e) => {
    setSubject(e.target.value)
    updateNodeData(id, { subject: e.target.value })
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value)
    updateNodeData(id, { body: e.target.value })
  }

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'input',
      color: '#f97316',
      label: 'Trigger'
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output',
      color: '#f97316',
      label: 'Done'
    }
  ]

  return (
    <BaseNode
      id={id}
      label="Email Action"
      description="Send email notification"
      icon="📧"
      accentColor="#f97316"
      handles={handles}
      style={{ width: '320px' }}
    >
      <div className="space-y-2">
        <div>
          <label className="text-xs text-gray-400 block">To</label>
          <input
            type="text"
            placeholder="recipient@example.com"
            value={to}
            onChange={handleToChange}
            className="w-full text-xs bg-[#0d1626]/60 border border-white/10 rounded px-2 py-1 text-gray-300 placeholder-gray-600"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 block">Subject</label>
          <input
            type="text"
            placeholder="Email subject..."
            value={subject}
            onChange={handleSubjectChange}
            className="w-full text-xs bg-[#0d1626]/60 border border-white/10 rounded px-2 py-1 text-gray-300 placeholder-gray-600"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 block">Body</label>
          <textarea
            placeholder="Email message..."
            value={body}
            onChange={handleBodyChange}
            className="w-full text-xs bg-[#0d1626]/60 border border-white/10 rounded px-2 py-1 text-gray-300 placeholder-gray-600 resize-none h-16"
          />
        </div>
      </div>
    </BaseNode>
  )
}
