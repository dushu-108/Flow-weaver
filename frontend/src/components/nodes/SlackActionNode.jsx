import React, { useState } from 'react'
import { Position, useReactFlow } from '@xyflow/react'
import { BaseNode } from './Basenode'

export default function SlackActionNode({ id, data }) {
  const { updateNodeData } = useReactFlow()
  const [url, setUrl] = useState(data?.url || '')
  const [message, setMessage] = useState(data?.message || '')

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
    updateNodeData(id, { url: e.target.value })
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
    updateNodeData(id, { message: e.target.value })
  }

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'input',
      color: '#a855f7',
      label: 'Trigger'
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output',
      color: '#a855f7',
      label: 'Done'
    }
  ]

  return (
    <BaseNode
      id={id}
      label="Slack Action"
      description="Send message to Slack channel"
      icon="💬"
      accentColor="#a855f7"
      handles={handles}
      style={{ width: '320px' }}
    >
      <div className="space-y-2">
        <div>
          <label className="text-xs text-gray-400 block">Webhook URL</label>
          <input
            type="text"
            placeholder="https://hooks.slack.com/..."
            value={url}
            onChange={handleUrlChange}
            className="w-full text-xs bg-[#0d1626]/60 border border-white/10 rounded px-2 py-1 text-gray-300 placeholder-gray-600"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 block">Message</label>
          <textarea
            placeholder="Message content..."
            value={message}
            onChange={handleMessageChange}
            className="w-full text-xs bg-[#0d1626]/60 border border-white/10 rounded px-2 py-1 text-gray-300 placeholder-gray-600 resize-none h-16"
          />
        </div>
      </div>
    </BaseNode>
  )
}
