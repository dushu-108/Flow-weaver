import React, { useState } from 'react'
import { Position } from '@xyflow/react'
import { useParams } from 'react-router-dom'
import { BaseNode } from './Basenode'
import { Copy, Check } from 'lucide-react'

export default function WebhookTriggerNode({ id, data }) {
  const [copied, setCopied] = useState(false)
  const { id: workflowId } = useParams()
  
  const webhookUrl = workflowId 
    ? `http://localhost:4000/hooks/execute/${workflowId}` 
    : (data?.url || 'https://webhook.example.com/trigger')

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: 'output',
      color: '#06b6d4',
      label: 'Trigger'
    }
  ]

  return (
    <BaseNode
      id={id}
      label="Webhook Trigger"
      description="Listens for incoming HTTP requests"
      icon="🪝"
      accentColor="#06b6d4"
      handles={handles}
    >
      <div className="space-y-2">
        <label className="text-xs text-gray-400 block">Generated URL</label>
        <div className="flex items-center gap-1 bg-[#0d1626]/60 border border-cyan-500/30 rounded px-2 py-1">
          <input
            type="text"
            readOnly
            value={webhookUrl}
            className="flex-1 text-xs bg-transparent text-cyan-300 outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className="text-cyan-400 hover:text-cyan-300 transition-colors flex-shrink-0"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    </BaseNode>
  )
}
